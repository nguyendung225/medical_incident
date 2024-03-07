export const dsBenhNhan = [
    {
        maBenhNhan: "BN001",
        tenBenhNhan: "Nguyễn Văn Anh",
        khoaPhong: "Khoa Ngoại",
        goiTinh: "Nam",
        ngaySinh: "01/01/1990",
    },
    {
        maBenhNhan: "BN002",
        tenBenhNhan: "Trần Thị Bình",
        khoaPhong: "Khoa Mắt",
        goiTinh: "Nữ",
        ngaySinh: "15/05/1985",
    },
    {
        maBenhNhan: "BN003",
        tenBenhNhan: "Lê Văn Cường",
        khoaPhong: "Khoa Tim Mạch",
        goiTinh: "Nam",
        ngaySinh: "20/09/1988",
    },
    {
        maBenhNhan: "BN004",
        tenBenhNhan: "Phạm Thị Dung",
        khoaPhong: "Khoa Nhi",
        goiTinh: "Nữ",
        ngaySinh: "10/12/2000",
    },
    {
        maBenhNhan: "BN005",
        tenBenhNhan: "Hoàng Văn Em",
        khoaPhong: "Khoa Tai Mũi Họng",
        goiTinh: "Nam",
        ngaySinh: "05/03/1995",
    },
    {
        maBenhNhan: "BN006",
        tenBenhNhan: "Võ Thị Phương",
        khoaPhong: "Khoa Răng Hàm Mặt",
        goiTinh: "Nữ",
        ngaySinh: "22/07/1983",
    },
    {
        maBenhNhan: "BN007",
        tenBenhNhan: "Trần Văn Giang",
        khoaPhong: "Khoa Da Liễu",
        goiTinh: "Nam",
        ngaySinh: "18/11/1982",
    },
    {
        maBenhNhan: "BN008",
        tenBenhNhan: "Nguyễn Thị Hương",
        khoaPhong: "Khoa Ung Bướu",
        goiTinh: "Nữ",
        ngaySinh: "30/04/1993",
    },
    {
        maBenhNhan: "BN009",
        tenBenhNhan: "Phan Văn Nam",
        khoaPhong: "Khoa Thần Kinh",
        goiTinh: "Nam",
        ngaySinh: "12/08/1987",
    },
    {
        maBenhNhan: "BN010",
        tenBenhNhan: "Đỗ Thị Khánh",
        khoaPhong: "Khoa Nội Tiết",
        goiTinh: "Nữ",
        ngaySinh: "08/06/1998",
    },
];

export const tableDSSuCoYKhoaColumns = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "TT",
        field: "name",
        render: (row: any) => (
            <i className="bi bi-circle-fill spaces fs-10"></i>
        )
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
                <span>{row?.maBenhNhan} - {row?.goiTinh} - {row?.ngaySinh}</span>
            </div>
        )
    },
    {
        name: "Khoa Phòng",
        field: "chucVu",
        headerStyle: {
            minWidth: "60px"
        },
        render: (row: any) => <span>{row?.khoaPhong}</span>
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