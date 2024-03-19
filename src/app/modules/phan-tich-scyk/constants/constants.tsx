import { OPTION_HINH_THUC_BC, OPTION_MUC_DO_AH } from "../../bao-cao-su-co-y-khoa/const/constants";
import { convertGenderToString, convertLabelByCode, formatDateToString, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";
import { IPhanTichScyk } from "../models/PhanTichSCYKModels";

export const phanTichScykTableColumns = [
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
        field: "hinhThuc",
        headerStyle: {
            minWidth: "150px"
        },
        render: (row: any) => <span>{convertLabelByCode(OPTION_HINH_THUC_BC, row?.suCoResp?.hinhThuc)}</span>
    },
    {
        name: "Ngày phân tích",
        field: "ngayPhanTich",
        headerStyle: {
            minWidth: "125px"
        },
        render: (row: any) => <span>{formatDateToString(row?.ngayPhanTich)}</span>
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
        field: "",
        headerStyle: {
            minWidth: "200px",
            
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
        field: "tenKhoaPhong",
        headerStyle: {
            minWidth: "200px"
        },
        render: (row: any) => <span>{row?.suCoResp?.tenKhoaPhong}</span>
    },
]

export const PHAN_TICH_SCYK_INFO_INIT: IPhanTichScyk = {
    id: "",
    suCoId: "",
    moTa: "",
    thucHienQuyTrinhChuyenMon: [""],
    nhiemKhuanBenhVien: [""],
    thuocVaDichTruyen: [""],
    mauVaCacChePhamMau: [""],
    thietBiYTe: [""],
    hanhVi: [""],
    taiNanDoiVoiNguoiBenh: [""],
    haTangCoSo: [""],
    quanLyNguonLucToChuc: [""],
    hoSoTaiLieuThuTuc: [""],
    nhomSuCoKhac: [""],
    nhomSuCoKhacText: "",
    dieuTriYLenh: "",
    nhanVien: [""],
    nguoiBenh: [""],
    moiTruongLamViec: [""],
    toChucDichVu: [""],
    yeuToBenNgoai: [""],
    nhomNguyenNhanKhac: [""],
    nhomNguyenNhanKhacText: "",
    hanhDongXuLy: "",
    deXuatKhuyenCaoPhongNgua: "",
    moTaKetQuaPhatHien: "",
    thaoLuanDuaKhuyenCaoNbc: 0,
    phuHopVoiKhuyenCao: 0,
    cuTheKhuyenCao: "",
    tonHaiNguoiBenh: "",
    tonHaiToChuc: [""],
    tonHaiToChucKhacText: "",
    tenNguoiPhanTich: "",
    chucDanhNguoiPhanTich: "",
    ngayPhanTich: "",
    gioPhanTich: "",
    trangThaiXuLy: 0,
}