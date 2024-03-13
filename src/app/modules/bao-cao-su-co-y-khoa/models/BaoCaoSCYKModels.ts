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
  id?: string
  benhNhan: any;
  benhNhanId: string | null;
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
  loaiNbc: null | string | number;
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
  tenDonViBaoCao: string;
  tenBenhNhan: string;
  tenKhoaPhong: string;
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

export interface IThongTinSCYK {
    name: string;
    phanLoai: number;
    hinhThuc: number;
    donViBaoCao: string;
    ngayXayRa: string;
    thoiGianXayRa: string;
    ngayBaoCao: string;
    benhNhanId: string | null;
    loaiDoiTuong: string;
    noiXayRa: string;
    viTriCuThe: string;
    moTa: string;
    deXuat: string;
    dieuTriBanDau: string;
    thongBaoChoBacSi: number;
    ghiNhanHoSo: number;
    thongBaoNguoiNha: number;
    thongBaoNguoiBenh: number;
    phanLoaiBanDau: number;
    danhGiaBanDau: number;
    tenNbc: string;
    soDienThoaiNbc: string;
    emailNbc: string;
    loaiNbc: number;
    loaiNbcKhac: string;
    tenNck1: string;
    tenNck2: string;
    trangThaiXuLy: number;
    tepDinhKems?: string;
  }

export interface ITiepNhan {
    khoaPhongXuLy: string
    phuongAnXuLy: string
    suCoId:string
}