import { convertGenderToString, formatDateToString, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";
import { IThongTinSCYK, MedicalIncidentInfo } from "../models/BaoCaoSCYKModels";
import { ITiepNhan } from './../models/BaoCaoSCYKModels';

export const tableDSSuCoYKhoaColumns = [
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
        name: "Tên Bệnh Nhân",
        field: "donViCongTac",
        headerStyle: {
            minWidth: "140px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => (
            <div className="d-flex flex-column text-up">
                <span className="text-uppercase">{row?.tenBenhNhan}</span>
                <span>{row?.maBenhNhan} - {convertGenderToString(row?.gioiTinh)} - {formatDateToString(row?.ngaySinh)}</span>
            </div>
        )
    },
    {
        name: "Khoa Phòng",
        field: "chucVu",
        headerStyle: {
            minWidth: "60px"
        },
        render: (row: any) => <span>{row?.tenKhoaPhong}</span>
    },
]

export const dsTabThongTinSCYK = [
    {
        eventKey: "0",
        title: "Báo cáo sự cố",
        component: <></>,
    },
    {
        eventKey: "1",
        title: "Biên bản xác minh",
        component: <></>
    },
    {
        eventKey: "2",
        title: "Phân tích SCYK",
        component: <></>
    },
    {
        eventKey: "3",
        title: "Biên bản họp",
        component: <></>
    },
    {
        eventKey: "4",
        title: "Tài liệu đính kèm",
        component: <>Tài</>
    },
];

export const OPTION_HINH_THUC_BC = [
    {
        name: "Tự nguyện",
        code: 0,
    },
    {
        name: "Bắt buộc",
        code: 1,
    },
];

export const DOI_TUONG_XAY_RA_SC = [
    {
        name: "Người bệnh",
        code: "0",
    },
    {
        name: "Nhân viên y tế",
        code: "1",
    },
    {
        name: "Người nhà/ Khách đến thăm",
        code: "2",
    },
    {
        name: "Trang thiết bị/ Cơ sở hạ tầng",
        code: "3",
    },
];

export const OPTION_XAC_NHAN = [
    { name: "Có", code: 1 },
    { name: "Không", code: 2 },
    { name: "Không ghi nhận", code: 3 },
];

export const OPTION_PHAN_LOAI = [
    { name: "Chưa xảy ra", code: 1 },
    { name: "Đã xảy ra", code: 2 },
];

export const OPTION_MUC_DO_AH = [
    { name: "Nặng", code: 1 },
    { name: "Nhẹ ", code: 2 },
    { name: "Trung Bình", code: 3 },
];

export const GENDER_OPTION = [
	{ name: "Name", code: 1 },
	{ name: "Nữ ", code: 2 },
	{ name: "Khác", code: 3 },
];

export const TT_NGUOI_THONG_BAO = [
	{ name: "Điều dưỡng (Chức danh)", code: 1 },
	{ name: "Người bệnh", code: 2 },
	{ name: "Bác sĩ (Chức danh)", code: 3 },
	{ name: "Người nhà/Khách thăm", code: 4 },
	{ name: "Khác(Ghi cụ thể)", code: 5 },
];

export const OTHER_FIELD_LOAI_NBC = 5

export const InitThongTinSCYK: MedicalIncidentInfo = {
    name: "",
    phanLoai: 1,
    hinhThuc: 1,
    donViBaoCao: "",
    ngayXayRa: "",
    thoiGianXayRa: "",
    ngayBaoCao: "",
    benhNhanId: null,
    loaiDoiTuong: "",
    noiXayRa: "",
    viTriCuThe: "",
    moTa: "",
    deXuat: "",
    dieuTriBanDau: "",
    thongBaoChoBacSi: 1,
    ghiNhanHoSo: 1,
    thongBaoNguoiNha: 1,
    thongBaoNguoiBenh: 1,
    phanLoaiBanDau: 1,
    danhGiaBanDau: 1,
    tenNbc: "",
    soDienThoaiNbc: "",
    emailNbc: "",
    loaiNbc: 1,
    loaiNbcKhac: "",
    tenNck1: "",
    tenNck2: "",
    trangThaiXuLy: 1,
    benhNhan: null,
    code: "",
    isActive: true,
    khoaPhongDieuTri: null,
    maBenhNhan: "",
    orgId: "",
    tenBenhNhan: ""
};

export const DV_BAO_CAO = [
	{
		code: '00000000-0000-0000-0000-000000000000',
		name: "Đơn vị 1",
	},
	{
		code: '00000000-0000-0000-0000-000000000001',
		name: "Đơn vị 2",
	},
];

export const KHOA_PHONG = [
	{
		code: '00000000-0000-0000-0000-000000000000',
		name: "Đơn vị 1",
	},
	{
		code: '00000000-0000-0000-0000-000000000000',
		name: "Đơn vị 2",
	},
];

export const initTiepNhan: ITiepNhan = {
    khoaPhongXuLy: "",
    phuongAnXuLyBanDau: ""
}