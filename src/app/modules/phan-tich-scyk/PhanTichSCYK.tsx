/* eslint-disable jsx-a11y/iframe-has-title */
import { useContext, useEffect } from "react"
import { Button } from "react-bootstrap";
import "./PhanTichSCYK.scss";
import { useState } from "react";
import { KTSVG } from "../../../_metronic/helpers";
import TableCustom from "../component/table/table-custom/TableCustom";
import { TYPE } from "../utils/Constant";
import TabMenu from "../component/tabs/TabMenu";
import { toast } from "react-toastify";
import AppContext from "../../AppContext";
import DropdownButton from "../component/button/DropdownButton";
import FilterSearchContainer from "../bao-cao-su-co-y-khoa/components/FilterSearchContainer";
import AdvancedSearchDialog from "../bao-cao-su-co-y-khoa/components/AdvancedSearchDialog";
import { IDropdownButton, IMedicalIncidentDetailInfo, SearchObject } from "../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { searchByPage } from "./services/PhanTichSCYKServices";
import { IPhanTichScyk } from "./models/PhanTichSCYKModels";
import { getScykInfoDetailById } from "../bao-cao-su-co-y-khoa/services/BaoCaoSCYKServices";
import { SCYK_DETAIL_INFO_INIT, getExportedFileList, getPhieuInList, getTabList } from "../bao-cao-su-co-y-khoa/const/constants";
import { phanTichScykTableColumns } from "./constants/constants";
import { tab } from "../models/tabModels";
import DialogThemMoiPhanTich from "./components/DialogThemMoiPhanTich";

type Props = {};

const PhanTichSCYK = (props: Props) => {
    const { setPageLoading } = useContext(AppContext);
    const [shouldOpenAdvancedSearchDialog, setShouldOpenAdvancedSearchDialog] = useState(false);
    const [searchObj, setSearchObj] = useState<SearchObject>({
        pageNumber: 1,
        pageSize: 10,
    })
    const [phanTichScykList, setPhanTichScykList] = useState<IPhanTichScyk[]>([]);
    const [thongTinSCYK, setThongTinSCYK] = useState<IMedicalIncidentDetailInfo>(SCYK_DETAIL_INFO_INIT);
    const [configTable, setConfigTable] = useState<any>({});
    const [shouldOpenDialogThemMoiPhanTichSCYK, setShouldOpenDialogThemMoiPhanTichSCYK] = useState(false)
    const [indexRowSelected, setIndexRowSelected] = useState<any>(undefined);
    const [tabList, setTabList] = useState<tab[]>([]);
    const [phieuInList, setPhieuInList] = useState<IDropdownButton[]>([])
    const [exportedFileList, setExportedFileList] = useState<IDropdownButton[]>([]);

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
            data?.data?.data?.length > 0 && await getThongTinSCYK(data?.data?.data[indexRowSelected || 0]?.suCoId);
            await setPhanTichScykList(data?.data?.data);
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

    const handleOpenUpdateModal = async () => {
        !thongTinSCYK?.phanTichResp.id && await getThongTinSCYK(phanTichScykList[indexRowSelected]?.suCoId);
        setShouldOpenDialogThemMoiPhanTichSCYK(true);
    }

    const handleCloseModal = async () => {
        !thongTinSCYK?.phanTichResp.id && await getThongTinSCYK(phanTichScykList[indexRowSelected]?.suCoId);
        setShouldOpenDialogThemMoiPhanTichSCYK(false);
    }

    useEffect(() => {
        setTabList(getTabList(thongTinSCYK));
        setExportedFileList(getExportedFileList(thongTinSCYK, setPageLoading));
        setPhieuInList(getPhieuInList(thongTinSCYK));
    }, [thongTinSCYK])

    useEffect(() => {
        !isNaN(indexRowSelected) && getThongTinSCYK(phanTichScykList[indexRowSelected]?.suCoId);
    }, [indexRowSelected])

    return (
        <div className="bao-cao-scyk-container">
            <div className="ds-su-co-y-khoa">
                <FilterSearchContainer
                    title="Danh sách phân tích sự cố y khoa"
                    handleChangeSearchObj={setSearchObj}
                    handleCreate={() => {
                        setThongTinSCYK(SCYK_DETAIL_INFO_INIT);
                        setShouldOpenDialogThemMoiPhanTichSCYK(true);
                    }}
                    searchObj={searchObj}
                    handleSearch={handleSearch}
                />
                <div>
                    <TableCustom
                        height={"calc(100vh - 255px)"}
                        id="profile2"
                        columns={phanTichScykTableColumns}
                        data={phanTichScykList}
                        dataChecked={[thongTinSCYK?.phanTichResp]}
                        buttonAdd={false}
                        setCurIndexSelectSingle={setIndexRowSelected}
                        buttonExportExcel={false}
                        notDelete={false}
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
            <div className="tt-su-co-y-khoa">
                <div className="tt-header">
                    <div className="title-wrapper">
                        <KTSVG path={"/media/svg/icons/info-square.svg"} svgClassName="spaces w-14 h-14 mr-10" />
                        <span className="title">Thông tin sự cố y khoa</span>
                    </div>
                    <div className="d-flex spaces gap-10">
                        <Button
                            className="button-primary"
                            onClick={handleOpenUpdateModal}
                        >
                            Sửa
                        </Button>
                        <DropdownButton
                            title="In phiếu"
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
            {shouldOpenAdvancedSearchDialog && (
                <AdvancedSearchDialog
                    handleClose={() => setShouldOpenAdvancedSearchDialog(false)}
                    handleSearch={handleSearch}
                    searchObj={searchObj}
                    handleChangeSearchObj={(searchData: SearchObject) => setSearchObj(searchData)}
                />
            )}
            {shouldOpenDialogThemMoiPhanTichSCYK && (
                <DialogThemMoiPhanTich
                    thongTinPhanTich={{
                        ...thongTinSCYK.phanTichResp,
                        suCoResp: thongTinSCYK.suCoResp
                    }}
                    updatePageData={updatePageData}
                    handleClose={handleCloseModal}
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

export default PhanTichSCYK;
