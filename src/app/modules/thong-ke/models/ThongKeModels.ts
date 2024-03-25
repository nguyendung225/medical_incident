export interface ISearchObject {
	khoaPhong: string[] | null;
	tuNgay: string | null;
	denNgay: string | null;
}

export interface IDashboardObject {
	tongQuanBaoCao: ITongQuanBaoCao;
}

export interface ITongQuanBaoCao {
	tongSoBaoCao: number;
	moiTao: number;
	choTiepNhan: number;
	daTiepNhan: number;
	daXacMinh: number;
	daPhanTich: number;
	bienBanHop: number;
	ketLuan: number;
}