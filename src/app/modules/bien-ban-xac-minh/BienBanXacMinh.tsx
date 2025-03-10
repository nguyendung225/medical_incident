/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import { IDropdownButton, IMedicalIncidentDetailInfo, SearchObject } from "../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { deleteSCYKById, getScykInfoDetailById } from "../bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices";
import TableCustom from "../component/table/table-custom/TableCustom";
import TabMenu from "../component/tabs/TabMenu";
import { MEDICAL_INCIDENT_REPORT_STATUS, RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import "./BienBanXacMinh.scss";
import { STATUS_REPORT_OPTION, tableDSBienBanColumns } from "./const/constants";
import { IBienBanXacMinh } from "./models/BienBanXacMinhModel";
import { searchByPage } from "./services/BienBanXacMinhServices";
import DialogThemMoiBienBan from "./components/DialogThemMoiBienBan";
import { convertBooleanToNumber, seperateTime } from "../utils/FormatUtils";
import FilterSearchContainer from "../bao-cao-su-co-y-khoa/components/FilterSearchContainer";
import AppContext from "../../AppContext";
import DropdownButton from "../component/button/DropdownButton";
import { SCYK_DETAIL_INFO_INIT, getExportedFileList, getPhieuInList, getTabList } from "../bao-cao-su-co-y-khoa/const/constants";
import { tab } from "../models/tabModels";
import { PHAN_TICH_SCYK_INFO_INIT } from "../phan-tich-scyk/constants/constants";
import { initBienBanHop } from "../bien-ban-hop/const/constants";
import { hasAuthority } from "../utils/FunctionUtils";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../Constant";

type Props = {};

const BienBanXacMinh = (props: Props) => {
    const { setPageLoading } = useContext(AppContext);
    const [openThemMoiBienBan, setOpenThemMoiBienBan] = useState(false);
    const [searchObj, setSearchObj] = useState<SearchObject>({
        pageNumber: 1,
        pageSize: 10,
    })
    const [dsBienBan, setDsBienBan] = useState<IBienBanXacMinh[]>([]);
    const [thongTinSCYK, setThongTinSCYK] =
        useState<IMedicalIncidentDetailInfo>(SCYK_DETAIL_INFO_INIT);
    const [configTable, setConfigTable] = useState<any>({});
    const [indexRowSelected, setIndexRowSelected] = useState<any>(undefined);
    const [tabList, setTabList] = useState<tab[]>([]);
    const [phieuInList, setPhieuInList] = useState<IDropdownButton[]>([])
    const [exportedFileList, setExportedFileList] = useState<IDropdownButton[]>([]);

    const handleSearch = () => {
        updatePageData({...searchObj});
    }

    const updatePageData = (searchData: any) => {
        getDSBienBan(searchData);
    }

    const getDSBienBan = async (searchData: any) => {
        try {
            setPageLoading(true);
            const { data } = await searchByPage(searchData);
            data?.data?.data?.length > 0 && await getThongTinSCYK(data?.data?.data[indexRowSelected || 0]?.suCoResp?.id);
            await setDsBienBan(data?.data?.data);
            setConfigTable({
                totalElement: data.data.total,
                totalPages: data.data.totalPages,
                numberOfElements: data.data.numberOfElements,
            })
        } catch (err) {
            toast.error(String(err));
        } finally {
            setPageLoading(false);
        }
    };

    const formatDataBienBan = (data: IBienBanXacMinh) => {
        const formatData = { ...data }
        const timeXacMinh = seperateTime(data?.ngayGioXacMinh)
        const timeKetThuc = seperateTime(data?.ngayGioKetThuc)
        formatData.hoiXacMinh = timeXacMinh.time
        formatData.ngayXacMinh = timeXacMinh.date
        formatData.hoiKetThuc = timeKetThuc.time
        formatData.ngayKetThuc = timeKetThuc.date?.toString()
        formatData.isNguoiChuTriKy = convertBooleanToNumber(formatData.isNguoiChuTriKy)
        formatData.isNguoiChungKienKy = convertBooleanToNumber(formatData.isNguoiChungKienKy)
        formatData.isNguoiLapKy = convertBooleanToNumber(formatData.isNguoiLapKy)
        formatData.isNguoiThamDuKy = convertBooleanToNumber(formatData.isNguoiThamDuKy)
        formatData.isThanhVienDoanKy = convertBooleanToNumber(formatData.isThanhVienDoanKy)
        formatData.nguoiThamDus = formatData.nguoiThamDus || []

        return formatData
    }

    const getThongTinSCYK = async (scykId: string) => {
        if (scykId) {
            try {
                setPageLoading(true);
                const { data: { data } } = await getScykInfoDetailById(scykId as string);
                setThongTinSCYK({
                    ...data,
                    bienBanXacMinhResp: formatDataBienBan(data?.bienBanXacMinhResp)
                });
            } catch (error) {
                toast.error(String(error));
            } finally {
                setPageLoading(false);
            }
        }
    }

    const handleOpenUpdateModal = async () => {
        !thongTinSCYK?.bienBanXacMinhResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected || 0]?.suCoResp?.id || "")
        setOpenThemMoiBienBan(true);
    }

    const handleCloseModal = async () => {
        !thongTinSCYK?.bienBanXacMinhResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected || 0]?.suCoResp?.id || "")
        setOpenThemMoiBienBan(false);
    }

    useEffect(() => {
        !isNaN(indexRowSelected) && getThongTinSCYK(dsBienBan[indexRowSelected || 0]?.suCoResp?.id || "")
    }, [indexRowSelected])

    useEffect(() => {
        const thongTinScykParams = {
            benhNhanResp: thongTinSCYK?.benhNhanResp,
            suCoResp: thongTinSCYK?.suCoResp,
            bienBanXacMinhResp: thongTinSCYK?.bienBanXacMinhResp,
            phanTichResp: PHAN_TICH_SCYK_INFO_INIT,
            bienBanHopResp: initBienBanHop,
        }

        setTabList(getTabList(thongTinScykParams));
        setExportedFileList(getExportedFileList(thongTinScykParams, setPageLoading));
        setPhieuInList(getPhieuInList(thongTinScykParams));
    }, [thongTinSCYK])

    return (
        <div className="page-container">
            <div className="left-content-container">
                <FilterSearchContainer 
                    title="Danh sách biên bản xác minh"
                    handleCreate={() => {
                        setThongTinSCYK(SCYK_DETAIL_INFO_INIT);
                        setOpenThemMoiBienBan(true);
                    }}
                    searchObj={searchObj}
                    handleChangeSearchObj={setSearchObj}
                    handleSearch={handleSearch}
                    statusOptions={STATUS_REPORT_OPTION}
                    timeReportLable="Ngày xác minh"
                    hasAddNew={hasAuthority(PERMISSIONS.BIEN_BAN_XAC_MINH, PERMISSION_ABILITY.CREATE)}
                />
                <div>
                    <TableCustom
                        height={"calc(100vh - 255px)"}
                        id="profile2"
                        columns={tableDSBienBanColumns}
                        data={dsBienBan}
                        dataChecked={[thongTinSCYK?.bienBanXacMinhResp]}
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
                            <span>Lưu nháp</span>
                        </div>
                        <div className="status-box-item">
                            <i className="bi bi-circle-fill spaces fs-10 color-steel-blue"></i>
                            <span>Lưu</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-content-container">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <KTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">Thông tin biên bản xác minh</span>
                    </div>
                    <div className="d-flex spaces gap-10">
                        
                        {thongTinSCYK.bienBanXacMinhResp.trangThai === MEDICAL_INCIDENT_REPORT_STATUS.DRAFT
                        && hasAuthority(PERMISSIONS.BIEN_BAN_XAC_MINH, PERMISSION_ABILITY.UPDATE)
                        && (
                            <Button
                                className="button-primary"
                                onClick={handleOpenUpdateModal}
                            >
                                Sửa
                            </Button>
                        )}

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
                    <TabMenu danhsachTabs={tabList} />
                </div>
            </div>

            {openThemMoiBienBan && (
                <DialogThemMoiBienBan
                    thongTinBienBan={{
                        ...thongTinSCYK?.bienBanXacMinhResp,
                        suCoResp: thongTinSCYK?.suCoResp,
                    }}
                    updatePageData={updatePageData}
                    handleClose={handleCloseModal} 
                />
            )}
            <iframe
                title="print"
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

export default BienBanXacMinh;
