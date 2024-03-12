import { OPTION_HINH_THUC_BC, OPTION_PHAN_LOAI } from "../../bao-cao-su-co-y-khoa/const/constanst";
import { convertLabelByCode, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";
import { IBienBanXacMinh } from "../models/BienBanXacMinhModel";

export const tableDSBienBanColumns = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "TT",
        field: "name",
        render: (row: any) => renderMedicalIncidentReportStatus(row?.trangThai)
    },
    {
        name: "Phân loại SCYK",
        field: "phanLoaiSuCo",
        headerStyle: {
            minWidth: "100px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_PHAN_LOAI, row?.phanLoaiSuCo)}</span>
    },
    {
        name: "Mã sự cố",
        field: "maSuCo",
        headerStyle: {
            minWidth: "80px"
        },
        render: (row: any) => <span>{row?.maSuCo}</span>
    },
    {
        name: "Hình thức báo cáo",
        field: "chucVu",
        headerStyle: {
            minWidth: "150px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_HINH_THUC_BC, row?.hinhThuc)}</span>
    },
    {
        name: "Ngày xác minh",
        field: "chucVu",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{row?.ngayGioXacMinh}</span>
    },
    {
        name: "Đơn vị báo cáo",
        field: "chucVu",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{row?.tenKhoaPhong}</span>
    },
    {
        name: "Họ và tên",
        field: "chucVu",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{row?.tenKhoaPhong}</span>
    },
    {
        name: "Khoa/phòng BN điều trị",
        field: "chucVu",
        headerStyle: {
            minWidth: "200px"
        },
        render: (row: any) => <span>{row?.tenKhoaPhong}</span>
    },
]

export const initBienBanXacMinh: IBienBanXacMinh = {
    id: "",
    orgId: "",
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
    nguoiThamDuXacMinhs: null,
    veViec: "",
    ketQua: "",
    yKien: "",
    ngayGioKetThuc: "",
    soTrang: 0,
    soBan: 0,
    isNguoiChuTruKy: false,
    isNguoiChungKienKy: false,
    isThanhVienDoanKy: false,
    isNguoiLapKy: false,
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
};