/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import { useContext, useEffect } from "react"
import { Button } from "react-bootstrap";
import "./BaoCaoSCYK.scss";
import { SCYK_DETAIL_INFO_INIT, TRANG_THAI_OPTIONS, getExportedFileList, getPhieuInList, getTabList, tableDSSuCoYKhoaColumns } from "./const/constants";
import { useState } from "react";
import DialogThemMoiSCYK from "./components/DialogThemMoiSCYK";
import { KTSVG } from "../../../_metronic/helpers";
import TableCustom from "../component/table/table-custom/TableCustom";
import { MEDICAL_INCIDENT_REPORT_STATUS, RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import TabMenu from "../component/tabs/TabMenu";
import { deleteSCYKById, searchByPage, getScykInfoDetailById } from "./services/BaoCaoSCYKServices";
import { IDropdownButton, IMedicalIncidentDetailInfo, MedicalIncidentInfo, SearchObject } from "./models/BaoCaoSCYKModels";
import { toast } from "react-toastify";
import ConfirmDialog from "../component/confirm-dialog/ConfirmDialog";
import TiepNhanSCYKDialog from "./components/TiepNhanSCYKDialog";
import FilterSearchContainer from "./components/FilterSearchContainer";
import AppContext from "../../AppContext";
import DropdownButton from "../component/button/DropdownButton";
import { tab } from "../models/tabModels";
import KetLuanSCYKDialog from "./components/KetLuanDialog";
import { usePageData } from "../../../_metronic/layout/core";
import ThongTinKhacTab from "./components/ThongTinKhacTab";

type Props = {};

const BaoCaoSCYK = (props: Props) => {
    const { setPageLoading } = useContext(AppContext);
    const { updateDataTiepNhan } = usePageData()
    const [openDialogThemMoiSCYK, setOpenDialogThemMoiSCYK] = useState(false);
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
    const [tabList, setTabList] = useState<tab[]>([]);
    const [defaultActiveKey, setDefaultActiveKey] = useState<string>("1")
    const [phieuInList, setPhieuInList] = useState<IDropdownButton[]>([])
    const [exportedFileList, setExportedFileList] = useState<IDropdownButton[]>([]);
    const [openDialogKetLuan, setOpenDialogKetLuan] = useState(false)

    const handleSearch = () => {
        updatePageData({
            ...searchObj,
            trangThaiXuLy: searchObj?.trangThaiXuLy?.code,
            hinhThuc: searchObj?.hinhThuc?.code,
            phanLoai: searchObj?.phanLoai?.code,
            khoaPhongDieuTri: searchObj?.khoaPhongDieuTri?.id,
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
            setDefaultActiveKey("0");
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
        !thongTinSCYK?.suCoResp?.id && await getThongTinSCYK(dsBaoCaoSCYK[indexRowSelected || 0]?.id);
        setOpenDialogThemMoiSCYK(true);
    }

    const handleCloseModal = async () => {
        !thongTinSCYK?.suCoResp?.id && await getThongTinSCYK(dsBaoCaoSCYK[indexRowSelected || 0]?.id);
        setOpenDialogThemMoiSCYK(false);
    }

    const handleFormatData = (data: IMedicalIncidentDetailInfo) => {
        return {
            ...data.suCoResp,
            benhNhan: data.benhNhanResp,
        } as MedicalIncidentInfo;

    }

    useEffect(() => {
        setTabList([
            ...getTabList(thongTinSCYK),
            {
                eventKey: "4",
                title: "Thông tin khác",
                component: <ThongTinKhacTab thongTinScyk={thongTinSCYK}/>
            }
        ]);
        setExportedFileList(getExportedFileList(thongTinSCYK, setPageLoading));
        setPhieuInList(getPhieuInList(thongTinSCYK));
    }, [thongTinSCYK])

    useEffect(() => {
        !isNaN(indexRowSelected) && getThongTinSCYK(dsBaoCaoSCYK[indexRowSelected || 0]?.id);
    }, [indexRowSelected])

    useEffect(() => {
        handleSearch();
    }, [updateDataTiepNhan]);

    return (
        <div className="page-container">
            <div className="left-content-container">
                <FilterSearchContainer 
                    title="Danh sách báo cáo sự cố y khoa"
                    handleChangeSearchObj={setSearchObj}
                    handleCreate={() => {
                        setThongTinSCYK(SCYK_DETAIL_INFO_INIT);
                        setOpenDialogThemMoiSCYK(true);
                    }}
                    searchObj={searchObj}
                    handleSearch={handleSearch}
                    statusOptions={TRANG_THAI_OPTIONS}
                    timeReportLable="Thời gian báo cáo"
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
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-purple"></i>
                            <span>Đã kết luận</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-content-container">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <KTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">Thông tin sự cố y khoa</span>
                    </div>
                    <div className="d-flex spaces gap-10"> 
                        {(!(thongTinSCYK?.suCoResp?.trangThaiXuLy === MEDICAL_INCIDENT_REPORT_STATUS.DA_KET_LUAN) && (thongTinSCYK?.suCoResp?.trangThaiXuLy === MEDICAL_INCIDENT_REPORT_STATUS.DA_TIEP_NHAN || thongTinSCYK.bienBanHopResp)) &&
                            <Button
                                className="button-primary"
                                onClick={() => setOpenDialogKetLuan(true)}
                            >
                                Kết luận
                            </Button>
                        }
                        {(thongTinSCYK?.suCoResp?.trangThaiXuLy === MEDICAL_INCIDENT_REPORT_STATUS.CHO_TIEP_NHAN) &&
                            <Button
                                className="button-primary"
                                onClick={() => setOpenDialogTiepNhan(true)}
                            >
                                Tiếp nhận
                            </Button>
                        }
                        {thongTinSCYK?.suCoResp?.trangThaiXuLy < MEDICAL_INCIDENT_REPORT_STATUS.DA_TIEP_NHAN && (
                            <Button
                                className="button-primary"
                                onClick={handleOpenUpdateModal}
                                >
                                Sửa
                            </Button>
                        )}
                        {(thongTinSCYK?.suCoResp?.trangThaiXuLy === MEDICAL_INCIDENT_REPORT_STATUS.DRAFT) &&
                            <Button
                                className="button-primary"
                                onClick={() => setShouldOpenConfirmDeleteDialog(true)}
                            >
                                Xóa
                            </Button>
                        }
                        <DropdownButton 
                            title="Xuất file"
                            dropdownItems={exportedFileList}
                        />
                        <DropdownButton 
                            title="In phiếu"
                            dropdownItems={phieuInList}
                        />
                    </div>
                </div>
                <div className="tt-tabs">
                    <TabMenu 
                        danhsachTabs={tabList}
                        defaultActiveKey={defaultActiveKey}
                        setCurrentTab={setDefaultActiveKey}
                    />
                </div>
            </div>

            {openDialogThemMoiSCYK && (
                <DialogThemMoiSCYK
                    thongTinSCYK={handleFormatData(thongTinSCYK)}
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

            {openDialogKetLuan && (
                <KetLuanSCYKDialog
                    updatePageData={updatePageData}
                    suCoId={thongTinSCYK?.suCoResp?.id || ""}
                    handleClose={() => setOpenDialogKetLuan(false)}
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
