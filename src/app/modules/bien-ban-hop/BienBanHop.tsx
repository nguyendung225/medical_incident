import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import AppContext from "../../AppContext";
import FilterSearchContainer from "../bao-cao-su-co-y-khoa/components/FilterSearchContainer";
import { KHOA_PHONG, SCYK_DETAIL_INFO_INIT } from "../bao-cao-su-co-y-khoa/const/constants";
import { IMedicalIncidentDetailInfo, SearchObject } from "../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { deleteSCYKById, getScykInfoDetailById } from "../bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices";
import { IN_PHIEU_DROPDOWN_BUTTONS, tableDSBienBanColumns } from "../bien-ban-xac-minh/const/constants";
import DropdownButton from "../component/button/DropdownButton";
import TableCustom from "../component/table/table-custom/TableCustom";
import TabMenu from "../component/tabs/TabMenu";
import { TYPE } from "../utils/Constant";
import { convertBooleanToNumber, seperateTime } from "../utils/FormatUtils";
import "./BienBanHop.scss";
import DialogThemMoiBienBanHop from "./components/DialogThemMoiBienBanHop";
import { initBienBanHop } from "./const/constants";
import { IBienBanHop } from "./model/BienBanHopModel";
import { getBienBanHopById, searchByPage } from "./services/BienBanHopServices";
import BaoCaoSCYKDetail from "../bao-cao-su-co-y-khoa/components/BaoCaoSCYKDetail";
import BienBanXacMinhDetail from "../bien-ban-xac-minh/components/BienBanXacMinhDetail";
import PhanTichScykDetail from "../phan-tich-scyk/components/PhanTichScykDetail";
import BienBanHopDetail from "./components/BienBanHopDetail";

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
    const [tabList, setTabList] = useState<any>([]);
    const [exportFileDropdown, setExportFileDropdown] = useState([{
        title: "",
        handleClick: () => { },
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
            data?.data?.data?.length > 0 && await getThongTinSCYK(data?.data?.data[indexRowSelected || 0]?.suCoId);
            setDsBienBan(data?.data?.data);
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
        formatData.noiNhan = KHOA_PHONG.filter((option:any) => formatData?.noiNhan?.includes(option.code)) as any
        formatData.chuTriObj = {
            code: data.chuTriId,
            fullName: data.tenChuTri
        }
        formatData.thuKyObj = {
            code: data.thuKyId,
            fullName: data.tenThuKy
        }
        formatData.trinhBayObj = {
            code: data.nguoiTrinhBayId,
            fullName: data.tenNguoiTrinhBay
        }

        return formatData
    }

    const getThongTinSCYK = async (scykId: any) => {
        try {
            setPageLoading(true);
            const { data: { data } } = await getScykInfoDetailById(scykId as string);
            setThongTinSCYK({
                ...data,
                bienBanHopResp: formatDataBienBan(data?.bienBanHopResp),
            });
            setPageLoading(false);
        } catch (error) {
            setPageLoading(false);
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    }

    const handleOpenUpdateModal = async () => {
        !thongTinSCYK?.bienBanHopResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected]?.suCoId);
        setOpenThemMoiBienBan(true);
    }

    const handleCloseModal = async () => {
        !thongTinSCYK?.bienBanHopResp?.id && await getThongTinSCYK(dsBienBan[indexRowSelected]?.suCoId);
        setOpenThemMoiBienBan(false);
    }

    useEffect(() => {
        !isNaN(indexRowSelected) && getThongTinSCYK(dsBienBan[indexRowSelected]?.suCoId);
    }, [indexRowSelected])

    useEffect(() => {
        const tabListTemp = [
            {
                eventKey: "0",
                title: "Báo cáo sự cố",
                component: <BaoCaoSCYKDetail thongTinSCYK={thongTinSCYK?.suCoResp} />,
            },
            {
                eventKey: "1",
                title: "Biên bản xác minh",
                component: <BienBanXacMinhDetail thongTinBienBan={thongTinSCYK?.bienBanXacMinhResp} />,
            },
            {
                eventKey: "2",
                title: "Phân Tích sự cố",
                component: <PhanTichScykDetail phanTichScyk={thongTinSCYK?.phanTichResp}/>,
            },
            {
                eventKey: "3",
                title: "Biên bản họp",
                component: <BienBanHopDetail thongTinBienBan={thongTinSCYK?.bienBanHopResp}/>,
            },
            {
                eventKey: "4",
                title: "Tài liệu đính kèm",
                component: <>Tài liệu đính kèm</>
            }
        ]
        setTabList(tabListTemp)
    }, [thongTinSCYK])

    return (
        <div className="bien-ban-xm-container">
            <div className="ds-bien-ban-xm">
                <FilterSearchContainer
                    title="Danh sách biên bản họp"
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
            <div className="tt-bien-ban-xm">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <KTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">Thông tin biên bản họp</span>
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
