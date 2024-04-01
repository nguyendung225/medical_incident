import { autocompleteOption } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { IPhongBan } from "../../thong-ke/models/ThongKeModels";

export interface ISoTheoDoi {
    id: string;
    loaiDoiTuong: string;
    hoVaTen: string;
    donViBaoCao: string;
    ngayXayRa: string;
    thoiGianXayRa: string;
    ngayBaoCao: string;
    khoaPhong: string;
    moTa: string;
    ghiChu: string;
}

export interface IThongKeTheoDoiTuongXayRa {
    baoCaoTheoKhoaPhongs?: IDonViBaoCao[],
    baoCaoTheoDonVi?: IDonViBaoCao
};

export interface IDonViBaoCao {
    tenDonVi: string;
    tongSo: number;
    nguoiBenh: number;
    nguoiNha: number;
    nhanVien: number;
    thietBi: number;
}


export interface ISearchObj {
    listDepartmentId?: string[] | null;
    listDepartment?: IPhongBan[] | null;
    fromDate: string;
    toDate: string;
    typeOfReport?: autocompleteOption;
};