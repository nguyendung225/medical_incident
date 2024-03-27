export interface IPhongBan {
	id: string;
	name: string;
	code: string;
}

export interface ISearchObject {
	ListDepartmentId: string[] | null;
	ListDepartment: IPhongBan[] | null;
	FromDate: string | null;
	ToDate: string | null;
}

export interface IDashboardObject {
	tongQuanBaoCao: ITongQuanBaoCao;
	loaiDoiTuongTheoThang: ILoaiDoiTuongTheoThang[];
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

export interface ILoaiDoiTuongTheoThang {
	soNguoiBenh: number;
	phanTramNguoiBenh: number;
	soNhanVien: number;
	phanTramNhanVien: number;
	soNguoiNha: number;
	phanTramNguoiNha: number;
	soTrangThietBi: number;
	phanTramTrangThietBi: number;
	thang: number;
	nam: number;
}