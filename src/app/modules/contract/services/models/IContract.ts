//@ts-nocheck
import { OptionReactSelect } from "../../../models/models";
import { EmployeeProfile } from "../../../profile/models/ProfileModels";
export interface IContractInfoDto {
  id: string;
  employeeId: string;
  donViKyHopDongId: string;
  donViKyHopDongText: string;
  viTriCongViecId: string;
  viTriCongViecText: string;
  soHopDong: string;
  tenHopDong: string;
  nguoiDaiDienCtyKyId: string;
  nguoiDaiDienCtyKyText: string;
  nguoiDaiDienCtyChucDanhText: string;
  nguoiDaiDienCtyChucDanhId: string;
  loaiHopDong: OptionReactSelect;
  thoiHanHopDong: OptionReactSelect;
  hinhThucLamViec: OptionReactSelect;
  ngayCoHieuLuc: string;
  ngayHetHan: string;
  ngayKyHopDong: string;
  luongCoBan: number;
  luongDongBaoHiem: number;
  tyLeHuongLuong: number;
  ghiChu: string;
  fileId: string;
  tenNguoiLaoDong: string;
  employeeCode: string;
  trangThaiKy: OptionReactSelect
  trangThaiHopDong?: string;
}

export interface IContractInfo {
  id: string;
  employeeId?: string;
  maNhanVien?: string;
  donViKyHopDong: OptionReactSelect | null;
  donViKyHopDongId?: string;
  donViKyHopDongText?: string;
  viTriCongViec: OptionReactSelect | null;
  soHopDong: string;
  tenHopDong: string;
  nguoiDaiDienCtyKy: OptionReactSelect | null;
  nguoiDaiDienCtyChucDanh: OptionReactSelect | null;
  loaiHopDong: OptionReactSelect | null;
  thoiHanHopDong: OptionReactSelect | null;
  hinhThucLamViec: OptionReactSelect | null;
  ngayCoHieuLuc: string | null;
  ngayHetHan: string | null;
  ngayKyHopDong: string;
  luongCoBan: number | string;
  bacLuong?: number | string;
  heSoLuong?: number | string;
  bacLuongOption?: OptionReactSelect | null;
  file?: string;
  luongDongBaoHiem: number | string;
  tyLeHuongLuong: number | string;
  ghiChu: string;
  fileId: string;
  tenNguoiLaoDong?: string;
  employeeCode?: string;
  trangThaiKy: OptionReactSelect | null;
  trangThaiHopDong?: OptionReactSelect | null;
  employee?: EmployeeProfile;
  phongBan?: OptionReactSelect | null;
  vienChuc: boolean;
  hopDongLaoDong: boolean;
  caLamViec: OptionReactSelect | null;
  giayUyQuyen: boolean;
  nguoiDaiDienCtyChucDanhText: string;
  nguoiDaiDienCtyChucDanhId: string;
  nguoiDaiDienCtyKyId: string,
  nguoiDaiDienCtyKyText: string
  phongBanText?: string;
  phongBanId?: string;
  viTriCongViecText?: string;
  viTriCongViecId?: string;
  loaiCanBo?: OptionReactSelect | null;
  chucVu?: OptionReactSelect | null;
  chucVuText?: string;
  chucVuId?: string;
  chucDanhText?: string;
  chucDanhId?: string;
  chucDanh?: OptionReactSelect | null;
}
export interface IContractAnnexInfoDto {
  donViKyHopDongId: string;
  donViKyHopDongText: string;
  employeeId: string;
  fileId: string;
  ghiChu: string;
  hinhThucLamViec: OptionReactSelect;
  hopDongGoc: string;
  hopDongLaoDongId: string;
  id: string;
  loaiHopDong: OptionReactSelect;
  luongCoBan: string;
  luongDongBaoHiem: string;
  ngayCoHieuLuc: string;
  ngayCoHieuLucPhuLuc: string;
  ngayHetHan: string;
  ngayKy: string;
  nguoiDaiDienCtyChucDanhId: string;
  nguoiDaiDienCtyChucDanhText: string;
  nguoiDaiDienCtyKyId: string;
  nguoiDaiDienCtyKyText: string;
  soPhuLuc: string;
  tenPhuLuc: string;
  thoiHanHopDong: OptionReactSelect;
  trangThaiKy: OptionReactSelect;
  tyLeHuongLuong: string;
  viTriCongViecId: string;
  viTriCongViecText: string;
}
export interface IContractAnnexInfo {
  employeeId: string;
  fileId: string;
  ghiChu: string;
  hopDongGoc: string;
  hopDongLaoDongId: string;
  id: string;
  luongCoBan: string;
  luongDongBaoHiem: string;
  ngayCoHieuLuc: string;
  ngayCoHieuLucPhuLuc: string;
  ngayHetHan: string;
  ngayKy: string;
  soPhuLuc: string;
  tenPhuLuc: string;
  tyLeHuongLuong: string;
  donViKyHopDong: OptionReactSelect | null;
  viTriCongViec: OptionReactSelect | null;
  nguoiDaiDienCtyKy: OptionReactSelect | null;
  nguoiDaiDienCtyChucDanh: OptionReactSelect | null;
  hinhThucLamViec: OptionReactSelect | null;
  loaiHopDong: OptionReactSelect | null;
  thoiHanHopDong: OptionReactSelect | null;
  trangThaiKy: OptionReactSelect | null;
  donViKyHopDongId?: string;
  donViKyHopDongText?: string;
  nguoiDaiDienCtyKyId?: string;
  nguoiDaiDienCtyKyText?: string;
  nguoiDaiDienCtyChucDanhId?: string;
  nguoiDaiDienCtyChucDanhText?: string;
  viTriCongViecId?: string;
  viTriCongViecText?: string;
  coGiayUyQuyen?: boolean;
}
export interface IContractByEmployeeResponse {
  timestamp: string;
  code: number;
  message: string;
  data: IData;
  total: number;
}
export interface IContractBySearchResponse {
  timestamp: string;
  code: number;
  message: string;
  data: IData;
  total: number;
}
export interface IData {
  content: ContractInfo[];
  pageable: IPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface IPageable {
  sort: ISort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
export interface OptionType {
  id?: number;
  title: string;
  value: string;
}
