import { OptionReactSelect } from "../../models/models";

export interface DegreeInfo {
  id?: string;
  employeeId: string;
  createDate?: string;
  chuyenNganhId: string;
  chuyenNganhText?: string;
  hinhThucDaoTao: OptionReactSelect | null;
  hinhThucDaoTaoId?: string;
  hinhThucDaoTaoText?: string;
  trinhDoDaoTao?: OptionReactSelect | null;
  thoiGianDaoTao?: string | number | null;
  xepLoai: OptionReactSelect | null;
  noiDaoTao?: OptionReactSelect | null;
  chuyenNganh?: OptionReactSelect | null;
  noiDaoTaoId: string;
  noiDaoTaoText?: string;
  taiLieuDinhKem?: string;
  noiDaoTaoKhac?: string;
  chuyenNganhKhac?: string;
  trinhDoDaoTaoId?: string;
  trinhDoDaoTaoText?: string;
}
export interface CertificateInfo {
  id?: string;
  employeeId: string;
  tenChungChi: string;
  ngayCap: string | null;
  soCCHN?: string;
  chuyenNganh: string;
  vanBang?: string;
  coSoDaoTao?: OptionReactSelect | null;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  coSoDaoTaoKhac?: string | null;
  noiCap?: string;
  moTa?: string;
  note?: string;
  fileId?: string;
  fileName?: string;
  thoiGianHieuLucTuNgay: string | null;
  thoiGianHieuLucDenNgay: string | null;
}
export interface PoliticalTheoryInfo {
  coSoDaoTao?: OptionReactSelect | null;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  daoTaoTuNgay: string | null;
  employeeId: string;
  fileId?: string;
  fileName?: string;
  hinhThucDaoTao: OptionReactSelect | null;
  id?: string;
  trinhDoLyLuan: OptionReactSelect | null;
  trinhDoId?: string;
  trinhDoText?: string | number;
  daoTaoDenNgay: string | null;
  vanBang: string;
  nuocDaoTao?: OptionReactSelect | null;
  nuocDaoTaoId?: string;
  nuocDaoTaoText?: string;
  nuocDaoTaoKhac?: string | null;
  note?: string;
  coSoDaoTaoKhac?: string;
}
export interface TrainingProcessInfo {
  denNgay: string | null;
  employeeId?: string;
  id?: string;
  noiDaoTaoKhac?: string;
  tenKhoaHoc: string;
  tuNgay: string | null;
  vanBang?: string;
  ketQua?: string;
  noiDaoTaoText: string;
  noiDaoTaoId: string;
  noiDaoTao: OptionReactSelect | null;
}
export interface IRelativesInfoDto {
  id: string;
  diaChiHienNay: string;
  dienThoai: string;
  email: string;
  employeeId: string;
  ethnicsId: string;
  ethnicsText: string;
  isDeadth: boolean;
  nationalityId: string;
  nationalityText: string;
  ngaySinh: string;
  ngheNghiep: string;
  quanHeNV: OptionReactSelect | null;
  ten: string;
  noiLamViec: string;
}
export interface IRelativesInfo {
  id: string;
  diaChiHienNay: string;
  dienThoai: string;
  email: string;
  employeeId: string;
  isDeadth: boolean;
  ngaySinh?: string;
  ngheNghiep: string;
  ten: string;
  noiLamViec: string;
  ethnics: OptionReactSelect | null;
  nationality: OptionReactSelect | null;
  quanHeNV: OptionReactSelect | null;
  isSameOrganization: boolean;
  isDependentPerson: boolean;
  moreDetails: string;
  note?: string;
  namSinh: number | null;
}

export interface VaccineInfo {
  id?: string;
  diaDiemTiem: string;
  employeeId: string;
  lanTiemTiepTheo: string;
  loaiVacxin: string;
  luuY: string;
  muiTiem: OptionReactSelect | null;
  ngayTiem: string;
  phongBenhId: string;
  phongBenhText: string;
  loVaccine?: string;
  tinhTrangSkSauTiem: string;
  phongBenh: OptionReactSelect | null;
}

export const InitVaccine: VaccineInfo = {} as VaccineInfo;

export interface KinhNghiemInfo {
  chucDanh: string;
  daKiemTra: boolean;
  denNgay: string;
  dienthoai: string;
  employeeId: string;
  moTaCongViec: string;
  nguoiDoiChieu: string;
  noiLamViec: string;
  tuNgay: string;
  viTriCongViec: string;
  id: string;
}

export const InitKinhNghiem: KinhNghiemInfo = {} as KinhNghiemInfo;
export interface KiemNhiemInfo {
  employeeId: string;
  tuNgay: string;
  denNgay: string;
  id: string;
  donViCongTacId: string;
  viTriCongViecId: string;
}
export interface LichSuLuongInfo {
  id: string;
  bacLuong: number;
  chucDanhText: string;
  donViCongTacId: string;
  employeeId: string;
  loaiLuong: OptionReactSelect;
  luongCoBan: number;
  ngayHieuLuc: string;
  tinhChatLaoDong: OptionReactSelect;
  tyLeHuongLuong: number;
  viTriCongViecId: string;
}
export interface QuaTrinhCongTacInfo {
  employeeId: string;
  bacId: string;
  bacText: string;
  capId: string;
  chucDanh: string;
  donViCongTacId: string;
  donViCongTacText: string;
  file: string;
  loaiThuTuc: OptionReactSelect;
  ngayQuyetDinh: string;
  soQuyetDinh: string;
  tinhChatLaoDong: OptionReactSelect;
  trangThaiLaoDong: OptionReactSelect;
  tuNgay: string;
  viTriCongViecId: string;
  viTriCongViecText: string;
}
export interface GiayToDinhKemInfo {
  id: string;
  attachment: string; //file
  employeeId: string;
  ghiChu: string;
  ngayCap: string;
  ngayHetHan: string;
  noiCap: string;
  tenGiayTo: OptionReactSelect;
}
export interface TaiLieuDinhKemInfo {
  id: string;
  choPhepTaiVe: boolean;
  employeeId: string;
  fileId: string;
  fileName: string;
  ghiChu: string;
}

export interface PhongBanInfo {
  name: string;
  code: string;
  type: number;
  level: number;
  unitId: string;
  displayOrder: string;
  linePath: string;
  shortName: string;
  parentId: string;
  orgId: string;
  id?: string;
}

export interface PhongBanInfoSearch {
  name: string;
  code: string;
  type: number;
  level: number;
  unitId: string;
}

export interface IQualificationInfo {
  id?: string;
  nuocDaoTao: OptionReactSelect | null;
  nuocDaoTaoId?: string;
  nuocDaoTaoText?: string;
  nuocDaoTaoKhac?: string | null;
  coSoDaoTao: OptionReactSelect | null;
  coSoDaoTaoKhac?: string;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  tuNgay: string | null;
  denNgay: string | null;
  vanBang?: string;
  hinhThucDaoTao: OptionReactSelect | null;
  trinhDoDaoTao: OptionReactSelect | null;
  trinhDoDaoTaoId?: string;
  trinhDoDaoTaoText?: string | number;
  nganhDaoTao?: OptionReactSelect | null;
  nganhDaoTaoId?: string;
  nganhDaoTaoText?: string | number;
  nganhDaoTaoKhac?: string | null;
  chuyenNganhDaoTao: OptionReactSelect | null;
  chuyenNganhDaoTaoId?: string;
  chuyenNganhDaoTaoText?: string | number;
  chuyenNganhDaoTaoKhac?: string | null;
  chuyenNganhChinh?: boolean;
  xepLoai: OptionReactSelect | null;
  namTotNghiep?: string;
  fileId?: string;
  fileName?: string;
  note?: string;
}

export interface IStateManagementInfo {
  id?: string;
  daoTaoTuNgay: string | null;
  daoTaoDenNgay: string | null;
  trinhDoQuanLy: OptionReactSelect | null;
  trinhDoId?: string;
  trinhDoText?: string | number;
  hinhThucDaoTao?: OptionReactSelect | null;
  coSoDaoTao: OptionReactSelect | null;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  coSoDaoTaoKhac?: string | null;
  vanBang?: string;
  nuocDaoTao?: OptionReactSelect | null;
  nuocDaoTaoId?: string;
  nuocDaoTaoText?: string;
  nuocDaoTaoKhac?: string | null;
  fileId?: string;
  fileName?: string;
  note?: string;
}
export interface ITQualificationInfo {
  id?: string;
  daoTaoTuNgay: string | null;
  daoTaoDenNgay: string | null;
  trinhDoTinHoc: OptionReactSelect | null;
  trinhDoId?: string;
  trinhDoText?: string | number;
  hinhThucDaoTao?: OptionReactSelect | null;
  coSoDaoTao: OptionReactSelect | null;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  coSoDaoTaoKhac?: string | null;
  thoiGianHieuLucTuNgay: string | null;
  thoiGianHieuLucDenNgay: string | null;
  vanBang?: string;
  fileId?: string;
  fileName?: string;
  note?: string;
}

export interface IForeignLanguageLevelInfo {
  id?: string;
  daoTaoTuNgay: string | null;
  daoTaoDenNgay: string | null;
  ngoaiNgu: OptionReactSelect | null;
  trinhDoNgoaiNgu: OptionReactSelect | null;
  trinhDoId?: string;
  trinhDoText?: string | number;
  hinhThucDaoTao?: OptionReactSelect | null;
  coSoDaoTao: OptionReactSelect | null;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  coSoDaoTaoKhac?: string | null;
  vanBang?: string;
  diem?: string;
  fileId?: string;
  fileName?: string;
  note?: string;
}

export interface INationalDefenseInfo {
  id?: string;
  daoTaoTuNgay: string | null,
  daoTaoDenNgay: string | null,
  coSoDaoTao: OptionReactSelect | null;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  coSoDaoTaoKhac?: string | null;
  vanBang?: string;
  fileId?: string;
  fileName?: string;
  note?: string;
}

export interface ISpecializeTrainingInfo {
  id?: string;
  tenKhoaHocChungChi: string;
  daoTaoTuNgay: string | null;
  daoTaoDenNgay: string | null;
  coSoDaoTao: OptionReactSelect | null;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  coSoDaoTaoKhac?: string | null;
  hinhThucDaoTao?: OptionReactSelect | null;
  linhVucDaoTao?: OptionReactSelect | null;
  ketQua?: string;
  thoiLuongDaoTao?: string;
  capChungChi?: boolean;
  vanBang?: string;
  ngayCap?: string;
  donViCap?: string;
  hieuLucTuNgay?: string;
  hieuLucDenNgay?: string;
  chungChiQuocTe?: boolean;
  fileId?: string;
  fileName?: string;
  note?: string;
}

export interface IEthnicLanguageInfo {
  id?: string;
  bietTieng?: boolean;
  tiengDanToc: string;
  daoTaoTuNgay?: string | null;
  daoTaoDenNgay?: string | null;
  coSoDaoTao: OptionReactSelect | null;
  coSoDaoTaoKhac?: string;
  coSoDaoTaoId?: string;
  coSoDaoTaoText?: string | number;
  hinhThucDaoTao: OptionReactSelect | null;
  vanBang?: string;
  fileId?: string;
  fileName?: string;
  note?: string;
}

export interface IBank {
  tkNganHang: string;
  nganHangId: string;
  nganHangText: string;
  chiNhanh: string;
  nganHang: OptionReactSelect | null;
}

export interface IRelativesFamily {
  id: string;
  value: string;
  uuid: string
  code: string
  name: string
  description: string
  scategoryId: string
  type: OptionReactSelect | null;
}

export interface IFile {
  id: string;
  name: string;
}