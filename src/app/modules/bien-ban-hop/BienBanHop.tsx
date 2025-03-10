/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import AppContext from "../../AppContext";
import FilterSearchContainer from "../bao-cao-su-co-y-khoa/components/FilterSearchContainer";
import { getTabList, SCYK_DETAIL_INFO_INIT, getExportedFileList, getPhieuInList } from "../bao-cao-su-co-y-khoa/const/constants";
import { IDropdownButton, IMedicalIncidentDetailInfo, SearchObject } from "../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { deleteSCYKById, getScykInfoDetailById } from "../bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices";
import { STATUS_REPORT_OPTION, initBienBanXacMinh } from "../bien-ban-xac-minh/const/constants";
import DropdownButton from "../component/button/DropdownButton";
import TableCustom from "../component/table/table-custom/TableCustom";
import TabMenu from "../component/tabs/TabMenu";
import { MEDICAL_INCIDENT_REPORT_STATUS, TYPE } from "../utils/Constant";
import { convertBooleanToNumber, seperateTime } from "../utils/FormatUtils";
import "./BienBanHop.scss";
import DialogThemMoiBienBanHop from "./components/DialogThemMoiBienBanHop";
import { IBienBanHop } from "./model/BienBanHopModel";
import { searchByPage } from "./services/BienBanHopServices";
import { tab } from "../models/tabModels";
import { KEY_LOCALSTORAGE } from "../auth/core/_consts";
import { localStorageItem } from "../utils/LocalStorage";
import { PHAN_TICH_SCYK_INFO_INIT } from "../phan-tich-scyk/constants/constants";
import { tableDSBienBanHopColumns } from "./const/constants";
import { hasAuthority } from "../utils/FunctionUtils";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../Constant";

type Props = {};

const BienBanHop = (props: Props) => {
    const { setPageLoading } = useContext(AppContext);
    const [openThemMoiBienBan, setOpenThemMoiBienBan] = useState(false);
    const [searchObj, setSearchObj] = useState<SearchObject>({
        pageNumber: 1,
        pageSize: 10,
    })
    const [dsBienBan, setDsBienBan] = useState<IBienBanHop[]>([]);
    const [thongTinSCYK, setThongTinSCYK] = useState<IMedicalIncidentDetailInfo>(SCYK_DETAIL_INFO_INIT);
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
            data?.data?.data?.length > 0 && await getThongTinSCYK(data?.data?.data[indexRowSelected || 0]?.suCoId);
            setDsBienBan(data?.data?.data);
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

    const formatDataBienBan = (data: IBienBanHop) => {
        const formatData = { ...data }
        const timeXacMinh = seperateTime(data?.ngayGioHop)
        const timeKetThuc = seperateTime(data?.ngayGioKetThuc)
        formatData.gioHop = timeXacMinh.time
        formatData.ngayHop = timeXacMinh.date
        formatData.gioKetThuc = timeKetThuc.time
        formatData.ngayKetThuc = timeKetThuc.date
        formatData.isChuTriKy = convertBooleanToNumber(formatData.isChuTriKy)
        formatData.isThuKyKy = convertBooleanToNumber(formatData.isThuKyKy)
        formatData.noiNhan = localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN).filter((option: any) => formatData?.noiNhan?.includes(option.code)) as any

        return formatData
    }

    const getThongTinSCYK = async (scykId: any) => {
        if (scykId) {
            try {
                setPageLoading(true);
                const { data: { data } } = await getScykInfoDetailById(scykId as string);
                setThongTinSCYK({
                    ...data,
                    bienBanHopResp: formatDataBienBan(data?.bienBanHopResp),
                });
                setPageLoading(false);
            } catch (error) {
                toast.error(String(error));
            } finally {
                setPageLoading(false);
            }
        }
    }

    const handleOpenUpdateModal = async () => {
        !thongTinSCYK?.bienBanHopResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected || 0]?.suCoId);
        setOpenThemMoiBienBan(true);
    }

    const handleCloseModal = async () => {
        !thongTinSCYK?.bienBanHopResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected || 0]?.suCoId);
        setOpenThemMoiBienBan(false);
    }

    useEffect(() => {
        !isNaN(indexRowSelected) && getThongTinSCYK(dsBienBan[indexRowSelected || 0]?.suCoId);
    }, [indexRowSelected])

    useEffect(() => {
        const thongTinScykParams = {
            benhNhanResp: thongTinSCYK?.benhNhanResp,
            suCoResp: thongTinSCYK?.suCoResp,
            bienBanXacMinhResp: initBienBanXacMinh,
            phanTichResp: PHAN_TICH_SCYK_INFO_INIT,
            bienBanHopResp: thongTinSCYK?.bienBanHopResp,
        }

        setTabList(getTabList(thongTinScykParams));
        setExportedFileList(getExportedFileList(thongTinScykParams, setPageLoading));
        setPhieuInList(getPhieuInList(thongTinScykParams));
    }, [thongTinSCYK])

    return (
        <div className="page-container">
            <div className="left-content-container">
                <FilterSearchContainer
                    title="Danh sách biên bản họp"
                    handleCreate={() => {
                        setThongTinSCYK(SCYK_DETAIL_INFO_INIT);
                        setOpenThemMoiBienBan(true);
                    }}
                    searchObj={searchObj}
                    handleChangeSearchObj={setSearchObj}
                    handleSearch={handleSearch}
                    statusOptions={STATUS_REPORT_OPTION}
                    timeReportLable="Thời gian họp"
                    hasAddNew={hasAuthority(PERMISSIONS.BIEN_BAN_HOP, PERMISSION_ABILITY.CREATE)}
                />
                <div>
                    <TableCustom
                        height={"calc(100vh - 255px)"}
                        id="profile2"
                        columns={tableDSBienBanHopColumns}
                        data={dsBienBan}
                        dataChecked={[thongTinSCYK?.bienBanHopResp]}
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
                        <span className="title">Thông tin biên bản họp</span>
                    </div>
                    <div className="d-flex spaces gap-10">
                        {thongTinSCYK?.bienBanHopResp?.trangThaiXuLy === MEDICAL_INCIDENT_REPORT_STATUS.DRAFT 
                        && hasAuthority(PERMISSIONS.BIEN_BAN_HOP, PERMISSION_ABILITY.UPDATE)
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
                <DialogThemMoiBienBanHop
                    thongTinBienBan={{
                        ...thongTinSCYK?.bienBanHopResp,
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

export default BienBanHop;
