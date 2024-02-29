import { OptionReactSelect } from "../../models/models";
import { REF_TAB } from "../const/ProfileConst";

export interface ProfileTab {
  id: number;
  name: string;
  ref: REF_TAB;
}

export interface ProjectType {
  id?: string;
  code: string;
  name: string;
  status: string;
  description?: string;
}
export interface IDeduct {
  employeeId?: string;
  giaTri?: string;
  id?: string;
  ghiChu?: string;
  tenKhoanKhauTru?: OptionReactSelect | null;
  tinhCongHuongLuong?: boolean;
}

export interface EmployeeProfile {
  photo?: string;
  phone?: string;
  id?: string;
  bacId: string;
  bacLuong: string;
  heSoLuong?: string;
  benhTat: string;
  binhChungId: string;
  binhChungText: string;
  birthDate: string;
  canNang: number;
  capBacQuanSuId: string;
  capBacQuanSuText: string;
  capId: string;
  chiNhanh: string;
  chieuCao: number;
  chucVu: OptionReactSelect | null;
  chucVuDangId: string;
  chucVuDoanId: string;
  chucVuDangText: string;
  chucVuDoanText: string;
  chucVuQuanSuId: string;
  chucVuQuanSuText: string;
  code: string;
  createDateTime: string;
  createdBy: string;
  danTocId: string;
  dangVien: boolean;
  diaChiLhkc: string;
  diaDiemLamViec: string;
  doanVien: boolean;
  donViCongTacId: string;
  donViCongTacText?: string;
  donViQuanSu: string;
  dtDiDong: string;
  emailCaNhan: string;
  emailCoQuan: string;
  gender: OptionReactSelect | null;
  hangThuongBenhBinhId: string;
  hangThuongBenhBinhText: string;
  hkDiachi: string;
  hkHuyenId: string;
  hkHuyenText: string;
  hkLaChuHo: boolean;
  hkMaSoHoGiaDinh: string;
  hkQuocGia: string;
  hkSoHoKhau: string;
  hkSoNha: string;
  hkTinhId: string;
  hkTinhText: string;
  hkXaId: string;
  hkXaText: string;
  hnDiachi: string;
  hnGiongHoKhau: boolean;
  hnHuyenId: string;
  hnHuyenText: string;
  hnMaSoHoGiaDinh: string;
  hnQuocGia: string;
  hnSoHoKhau: string;
  hnSoNha: string;
  hnTinhId: string;
  hnTinhText: string;
  hnXaId: string;
  hnXaText: string;
  hoChieu: string;
  huongCheDo: boolean;
  loaiGiayTo: OptionReactSelect;
  loaiHopDongId: string;
  luongCoBan: number;
  luongDongBaoHiem: number;
  luuY: string;
  lyDoNghi: string;
  lyDoXuatNgu: string;
  maSoBhxh: string;
  maSoNoiDkKcb: string;
  maTinhCapBhxh: string;
  maNhanVien?: string;
  modifiedBy: string;
  modifyDate: string;
  mstCaNhan: string;
  name: string;
  nameLhkc: string;
  nganHangId: string;
  ngayCapCMNDOrCCCD: string;
  ngayCapHoChieu: string;
  ngayChinhThuc: string;
  ngayHetHanCMNDOrCCCD: string;
  ngayHetHanHoChieu: string;
  ngayNghiHuuDuKien: string;
  ngayNghiViec: string;
  ngayNhapNgu: string;
  ngayThamGiaBaoHiem: string;
  ngayThamGiaCm: string;
  ngayThuViec: string;
  ngayVaoDang: string;
  ngayVaoDoan: string;
  ngayXuatNgu: string;
  nguoiKhuyetTat: boolean;
  nguoiQuanLy: string;
  nguyenQuan: string;
  nhomMau: OptionReactSelect;
  noiCapCMNDOrCCCD: string;
  noiCapHoChieu: string;
  noiDkKcbId: string;
  noiKetNapDang: string;
  noiKetNapDoan: string;
  noiSinh: string;
  otherPhone: string;
  phoneLhkc: string;
  phongBan: OptionReactSelect | null;
  quanHeLhkc: string;
  quanNhan: boolean;
  quocTich: string;
  soCMNDOrCCCD: string;
  soHoChieu: string;
  soSoBhxh: string;
  soSoQlLaoDong: string;
  soTheBhyt: string;
  thamGiaBaoHiem: boolean;
  thamGiaCongDoan: boolean;
  thuongBenhBinh: boolean;
  tiLeDongBaoHiem: string;
  tinhCapBhxh: OptionReactSelect | null;
  tinhChatLaoDongId: string;
  tinhChatLaoDong: OptionReactSelect | null;
  tinhTrangHonNhan: OptionReactSelect;
  tinhTrangSucKhoe: string;
  tkNganHang: string;
  tonGiaoId: string;
  tongLuong: number;
  tpBanThan: OptionReactSelect;
  tpGiaDinh: OptionReactSelect | null;
  trangThaiLaoDong: OptionReactSelect | null;
  ttDiachi: string;
  ttGiongHoKhau: boolean;
  ttHuyenId: string;
  ttHuyenText: string;
  ttSoNha: string;
  ttTinhId: string;
  ttTinhText: string;
  ttXaId: string;
  ttXaText: string;
  tyLeSuyGiamLd: number;
  viTriCongViecId: string;
  viTriCongViecText?: string;
  loaiHopDong?: OptionReactSelect | null;
  nganHangText?: string;
  nguoiQuanLyId?: string;
  nguoiQuanLyText?: string;
  phongBanId?: string;
  phongBanText?: string;
  tinhCapBhxhId?: string;
  tinhCapBhxhText?: string;
  noiDkKcbText?: string;
  donViCongTac?: OptionReactSelect | string;
  viTriCongViec?: OptionReactSelect | null;
  nganHang?: OptionReactSelect | null;
  chucVuDoan?: OptionReactSelect | null;
  chucVuDang?: OptionReactSelect | null;
  bac?: OptionReactSelect | null;
  noiDkKcb?: OptionReactSelect | null;
  cap?: OptionReactSelect | null;
  chucVuText?: string;
  chucVuId?: string;
  loaiCanBo?: OptionReactSelect | null;
  username: string;
}

export const InitEmployeeProfile: EmployeeProfile = {} as EmployeeProfile;

export interface IBasic {
  photo: string;
  id?: string;
  code: string;
  maNhanVien: string;
  tinhTrangHonNhan: OptionReactSelect | null;
  name: string;
  otherName: string;
  mstCaNhan: string;
  gender: OptionReactSelect | null;
  tpGiaDinh: OptionReactSelect | null;
  tpBanThan: OptionReactSelect | null;
  birthDate: string;
  danToc: OptionReactSelect | null;
  tonGiao: OptionReactSelect | null;
  noiSinh: string;
  nguyenQuan: string;
  quocTich: OptionReactSelect | null;
  loaiGiayTo: OptionReactSelect | null;
  soCMNDOrCCCD: string;
  ngayCapCMNDOrCCCD: string;
  noiCapCMNDOrCCCD: string;
  ngayHetHanCMNDOrCCCD: string;
  soHoChieu: string;
  ngayCapHoChieu: string;
  noiCapHoChieu: string;
  ngayHetHanHoChieu: string;
  donViCongTac: OptionReactSelect | null;
  phongBan: OptionReactSelect | null;
  loaiCanBo: OptionReactSelect | null;
  soCanBo: string;
  ccvcNgayVao: string;
  quequanTheoHoSoGoc: string;
}

export const InitBasic: IBasic = {} as IBasic;

export interface EmployeeProfileOutPut extends EmployeeProfile {
  id: string;
}

export interface IContact {
  id?: string;
  code: string;
  createDateTime: string;
  createdBy: string;
  diaChiLhkc: string;
  phone: string;
  emailCaNhan: string;
  emailCoQuan: string;
  hkDiachi: string;
  hkHuyenId: string;
  hkHuyenText: string;
  hkLaChuHo: boolean;
  hkMaSoHoGiaDinh: string;
  hkQuocGiaId: string;
  hkQuocGiaText: string;
  hkQuocGia: OptionReactSelect | null;
  hkHuyen: OptionReactSelect | null;
  hkTinh: OptionReactSelect | null;
  hkXa: OptionReactSelect | null;
  hkSoHoKhau: string;
  hkSoNha: string;
  hkTinhId: string;
  hkTinhText: string;
  hkXaId: string;
  hkXaText: string;
  hnQuocGia: OptionReactSelect | null;
  hnHuyen: OptionReactSelect | null;
  hnTinh: OptionReactSelect | null;
  hnXa: OptionReactSelect | null;
  hnDiachi: string;
  hnGiongHoKhau: boolean;
  hnHuyenId: string;
  hnHuyenText: string;
  hnMaSoHoGiaDinh: string;
  hnQuocGiaId: string;
  hnQuocGiaText: string;
  hnSoHoKhau: string;
  hnSoNha: string;
  hnTinhId: string;
  hnTinhText: string;
  hnXaId: string;
  hnXaText: string;
  modifiedBy: string;
  modifyDate: string;
  otherPhone: string;
  quocTichId: string;
  ttHuyen: OptionReactSelect | null;
  ttTinh: OptionReactSelect | null;
  ttXa: OptionReactSelect | null;
  ttDiachi: string;
  ttGiongHoKhau: boolean;
  ttHuyenId: string;
  ttHuyenText: string;
  ttSoNha: string;
  ttTinhId: string;
  ttTinhText: string;
  ttXaId: string;
  ttXaText: string;
  queQuanTinh: OptionReactSelect | null;
  queQuanHuyen: OptionReactSelect | null;
  queQuanXa: OptionReactSelect | null;
  queQuanDiaChi: string;
  queQuanDiaChiChiTiet: string;
  noiSinhTinh: OptionReactSelect | null;
  noiSinhHuyen: OptionReactSelect | null;
  noiSinhXa: OptionReactSelect | null;
  noiSinhDiaChi: string;
  noiSinhDiaChiChiTiet: string;
  quequanTheoHoSoGoc: string;
}

export const InitContact: IContact = {} as IContact;

export interface IWork {
  id?: string;
  bacId: string;
  bacLuong: string;
  capId: string;
  chiNhanh: string;
  chucVuId: string;
  chucVuText: string;
  code: string;
  createDateTime: string;
  createdBy: string;
  diaDiemLamViec: string;
  donViCongTacId: string;
  donViCongTacText: string;
  loaiHopDong: OptionReactSelect | null;
  luongCoBan: number | null;
  luongDongBaoHiem: number | null;
  lyDoNghi: string;
  modifiedBy: string;
  modifyDate: string;
  nganHangId: string;
  nganHangText: string;
  ngayChinhThuc: string;
  ngayNghiHuuDuKien: string;
  ngayNghiHuuChinhThuc?: string;
  ngayNghiViec: string | null;
  ngayThuViec: string | null;
  ngayTapSu?: string | null;
  ngayVaoCoQuan: string | null;
  nguoiQuanLyId: string;
  nguoiQuanLyText: string;
  phongBanId: string;
  phongBanText: string;
  tkNganHang: string;
  tongLuong: number | null;
  viTriCongViecId: string;
  viTriCongViecText: string;
  trangThaiLaoDong: OptionReactSelect | null;
  tinhChatLaoDong: OptionReactSelect | null;
  soSoQlLaoDong: string;
  thamGiaBaoHiem: boolean;
  thamGiaCongDoan: boolean;
  ngayThamGiaBaoHiem: string;
  tiLeDongBaoHiem: string;
  soSoBhxh: string;
  maSoBhxh: string;
  tinhCapBhxhId: string;
  tinhCapBhxhText: string;
  maTinhCapBhxh: string;
  soTheBhyt: string;
  noiDkKcbId: string;
  noiDkKcbText: string;
  maSoNoiDkKcb: string;
  donViCongTac: OptionReactSelect | null;
  phongBan: OptionReactSelect | null;
  viTriCongViec: OptionReactSelect | null;
  nganHang: OptionReactSelect | null;
  chucVuDoan: OptionReactSelect | null;
  chucVuDang: OptionReactSelect | null;
  tonGiao: OptionReactSelect | null;
  danToc: OptionReactSelect | null;
  bac: OptionReactSelect | null;
  nguoiQuanLy: OptionReactSelect | null;
  tinhCapBhxh: OptionReactSelect | null;
  noiDkKcb?: OptionReactSelect | null;
  chucVu: OptionReactSelect | null;
  cap: OptionReactSelect | null;
}

export const InitWork: IWork = {} as IWork;
export interface ProfileInfo {
  id: string;
  code: string;
  name: string;
  gender: string;
  birthDate: string;
  phone: string;
  emailCaNhan: string;
  phongBanText: string;
  viTriCongViecText: string;
  chucVuText: string;
}

export interface SearchObject {
  pageIndex: number;
  pageSize: number;
  id?: string;
  code?: string;
  name?: string;
  gender?: string;
  birthdate?: string;
  phone?: string;
  emailCaNhan?: string;
  phongBan?: string;
  viTriCongViecText?: string;
  chucVuText?: string;
}

export interface ItemListAPI {
  id?: string;
  value?: string;
  name?: string;
  code?: string;
  uuidKey?: string;
  attributeId?: string;
  departmentId?: string;
  departmentName?: string;
}

export interface DegreeInfoOutPut {
  id: string;
  employeeId: string;
  chuyenNganhText: string;
  noiDaoTaoText: string;
  chuyenNganhId: string;
  noiDaoTaoId: string;
  xepLoai: OptionReactSelect;
  trinhDo: OptionReactSelect;
}
export interface CertificateInfoOutput {
  id: string;
  chungChiText: string;
  nhomChungChiText: string;
  nhomChungChiId: string;
  xepLoai: string;
  ngayCap: Date;
  ngayHetHan: Date;
}

export interface RelativesInfoOutput {
  diaChiHienNay: string;
  dienThoai: string;
  email: string;
  employeeId: string;
  ethnicsId: string;
  ethnicsText: string;
  id: string;
  isDeadth: boolean;
  nationalityId: string;
  nationalityText: string;
  ngaySinh: Date;
  ngheNghiep: string;
  quanheId: string;
  quanheOrder: number;
  quanheText: string;
  ten: string;
  xepLoaiText: string;
  noiLamViec: string;
}
export interface VaccineInfOutput {
  diaDiemTiem: string;
  employeeId: string;
  id: string;
  lanTiemTiepTheo: Date;
  loaiVacxinId: string;
  loaiVacxinText: string;
  luuY: string;
  muiTiem: string;
  ngayTiem: Date;
  phongBenhId: string;
  phongBenhText: string;
  tinhTrangSkSauTiem: string;
}
export interface IWorkExperienceOutput {
  chucDanh: string;
  daKiemTra: boolean;
  denNgay: string;
  dienthoai: string;
  employeeId: string;
  id: string;
  moTaCongViec: string;
  nguoiDoiChieu: string;
  noiLamViec: string;
  tuNgay: string;
  viTriCongViec: string;
}

export interface IConcurrentlyOutputDto {
  employeeId: string;
  id: string;
  tuNgay: string;
  denNgay: string;
  donViCongTacId: string;
  viTriCongViecId: string;
  donViCongTacText: string;
  viTriCongViecText: string;
}
export interface IConcurrentlyOutput {
  employeeId: string;
  id: string;
  tuNgay: string;
  denNgay: string;
  donViCongTac: OptionReactSelect | null;
  viTriCongViec: OptionReactSelect | null;
}
export interface LichSuLuongInfoOutPut {
  bacLuong: number;
  chucDanh: string;
  donViCongTacId: string;
  donViCongTacText: string;
  employeeId: string;
  id: string;
  loaiLuong: OptionReactSelect;
  tinhChatLaoDong: OptionReactSelect;
  tyLeHuongLuong: number;
  viTriCongViecId: string;
  viTriCongViecText: string;
  luongCoBan: number;
  ngayHieuLuc: string;
}
export interface IWorkingProcessInfoOutput {
  fileName?: string;
  fileId?: string;
  id?: string;
  employeeId: string;
  ngayQuyetDinh: string;
  soQuyetDinh: string;
  tuNgay: string;
  loaiThuTuc: OptionReactSelect | null;
  tinhChatLaoDong: OptionReactSelect | null;
  trangThaiLaoDong: OptionReactSelect | null;
  viTriCongViec: OptionReactSelect | null;
  bac: OptionReactSelect | null;
  cap: OptionReactSelect | null;
  donViCongTac: OptionReactSelect | null;
  phongBan: OptionReactSelect | null;
  chucDanh: OptionReactSelect | null;
  isInProfession?: boolean;
  note?: string;
  donViCongTacKhac?: string;
  phongBanKhac?: string;
}
export interface IWorkingProcessInfoOutputDto {
  bacId: string;
  bacText: string;
  capId: string;
  capText: string;
  chucDanh: string;
  donViCongTacId: string;
  donViCongTacText: string;
  file: string;
  id: string;
  employeeId: string;
  loaiThuTuc: OptionReactSelect;
  modifiedBy: string;
  modifyDate: string;
  ngayQuyetDinh: string;
  soQuyetDinh: string;
  tinhChatLaoDong: OptionReactSelect;
  trangThaiLaoDong: OptionReactSelect;
  tuNgay: string;
  viTriCongViecId: string;
  viTriCongViecText: string;
}
export interface IGiayToDinhKemInfo {
  attachment: string;
  employeeId: string;
  ghiChu: string;
  ngayCap: string;
  ngayHetHan: string;
  noiCap: string;
  tenGiayTo: OptionReactSelect | null;
  id: string;
}

export interface ITaiLieuDinhKemInfo {
  choPhepTaiVe: boolean;
  employeeId: string;
  fileId: string;
  fileName: string;
  ghiChu: string;
  id: string;
}

export type IThongTinDoan = {
  ngayVaoDoan: string;
  chucVuDoan: OptionReactSelect | null;
  chucVuDoanId: string;
  chucVuDoanText: string;
  noiKetNapDoan: string;
};

export type IThongTinDang = {
  id?: string;
  ngayVaoDang: string;
  chucVuDang: OptionReactSelect | null;
  chucVuDangId: string;
  chucVuDangText: string;
  noiKetNapDang: string;
  chiBoKetNap: string;
  ngayCapThe: string;
  ngayKetNap: string;
  ngoaiChiBoQuanLy: boolean;
  chucVuDangKiemNhiem: string;
  hnNgayChuyenDen: string;
  lyDoGianDoan: string;
  chiBoSinhHoat: string;
  ngayKetNapDangLan2: string;
  ngayChinhThuc: string;
  ngayBoNhiemLai: string;
  duBiChiBo: string;
  dangBoKetNapDang: string;
  dangBoCT: string;
  ngayRaKhoiDang: string;
  chiBoKetNapLan2: string;
  dangBoKetNapDangLan2: string;
  soThe: string | number;
  duBiNguoiGioiThieu1: string;
  duBiNguoiGioiThieu2: string;
  dangBoCapThe: string;
  dangBoKetNapDangDuBi: string;
  duBiNgayKetNap: string;
  duBiTaiDangBo: string;
  lan2NguoiGioiThieu: string;
  duBiThongTinNguoiGioiThieu1: string;
  duBiThongTinNguoiGioiThieu2: string;
  hienNayTaiDangBo: string;
  hienNayNgayChuyenDenChiBoHienTai: string;
  hienNayChucVuDang: string;
  hienNayDaRoiDang: boolean;
  hienNayNgayRoiDang: string;
  hienNayLyDoRoiDang: string;
};

export type IPolitics = Pick<IThongTinDoan, keyof IThongTinDoan> &
  Pick<IThongTinDang, keyof IThongTinDang> & {
    doanVien?: boolean;
    dangVien?: boolean;
  };

export interface IMilitary {
  quanNhan: boolean;
  thuongBenhBinh: boolean;
  huongCheDo: boolean;
  ngayNhapNgu: string;
  binhChung: OptionReactSelect | null;
  binhChungId: string;
  binhChungText: string;
  donViQuanSu: string;
  ngayThamGiaCm: string;
  capBacQuanSu: OptionReactSelect | null;
  capBacQuanSuId: string;
  capBacQuanSuText: string;
  chucVuQuanSu: OptionReactSelect | null;
  chucVuQuanSuId: string;
  chucVuQuanSuText: string;
  hangThuongBenhBinh: OptionReactSelect | null;
  hangThuongBenhBinhId: string;
  hangThuongBenhBinhText: string;
  ngayXuatNgu: string;
  tyLeSuyGiamLd: number | null;
}

export interface IMedical {
  nhomMau: OptionReactSelect | null;
  chieuCao: number | null;
  canNang: number | null;
  tinhTrangSucKhoe: string;
  benhTat: string;
  luuY: string;
  nguoiKhuyetTat: boolean;
}

export interface IItemSearch {
  name: string;
  type: string;
  field: string;
  value: any;
}

export interface ISalaryInfo {
  phongBan: OptionReactSelect | null;
  viTriCongViec: OptionReactSelect | null;
  chucVu: OptionReactSelect | null;
  loaiLuong: OptionReactSelect | null;
  bac: OptionReactSelect | null;
  loaiDieuChinhLuong: OptionReactSelect | null;
  tyLeHuongLuong?: OptionReactSelect | null;
  heSoBacLuong?: OptionReactSelect | null;
  tongLuong?: number;
  tkNganHang: string;
  nganHang: OptionReactSelect | null;
  chiNhanh?: string;
  ngayHuongBatDau: string;
  ngayHuongKetThuc: string;
  giuBacBatDau?: string;
  giuBacKetThuc?: string;
}

export interface AddressData {
  houseNumber?: string;
  wards?: string;
  districts?: string;
  province?: string;
  national?: string;
}

export interface ITrainingLevel {
  trinhDoGiaoDucPhoThong: OptionReactSelect | null;
  trinhDoChuyenMonCaoNhat?: string;
  hinhThucDaoTao?: string;
  chuyenNganhDaoTao?: string;
  namDaoTao?: string;
  coSoDaoTao?: string;
  trinhDoNgoaiNguCaoNhat?: string;
  trinhDoLyLuanChinhTri?: string;
  trinhDoTinHocCaoNhat?: string;
  trinhDoQuanLyNhaNuoc?: string;
  kiNangMem?: Array<any>;
  trinhDoGiaoDucPhoThongId?: string;
  trinhDoGiaoDucPhoThongText?: string;
  kyNangMemId?: string;
  kyNangMemText?: string;
  kyNangMemList?: Array<any> | null;
  hocHam?: OptionReactSelect | null;
  chuyenNganhHocHam?: OptionReactSelect | null;
  namPhongTang?: number;
  chuyenNganhHocHamId?: string;
  chuyenNganhHocHamText?: string;
  chuyenNganhHocHamKhac?: string;
}

export interface ISalaryDevelopment {
  id?: string;
  bacLuongId: string;
  bacLuongText: string;
  chucDanhId: string;
  chucDanhText: string;
  createDate: string;
  createdBy: string;
  donViCongTacId: string;
  donViCongTacText: string;
  employeeId: string;
  heSoBacLuongId: string;
  heSoBacLuongText: string;
  loaiCanBo: OptionReactSelect | null;
  loaiDieuChinhLuong: OptionReactSelect | null;
  loaiLuong: OptionReactSelect | null;
  luongCoBan: number | null;
  luongThoaThuan: number | null;
  modifiedBy: string;
  modifyDate: string;
  ngayHieuLuc: string;
  ngayHuongLuongDenNgay: string;
  ngayHuongLuongTuNgay: string;
  ngayQuyetDinh: string;
  noiQuyetDinh: string;
  phanTramHuong: OptionReactSelect | null;
  phongBanId: string;
  phongBanText: string;
  phongBan: OptionReactSelect | null;
  phuCapThamNienVuotKhung: number | null;
  phuCapChenhLechBaoLuu: number | null;
  soQuyetDinh: string;
  thoiGianGiuBacDuKienBatDau: string;
  thoiGianGiuBacDuKienKetThuc: string;
  tinhChatLaoDong: OptionReactSelect | null;
  tyLeHuongLuong: string;
  viTriCongViecId: string;
  viTriCongViecText: string;
  viTriCongViec: OptionReactSelect | null;
  chucDanh: OptionReactSelect | null;
  chucVu: OptionReactSelect | null;
  bac: OptionReactSelect | null;
  bacLuong: number | null;
  heSoBacLuong: number | null;
}

export interface ITitleConferred {
  danhHieu: OptionReactSelect | null;
  namPhongTang: number | null;
}

export interface IFamilyPolicy {
  chinhSach: OptionReactSelect | null;
  hangThuongBinh: OptionReactSelect | null;
  hangThuongBinhId?: string;
  hangThuongBinhText?: string;
  hinhThucThuongTat: string;
  namThuongTat: number | null;
  laThuongBinh: boolean;
  laGiaDinhChinhSach: boolean;
  laGiaDinhCoCongCachMang: boolean;
}
