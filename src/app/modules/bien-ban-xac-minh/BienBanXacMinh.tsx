import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import AdvancedSearchDialog from "../bao-cao-su-co-y-khoa/components/AdvancedSearchDialog";
import { SearchObject } from "../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { deleteSCYKById, getSCYKById } from "../bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices";
import InputSearch from "../component/InputSearch";
import ConfirmDialog from "../component/confirm-dialog/ConfirmDialog";
import TableCustom from "../component/table/table-custom/TableCustom";
import TabMenu from "../component/tabs/TabMenu";
import { RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import { dsTabThongTinSCYK } from './../bao-cao-su-co-y-khoa/const/constanst';
import "./BienBanXacMinh.scss";
import { initBienBanXacMinh, tableDSBienBanColumns } from "./const/constants";
import { IBienBanXacMinh } from "./models/BienBanXacMinhModel";
import { searchByPage } from "./services/BienBanXacMinhServices";

type Props = {};

const BienBanXacMinh = (props: Props) => {
    const [openThemMoiBienBan, setOpenThemMoiBienBan] = useState(false);
    const [shouldOpenAdvancedSearchDialog, setShouldOpenAdvancedSearchDialog] = useState(false);
    const [searchObj, setSearchObj] = useState<SearchObject>({
        pageNumber: 1,
        pageSize: 10,
    })
    const [dsBienBan, setDsBienBan] = useState<IBienBanXacMinh[]>([]);
    const [thongTinBienBan, setThongTinBienBan] =
        useState<IBienBanXacMinh>(initBienBanXacMinh);
    const [configTable, setConfigTable] = useState<any>({});
    const [shouldOpenConfirmDeleteDialog, setShouldOpenConfirmDeleteDialog] = useState(false)
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
        getDSBienBan(searchData);
    }

    const getDSBienBan = async (searchData: any) => {
        try {
            const { data } = await searchByPage(searchData);
            setDsBienBan(data.data.data);
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

    const getThongTinBienBan = async () => {
        const res = await getSCYKById(dsBienBan[indexRowSelected]?.id as string);
        setThongTinBienBan(res.data.data)
    }

    const handleOpenUpdateDialog = async () => {
        try {
            await getThongTinBienBan()
            setOpenThemMoiBienBan(true)
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    const handleOpenDeleteDialog = async () => {
        try {
            await getThongTinBienBan()
            setShouldOpenConfirmDeleteDialog(true)
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    const handleDeleteSCYK = async () => {

        try {
            if (thongTinBienBan.id) {
                const res = await deleteSCYKById(thongTinBienBan.id)
                if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
                    toast.success(res.data?.message)
                    setShouldOpenConfirmDeleteDialog(false)
                    setThongTinBienBan(initBienBanXacMinh)
                    updatePageData({});
                }
            }

        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

    return (
        <div className="bien-ban-xm-container">
            <div className="ds-bien-ban-xm">
                <div className="ds-header">
                    <div className="d-flex align-items-center">
                        <KTSVG path={'/media/svg/icons/List ul.svg'} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">
                            Danh sách biên bản xác minh
                        </span>
                    </div>
                    <Button
                        className="button-primary"
                        onClick={() => {
                            setThongTinBienBan(initBienBanXacMinh);
                            setOpenThemMoiBienBan(true);
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
                                setSearchObj({ ...searchObj, keyword: e.target.value })
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
                        columns={tableDSBienBanColumns}
                        data={dsBienBan}
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

export default BienBanXacMinh;
