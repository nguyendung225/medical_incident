import { convertGenderToString, formatDateToString, renderMedicalIncidentReportStatus } from "../../utils/FormatUtils";

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
    {
        name: "",
        field: "",
        render: (row: any) => <i className="bi bi-trash fs-4 text-danger px-4"></i>
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
        code: "0",
    },
    {
        name: "Bắt buộc",
        code: "1",
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
    { name: "Có", code: "0" },
    { name: "Không", code: "1" },
    { name: "Không ghi nhận", code: "2" },
];

export const OPTION_PHAN_LOAI = [
    { name: "Chưa xảy ra", code: "0" },
    { name: "Đã xảy ra", code: "1" },
];

export const OPTION_MUC_DO_AH = [
    { name: "Nặng", code: "0" },
    { name: "Nhẹ ", code: "1" },
    { name: "Trung Bình", code: "2" },
];

export const TT_NGUOI_THONG_BAO = [
    { name: "Điều dưỡng (Chức danh)", code: "0" },
    { name: "Người bệnh", code: "1" },
    { name: "Bác sĩ (Chức danh)", code: "2" },
    { name: "Người nhà/Khách thăm", code: "3" },
    { name: "Khác(Ghi cụ thể)", code: "4" },
];