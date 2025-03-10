import { IDashboardObject, ISearchObject, ITongQuanBaoCao } from "../models/ThongKeModels";

export const INIT_DASHBOARD_SEARCH_VALUE: ISearchObject = {
    ListDepartmentId: null,
    ListDepartment: null,
    FromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split('T')[0],
    ToDate: new Date().toISOString().split('T')[0],
};

export const INIT_TONG_QUAN_BAO_CAO: ITongQuanBaoCao = {
    tongSoBaoCao: 0,
    moiTao: 0,
    choTiepNhan: 0,
    daTiepNhan: 0,
    daXacMinh: 0,
    daPhanTich: 0,
    bienBanHop: 0,
    ketLuan: 0,
};

export const INIT_DASHBOARD_DATA: IDashboardObject = {
    tongQuanBaoCao: INIT_TONG_QUAN_BAO_CAO,
    loaiDoiTuongTheoThang: [
        {
            soNguoiBenh: 0,
            phanTramNguoiBenh: 0,
            soNhanVien: 0,
            phanTramNhanVien: 0,
            soNguoiNha: 0,
            phanTramNguoiNha: 0,
            soTrangThietBi: 0,
            phanTramTrangThietBi: 0,
            thang: 0,
            nam: 0,
        },
    ],
    hinhThucBaoCao: {
        tuNguyen: {
            name: '',
            percent: 0,
            quantity: 0,
        },
        batBuoc: {
            name: '',
            percent: 0,
            quantity: 0,
        },
    },
    mucDoTonThuong: {
        nhe: {
            name: '',
            percent: 0,
            quantity: 0,
        },
        trungBinh: {
            name: '',
            percent: 0,
            quantity: 0,
        },
        nang: {
            name: '',
            percent: 0,
            quantity: 0,
        },
    },
    loaiDoiTuong: {
        nguoiBenh: {
            name: '',
            percent: 0,
            quantity: 0,
        },
        nhanVienYTe: {
            name: '',
            percent: 0,
            quantity: 0,
        },
        nguoiNhaOrKhachTham: {
            name: '',
            percent: 0,
            quantity: 0,
        },
        trangThietBiOrCoSoHaTang: {
            name: '',
            percent: 0,
            quantity: 0,
        },
    },
};

export const CategoryChartSCYKTheoThang: { name: string; value: string, namePercent: string }[] = [
    { name: 'Người bệnh', value: 'soNguoiBenh', namePercent: 'phanTramNguoiBenh' },
    { name: 'Nhân viên y tế', value: 'soNhanVien', namePercent: 'phanTramNhanVien' },
    { name: 'Người nhà / Khách đến thăm', value: 'soNguoiNha', namePercent: 'phanTramNguoiNha' },
    { name: 'Trang thiết bị / Cơ sở hạ tầng', value: 'soTrangThietBi', namePercent: 'phanTramTrangThietBi' },
];

export const colorsPieChart = ['#FF708B', '#F7CB45', '#AF52DE', '#5CC8BE'];
