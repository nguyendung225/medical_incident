import { useContext, useEffect, useRef, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import { IMedicalIncidentDetailInfo, SearchObject } from "../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { deleteSCYKById, exportWordFile as exportWordBaoCaoSCYK, getScykInfoDetailById } from "../bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices";
import ConfirmDialog from "../component/confirm-dialog/ConfirmDialog";
import TableCustom from "../component/table/table-custom/TableCustom";
import TabMenu from "../component/tabs/TabMenu";
import { RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import "./BienBanXacMinh.scss";
import { IN_PHIEU_DROPDOWN_BUTTONS, initBienBanXacMinh, tableDSBienBanColumns } from "./const/constants";
import { IBienBanXacMinh } from "./models/BienBanXacMinhModel";
import { exportWord as exportWordBienBanXacMinh, getBienBanById, searchByPage } from "./services/BienBanXacMinhServices";
import DialogThemMoiBienBan from "./components/DialogThemMoiBienBan";
import { convertBooleanToNumber, seperateTime } from "../utils/FormatUtils";
import FilterSearchContainer from "../bao-cao-su-co-y-khoa/components/FilterSearchContainer";
import BaoCaoSCYKDetail from "../bao-cao-su-co-y-khoa/components/BaoCaoSCYKDetail";
import BienBanXacMinhDetail from "./components/BienBanXacMinhDetail";
import { exportToFile, handleExportPdf, handlePrint } from "../utils/FunctionUtils";
import AppContext from "../../AppContext";
import DropdownButton from "../component/button/DropdownButton";
import { InitThongTinSCYK, SCYK_DETAIL_INFO_INIT } from "../bao-cao-su-co-y-khoa/const/constants";

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
    const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState(false)
    const [indexRowSelected, setIndexRowSelected] = useState<any>(undefined);
    const [tabList, setTabList] = useState<any>([]);
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

    const updatePageData = (searchData: any) => {
        getDSBienBan(searchData);
    }

    const getDSBienBan = async (searchData: any) => {
        try {
            setPageLoading(true);
            const { data } = await searchByPage(searchData);
            data?.data?.data?.length > 0 && await getThongTinSCYK(data?.data?.data[indexRowSelected || 0]?.suCoResp?.id);
            await setDsBienBan(data?.data?.data);
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

    const formatDataBienBan = (data: IBienBanXacMinh) => {
        const formatData = { ...data }
        const timeXacMinh = seperateTime(data?.ngayGioXacMinh)
        const timeKetThuc = seperateTime(data?.ngayGioKetThuc)
        formatData.hoiXacMinh = timeXacMinh.time
        formatData.ngayXacMinh = timeXacMinh.date
        formatData.hoiKetThuc = timeKetThuc.time
        formatData.ngayKetThuc = timeKetThuc.day?.toString()
        formatData.thangKetThuc = timeKetThuc.month?.toString()
        formatData.namKetThuc = timeKetThuc.year?.toString()
        formatData.isNguoiChuTriKy = convertBooleanToNumber(formatData.isNguoiChuTriKy)
        formatData.isNguoiChungKienKy = convertBooleanToNumber(formatData.isNguoiChungKienKy)
        formatData.isNguoiLapKy = convertBooleanToNumber(formatData.isNguoiLapKy)
        formatData.isNguoiThamDuKy = convertBooleanToNumber(formatData.isNguoiThamDuKy)
        formatData.isThanhVienDoanKy = convertBooleanToNumber(formatData.isThanhVienDoanKy)

        return formatData
    }

    const getThongTinSCYK = async (scykId: string) => {
        try {
            const { data: { data } } = await getScykInfoDetailById(scykId as string);
            setThongTinSCYK({
                ...data,
                bienBanXacMinhResp: formatDataBienBan(data?.bienBanXacMinhResp)
            });
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    }

    const handleDeleteBienBan = async () => {
        try {
            if (thongTinSCYK?.bienBanXacMinhResp?.id) {
                const res = await deleteSCYKById(thongTinSCYK?.bienBanXacMinhResp?.id)
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
        !thongTinSCYK?.bienBanXacMinhResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected]?.suCoResp?.id || "")
        setOpenThemMoiBienBan(true);
    }

    const handleCloseModal = async () => {
        !thongTinSCYK?.bienBanXacMinhResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected]?.suCoResp?.id || "")
        setOpenThemMoiBienBan(false);
    }

    useEffect(() => {
        !isNaN(indexRowSelected) && getThongTinSCYK(dsBienBan[indexRowSelected]?.suCoResp?.id || "")
    }, [indexRowSelected])

    useEffect(() => {
        setTabList([
            {
                eventKey: "0",
                title: "Báo cáo sự cố",
                component: <BaoCaoSCYKDetail thongTinSCYK={thongTinSCYK?.suCoResp || InitThongTinSCYK}/>,
            },
            {
                eventKey: "1",
                title: "Biên bản xác minh",
                component: <BienBanXacMinhDetail thongTinBienBan={thongTinSCYK?.bienBanHopResp} />
            },
            {
                eventKey: "2",
                title: "Tài liệu đính kèm",
                component: <>Tài liệu đính kèm</>
            }
        ])

        setExportFileDropdown([
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
        ])
    }, [thongTinSCYK])

    return (
        <div className="bien-ban-xm-container">
            <div className="ds-bien-ban-xm">
                <FilterSearchContainer 
                    title="Danh sách biên bản xác minh"
                    handleCreate={() => {
                        setThongTinSCYK(SCYK_DETAIL_INFO_INIT);
                        setOpenThemMoiBienBan(true);
                    }}
                    searchObj={searchObj}
                    handleChangeSearchObj={setSearchObj}
                    handleSearch={handleSearch}
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
            <div className="tt-bien-ban-xm">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <KTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">Thông tin biên bản xác minh</span>
                    </div>
                    <div className="d-flex spaces gap-10">
                        <Button
                            className="button-primary"
                            onClick={handleOpenUpdateModal}
                        >
                            Sửa
                        </Button>
                        <DropdownButton 
                            title="Xuất file"
                            dropdownItems={exportFileDropdown}
                        />
                        <DropdownButton 
                            title="In phiếu"
                            dropdownItems={IN_PHIEU_DROPDOWN_BUTTONS}
                        />
                    </div>
                </div>
                <div className="tt-tabs">
                    <TabMenu danhsachTabs={tabList} />
                </div>
            </div>

            {shouldOpenConfirmDeleteDialog && (
                <ConfirmDialog
                    show={shouldOpenConfirmDeleteDialog}
                    title={"Xác nhận xóa"}
                    message={"Bạn có muốn xóa không ?"}
                    yes={"Xác nhận"}
                    onYesClick={handleDeleteBienBan}
                    cancel={"Hủy"}
                    onCancelClick={() => setShouldOpenConfirmDeleteDialog(false)}
                />
            )}

            {openThemMoiBienBan && (
                <DialogThemMoiBienBan
                    thongTinBienBan={{
                        ...thongTinSCYK.bienBanXacMinhResp,
                        suCoResp: thongTinSCYK.suCoResp,
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
