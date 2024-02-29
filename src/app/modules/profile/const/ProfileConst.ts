import { OptionReactSelect } from "../../models/models";
import { TYPE } from "../../utils/Constant";
import {
  CertificateInfo,
  DegreeInfo,
  IRelativesFamily,
  IRelativesInfo,
  PoliticalTheoryInfo,
  TrainingProcessInfo
} from "../models/DialogModels";
import {
  EmployeeProfile,
  IBasic,
  IConcurrentlyOutput,
  IContact,
  IFamilyPolicy,
  IGiayToDinhKemInfo,
  IItemSearch,
  IMedical,
  IMilitary,
  IPolitics,
  ISalaryDevelopment,
  ISalaryInfo,
  ITaiLieuDinhKemInfo,
  IThongTinDang,
  IThongTinDoan,
  ITitleConferred,
  ITrainingLevel,
  IWork,
  IWorkExperienceOutput,
  IWorkingProcessInfoOutput,
  ProfileTab
} from "../models/ProfileModels";
import { listGender } from "./DialogConstant";

export const ROWS_PER_PAGE_LIST = [1, 2, 3, 5, 10, 15, 20, 50, 100];

export const MENU_LIST = {
  basicInformation: "basic-information",
  contactInformation: "contact-information",
  workInformation: "work-information",
  militaryInformation: "military-information",
  medicalInformation: "medical-information",
  vaccinationInformation: "vaccination-information",
  familyInformation: "family-information"
};

export const defaultEmployeeProfile: EmployeeProfile = {} as EmployeeProfile;

export const REF_CONST = {
  basicInfo: "#basic-information",
  contactInfo: "#contact-information",
  familyInfo: "#family-information",
  workInfo: "#work-information",
  militaryInfo: "#military-information",
  medicalInfo: "#medical-information",
  vaccineInfo: "#vaccination-information",
  politicsInfo: "#politics-information",
  workExperience: "#workExperience-information",
  workingProgressInfo: "#workingProcess-information",
  concurrentlyInfo: "#concurrently-information",
  salaryInfo: "#salaryHistory-information",
  tempPaper: "#tempPapers-information",
  attachment: "#attachments-information"
};

export const INIT_INFORMATION: IBasic = {
  photo: "",
  id: "",
  code: "",
  maNhanVien: "",
  tinhTrangHonNhan: null,
  name: "",
  otherName: "",
  mstCaNhan: "",
  gender: null,
  tpGiaDinh: null,
  tpBanThan: null,
  birthDate: "",
  danToc: null,
  tonGiao: null,
  noiSinh: "",
  nguyenQuan: "",
  quocTich: null,
  loaiGiayTo: null,
  soCMNDOrCCCD: "",
  ngayCapCMNDOrCCCD: "",
  noiCapCMNDOrCCCD: "",
  ngayHetHanCMNDOrCCCD: "",
  soHoChieu: "",
  ngayCapHoChieu: "",
  noiCapHoChieu: "",
  ngayHetHanHoChieu: "",
  donViCongTac: null,
  phongBan: null,
  loaiCanBo: null,
  soCanBo: "",
  ccvcNgayVao: "",
  quequanTheoHoSoGoc: ""
};

export const INIT_CONTACT: IContact = {
  code: "",
  createDateTime: "",
  createdBy: "",
  diaChiLhkc: "",
  phone: "",
  emailCaNhan: "",
  emailCoQuan: "",
  hkDiachi: "",
  hkHuyenId: "",
  hkHuyenText: "",
  hkLaChuHo: false,
  hkMaSoHoGiaDinh: "",
  hkQuocGiaId: "",
  hkQuocGiaText: "",
  hkQuocGia: null,
  hkHuyen: null,
  hkTinh: null,
  hkXa: null,
  hkSoHoKhau: "",
  hkSoNha: "",
  hkTinhId: "",
  hkTinhText: "",
  hkXaId: "",
  hkXaText: "",
  hnQuocGia: null,
  hnHuyen: null,
  hnTinh: null,
  hnXa: null,
  hnDiachi: "",
  hnGiongHoKhau: false,
  hnHuyenId: "",
  hnHuyenText: "",
  hnMaSoHoGiaDinh: "",
  hnQuocGiaId: "",
  hnQuocGiaText: "",
  hnSoHoKhau: "",
  hnSoNha: "",
  hnTinhId: "",
  hnTinhText: "",
  hnXaId: "",
  hnXaText: "",
  modifiedBy: "",
  modifyDate: "",
  otherPhone: "",
  quocTichId: "",
  ttDiachi: "",
  ttGiongHoKhau: false,
  ttHuyen: null,
  ttTinh: null,
  ttXa: null,
  ttHuyenId: "",
  ttHuyenText: "",
  ttSoNha: "",
  ttTinhId: "",
  ttTinhText: "",
  ttXaId: "",
  ttXaText: "",
  queQuanTinh: null,
  queQuanHuyen: null,
  queQuanXa: null,
  queQuanDiaChi: "",
  queQuanDiaChiChiTiet: "",
  noiSinhTinh: null,
  noiSinhHuyen: null,
  noiSinhXa: null,
  noiSinhDiaChi: "",
  noiSinhDiaChiChiTiet: "",
  quequanTheoHoSoGoc: ""
};

export const INIT_DEGREE_INFO: DegreeInfo = {
  employeeId: "",
  chuyenNganhId: "",
  chuyenNganhText: "",
  trinhDoDaoTao: null,
  hinhThucDaoTao: null,
  xepLoai: null,
  noiDaoTao: null,
  noiDaoTaoId: "",
  noiDaoTaoText: "",
  thoiGianDaoTao: null,
  noiDaoTaoKhac: ""
};

export const INIT_CRETIFICAFE_INFO: CertificateInfo = {
  employeeId: "",
  tenChungChi: "Chứng chỉ hành nghề khám bệnh, chữa bệnh",
  ngayCap: null,
  thoiGianHieuLucTuNgay: null,
  thoiGianHieuLucDenNgay: null,
  soCCHN: "",
  moTa: "",
  chuyenNganh: "",
  noiCap: ""
};

export const INIT_POLITICAL_THEORY_INFO: PoliticalTheoryInfo = {
  coSoDaoTao: null,
  daoTaoTuNgay: null,
  employeeId: "",
  hinhThucDaoTao: null,
  trinhDoLyLuan: null,
  daoTaoDenNgay: null,
  vanBang: "",
  coSoDaoTaoKhac: ""
};

export const INIT_TRAINING_PROCESS_INFO: TrainingProcessInfo = {
  denNgay: null,
  employeeId: "",
  id: "",
  noiDaoTaoKhac: "",
  tenKhoaHoc: "",
  tuNgay: null,
  vanBang: "",
  noiDaoTaoId: "",
  noiDaoTaoText: "",
  noiDaoTao: null
};

export const INIT_WORKING_PROCESS: IWorkingProcessInfoOutput = {
  employeeId: "",
  ngayQuyetDinh: "",
  soQuyetDinh: "",
  tuNgay: "",
  tinhChatLaoDong: null,
  trangThaiLaoDong: null,
  loaiThuTuc: null,
  viTriCongViec: null,
  bac: null,
  cap: null,
  donViCongTac: null,
  donViCongTacKhac: "",
  phongBanKhac: "",
  phongBan: null,
  chucDanh: null
};

export enum TYPE_SYSTEM_LEVEL {
  INFO_TECHNOLOGY_CERTIFICATE = 1,
  LANGUAGE_CERTIFICATE = 2,
  PRACTICING_CERTIFICATE = 3,
  OTHER_PROFESSIONAL_CERTIFICATE = 4
}

export const INIT_WORK: IWork = {
  id: "",
  bacId: "",
  bacLuong: "",
  capId: "",
  chiNhanh: "",
  chucVuId: "",
  chucVuText: "",
  code: "",
  createDateTime: "",
  createdBy: "",
  diaDiemLamViec: "",
  donViCongTacId: "",
  donViCongTacText: "",
  loaiHopDong: null,
  luongCoBan: null,
  luongDongBaoHiem: null,
  lyDoNghi: "",
  modifiedBy: "",
  modifyDate: "",
  nganHangId: "",
  nganHangText: "",
  ngayChinhThuc: "",
  ngayNghiHuuDuKien: "",
  ngayNghiViec: null,
  ngayThuViec: null,
  ngayVaoCoQuan: null,
  nguoiQuanLyId: "",
  nguoiQuanLyText: "",
  phongBanId: "",
  phongBanText: "",
  tkNganHang: "",
  tongLuong: null,
  viTriCongViecId: "",
  viTriCongViecText: "",
  trangThaiLaoDong: null,
  tinhChatLaoDong: null,
  soSoQlLaoDong: "",
  thamGiaBaoHiem: true,
  thamGiaCongDoan: true,
  ngayThamGiaBaoHiem: "",
  tiLeDongBaoHiem: "",
  soSoBhxh: "",
  maSoBhxh: "",
  tinhCapBhxhId: "",
  tinhCapBhxhText: "",
  maTinhCapBhxh: "",
  soTheBhyt: "",
  noiDkKcbId: "",
  noiDkKcbText: "",
  maSoNoiDkKcb: "",
  donViCongTac: null,
  phongBan: null,
  viTriCongViec: null,
  nganHang: null,
  chucVuDoan: null,
  chucVuDang: null,
  tonGiao: null,
  danToc: null,
  bac: null,
  nguoiQuanLy: null,
  tinhCapBhxh: null,
  noiDkKcb: null,
  chucVu: null,
  cap: null
};

export const INIT_TT_DOAN: IThongTinDoan = {
  ngayVaoDoan: "",
  chucVuDoan: null,
  chucVuDoanId: "",
  chucVuDoanText: "",
  noiKetNapDoan: ""
};

export const INIT_TT_DANG: IThongTinDang = {
  ngayVaoDang: "",
  chucVuDang: null,
  chucVuDangId: "",
  chucVuDangText: "",
  noiKetNapDang: "",
  chiBoKetNap: "",
  ngayCapThe: "",
  ngayKetNap: "",
  ngoaiChiBoQuanLy: false,
  chucVuDangKiemNhiem: "",
  hnNgayChuyenDen: "",
  lyDoGianDoan: "",
  chiBoSinhHoat: "",
  ngayKetNapDangLan2: "",
  ngayChinhThuc: "",
  ngayBoNhiemLai: "",
  duBiChiBo: "",
  dangBoKetNapDang: "",
  dangBoCT: "",
  ngayRaKhoiDang: "",
  chiBoKetNapLan2: "",
  dangBoKetNapDangLan2: "",
  soThe: "",
  duBiNguoiGioiThieu1: "",
  duBiNguoiGioiThieu2: "",
  dangBoCapThe: "",
  duBiTaiDangBo: "",
  duBiNgayKetNap: "",
  lan2NguoiGioiThieu: "",
  duBiThongTinNguoiGioiThieu1: "",
  duBiThongTinNguoiGioiThieu2: "",
  hienNayTaiDangBo: "",
  hienNayNgayChuyenDenChiBoHienTai: "",
  dangBoKetNapDangDuBi: "",
  hienNayChucVuDang: "",
  hienNayDaRoiDang: false,
  hienNayNgayRoiDang: "",
  hienNayLyDoRoiDang: ""
};

export const INIT_TT_CHINH_TRI: IPolitics = {
  ...INIT_TT_DOAN,
  ...INIT_TT_DANG,
  doanVien: false,
  dangVien: false
}

export const INIT_MILITARY: IMilitary = {
  quanNhan: false,
  thuongBenhBinh: false,
  huongCheDo: false,
  ngayNhapNgu: "",
  binhChung: null,
  binhChungId: "",
  binhChungText: "",
  donViQuanSu: "",
  ngayThamGiaCm: "",
  capBacQuanSu: null,
  capBacQuanSuId: "",
  capBacQuanSuText: "",
  chucVuQuanSu: null,
  chucVuQuanSuId: "",
  chucVuQuanSuText: "",
  hangThuongBenhBinh: null,
  hangThuongBenhBinhId: "",
  hangThuongBenhBinhText: "",
  ngayXuatNgu: "",
  tyLeSuyGiamLd: null
};

export const INIT_RELATIVES_INFO: IRelativesInfo = {
  id: "",
  diaChiHienNay: "",
  dienThoai: "",
  email: "",
  employeeId: "",
  isDeadth: false,
  isSameOrganization: false,
  isDependentPerson: false,
  ngheNghiep: "",
  ten: "",
  noiLamViec: "",
  quanHeNV: null,
  ethnics: null,
  nationality: null,
  moreDetails: "",
  namSinh: null
};

export const INIT_RELATIVES_FAMILY_INFO: IRelativesFamily = {
  id: "",
  value: "",
  uuid: "",
  code: "",
  name: "",
  description: "",
  scategoryId: "",
  type: null
};

export const INIT_WORK_EXPERIENCE: IWorkExperienceOutput = {
  chucDanh: "",
  daKiemTra: false,
  denNgay: "",
  dienthoai: "",
  employeeId: "",
  id: "",
  moTaCongViec: "",
  nguoiDoiChieu: "",
  noiLamViec: "",
  tuNgay: "",
  viTriCongViec: ""
};

export const INIT_MEDICAL: IMedical = {
  nhomMau: null,
  chieuCao: null,
  canNang: null,
  tinhTrangSucKhoe: "",
  benhTat: "",
  luuY: "",
  nguoiKhuyetTat: false
};

export const INIT_CONCURENTLY: IConcurrentlyOutput = {
  employeeId: "",
  id: "",
  tuNgay: "",
  denNgay: "",
  donViCongTac: null,
  viTriCongViec: null
};

export const INIT_INPUT_SEARCH: IItemSearch = {
  name: "",
  type: TYPE.TEXT,
  field: "",
  value: null
};

export const INIT_GIAY_TO_DINH_KEM: IGiayToDinhKemInfo = {
  attachment: "",
  employeeId: "",
  ghiChu: "",
  ngayCap: "",
  ngayHetHan: "",
  noiCap: "",
  tenGiayTo: null,
  id: ""
};

export const INIT_TAI_LIEU_DINH_KEM: ITaiLieuDinhKemInfo = {
  id: "",
  choPhepTaiVe: false,
  employeeId: "",
  fileId: "",
  fileName: "",
  ghiChu: ""
};

export const FIELD_SEARCH = [
  // {
  //   name: "Trạng thái",
  //   type: TYPE.STATUS,
  //   field: "TT",
  //   searchFunction: searchAllEmployee,
  //   searchObject: { ...SEARCH_OBJECT_MAX_SIZE },
  // },
  {
    name: "Mã nhân viên",
    field: "maNhanVien",
    type: TYPE.TEXT
  },
  {
    name: "Họ và tên",
    field: "name",
    type: TYPE.TEXT
  },
  {
    name: "Giới tính",
    field: "gender",
    type: TYPE.SELECT,
    listOption: listGender
  },
  {
    name: "Ngày sinh",
    field: "birthDate",
    type: TYPE.DATE
  },
  {
    name: "Số ĐTDĐ",
    field: "phone",
    type: TYPE.TEXT
  },
  {
    name: "CCCD",
    field: "soCMNDOrCCCD",
    type: TYPE.TEXT
  },
  {
    name: "Phòng ban",
    field: "phongBanText",
    type: TYPE.TEXT
  },
  {
    name: "Vị trí",
    field: "viTriCongViecText",
    type: TYPE.TEXT
  },
  {
    name: "Chức danh",
    field: "chucVuText",
    type: TYPE.TEXT
  }
];

export const DON_VI_PHONG_BAN = {
  code: "all",
  name: "Bệnh viện đa khoa",
  filter: [
    {
      code: "1",
      name: "Phòng kế hoạch",
      filter: [{ code: "1.1", name: "Tổng hợp" }]
    },
    {
      code: "2",
      name: "Phòng tổ chức"
    },
    {
      code: "3",
      name: "Khoa khám bệnh",
      filter: [
        { code: "3.1", name: "Đơn nguyên khám" },
        { code: "3.2", name: "Đơn nguyên hồi tích" }
      ]
    }
  ]
};

export enum REF_TAB {
  TT_CO_BAN = "#kt_tab_pane_1",
  TT_LIEN_HE = "#kt_tab_pane_2",
  TT_CONG_VIEC = "#kt_tab_pane_3",
  DAO_TAO_BOI_DUONG = "#kt_tab_pane_4",
  TT_LUONG = "#kt_tab_pane_5",
  HOP_DONG_LAO_DONG = "#kt_tab_pane_6",
  QUA_TRINH_CONG_TAC = "#kt_tab_pane_7",
  TT_CHINH_TRI = "#kt_tab_pane_8",
  TT_GIA_DINH = "#kt_tab_pane_9",
  BAO_HIEM = "#kt_tab_pane_10",
  KINH_NGHIEM_LAM_VIEC = "#kt_tab_pane_11",
  QUY_HOACH = "#kt_tab_pane_12",
  DANH_GIA_PHAN_LOAI = "#kt_tab_pane_13",
  PHUC_LOI = "#kt_tab_pane_14",
  KHEN_THUONG_KY_LUAT = "#kt_tab_pane_15",
  TT_TIEM_CHUNG = "#kt_tab_pane_16",
  TT_KHAC = "#kt_tab_pane_17",
  KIEM_NHIEM = "#kt_tab_pane_18"
}

export const profileTabs: ProfileTab[] = [
  {
    id: 2,
    name: "Thông tin liên hệ",
    ref: REF_TAB.TT_LIEN_HE
  },
  {
    id: 3,
    name: "Thông tin công việc",
    ref: REF_TAB.TT_CONG_VIEC
  },
  {
    id: 4,
    name: "Trình độ đào tạo, bồi dưỡng",
    ref: REF_TAB.DAO_TAO_BOI_DUONG
  },
  {
    id: 5,
    name: "Thông tin lương, phụ cấp",
    ref: REF_TAB.TT_LUONG
  },
  {
    id: 6,
    name: "Hợp đồng lao động",
    ref: REF_TAB.HOP_DONG_LAO_DONG
  },
  {
    id: 7,
    name: "Quá trình công tác",
    ref: REF_TAB.QUA_TRINH_CONG_TAC
  },
  {
    id: 8,
    name: "Thông tin chính trị",
    ref: REF_TAB.TT_CHINH_TRI
  },
  {
    id: 9,
    name: "Thông tin gia đình",
    ref: REF_TAB.TT_GIA_DINH
  },
  {
    id: 10,
    name: "Bảo hiểm",
    ref: REF_TAB.BAO_HIEM
  },
  {
    id: 11,
    name: "Kinh nghiệm làm việc",
    ref: REF_TAB.KINH_NGHIEM_LAM_VIEC
  },
  {
    id: 12,
    name: "Quy hoạch",
    ref: REF_TAB.QUY_HOACH
  },
  {
    id: 13,
    name: "Kết quả đánh giá, phân loại",
    ref: REF_TAB.DANH_GIA_PHAN_LOAI
  },
  {
    id: 14,
    name: "Phúc lợi",
    ref: REF_TAB.PHUC_LOI
  },
  {
    id: 15,
    name: "Khen thưởng, kỷ luật",
    ref: REF_TAB.KHEN_THUONG_KY_LUAT
  },
  {
    id: 16,
    name: "Thông tin tiêm chủng",
    ref: REF_TAB.TT_TIEM_CHUNG
  },
  {
    id: 17,
    name: "Thông tin khác",
    ref: REF_TAB.TT_KHAC
  }
];

export const profileSubTabs: ProfileTab[] = [];

export const INIT_SALARY_INFO: ISalaryInfo = {
  phongBan: null,
  viTriCongViec: null,
  chucVu: null,
  loaiLuong: null,
  bac: null,
  loaiDieuChinhLuong: null,
  tkNganHang: "",
  nganHang: null,
  ngayHuongBatDau: "",
  ngayHuongKetThuc: ""
};

export const salaryTypes = [
  { code: 1, name: "Lương theo ngạch bậc" },
  { code: 2, name: "Lương theo vị trí việc làm" }
];

export const salaryAdjustmentTypes = [
  { code: 1, name: "Điều chỉnh lương thường xuyên" },
  { code: 2, name: "Điều chỉnh lương trước thời hạn" },
  { code: 3, name: "Nâng phụ cấp vượt khung" },
  { code: 4, name: "Điều chỉnh lương đột xuất" },
  { code: 5, name: "Chuyển xếp loại ngạch" },
  { code: 6, name: "Điều chỉnh lương tuyển dụng" },
  { code: 7, name: "Điều chỉnh lương hết tập sự" },
  { code: 8, name: "Xếp lương đối với hợp đồng NĐ 111" },
  { code: 9, name: "Chuyển xếp lương" },
  { code: 10, name: "Khác" }
];

export const salaryRate = [
  { code: 1, name: "100%" },
  { code: 2, name: "95%" },
  { code: 3, name: "85%" },
  { code: 4, name: "80%" },
  { code: 5, name: "70%" }
];

export const generalEducationLevel = [
  { code: 1, name: "1/12" },
  { code: 2, name: "2/12" },
  { code: 3, name: "3/12" },
  { code: 4, name: "4/12" },
  { code: 5, name: "5/12" },
  { code: 6, name: "6/12" },
  { code: 7, name: "7/12" },
  { code: 8, name: "8/12" },
  { code: 9, name: "9/12" },
  { code: 10, name: "10/12" },
  { code: 11, name: "11/12" },
  { code: 12, name: "12/12" }
];

export const INIT_TRAINING_LEVEL: ITrainingLevel = {
  trinhDoGiaoDucPhoThong: null
};

export const INIT_SALARY_DEVELOPMENT: ISalaryDevelopment = {
  id: "",
  bacLuongId: "",
  bacLuongText: "",
  chucDanhId: "",
  chucDanhText: "",
  createDate: "",
  createdBy: "",
  donViCongTacId: "",
  donViCongTacText: "",
  employeeId: "",
  heSoBacLuongId: "",
  heSoBacLuongText: "",
  loaiCanBo: null,
  loaiDieuChinhLuong: null,
  loaiLuong: null,
  luongCoBan: null,
  luongThoaThuan: null,
  modifiedBy: "",
  modifyDate: "",
  ngayHieuLuc: "",
  ngayHuongLuongDenNgay: "",
  ngayHuongLuongTuNgay: "",
  ngayQuyetDinh: "",
  noiQuyetDinh: "",
  phanTramHuong: null,
  phongBanId: "",
  phongBanText: "",
  phuCapThamNienVuotKhung: null,
  phuCapChenhLechBaoLuu: null,
  soQuyetDinh: "",
  thoiGianGiuBacDuKienBatDau: "",
  thoiGianGiuBacDuKienKetThuc: "",
  tinhChatLaoDong: null,
  tyLeHuongLuong: "",
  viTriCongViecId: "",
  viTriCongViecText: "",
  phongBan: null,
  viTriCongViec: null,
  chucDanh: null,
  chucVu: null,
  bacLuong: null,
  bac: null,
  heSoBacLuong: null
};

export const ACADEMIC_RANK: OptionReactSelect[] = [
  {
    code: 1,
    name: "Giáo sư"
  },
  {
    code: 2,
    name: "Phó giáo sư"
  },
  {
    code: 3,
    name: "Tiến sĩ"
  },
  {
    code: 4,
    name: "Thạc sĩ"
  },
  {
    code: 5,
    name: "Khác"
  }
];

export const TITLE_CONFERRED: OptionReactSelect[] = [
  {
    code: 1,
    name: "Thầy thuốc ưu tú"
  },
  {
    code: 2,
    name: "Anh hùng lao động"
  },
  {
    code: 3,
    name: "Anh hùng lực lượng vũ trang"
  },
  {
    code: 4,
    name: "Nhà giáo nhân dân"
  },
  {
    code: 5,
    name: "Nghệ sĩ ưu tú"
  },
  {
    code: 6,
    name: "Thầy thuốc nhân dân"
  },
  {
    code: 7,
    name: "Chiến sỹ thi đua"
  },
  {
    code: 8,
    name: "Nhà giáo ưu tú"
  },
  {
    code: 9,
    name: "Nghệ sĩ nhân dân"
  },
  {
    code: 10,
    name: "Chưa xác định"
  }
];

export const POLICY_CODE = {
  THUONG_BINH: 1,
  LIET_SY: 2,
  ANH_HUNG_VU_TRANG: 3,
  ANH_HUNG_LAO_DONG: 4,
  ME_VNAH: 5,
  BENH_BINH: 6,
  BENH_BINH_DAC_BIET: 7,
  DICH_BAT_TU_DAY: 8,
  QUAN_NHAN_BI_BENH: 9,
  LAO_THANH_CACH_MANG: 10,
  NHU_THUONG_BINH: 11,
  GD_THUONG_BINH: 12,
  GD_LIET_SY: 13,
  THUONG_BINH_DAC_BIET: 14,
  CHAT_DOC_GIA_CAM: 15,
  CON_THUONG_BINH: 16,
  CON_BENH_BINH: 17,
  CON_LIET_SY: 18
}

export const POLICY: OptionReactSelect[] = [
  {
    code: POLICY_CODE.THUONG_BINH,
    name: "Thương binh"
  },
  {
    code: POLICY_CODE.LIET_SY,
    name: "Liệt sỹ"
  },
  {
    code: POLICY_CODE.ANH_HUNG_VU_TRANG,
    name: "Anh hùng lực lượng vũ trang"
  },
  {
    code: POLICY_CODE.ANH_HUNG_LAO_DONG,
    name: "Anh hùng lao động"
  },
  {
    code: POLICY_CODE.ME_VNAH,
    name: "Bà mẹ Việt Nam anh hùng"
  },
  {
    code: POLICY_CODE.BENH_BINH,
    name: "Bệnh binh"
  },
  {
    code: POLICY_CODE.BENH_BINH_DAC_BIET,
    name: "Bệnh binh có thương tật đặc biệt"
  },
  {
    code: POLICY_CODE.DICH_BAT_TU_DAY,
    name: "Gia đình có người địch bắt, tù đày"
  },
  {
    code: POLICY_CODE.QUAN_NHAN_BI_BENH,
    name: "Quân nhân bị bệnh"
  },
  {
    code: POLICY_CODE.LAO_THANH_CACH_MANG,
    name: "Lão thành cách mạng"
  },
  {
    code: POLICY_CODE.NHU_THUONG_BINH,
    name: "Người hưởng chính sách như thương binh"
  },
  {
    code: POLICY_CODE.GD_THUONG_BINH,
    name: "Gia đình thương binh"
  },
  {
    code: POLICY_CODE.GD_LIET_SY,
    name: "Gia đình liệt sỹ"
  },
  {
    code: POLICY_CODE.THUONG_BINH_DAC_BIET,
    name: "Thương binh có thương tật đặc biệt"
  },
  {
    code: POLICY_CODE.CHAT_DOC_GIA_CAM,
    name: "Con người nhiềm chất độc màu da cam"
  },
  {
    code: POLICY_CODE.CON_THUONG_BINH,
    name: "Con thương binh"
  },
  {
    code: POLICY_CODE.CON_BENH_BINH,
    name: "Con bệnh binh"
  },
  {
    code: POLICY_CODE.CON_LIET_SY,
    name: "Con liệt sỹ"
  }
];

export const INIT_TITLE_CONFERRED: ITitleConferred = {
  danhHieu: null,
  namPhongTang: null
};

export const INIT_FAMILY_POLICY: IFamilyPolicy = {
  chinhSach: null,
  hangThuongBinh: null,
  hangThuongBinhId: "",
  hangThuongBinhText: "",
  hinhThucThuongTat: "",
  namThuongTat: null,
  laThuongBinh: false,
  laGiaDinhChinhSach: false,
  laGiaDinhCoCongCachMang: false
};
