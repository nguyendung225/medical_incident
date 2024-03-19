/* eslint-disable jsx-a11y/iframe-has-title */
import { useContext, useEffect } from "react"
import { Button } from "react-bootstrap";
import "./BaoCaoSCYK.scss";
import { SCYK_DETAIL_INFO_INIT, tableDSSuCoYKhoaColumns } from "./const/constants";
import { useState } from "react";
import DialogThemMoiSCYK from "./components/DialogThemMoiSCYK";
import { KTSVG } from "../../../_metronic/helpers";
import TableCustom from "../component/table/table-custom/TableCustom";
import { MEDICAL_INCIDENT_REPORT_STATUS, RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import TabMenu from "../component/tabs/TabMenu";
import { deleteSCYKById, searchByPage, exportWordFile as exportWordBaoCaoSCYK, getScykInfoDetailById } from "./services/BaoCaoSCYKServices";
import { IMedicalIncidentDetailInfo, MedicalIncidentInfo, SearchObject } from "./models/BaoCaoSCYKModels";
import { toast } from "react-toastify";
import AdvancedSearchDialog from "./components/AdvancedSearchDialog";
import ConfirmDialog from "../component/confirm-dialog/ConfirmDialog";
import TiepNhanSCYKDialog from "./components/TiepNhanSCYKDialog";
import { exportToFile, handleExportPdf, handlePrint } from "../utils/FunctionUtils";
import BaoCaoSCYKDetail from "./components/BaoCaoSCYKDetail";
import FilterSearchContainer from "./components/FilterSearchContainer";
import AppContext from "../../AppContext";
import BienBanXacMinhDetail from "../bien-ban-xac-minh/components/BienBanXacMinhDetail";
import DropdownButton from "../component/button/DropdownButton";
import { exportWord as exportWordBienBanXacMinh} from "../bien-ban-xac-minh/services/BienBanXacMinhServices";
import PhanTichsScykDetail from "../phan-tich-scyk/components/PhanTichScykDetail";

type Props = {};

const BaoCaoSCYK = (props: Props) => {
    const { setPageLoading } = useContext(AppContext);
    const [openDialogThemMoiSCYK, setOpenDialogThemMoiSCYK] = useState(false);
    const [shouldOpenAdvancedSearchDialog, setShouldOpenAdvancedSearchDialog] = useState(false);
    const [searchObj, setSearchObj] = useState<SearchObject>({
        pageNumber: 1,
        pageSize: 10,
    })
    const [dsBaoCaoSCYK, setDsBaoCaoSCYK] = useState<MedicalIncidentInfo[]>([]);
    const [thongTinSCYK, setThongTinSCYK] = useState<IMedicalIncidentDetailInfo>(SCYK_DETAIL_INFO_INIT);
    const [configTable, setConfigTable] = useState<any>({});
    const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState(false)
    const [openDialogTiepNhan, setOpenDialogTiepNhan] = useState(false)
    const [indexRowSelected, setIndexRowSelected] = useState<any>(undefined);
    const [tabList, setTabList] = useState<any>([]);
    const [dropdownPhieuIn, setDropdownPhieuIn] = useState([
        {
            title: "Báo cáo scyk",
            handleClick: () => handlePrint("in-phieu-bao-cao-scyk"),
        },
    ]);
    const [exportFileDropdown, setExportFileDropdown] = useState([{
        title: "",
        handleClick: () => {},
    }]);

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
            setPageLoading(true);
            const { data } = await searchByPage(searchData);
            data?.data?.data?.length > 0 && await getThongTinSCYK(data?.data?.data[indexRowSelected || 0]?.id);
            await setDsBaoCaoSCYK(data?.data?.data);
            setIndexRowSelected(0);
            setConfigTable({
                pageNumber: data.data.pageNumber,
                pageSize: data.data.pageNumber,
                totalElement: data.data.total,
                totalPages: data.data.totalPages,
                numberOfElements: data.data.numberOfElements,
            })
            setPageLoading(false);
        } catch (err) {
            setPageLoading(false);
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    const getThongTinSCYK = async (scykId: any) => {
        try {
            setPageLoading(true);
            const res = await getScykInfoDetailById(scykId as string);
            setThongTinSCYK(res.data.data);
            setPageLoading(false);
        } catch (error) {
            setPageLoading(false);
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    }

    const handleDeleteSCYK = async () => {
        try {
            if (thongTinSCYK?.suCoResp?.id) {
                const res = await deleteSCYKById(thongTinSCYK?.suCoResp?.id)
                if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                    toast.success(res.data?.message)
                    setShouldOpenConfirmDeleteDialog(false)
                    setThongTinSCYK(SCYK_DETAIL_INFO_INIT)
                    updatePageData({});
                }
            }
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    const handleOpenUpdateModal = async () => {
        !thongTinSCYK?.suCoResp?.id && await getThongTinSCYK(dsBaoCaoSCYK[indexRowSelected]?.id);
        setOpenDialogThemMoiSCYK(true);
    }

    const handleCloseModal = async () => {
        !thongTinSCYK?.suCoResp?.id && await getThongTinSCYK(dsBaoCaoSCYK[indexRowSelected]?.id);
        setOpenDialogThemMoiSCYK(false);
    }

    useEffect(() => {
        const tabListTemp = [
            {
                eventKey: "0",
                title: "Báo cáo sự cố",
                component: <BaoCaoSCYKDetail thongTinSCYK={thongTinSCYK?.suCoResp}/>,
            },
        ]
        const exportFileDropdownTemp = [
            {
                title: "Báo cáo scyk.docx",
                handleClick: () => exportToFile({
                    exportAPI: () => thongTinSCYK?.suCoResp?.id && exportWordBaoCaoSCYK(thongTinSCYK?.suCoResp?.id), 
                    fileName: "Báo cáo scyk",
                    type: TYPE.WORD,
                    setPageLoading
                }),
            },
            {
                title: "Báo cáo scyk.pdf",
                handleClick: () => {
                    handleExportPdf({
                        elementId: "in-phieu-bao-cao-scyk",
                        fileName: "Báo cáo scyk",
                        setPageLoading
                    })
                }
            },
        ]
        const dropdownPhieuInList = [
            {
                title: "Báo cáo scyk",
                handleClick: () => handlePrint("in-phieu-bao-cao-scyk"),
            }
        ]

        if(thongTinSCYK?.bienBanXacMinhResp) {
            tabListTemp.push({
                eventKey: "1",
                title: "Biên bản xác minh",
                component: <BienBanXacMinhDetail thongTinBienBan={thongTinSCYK?.bienBanXacMinhResp}/>
            });
            exportFileDropdownTemp.push(
                {
                    title: "Biên bản xác minh.docx",
                    handleClick: () => exportToFile({
                        exportAPI: () => thongTinSCYK?.bienBanXacMinhResp?.id && exportWordBienBanXacMinh(thongTinSCYK?.bienBanXacMinhResp?.id), 
                        fileName: "Biên bản xác minh",
                        type: TYPE.WORD,
                        setPageLoading
                    }),
                },
                {
                    title: "Biên bản xác minh.pdf",
                    handleClick: () => {
                        handleExportPdf({
                            elementId: "in-phieu-bien-ban-xac-minh",
                            fileName: "Biên bản xác minh",
                            setPageLoading
                        })
                    }
                    
                }
            )
            dropdownPhieuInList.push(
                {
                    title: "Biên bản xác minh",
                    handleClick: () => handlePrint("in-phieu-bien-ban-xac-minh"),
                }
            )
        }

        if(thongTinSCYK?.phanTichResp) {
            tabListTemp.push({
                eventKey: "2",
                title: "Phân tích SCYK",
                component: <PhanTichsScykDetail phanTichScyk={thongTinSCYK?.phanTichResp}/>
            });
        }

        tabListTemp.push({
            eventKey: "4",
            title: "Tài liệu đính kèm",
            component: <>Tài liệu đính kèm</>
        },)
        setTabList(tabListTemp);
        setDropdownPhieuIn(dropdownPhieuInList);
        setExportFileDropdown(exportFileDropdownTemp);
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
                        setThongTinSCYK(SCYK_DETAIL_INFO_INIT);
                        setOpenDialogThemMoiSCYK(true);
                    }}
                    searchObj={searchObj}
                    handleSearch={handleSearch}
                />
                <div>
                    <TableCustom
                        height={"calc(100vh - 315px)"}
                        id="profile2"
                        columns={tableDSSuCoYKhoaColumns}
                        data={dsBaoCaoSCYK}
                        dataChecked={[thongTinSCYK.suCoResp]}
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
                            disabled={!(thongTinSCYK?.suCoResp?.trangThaiXuLy === MEDICAL_INCIDENT_REPORT_STATUS.CHO_TIEP_NHAN)}
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
                        <DropdownButton 
                            title="Xuất file"
                            dropdownItems={exportFileDropdown}
                        />
                        <DropdownButton 
                            title="In phiếu"
                            dropdownItems={dropdownPhieuIn}
                        />
                    </div>
                </div>
                <div className="tt-tabs">
                    <TabMenu danhsachTabs={tabList} />
                </div>
            </div>

            {openDialogThemMoiSCYK && (
                <DialogThemMoiSCYK
                    thongTinSCYK={thongTinSCYK?.suCoResp}
                    updatePageData={updatePageData}
                    handleClose={handleCloseModal}
                />
            )}

            {openDialogTiepNhan && (
                <TiepNhanSCYKDialog
                    updatePageData={updatePageData}
                    suCoId={thongTinSCYK?.suCoResp?.id || ""}
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
