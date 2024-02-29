import type { TabsProps } from 'antd';
import ThongTinNguoiBaoCaoTab from '../khai-bao-truong-hop-benh/components/ThongTinNguoiBaoCaoTab';
import TrieuChungVaChanDoanSoBo from '../khai-bao-truong-hop-benh/components/TrieuChungVaChanDoanSoBoTab';
import XetNghiemVaCDCuoiCung from '../khai-bao-truong-hop-benh/components/XetNgiemVaCDCuoiCung';
import TrieuChungLamSang from '../khai-bao-thb-tu-vong/components/TrieuChungLamSang';
import ChanDoanXuatVien from '../khai-bao-thb-tu-vong/components/ChanDoanXuatVien';
import ThongTinChungTab from '../khai-bao-truong-hop-benh/components/ThongTinChungTab';

export const CREATE_DISEASE_CASE_TAB_KEY = {
    THONG_TIN_CHUNG: "1",
    TRIEU_CHUNG_VA_CHAN_DOAN_SO_BO: "2",
    XET_NGHIEM_VA_CHAN_DOAN: "3",
    THONG_TIN_NGUOI_BAO_CAO: "4",
}

export const CREATE_DISEASE_CASE_TAB_LIST: TabsProps['items'] = [
    {
        key: CREATE_DISEASE_CASE_TAB_KEY.THONG_TIN_CHUNG,
        label: 'Thông tin chung',
        children: <ThongTinChungTab mainContentList={["1.Số xác định ca bệnh", "2.Xác định điều tra ca bệnh", "3.Tiền sử dịch tễ"]} />,
    },
    {
        key: CREATE_DISEASE_CASE_TAB_KEY.TRIEU_CHUNG_VA_CHAN_DOAN_SO_BO,
        label: 'Triệu chứng lâm sàng và CĐ sơ bộ',
        children: <TrieuChungVaChanDoanSoBo />,
    },
    {
        key: CREATE_DISEASE_CASE_TAB_KEY.XET_NGHIEM_VA_CHAN_DOAN,
        label: 'Xét nghiệm và CĐ cuối cùng',
        children: <XetNghiemVaCDCuoiCung mainContentList={["7. Xét nghiệm"]}/>,
    },
    {
        key: CREATE_DISEASE_CASE_TAB_KEY.THONG_TIN_NGUOI_BAO_CAO,
        label: 'Thông tin người báo cáo',
        children: <ThongTinNguoiBaoCaoTab mainContent={"9. Thông tin cán bộ điều tra"}/>,
    },
];

export const KHAI_BAO_THB_TU_VONG_TAB_KEY = {
    THONG_TIN_CHUNG: "1",
    TRIEU_CHUNG_LAM_SANG: "2",
    KET_QUA_XET_NGHIEM: "3",
    CHAN_DOAN_XUAT_VIEN: "4",
    THONG_TIN_NGUOI_BAO_CAO: "5",
}

export const KHAI_BAO_THB_TU_VONG_TAB_LIST: TabsProps['items'] = [
    {
        key: KHAI_BAO_THB_TU_VONG_TAB_KEY.THONG_TIN_CHUNG,
        label: 'Thông tin chung',
        children: <ThongTinChungTab 
            isDoiTuongTuVong={true} 
            mainContentList={["1. Số xác định ca tử vong", "2. Xác định điều tra ca tử vong", "3. Tiền sử dịch tễ"]}
        />,
    },
    {
        key: KHAI_BAO_THB_TU_VONG_TAB_KEY.TRIEU_CHUNG_LAM_SANG,
        label: 'Triệu chứng lâm sàng',
        children: <TrieuChungLamSang />,
    },
    {
        key: KHAI_BAO_THB_TU_VONG_TAB_KEY.KET_QUA_XET_NGHIEM,
        label: 'Kết quả xét nghiệm',
        children: <XetNghiemVaCDCuoiCung isDoiTuongTuVong={true} mainContentList={["5. Kết quả xét nghiệm"]}/>,
    },
    {
        key: KHAI_BAO_THB_TU_VONG_TAB_KEY.CHAN_DOAN_XUAT_VIEN,
        label: 'Chẩn đoán xuất viện',
        children: <ChanDoanXuatVien />,
    },
    {
        key: KHAI_BAO_THB_TU_VONG_TAB_KEY.THONG_TIN_NGUOI_BAO_CAO,
        label: 'Thông tin người báo cáo',
        children: <ThongTinNguoiBaoCaoTab mainContent={"7. Thông tin cán bộ điều tra"}/>,
    },
];

export const RADIO_GENDER = [
    { code: "1", name: "Nam" },
    { code: "2", name: "Nữ" }
]

export const RADIO_OPTIONS = [
    { code: "1", name: "Có" },
    { code: "2", name: "Không" },
    { code: "3", name: "Không rõ" },
]

export const RADIO_MORE_OPTIONS = [
    ...RADIO_OPTIONS,
    { code: "4", name: "Không ghi" },
]

export const RADIO_DAU_OPTIONS = [
    { code: "1", name: "Đầu" },
    { code: "2", name: "Minh" },
    { code: "3", name: "Cơ Xương Khớp" },
    { code: "4", name: "Khác..." },
]

export const CHAN_DOAN_SXHD_OPTIONS = [
    { code: "1", name: "Xác định" },
    { code: "2", name: "Loại bỏ" },
    { code: "3", name: "Không rõ" },
]

export const PHAN_DO_NANG_SXHD_OPTIONS = [
    { code: "1", name: "SXH Dengue" },
    { code: "2", name: "SXHD kèm dấu hiệu cảnh báo" },
    { code: "3", name: "SXHD nặng" },
]

export const RADIO_CHAN_DOAN_SO_BO = [
    { code: "1", name: "Sốt xuất huyết Dengue (SXHD)" },
    { code: "2", name: "SXHD kèm dấu hiệu cảnh báo" },
    { code: "3", name: "SXHD nặng" },
    { code: "4", name: "Không phải SXHD" },
    { code: "5", name: "Không rõ" },
]

export const KET_QUA_XN_OPTIONS = [
    { code: "1", name: "Dương tính" },
    { code: "2", name: "Âm tính" },
    { code: "3", name: "Không rõ" },
    { code: "4", name: "Không làm" }
]

export const KET_QUA_LAY_HUYET_THANH_OPTIONS = [
    { code: "1", name: "Dương tính" },
    { code: "2", name: "Âm tính" },
    { code: "3", name: "Không rõ" },
]

export const KET_QUA_XN_PHAN_LAP_OPTIONS = [
    { code: "1", name: "DEN-1" },
    { code: "2", name: "DEN-2" },
    { code: "3", name: "DEN-3" },
    { code: "4", name: "DEN-4" },
    { code: "5", name: "Âm tính" },
    { code: "6", name: "Không rõ" },
]

export const KET_QUA_CHAN_DOAN_OPTIONS = [
    { code: "1", name: "Khỏi" },
    { code: "2", name: "Tử vong" },
    { code: "3", name: "Chuyển viện" },
    { code: "4", name: "Mất theo dõi" },
]

export const XUAT_HUYET_OPTIONS = [
    { code: "1", name: "Chấm xuất huyết" },
    { code: "2", name: "Ban xuất huyết" },
    { code: "3", name: "Mảng xuất huyết" },
    { code: "4", name: "Chảy máu mũi" },
    { code: "5", name: "Nôn ra máu" },
    { code: "6", name: "Đi tiểu ra máu" },
    { code: "7", name: "Chảy máu chân răng" },
    { code: "8", name: "Rong kinh" },
    { code: "9", name: "Xuất huyết não" },
    { code: "10", name: "Khác" },
]

export const NOI_TU_VONG_OPTIONS = [
    { code: "1", name: "Tại nhà" },
    { code: "2", name: "Trạm xá xã" },
    { code: "3", name: "Bệnh viện huyện" },
    { code: "4", name: "Bệnh viện tỉnh" },
    { code: "5", name: "Nơi Khác..." },
]

export const NOI_TIEP_XUC_OPTIONS = [
    { code: "1", name: "1. Gia đình" },
    { code: "2", name: "2. Nơi làm việc" },
    { code: "3", name: "3. Bệnh viện" },
    { code: "4", name: "4. Khác" },
]

export const TIEN_CHOANG_VA_CHOANG_OPTIONS = [
    { code: "1", name: "1. Vật vã" },
    { code: "2", name: "2. Li bì" },
    { code: "3", name: "3. Da xung huyết mạnh" },
    { code: "4", name: "4. Đau vùng gan" },
    { code: "5", name: "5. Chướng bụng" },
    { code: "6", name: "6. Chân tay lạnh" },
    { code: "7", name: "7. Da lạnh ẩm" },
    { code: "8", name: "8. Nhịp mạch (lần/ phút)" },
    { code: "9", name: "9. Huyết áp tối đa/tối thiểu" },
    { code: "10", name: "Triệu chứng khác" },
]
