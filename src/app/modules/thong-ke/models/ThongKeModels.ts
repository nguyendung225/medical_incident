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

export interface IPieChartObject {
	name: string;
	percent: number;
	quantity: number;
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

export interface IHinhThucBaoCao {
	tuNguyen: IPieChartObject;
	batBuoc: IPieChartObject;
}

export interface ILoaiDoiTuong {
	nguoiBenh: IPieChartObject;
	nhanVienYTe: IPieChartObject;
	nguoiNhaOrKhachTham: IPieChartObject;
	trangThietBiOrCoSoHaTang: IPieChartObject;
}

export interface IMucDoTonThuong {
	nhe: IPieChartObject;
	trungBinh: IPieChartObject;
	nang: IPieChartObject;
}

export interface IDashboardObject {
	tongQuanBaoCao: ITongQuanBaoCao;
	loaiDoiTuongTheoThang: ILoaiDoiTuongTheoThang[];
	hinhThucBaoCao: IHinhThucBaoCao;
	loaiDoiTuong: ILoaiDoiTuong;
	mucDoTonThuong: IMucDoTonThuong;
}
