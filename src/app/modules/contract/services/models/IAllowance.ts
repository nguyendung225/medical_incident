import { OptionReactSelect } from "../../../models/models";

export interface ILoaiPhuCap {
  coGiaHan: string;
  code: string;
  heSoPhanTramGiaTri: string;
  name: string;
}

export interface IAllowance {
  id?: string;
  employeeId?: string;
  hopDongLaoDongId?: string;
  tenKhoanPhuCap?: OptionReactSelect | null;
  tinhCongHuongLuong?: boolean;
  giaTri?: number | string;
  ghiChu?: string;
  heSo?: number | string;
  hinhThucHuong?: string;
  heSoPhanTramHuong?: string;
  phuCapBHXH?: boolean;
  coGiaHan?: boolean;
  thoiGianHieuLucBatDau?: string | null,
  thoiGianHieuLucKetThuc?: string | null,
  taiLieuDinhKem?: string
}
export interface IAllowanceByEmployeeResponse {
  timestamp: string;
  code: number;
  message: string;
  data: IAllowance[];
  total: number;
}
