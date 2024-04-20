import { IBienBanHop } from "../../bien-ban-hop/model/BienBanHopModel";
import { IBienBanXacMinh } from "../../bien-ban-xac-minh/models/BienBanXacMinhModel";
import { IPhanTichScyk } from "../../phan-tich-scyk/models/PhanTichSCYKModels";

export interface autocompleteOption {
  name: string,
  code: string,
  id?: string,
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
  trangThaiXuLy?: number | string;
  hinhThuc?: number | string;
  phanLoai?: number | string;
  khoaPhongDieuTri?: number | string;
  tuNgay?: string;
  denNgay?: string;
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
  loaiDoiTuong: string[] | string;
  loaiNbc: null | string | number;
  loaiNbcKhac: string;
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
  maBenhNhan: string;
  tenBenhNhan: string | null;
  ngaySinh: string | null;
  soBenhAn: string | null;
  gioiTinh: string | null;
  khoaPhongDieuTri: null | string;
  khoaPhongDieuTriId: string | null;
  tenKhoaPhongDieuTri: string;
  files?: any
}

export interface IMedicalIncidentDetailInfo {
  benhNhanResp?: IBenhNhan;
  suCoResp: MedicalIncidentInfo;
  bienBanXacMinhResp: IBienBanXacMinh;
  phanTichResp: IPhanTichScyk;
  bienBanHopResp: IBienBanHop;
}

export interface IBenhNhan {
  code: string;
  gioiTinh: string | number;
  id: string;
  khoaPhongDieuTriId: null;
  name: string;
  ngaySinh: string;
  soBenhAn?: string
  tenKhoaPhongDieuTri: string;
}

export interface ITiepNhan {
    khoaPhongXuLy: string
    phuongAnXuLy: string
    suCoId: string
}

export interface IDropdownButton {
    title: string;
    handleClick: () => void;
}

export interface IKetLuanSCYK {
    lyDo: string;
    suCoId: string;
    nguoiKetLuanId: string;
    maChucVu?: string;
    tenChucVu?: string;
    maKhoaPhong?: string;
    tenKhoaPhong?: string;
    ghiChu: string;
}

export interface IUpdateHistoryList {
  chiDaoCuaPhongQlcl: string;
  ghiChu: string;
  khoaPhong: string;
  nguoiXuLy: string;
  thaoTac: string;
  thoiGian: string;
}