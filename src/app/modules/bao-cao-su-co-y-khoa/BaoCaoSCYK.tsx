import React from "react"
import { Button } from "react-bootstrap";
import InputSearch from "../component/InputSearch";
import "./BaoCaoSCYK.scss";
import { InitThongTinSCYK, dsTabThongTinSCYK, tableDSSuCoYKhoaColumns } from "./const/constanst";
import { useState } from "react";
import DialogThemMoiSCYK from "./components/DialogThemMoiSCYK";
import { KTSVG } from "../../../_metronic/helpers";
import TableCustom from "../component/table/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import TabMenu from "../component/tabs/TabMenu";
import { deleteSCYKById, getSCYKById, searchByPage } from "./services/BaoCaoSCYKServices";
import { MedicalIncidentInfo, SearchObject } from "./models/BaoCaoSCYKModels";
import { toast } from "react-toastify";
import AdvancedSearchDialog from "./components/AdvancedSearchDialog";

import ConfirmDialog from "../component/confirm-dialog/ConfirmDialog";
import TiepNhanSCYKDialog from "./components/TiepNhanSCYKDialog";

type Props = {};

const BaoCaoSCYK = (props: Props) => {
    const [openDialogThemMoiSCYK, setOpenDialogThemMoiSCYK] = useState(false);
    const [shouldOpenAdvancedSearchDialog, setShouldOpenAdvancedSearchDialog] = useState(false);
    const [searchObj, setSearchObj] = useState<SearchObject>({
        pageNumber: 1,
        pageSize: 10,
    })
    const [dsBaoCaoSCYK, setDsBaoCaoSCYK] = useState<MedicalIncidentInfo[]>([]);
    const [thongTinSCYK, setThongTinSCYK] =
        useState<MedicalIncidentInfo>(InitThongTinSCYK);
    const [configTable, setConfigTable] = useState<any>({});
    const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState(false)
    const [openDialogTiepNhan, setOpenDialogTiepNhan] = useState(false)
    const [indexRowSelected, setIndexRowSelected] = useState<any>(undefined)

    const handleSearch = () => {
        updatePageData({
            ...searchObj,
            trangThaiXuLy: searchObj?.trangThaiXuLy?.code,
            hinhThuc: searchObj?.phanLoai?.code,
            phanLoai: searchObj?.phanLoai?.code,
            khoaPhongDieuTri: searchObj?.khoaPhongDieuTri?.code,
        });
    }

    const updatePageData = (searchData: any) => {
        getMedicalIncidentReportList(searchData);
    }

    const getMedicalIncidentReportList = async (searchData: any) => {
        try {
            const { data } = await searchByPage(searchData);
            setDsBaoCaoSCYK(data.data.data);
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

    const getThongTinSCYK = async () => {
        const res = await getSCYKById(dsBaoCaoSCYK[indexRowSelected]?.id as string);
        setThongTinSCYK(res.data.data)
    }

    const handleOpenUpdateDialog = async () => {
        try {
            await getThongTinSCYK()
            setOpenDialogThemMoiSCYK(true)
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    const handleOpenDeleteDialog = async () => {
        try {
            await getThongTinSCYK()
            setShouldOpenConfirmDeleteDialog(true)
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    const handleOpenTiepNhanDialog = async () => {
        try {
            await getThongTinSCYK()
            setOpenDialogTiepNhan(true)
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };



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

    return (
        <div className="bao-cao-scyk-container">
            <div className="ds-su-co-y-khoa">
                <div className="ds-header">
                    <div className="d-flex align-items-center">
                        <KTSVG path={'/media/svg/icons/List ul.svg'} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">
                            Danh sách báo cáo sự cố y khoa
                        </span>
                    </div>
                    <Button
                        className="button-primary"
                        onClick={() => {
                            setThongTinSCYK(InitThongTinSCYK);
                            setOpenDialogThemMoiSCYK(true);
                        }}
                    >
                        <i className="bi bi-plus m-0"></i>Thêm mới
                    </Button>
                </div>
                <div className="ds-search-box">
                    <div className="box-search">
                        <InputSearch
                            placeholder="Tìm theo mã SC, mã BN, họ và tên..."
                            handleChange={(e) => { 
                                setSearchObj({...searchObj, keyword: e.target.value}) 
                            }}
                            className="spaces h-32"
                            value={searchObj?.keyword}
                            handleSearch={handleSearch}
                        />
                    </div>
                    <Button
                        className="button-primary"
                        onClick={() => setShouldOpenAdvancedSearchDialog(true)}
                    >
                        <i className="bi bi-search m-0"></i>Tìm kiếm nâng cao
                    </Button>
                </div>
                <div>
                    <TableCustom
                        id="profile2"
                        columns={tableDSSuCoYKhoaColumns}
                        data={dsBaoCaoSCYK}
                        buttonAdd={false}
                        setCurIndexSelectSingle={setIndexRowSelected}
                        buttonExportExcel={false}
                        notDelete={false}
                        handleDelete={deleteSCYKById}
                        justFilter={true}
                        fixedColumnsCount={3}
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
                            disabled={isNaN(indexRowSelected)}
                            onClick={handleOpenTiepNhanDialog}
                        
                        >
                           Tiếp nhận
                        </Button>
                        <Button
                            className="button-primary"
                            disabled={isNaN(indexRowSelected)}
                            onClick={handleOpenUpdateDialog}
                        >
                            Sửa
                        </Button>
                        <Button
                            className="button-primary"
                            disabled={isNaN(indexRowSelected)}
                            onClick={handleOpenDeleteDialog}
                        >
                            Xóa
                        </Button>
                        <Button className="button-primary">
                            Xuất file
                        </Button>
                        <Button className="button-primary">
                            In phiếu
                        </Button>
                    </div>
                </div>
                <div className="tt-tabs">
                    <TabMenu danhsachTabs={dsTabThongTinSCYK} />
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
        </div>
    );
};

export default BaoCaoSCYK;
