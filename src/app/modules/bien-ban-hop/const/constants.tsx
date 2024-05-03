import moment from "moment";
import { OPTION_HINH_THUC_BC, OPTION_MUC_DO_AH } from "../../bao-cao-su-co-y-khoa/const/constants";
import { convertGenderToString, convertLabelByCode, formatDateToString, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";
import { IBienBanHop } from "../model/BienBanHopModel";

export const initBienBanHop: IBienBanHop = {
    id: '',
    departmentId: '',
    code: '',
    bienBan: '',
    name: '',
    suCoId: '',
    ngayGioHop: '',
    ngayHop: '',
    gioHop: '',
    diaDiem: '',
    noiDung: '',
    chuTriId: '',
    tenChuTri: '',
    tenChucDanhChuTri: '',
    tenChucVuChuTri: '',
    thuKyId: '',
    thuKyObj: null,
    chuTriObj: null,
    trinhBayObj: null,
    tenThuKy: '',
    tenChucDanhThuKy: '',
    tenChucVuThuKy: '',
    nguoiTrinhBayId: '',
    tenNguoiTrinhBay: '',
    tenChucDanhNguoiTrinhBay: '',
    tenChucVuNguoiTrinhBay: '',
    soThanhVienCoMat: null,
    tongSo: null,
    tomTatNoiDung: '',
    thaoLuan: '',
    yKien: '',
    bieuQuyet: '',
    ngayGioKetThuc: '',
    ngayKetThuc: moment(new Date()).format("YYYY-MM-DD"),
    gioKetThuc: '',
    noiNhan: [],
    isChuTriKy: null,
    isThuKyKy: null,
    trangThaiXuLy: 0,
    ketLuan: '',
    isActive: true,
    fileDinhKems: []
};

export const tableDSBienBanHopColumns = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "TT",
        field: "name",
        render: (row: any) => renderMedicalIncidentReportStatus(row?.trangThaiXuLy)
    },
    {
        name: "Phân loại SCYK",
        field: "phanLoaiSuCo",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_MUC_DO_AH, row?.suCoResp?.danhGiaBanDau)}</span>
    },
    {
        name: "Mã sự cố",
        field: "maSuCo",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => <span>{row?.suCoResp?.code}</span>
    },
    {
        name: "Hình thức",
        field: "hinhThuc",
        headerStyle: {
            minWidth: "120px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_HINH_THUC_BC, row?.suCoResp?.hinhThuc)}</span>
    },
    {
        name: "Thời gian họp",
        field: "ngayGioXacMinh",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{formatDateToString(row?.ngayGioHop)}</span>
    },
    {
        name: "Họ và tên",
        field: "hoTen",
        headerStyle: {
            minWidth: "200px"
        },
        cellStyle: {
            textAlign: "left",
        },
        render: (row: any) => (
            row?.suCoResp?.tenBenhNhan && (
                <div className="d-flex flex-column text-up">
                    <span className="text-uppercase">{row?.suCoResp?.tenBenhNhan}</span>
                    <span>{row?.suCoResp?.maBenhNhan} - {convertGenderToString(row?.suCoResp?.maBenhNhan)} - {formatDateToString(row?.suCoResp?.maBenhNhan)}</span>
                </div>
            )
        )
    },
    {
        name: "Khoa/phòng BN điều trị",
        field: "tenKhoaPhongDieuTri",
        headerStyle: {
            minWidth: "200px"
        },
        cellStyle: {
            textAlign: "left",
        },
        render: (row: any) => (
            <span>{row?.suCoResp?.tenKhoaPhongDieuTri}</span>
        )
    },
]