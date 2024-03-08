export interface autocompleteOption {
  name: string,
  code: string,
}

export interface SearchObject {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  name?: string;
  code?: string;
  maBenhNhan?: string;
  hoVaTen?: string;
  ngayBaoCaoStart?: string;
  ngayBaoCaoEnd?: string;
  trangThaiXuLy?: autocompleteOption;
  hinhThuc?: autocompleteOption;
  phanLoai?: autocompleteOption;
  khoaPhongDieuTri?: autocompleteOption;
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

