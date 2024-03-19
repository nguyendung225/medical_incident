import { IBienBanXacMinh } from "../../bien-ban-xac-minh/models/BienBanXacMinhModel";
import { IPhanTichScyk } from "../../phan-tich-scyk/models/PhanTichSCYKModels";

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
  loaiDoiTuong: string[] | string;
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
  bienBanXacMinhResp?: IBienBanXacMinh;
}

export interface IMedicalIncidentDetailInfo {
  benhNhanResp?: IBenhNhan;
  suCoResp: MedicalIncidentInfo;
  bienBanXacMinhResp: IBienBanXacMinh;
  phanTichResp: IPhanTichScyk;
  bienBanHopResp?: any;
}

export interface IBenhNhan {
  code: string;
  gioiTinh: string | number;
  id: string;
  khoaPhongDieuTriId: null;
  name: string;
  ngaySinh: string;
  tenKhoaPhongDieuTri: string;
}

export interface ITiepNhan {
    khoaPhongXuLy: string
    phuongAnXuLy: string
    suCoId:string
}