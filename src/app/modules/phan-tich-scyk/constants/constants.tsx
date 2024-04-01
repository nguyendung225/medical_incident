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
        render: (row: any) => (
            row?.suCoResp?.benhNhan && (
                <span className="text-uppercase">{row?.suCoResp?.benhNhan?.tenKhoaPhongDieuTri}</span>
            )
        )
    },
]

export const PHAN_TICH_SCYK_INFO_INIT: IPhanTichScyk = {
    id: "",
    suCoId: "",
    tenSuCo: "",
    moTa: "",
    toKhaiLietKe: false,
    fileDinhKems: [],
    thucHienQuyTrinhChuyenMon: [],
    nhiemKhuanBenhVien: [],
    thuocVaDichTruyen: [],
    mauVaCacChePhamMau: [],
    thietBiYTe: [],
    hanhVi: [],
    taiNanDoiVoiNguoiBenh: [],
    haTangCoSo: [],
    quanLyNguonLucToChuc: [],
    hoSoTaiLieuThuTuc: [],
    nhomSuCoKhac: [],
    nhomSuCoKhacText: "",
    dieuTriYLenh: "",
    nhanVien: [],
    nguoiBenh: [],
    moiTruongLamViec: [],
    toChucDichVu: [],
    yeuToBenNgoai: [],
    nhomNguyenNhanKhac: [],
    nhomNguyenNhanKhacText: "",
    hanhDongXuLy: "",
    deXuatKhuyenCaoPhongNgua: "",
    moTaKetQuaPhatHien: "",
    thaoLuanDuaKhuyenCaoNbc: 1,
    phuHopVoiKhuyenCao: 1,
    cuTheKhuyenCao: "",
    tonHaiNguoiBenh: "",
    tonHaiToChuc: [],
    tonHaiToChucKhacText: "",
    tenNguoiPhanTich: "",
    tenChucDanhNguoiPhanTich: "",
    chucDanhNguoiPhanTich: "",
    gioNgayPhanTich: null,
    ngayPhanTich: "",
    gioPhanTich: "",
    trangThaiXuLy: 0,
}

export const THU_THUAT_KY_THUAT_CHUYEN_MON_OPTIONS = [
    { name: "Không có sự đồng ý của người bệnh/người nhà (đổi với những kỹ thuật, thủ thuật quy định phải ký cam kết)", code: "1" },
    { name: "Không thực hiện khi có chỉ định", code: "2" },
    { name: "Thực hiện sai người bệnh", code: "3" },
    { name: "Thực hiện sai thủ thuật/quy trình/phương pháp điều trị", code: "4" },
    { name: "Thực hiện sai vị trí phẫu thuật/thủ thuật", code: "5" },
    { name: "Bỏ sót dụng cụ, vật tư tiêu hao trong quá trình phẫu thuật", code: "6" },
    { name: "Tử vong trong thai kỳ", code: "7" },
    { name: "Tử vong khi sinh", code: "8" },
    { name: "Tử vong sơ sinh", code: "9" },
]

export const NHIEM_KHUAN_BENH_VIEN_OPTIONS = [
    { name: "Nhiễm khuẩn huyết", code: "1" },
    { name: "Nhiễm khuẩn vết mổ", code: "2" },
    { name: "Viêm phổi", code: "3" },
    { name: "Các loại nhiễm khuẩn khác", code: "4" },
    { name: "Nhiễm khuẩn tiết niệu", code: "5" },
]

export const THUOC_VA_DICH_TRUYEN_OPTIONS = [
    { name: "Cấp phát sai thuốc, dịch truyền", code: "1" },
    { name: "Thiếu thuốc", code: "2" },
    { name: "Sai liều, sai hàm lượng", code: "3" },
    { name: "Sai thời gian", code: "4" },
    { name: "Sai y lệnh", code: "5" },
    { name: "Bỏ sót thuốc/liều thuốc", code: "6" },
    { name: "Sai thuốc", code: "7" },
    { name: "Sai người bệnh", code: "8" },
    { name: "Sai đường dùng", code: "9" },
]

export const MAU_VA_CAC_CHE_PHAM_MAU_OPTIONS = [
    { name: "Phản ứng phụ, tai biến khi truyền máu", code: "1" },
    { name: "Truyền nhầm máu, chế phẩm máu", code: "2" },
    { name: "Truyền sai liều, sai thời điểm", code: "3" },
]

export const THIET_BI_Y_TE_OPTIONS = [
    { name: "Thiếu thông tin hướng dẫn dử dụng", code: "1" },
    { name: "Lỗi thiết bị", code: "2" },
    { name: "Thiết bị thiếu hoặc không phù hợp", code: "3" },
]

export const HANH_VI_OPTIONS = [
    { name: "Khuynh hướng tự gây hại, tự tử", code: "1" },
    { name: "Quấy rối tình dục bởi nhân viên", code: "2" },
    { name: "Quấy rối tình dục bởi người bệnh/khách đến thăm", code: "3" },
    { name: "Xâm hại cơ thể bởi người bệnh/khách đến thăm", code: "4" },
    { name: "Có hành động tự tử", code: "5" },
    { name: "Trốn viện", code: "6" },
]

export const TAI_NAN_DOI_VOI_NGUOI_BENH_OPTIONS = [
    { name: "Té ngã", code: "1" },
]

export const HA_TANG_CO_SO_OPTIONS = [
    { name: "Bị hư hỏng, bị lỗi", code: "1" },
    { name: "Thiếu hoặc không phù hợp", code: "2" },
]

export const QUAN_LY_NGUON_LUC_TO_CHUC_OPTIONS = [
    { name: "Tính phù hợp, đây đủ của dịch vụ khám bệnh, chữa bệnh", code: "1" },
    { name: "Tính phù hợp, đầy đủ của nguồn lực", code: "2" },
    { name: "Tính phù hợp, đầy đủ của chính sách, quy định, quy trình, hướng dẫt chuyên môn", code: "3" },
]

export const HO_SO_TAI_LIEU_OPTIONS = [
    { name: "Tài liệu mất hoặc thiếu", code: "1" },
    { name: "Tài liệu không rõ ràng, không hoàn chỉnh", code: "2" },
    { name: "Thời gian chờ đợi kéo dài", code: "3" },
    { name: "Cung cấp hồ sơ tài liệu chậm", code: "4" },
    { name: "Nhầm hồ sơ, tài liệu", code: "5" },
    { name: "Thủ tục hành chính phức tạp", code: "6" },
]

export const KHAC_OPTIONS = [
    { name: "Các sự cố không đề cập trong các mục từ 1 đến 10", code: "1" },
]
export const KHAC_5_OPTIONS = [
    { name: "Các sự cố không đề cập trong các mục từ 1 đến 5", code: "1" },
]

export const NHAN_VIEN_HOAC_NGUOI_BENH_OPTIONS = [
    { name: "Nhận thức (kiến thức, hiểu biết, quan niệm)", code: "1" },
    { name: "Thực hành (kỹ năng thực hành không đúng quy định, hướng dẫn chuẩn hoặc thực hành theo quy định, hướng dẫn sai)", code: "2" },
    { name: "Thái độ, hành vi, cảm xúc", code: "3" },
    { name: "Giao tiếp", code: "4" },
    { name: "Tâm sinh lý, thể chất, bệnh lý", code: "5" },
    { name: "Các yếu tố xã hội", code: "6" },
]

export const MOI_TRUONG_LAM_VIEC_OPTIONS = [
    { name: "Cơ sở vật chất, hạ tầng, trang thiết bị", code: "1" },
    { name: "Khoảng cách đến nơi làm việc quá xa", code: "2" },
    { name: "Đánh giá về độ an toàn, các nguy cơ rủi ro của môi trường làm việc", code: "3" },
    { name: "Nội quy, quy định và đặc tính kỹ thuật", code: "4" },
]

export const TO_CHUC_DICH_VU_OPTIONS = [
    { name: "Các chính sách, quy trình, hướng dẫn chuyên môn", code: "1" },
    { name: "Tuân thủ quy trình thực hành chuẩn", code: "2" },
    { name: "Văn hoa tô chức", code: "3" },
    { name: "Làm việc nhóm", code: "4" },
]

export const YEU_TO_BEN_NGOAI_OPTIONS = [
    { name: "Môi trường tự nhiên", code: "1" },
    { name: "Sản phẩm, công nghệ và cơ sở hạ tầng", code: "2" },
    { name: "Quy trình, hệ thống dịch vụ", code: "3" },
]

export const MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS = {
    CHUA_XAY_RA: [
        { name: "A", code: "A" },
    ],
    NHE: [
        { name: "B", code: "B" },
        { name: "C", code: "C" },
        { name: "D", code: "D" },
    ],
    TRUNG_BINH: [
        { name: "E", code: "E" },
        { name: "F", code: "F" },
    ],
    NANG: [
        { name: "G", code: "G" },
        { name: "H", code: "H" },
        { name: "I", code: "I" },
    ]
}

export const MUC_DO_TON_THUONG_TREN_TO_CHUC_OPTIONS = [
    { name: "Tổn hại tài sản", code: "1" },
    { name: "Tăng nguồn lực phục vụ cho người bệnh", code: "2" },
    { name: "Quan tâm của truyền thông", code: "3" },
    { name: "Khiếu nại của người bệnh", code: "4" },
    { name: "Tổn hại danh tiếng", code: "5" },
    { name: "Can thiệp của pháp luật", code: "6" },
    { name: "Khác", code: "7" },
]

export const STATUS_PHAN_TICH = {
    LUU_NHAP: 1,
    DA_XAC_MINH: 2
}

export const TAB_PHAN_TICH_SCYK_DIALOG = {
    TAB_NHAN_VIEN_CHUYEN_TRACH: "0",
    TAB_CAP_QUAN_LY: "1",
}