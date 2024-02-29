import React from "react"
import { Button } from "react-bootstrap";
import CustomTabMenu from "../component/CustomTabMenu";
import InputSearch from "../component/InputSearch";
import "./BaoCaoSCYK.scss";
import { dsBenhNhan, dsTabThongTinSCYK, tableDSSuCoYKhoaColumns } from "./const/constanst";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import DialogThemMoiSCYK from "./components/DialogThemMoiSCYK";
import { KTSVG } from "../../../_metronic/helpers";
import TableCustom from "../component/table/table-custom/TableCustom";
import { TablePagination } from "../component/table/table-custom/TablePagination";
import { TYPE } from "../utils/Constant";

type Props = {};

const BaoCaoSCYK = (props: Props) => {

    const [openDialogThemMoiSCYK, setOpenDialogThemMoiSCYK] = useState(false)

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
                    <Button className="button-primary" onClick={() => setOpenDialogThemMoiSCYK(true)}>
                        <i className="bi bi-plus m-0"></i>Thêm mới
                    </Button>
                </div>
                <div className="ds-search-box">
                    <div className="box-search">
                        <InputSearch
                            placeholder="Tìm theo mã SC, mã BN, họ và tên..."
                            handleChange={() => { }}
                            className="spaces h-32"
                        />
                    </div>
                    <Button className="button-primary">
                        <i className="bi bi-search m-0"></i>Tìm kiếm nâng cao
                    </Button>
                </div>
                <div>
                    <TableCustom
                        id="profile2"
                        columns={tableDSSuCoYKhoaColumns}
                        data={dsBenhNhan}
                        buttonAdd={false}
                        buttonExportExcel={false}
                        notDelete={false}
                        justFilter={true}
                        fixedColumnsCount={3}
                        noPagination={true}
                        updatePageData={() => { }}
                        type={TYPE.MULTILINE}
                    />
                    <TablePagination
                        handlePagesChange={() => {}}
                        handleRowsPerPageChange={() => {}} 
                        rowsPerPage={0} 
                        rowsForPage={[]} 
                        page={0} 
                        setPage={() => {}} 
                        setRowsPerPage={() => {}} 
                        totalPages={0} 
                        totalElements={0} 
                        numberOfElements={0}
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
                        <Button className="button-primary">
                            Sửa
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
                    <CustomTabMenu danhsachTabs={dsTabThongTinSCYK} />
                </div>
            </div>

            {
                openDialogThemMoiSCYK && <DialogThemMoiSCYK handleClose={() => setOpenDialogThemMoiSCYK(false)} />
            }
        </div>
    );
};

export default BaoCaoSCYK;
