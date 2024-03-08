export interface SearchObject {
  PageNumber: number;
  PageSize: number;
  Keyword?: string;
  Name?: string;
  Code?: string;
  MaBenhNhan?: string;
  HoVaTen?: string;
  NgayBaoCaoStart?: string;
  NgayBaoCaoEnd?: string;
  TrangThaiXuLy?: number;
  HinhThuc?: number;
  PhanLoai?: number;
  KhoaPhongDieuTri?: string;
}

export interface MedicalIncidentInfo {
  benhNhan: null;
  benhNhanId: string;
  code: string;
  danhGiaBanDau: number;
  deXuat: string;
  dieuTriBanDau: string;
  donViBaoCao: null | string;
  emailNbc: string;
  ghiNhanHoSo: number;
  hinhThuc: number;
  isActive: true;
  khoaPhongDieuTri: null | string;
  loaiDoiTuong: string;
  loaiNbc: null | string;
  loaiNbcKhac: string;
  maBenhNhan: string;
  moTa: string;
  name: string;
  ngayBaoCao: string;
  ngayXayRa: string;
  noiXayRa: string;
  orgId: string;
  phanLoai: number;
  phanLoaiBanDau: number;
  soDienThoaiNbc: string;
  tenBenhNhan: string;
  tenNbc: string;
  tenNck1: string;
  tenNck2: string;
  thoiGianXayRa: string;
  thongBaoChoBacSi: number;
  thongBaoNguoiBenh: number;
  thongBaoNguoiNha: number;
  trangThaiXuLy: number;
  viTriCuThe: string;
}

