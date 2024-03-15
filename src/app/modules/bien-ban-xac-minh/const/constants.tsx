import { InitThongTinSCYK, OPTION_HINH_THUC_BC, OPTION_MUC_DO_AH } from "../../bao-cao-su-co-y-khoa/const/constanst";
import { convertLabelByCode, formatDateToString, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";
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
        render: (row: any) => renderMedicalIncidentReportStatus(row?.trangThai)
    },
    {
        name: "Phân loại SCYK",
        field: "phanLoaiSuCo",
        headerStyle: {
            minWidth: "140px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_MUC_DO_AH, row?.suCoResp?.phanLoaiBanDau)}</span>
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
        field: "chucVu",
        headerStyle: {
            minWidth: "150px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_HINH_THUC_BC, row?.suCoResp?.hinhThuc)}</span>
    },
    {
        name: "Ngày xác minh",
        field: "chucVu",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{formatDateToString(row?.ngayGioXacMinh)}</span>
    },
    {
        name: "Đơn vị báo cáo",
        field: "chucVu",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{row?.suCoResp?.tenDonViBaoCao}</span>
    },
    {
        name: "Họ và tên",
        field: "chucVu",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => (
            row?.tenBenhNhan && (
                <div className="d-flex flex-column text-up">
                    <span className="text-uppercase">{row?.tenBenhNhan}</span>
                    {/* <span>{row?.maBenhNhan} - {convertGenderToString(row?.gioiTinh)} - {formatDateToString(row?.ngaySinh)}</span> */}
                </div>
            )
        )
    },
    {
        name: "Khoa/phòng BN điều trị",
        field: "chucVu",
        headerStyle: {
            minWidth: "200px"
        },
        render: (row: any) => <span>{row?.suCoResp?.tenKhoaPhong}</span>
    },
]

export const initNguoiThamDu: NguoiThamDuXacMinh = {
    orgId: null,
    bienBanXacMinhId: "",
    name: "",
    maChucVu: "",
    tenDonVi: "",
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
    nguoiThamDuXacMinhs: [
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
    suCoResp: InitThongTinSCYK,
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