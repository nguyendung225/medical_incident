import { OPTION_HINH_THUC_BC } from "../../bao-cao-su-co-y-khoa/const/constants";
import { convertGenderToString, convertLabelByCode, formatDateToString, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";
import { IBienBanXacMinh, NguoiThamDuXacMinh } from "../models/BienBanXacMinhModel";

export const tableDSBienBanColumns = [
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
        render: (row: any) => <span>{convertLabelByCode(OPTION_HINH_THUC_BC, row?.suCoResp?.hinhThuc)}</span>
    },
    {
        name: "Mã sự cố",
        field: "maSuCo",
        headerStyle: {
            minWidth: "80px"
        },
        render: (row: any) => <span>{row?.suCoResp?.code}</span>
    },
    {
        name: "Hình thức báo cáo",
        field: "hinhThuc",
        headerStyle: {
            minWidth: "150px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_HINH_THUC_BC, row?.suCoResp?.hinhThuc)}</span>
    },
    {
        name: "Ngày xác minh",
        field: "ngayGioXacMinh",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{formatDateToString(row?.ngayGioXacMinh)}</span>
    },
    {
        name: "Đơn vị báo cáo",
        field: "tenDonViBaoCao",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{row?.suCoResp?.tenDonViBaoCao}</span>
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
            row?.suCoResp?.benhNhan && (
                <div className="d-flex flex-column text-up">
                    <span className="text-uppercase">{row?.suCoResp?.benhNhan?.name}</span>
                    <span>{row?.suCoResp?.benhNhan?.code} - {convertGenderToString(row?.suCoResp?.benhNhan?.gioiTinh)} - {formatDateToString(row?.suCoResp?.benhNhan?.ngaySinh)}</span>
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
        render: (row: any) => <span>{row?.tenKhoaPhongDieuTri}</span>
    },
]

export const initNguoiThamDu: NguoiThamDuXacMinh = {
    orgId: null,
    bienBanXacMinhId: "",
    name: "",
    maChucVu: "",
    donVi: "",
    donViId: "",
}

export const initBienBanXacMinh: IBienBanXacMinh = {
    id: "",
    orgId: null,
    ngayGioXacMinh: "",
    noiXacMinh: "",
    tenNguoiChuTri: "",
    maChucVuNguoiChuTri: "",
    donViNguoiChuTri: "",
    tenThanhVienDoan: "",
    maChucVuThanhVienDoan: "",
    donViThanhVienDoan: "",
    tenNguoiChungKien: "",
    maChucVuNguoiChungKien: "",
    donViNguoiChungKien: "",
    nguoiThamDus: [
        initNguoiThamDu
      ],
    veViec: "",
    ketQua: "",
    yKien: "",
    ngayGioKetThuc: "",
    soTrang: null,
    soBan: null,
    isNguoiChuTriKy: null,
    isNguoiChungKienKy: null,
    isNguoiThamDuKy: null,
    isThanhVienDoanKy: null,
    isNguoiLapKy: null,
    trangThai: 0,
    isActive: false,
    benhNhanId: "",
    maBenhNhan: "",
    tenBenhNhan: "",
    khoaPhongDieuTri: "",
    suCoId: "",
    tenSuCo: "",
    maSuCo: "",
    hinhThuc: 0,
    phanLoaiSuCo: 0,
    ngayTao: "",
    hoiKetThuc: "",
    hoiXacMinh: "",
    ngayXacMinh: "",
    namKetThuc: "",
    ngayKetThuc: "",
    thangKetThuc: "",
    // suCoResp: InitThongTinSCYK,
};

export const SINGIN_OPTION = [
    {
        code: 1,
        name: "Đã kí"
    },
    {
        code: 0,
        name: "Chưa kí"
    }
]

export const STATUS_BIEN_BAN = {
    LUU_NHAP: 1,
    DA_XAC_MINH: 2
}

export const STATUS_REPORT_OPTION = [
    { code: 1, name: "Lưu nháp" },
    { code: 2, name: "Lưu" },
    { code: 0, name: "Tất cả" },
]