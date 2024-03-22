import { IDashboardObject, ISearchObject, ITongQuanBaoCao } from "../models/ThongKeModels";

export const INIT_DASHBOARD_SEARCH_VALUE: ISearchObject = {
    khoaPhong: null,
    tuNgay: null,
    denNgay: null,
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
};