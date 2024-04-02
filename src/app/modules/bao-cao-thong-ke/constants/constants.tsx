import { IColumns } from "../../component/table/TableGrouping/TableGrouping";
import { columnNamesType } from "../../component/table/table-custom/TableCustom";
import { formatDateToString } from "../../utils/FormatUtils";
import { ISearchObj, ISoTheoDoi, IThongKeTheoDoiTuongXayRa } from "../models/BaoCaoThongKeModels";

export const TYPE_OF_REPORT_CODE = {
    BY_LEVEL_OF_HURT: "1",
    BY_MONTH: "2",
    BY_OBJECT_OCCURS: "3",
    MEDICAL_INCIDENT_MONITORING_BOOK: "4"
}

export const TYPE_OF_REPORT_OPTIONS = [
    {
		code: TYPE_OF_REPORT_CODE.BY_LEVEL_OF_HURT,
		name: "Báo cáo scyk theo mức độ tổn thương",
	},
    {
		code: TYPE_OF_REPORT_CODE.BY_MONTH,
		name: "Báo cáo scyk theo tháng",
	},
    {
		code: TYPE_OF_REPORT_CODE.BY_OBJECT_OCCURS,
		name: "Báo cáo scyk theo đối tượng xảy ra",
	},
    {
		code: TYPE_OF_REPORT_CODE.MEDICAL_INCIDENT_MONITORING_BOOK,
		name: "Sổ theo dõi sự cố y khoa",
	},
]

export const INIT_SEARCH_OBJECT: ISearchObj = {
    listDepartmentId: null,
    listDepartment: null,
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
};

export const INIT_SO_THEO_DOI_DATA: ISoTheoDoi[] = [{
    id: "",
    loaiDoiTuong: "",
    hoVaTen: "",
    donViBaoCao: "",
    ngayXayRa: "",
    thoiGianXayRa: "",
    ngayBaoCao: "",
    khoaPhong: "",
    moTa: "",
    ghiChu: ""
}]

export const INIT_TK_THEO_DOI_TUONG_XAY_RA: IThongKeTheoDoiTuongXayRa = {
    baoCaoTheoKhoaPhongs: [
        {
            tenDonVi: "",
            tongSo: 0,
            nguoiBenh: 0,
            nguoiNha: 0,
            nhanVien: 0,
            thietBi: 0
        }
    ],
    baoCaoTheoDonVi: {
        tenDonVi: "",
        tongSo: 0,
        nguoiBenh: 0,
        nguoiNha: 0,
        nhanVien: 0,
        thietBi: 0
    }
}

export const soTheoDoiScykTableColumns: columnNamesType[] = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Họ và tên",
        field: "hoVaTen",
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{row?.hoVaTen}</span>
    },
    {
        name: "Đối tượng xảy ra sự cố",
        field: "loaiDoiTuong",
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{row?.loaiDoiTuong.toString()}</span>
    },
    {
        name: "Ngày xảy ra sự cố",
        field: "ngayXayRa",
        render: (row: any) => <span>{formatDateToString(row?.ngayXayRa)}</span>
    },
    {
        name: "Ngày báo cáo SC",
        field: "ngayBaoCao",
        headerStyle: {
            minWidth: "80px"
        },
        render: (row: any) => <span>{formatDateToString(row?.ngayBaoCao)}</span>
    },
    {
        name: "Khoa/phòng",
        field: "khoaPhong",
        headerStyle: {
            minWidth: "150px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{row?.khoaPhong}</span>
    },
    {
        name: "Mô tả sự cố",
        field: "moTa",
        headerStyle: {
            minWidth: "125px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{row?.moTa}</span>
    },
    {
        name: "Ghi chú",
        field: "ghiChu",
        headerStyle: {
            minWidth: "125px"
        },
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{row?.ghiChu}</span>
    }
]

export const baoCaoSCYKTheoDoiTuongTableColumns: IColumns[] = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Khoa/Phòng",
        field: "tenDonVi",
        cellStyle: {
            textAlign: "left"
        },
        render: (row: any) => <span>{row?.tenDonVi}</span>
    },
    {
        name: "Tổng số SCYK",
        field: "tongSo",
        render: (row: any) => <span>{row?.tongSo}</span>
    },
    {
        name: "Đối tượng xảy ra sự cố y khoa",
        field: "",
        child: [
            {
                name: "Người bệnh",
                field: "nguoiBenh",
                render: (row: any) => <span>{row?.nguoiBenh}</span>
            },
            {
                name: "Người nhà/Khách đến thăm",
                field: "nguoiNha",
                render: (row: any) => <span>{row?.nguoiNha}</span>
            },
            {
                name: "Nhân viên y tế",
                field: "nhanVien",
                render: (row: any) => <span>{row?.nhanVien}</span>
            },
            {
                name: "Trang thiết bị/cơ sở hạ tầng",
                field: "thietBi",
                render: (row: any) => <span>{row?.thietBi}</span>
            },
        ]
    },
];


export const TKMucDoTonThuongColumns: IColumns[] = [
    {
        name: "STT",
        field: "",
        render: (row: any, stt: number) => <div>{stt + 1}</div>
    },
    {
        name: "Khoa/Phòng",
        field: "ten",
        cellStyle: {
            textAlign: "left"
        },
    },
    {
        name: "Tổng số SCYK",
        field: "",
        render: (row: any, stt: number) => <div>{
            row?.soLuongNang + row?.soLuongNhe + row?.soLuongTrungBinh
        }</div>

    },
    {
        name: "Trong đó",
        field: "",
        child: [
            {
                name: "Mức độ nhẹ",
                field: "soLuongNhe",
            },
            {
                name: "Mức độ trung bình",
                field: "soLuongTrungBinh",
            },
            {
                name: "Mức độ nặng",
                field: "soLuongNang",
            },
        ]
    },
];

export const thongKeTheoThangColumns: IColumns[] = [
    {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
        name: "Khoa Phòng",
        cellStyle: {
            textAlign: "left"
        },
        field: "tenKhoaPhong",

    },
    {
        name: "Tổng số SCYK",
        field: "tongSoSuCoYKhoa",
    },
    {
        name: "Tháng 1",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[0].total}</span>
    },
    {
        name: "Tháng 2",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[1].total}</span>
    },
    {
        name: "Tháng 3",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[2].total}</span>
    },
    {
        name: "Tháng 4",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[3].total}</span>
    },
    {
        name: "Tháng 5",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[4].total}</span>
    },
    {
        name: "Tháng 6",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[5].total}</span>
    },
    {
        name: "Tháng 7",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[6].total}</span>
    },
    {
        name: "Tháng 8",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[7].total}</span>
    },
    {
        name: "Tháng 9",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[8].total}</span>
    },
    {
        name: "Tháng 10",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[9].total}</span>
    },
    {
        name: "Tháng 11",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[10].total}</span>
    },
    {
        name: "Tháng 12",
        field: "",
        render: (row: any) => <span>{row.suCoTheoThangs?.[11].total}</span>
    },
]

export const convertSumUpData = (data: any = {}) => {
    const convertData: any = {}
    Object.keys(data).forEach((key) => {
        if (typeof data[key] !== 'object') {
            convertData[key] = data[key]
        }
        else if (Array.isArray(data[key])) {
            data[key].forEach((item: any) => {
                convertData[`thang${item?.month}`] = item?.total
            })

        }
    })
    return convertData
}
