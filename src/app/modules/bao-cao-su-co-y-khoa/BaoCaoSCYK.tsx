/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react"
import { Button, Dropdown } from "react-bootstrap";
import InputSearch from "../component/InputSearch";
import "./BaoCaoSCYK.scss";
import { InitThongTinSCYK, dsTabThongTinSCYK, tableDSSuCoYKhoaColumns } from "./const/constanst";
import { useState } from "react";
import DialogThemMoiSCYK from "./components/DialogThemMoiSCYK";
import { KTSVG } from "../../../_metronic/helpers";
import TableCustom from "../component/table/table-custom/TableCustom";
import { MEDICAL_INCIDENT_REPORT_STATUS, RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import TabMenu from "../component/tabs/TabMenu";
import { deleteSCYKById, getSCYKById, searchByPage, exportWordFile, exportPdfFile } from "./services/BaoCaoSCYKServices";
import { MedicalIncidentInfo, SearchObject } from "./models/BaoCaoSCYKModels";
import { toast } from "react-toastify";
import AdvancedSearchDialog from "./components/AdvancedSearchDialog";
import ConfirmDialog from "../component/confirm-dialog/ConfirmDialog";
import TiepNhanSCYKDialog from "./components/TiepNhanSCYKDialog";
import { exportToFile, handlePrint } from "../utils/FunctionUtils";
import BaoCaoSCYKDetail from "./components/BaoCaoSCYKDetail";
import FilterSearchContainer from "./FilterSearchContainer";

type Props = {};

const BaoCaoSCYK = (props: Props) => {
    const [openDialogThemMoiSCYK, setOpenDialogThemMoiSCYK] = useState(false);
    const [shouldOpenAdvancedSearchDialog, setShouldOpenAdvancedSearchDialog] = useState(false);
    const [searchObj, setSearchObj] = useState<SearchObject>({
        pageNumber: 1,
        pageSize: 10,
    })
    const [dsBaoCaoSCYK, setDsBaoCaoSCYK] = useState<MedicalIncidentInfo[]>([]);
    const [thongTinSCYK, setThongTinSCYK] = useState<MedicalIncidentInfo>(InitThongTinSCYK);
    const [configTable, setConfigTable] = useState<any>({});
    const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState(false)
    const [openDialogTiepNhan, setOpenDialogTiepNhan] = useState(false)
    const [indexRowSelected, setIndexRowSelected] = useState<any>(undefined);
    const [tabList, setTabList] = useState<any>([])

    const handleSearch = () => {
        updatePageData({
            ...searchObj,
            trangThaiXuLy: searchObj?.trangThaiXuLy?.code,
            hinhThuc: searchObj?.phanLoai?.code,
            phanLoai: searchObj?.phanLoai?.code,
            khoaPhongDieuTri: searchObj?.khoaPhongDieuTri?.code,
        });
    }

    const updatePageData = async (searchData: any) => {
        await getMedicalIncidentReportList(searchData);
    }

    const getMedicalIncidentReportList = async (searchData: any) => {
        try {
            const { data } = await searchByPage(searchData);
            await getThongTinSCYK(data?.data?.data[indexRowSelected || 0]?.id);
            await setDsBaoCaoSCYK(data?.data?.data);
            setIndexRowSelected(0);
            setConfigTable({
                pageNumber: data.data.pageNumber,
                pageSize: data.data.pageNumber,
                totalElement: data.data.total,
                totalPages: data.data.totalPages,
                numberOfElements: data.data.numberOfElements,
            })
        } catch (err) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    const getThongTinSCYK = async (scykId: any) => {
        const res = await getSCYKById(scykId as string);
        setThongTinSCYK(res.data.data)
    }

    const handleDeleteSCYK = async () => {
        try {
            if (thongTinSCYK.id) {
                const res = await deleteSCYKById(thongTinSCYK.id)
                if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                    toast.success(res.data?.message)
                    setShouldOpenConfirmDeleteDialog(false)
                    setThongTinSCYK(InitThongTinSCYK)
                    updatePageData({});
                }
            }
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };


    const handleExportWord = async () => {
        try {
            exportToFile({
                exportAPI: () => thongTinSCYK?.id && exportWordFile(thongTinSCYK?.id), 
                fileName: "Báo cáo sự cố y khoa",
                type: TYPE.WORD,
                // setPageLoading
            })
        } catch (error) {
            toast.error(<>{error}</>)
        }
    }

    const handleExportPdf = () => {
        try {
            exportToFile({
                exportAPI: () => thongTinSCYK?.id && exportPdfFile(thongTinSCYK?.id), 
                fileName: "Báo cáo sự cố y khoa",
                type: TYPE.PDF,
                // setPageLoading
            })
        } catch (error) {
            toast.error(<>{error}</>)
        }
    }

    const handleOpenUpdateModal = async () => {
        !thongTinSCYK?.id && await getThongTinSCYK(dsBaoCaoSCYK[indexRowSelected]?.id);
        setOpenDialogThemMoiSCYK(true);
    }

    useEffect(() => {
        const tabListTemp = [
            {
                eventKey: "0",
                title: "Báo cáo sự cố",
                component: <BaoCaoSCYKDetail thongTinSCYK={thongTinSCYK}/>,
            },
        ]
        switch(thongTinSCYK?.trangThaiXuLy) {
            case MEDICAL_INCIDENT_REPORT_STATUS.DA_XAC_MINH: {
                tabListTemp.push({
                    eventKey: "1",
                    title: "Biên bản xác minh",
                    component: <></>
                })
                break;
            }
            case MEDICAL_INCIDENT_REPORT_STATUS.DA_PHAN_TICH: {
                tabListTemp.push({
                    eventKey: "2",
                    title: "Phân tích SCYK",
                    component: <></>
                })
                break;
            }
            case MEDICAL_INCIDENT_REPORT_STATUS.TAO_BIEN_BAN: {
                tabListTemp.push({
                    eventKey: "3",
                    title: "Biên bản họp",
                    component: <></>
                })
                break;
            }
        }
        tabListTemp.push({
            eventKey: "4",
            title: "Tài liệu đính kèm",
            component: <>Tài liệu đính kèm</>
        },)
        setTabList(tabListTemp);
    }, [thongTinSCYK])

    useEffect(() => {
        !isNaN(indexRowSelected) && getThongTinSCYK(dsBaoCaoSCYK[indexRowSelected]?.id);
    }, [indexRowSelected])

    return (
        <div className="bao-cao-scyk-container">
            <div className="ds-su-co-y-khoa">
                <FilterSearchContainer 
                    title="Danh sách báo cáo sự cố y khoa"
                    handleChangeSearchObj={setSearchObj}
                    handleCreate={() => {
                        setThongTinSCYK(InitThongTinSCYK);
                        setOpenDialogThemMoiSCYK(true);
                    }}
                    searchObj={searchObj}
                    handleSearch={handleSearch}
                />
                <div>
                    <TableCustom
                        height={"calc(100vh - 340px)"}
                        id="profile2"
                        columns={tableDSSuCoYKhoaColumns}
                        data={dsBaoCaoSCYK}
                        dataChecked={[thongTinSCYK]}
                        buttonAdd={false}
                        setCurIndexSelectSingle={setIndexRowSelected}
                        buttonExportExcel={false}
                        notDelete={false}
                        handleDelete={deleteSCYKById}
                        justFilter={true}
                        fixedColumnsCount={0}
                        noPagination={false}
                        updatePageData={updatePageData}
                        type={TYPE.SINGLE}
                        page={configTable?.pageNumber}
                        pageSize={configTable?.pageSize}
                        totalElements={configTable?.totalElement}
                        totalPages={configTable?.totalPages}
                        numberOfElements={configTable?.numberOfElements}
                    />
                </div>
                <div className="status-box">
                    <div className="d-flex">
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10"></i>
                            <span>Mới tạo</span>
                        </div>
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-steel-blue"></i>
                            <span>Chờ tiếp nhận</span>
                        </div>
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-green"></i>
                            <span>Đã tiếp nhận</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-dark-orange"></i>
                            <span>Đã xác minh</span>
                        </div>
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-dark-red"></i>
                            <span>Đã phân tích</span>
                        </div>
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-gunmetal"></i>
                            <span>Tạo biên bản</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-primary"></i>
                            <span>Đã báo cáo</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tt-su-co-y-khoa">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <KTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">Thông tin sự cố y khoa</span>
                    </div>
                    <div className="d-flex spaces gap-10">
                        <Button 
                            className="button-primary"
                            onClick={() => setOpenDialogTiepNhan(true)}
                        
                        >
                           Tiếp nhận
                        </Button>
                        <Button
                            className="button-primary"
                            onClick={handleOpenUpdateModal}
                        >
                            Sửa
                        </Button>
                        <Button
                            className="button-primary"
                            onClick={() => setShouldOpenConfirmDeleteDialog(true)}
                        >
                            Xóa
                        </Button>
                        <Dropdown drop='down'>
                            <Dropdown.Toggle
                                className='button-primary'
                                id='dropdown-autoclose-true'
                                size='sm'
                            >
                                Xuất file
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={handleExportWord}
                                >
                                    Xuất file word
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={handleExportPdf}
                                >
                                    Xuất file pdf
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button 
                            className="button-primary"
                            onClick={()=>handlePrint("print-contents")}

                        >
                            In phiếu
                        </Button>
                    </div>
                </div>
                <div className="tt-tabs">
                    <TabMenu danhsachTabs={tabList} />
                </div>
            </div>

            {openDialogThemMoiSCYK && (
                <DialogThemMoiSCYK
                    thongTinSCYK={thongTinSCYK}
                    updatePageData={updatePageData}
                    handleClose={() => setOpenDialogThemMoiSCYK(false)}
                />
            )}

            {openDialogTiepNhan && (
                <TiepNhanSCYKDialog
                    updatePageData={updatePageData}
                    suCoId={thongTinSCYK?.id || ""}
                    handleClose={() => setOpenDialogTiepNhan(false)}
                />
            )}

            {shouldOpenConfirmDeleteDialog && (
                <ConfirmDialog
                    show={shouldOpenConfirmDeleteDialog}
                    title={"Xác nhận xóa"}
                    message={"Bạn có muốn xóa không ?"}
                    yes={"Xác nhận"}
                    onYesClick={handleDeleteSCYK}
                    cancel={"Hủy"}
                    onCancelClick={() => setShouldOpenConfirmDeleteDialog(false)}
                />
            )}
            {shouldOpenAdvancedSearchDialog && (
                <AdvancedSearchDialog
                    handleClose={() => setShouldOpenAdvancedSearchDialog(false)}
                    handleSearch={handleSearch}
                    searchObj={searchObj}
                    handleChangeSearchObj={(searchData: SearchObject) => setSearchObj(searchData)}
                />
            )}
            <iframe
                id="ifmcontentstoprint"
                style={{
                    height: "0px",
                    width: "0px",
                    position: "absolute",
                }}
            ></iframe>
        </div>
    );
};

export default BaoCaoSCYK;
