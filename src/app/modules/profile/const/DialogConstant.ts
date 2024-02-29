import { OptionReactSelect } from "../../models/models";
import { IBank, IEthnicLanguageInfo, IForeignLanguageLevelInfo, INationalDefenseInfo, IQualificationInfo, ISpecializeTrainingInfo, IStateManagementInfo, ITQualificationInfo, VaccineInfo } from "../models/DialogModels";
import { IDeduct } from "../models/ProfileModels";

export const typeBasicValue = {
  position: 28,
  positionTitle: 8,
  tonGiao: 13,
  level: 1,
  rank: 2,
  nguyenNganh: 5,
  noiDaoTao: 31
};

export const roleParty = [
  { code: "1", name: "Tổng Bí thư Ban chấp hành TW đảng" },
  { code: "2", name: "Bí thư ban chấp hành" },
  { code: "3", name: "Ủy viên bộ chính trị" },
  { code: "4", name: "Ủy viên TW Đảng" },
  { code: "5", name: "Phó bí thư" },
  { code: "6", name: "Đảng viên" }
];

export const roleUnion = [
  { code: "1", name: "Bí thư thường trực" },
  { code: "2", name: "Phó Bí thư thường trực" },
  { code: "3", name: "Bí thư Ban chấp hành" },
  { code: "4", name: "Phó Bí thư Ban chấp hành" },
  { code: "5", name: "Ủy viên Ban chấp hành" },
  { code: "6", name: "Ủy viên thường trực" },
  { code: "7", name: "Trưởng ban tuyên giáo" },
  { code: "8", name: "Đoàn viên" }
];

export const armyType = [
  { code: "1", name: "Công binh" },
  { code: "2", name: "Đặc công" },
  { code: "3", name: "Hóa học" },
  { code: "4", name: "Pháo binh" },
  { code: "5", name: "Băng - Thiết giáp" }
];

export const militaryRank = [
  { code: "1", name: "Thượng sĩ" },
  { code: "2", name: "Thiếu úy" },
  { code: "3", name: "Trung úy" },
  { code: "4", name: "Thượng úy" },
  { code: "5", name: "Đại úy" },
  { code: "6", name: "Thiếu tá" },
  { code: "7", name: "Trung tá" },
  { code: "8", name: "Thượng tá" },
  { code: "9", name: "Đại tá" },
  { code: "10", name: "Thiếu tướng" },
  { code: "11", name: "Trung tướng" },
  { code: "12", name: "Thượng tướng" },
  { code: "13", name: "Đại tướng" }
];

export const militaryPost = [
  { code: "1", name: "Tiểu đoàn trưởng" },
  { code: "2", name: "Trung đoàn trưởng" },
  { code: "3", name: "Trung đoàn phó" },
  { code: "4", name: "Sư đoàn trưởng" },
  { code: "5", name: "Đại đội trưởng" }
];

export const rankOfWoundedSoldiers = [
  { code: "1", name: "Hạng 1/4" },
  { code: "2", name: "Hạng 2/4" },
  { code: "3", name: "Hạng 3/4" },
  { code: "4", name: "Hạng 4/4" }
];

export const familyElements = [
  { code: 1, name: "Công chức" },
  { code: 2, name: "Bần nông" },
  { code: 3, name: "Bộ đội" },
  { code: 4, name: "Cố nông" },
  { code: 5, name: "Công nhân" },
  { code: 6, name: "Dân nghèo" },
  { code: 7, name: "Địa chủ" },
  { code: 8, name: "Nông dân" },
  { code: 9, name: "Phú nông" },
  { code: 10, name: "Tiểu chú" },
  { code: 11, name: "Viên chức" },
  { code: 12, name: "Tiểu thương" },
  { code: 13, name: "Tiểu tư sản" },
  { code: 14, name: "Trung nông" },
  { code: 15, name: "Khác" }
];

export const selfElement = [
  { code: 1, name: "Công nhân" },
  { code: 2, name: "Bộ đội" },
  { code: 3, name: "Chủ doanh nghiệp" },
  { code: 4, name: "Công chức" },
  { code: 5, name: "Nhà báo" },
  { code: 6, name: "Nhà văn" },
  { code: 7, name: "Nhân viên" },
  { code: 8, name: "Nông dân" },
  { code: 9, name: "Thợ thủ công" },
  { code: 10, name: "Viên chức" },
  { code: 11, name: "Cán bộ" },
  { code: 12, name: "Tri thức" },
  { code: 13, name: "Khác" }
];

export const statusMarry: OptionReactSelect[] = [
  { code: "1", name: "Chưa kết hôn" },
  { code: "2", name: "Đã kết hôn" },
  { code: "3", name: "Ly hôn" },
  { code: "4", name: "Góa chồng" },
  { code: "5", name: "Góa vợ" },
  { code: "6", name: "Ly thân" }
];

export const typeIdentify = [
  { code: 1, name: "Chứng minh nhân dân" },
  { code: 2, name: "Căn cước công dân" }
];

export const listGender = [
  { code: 1, name: "Nam" },
  { code: 2, name: "Nữ" },
  { code: 4, name: "Khác" }
];

export const natureOfWork = [
  { code: "1", name: "Học việc" },
  { code: "2", name: "Thử việc" },
  { code: "3", name: "Tập sự" },
  { code: "4", name: "Chính thức" },
  { code: "5", name: "Cộng tác viên" },
];

export const listContractType = [
  { code: "1", name: "Thử việc" },
  { code: "2", name: "Hợp đồng xác định thời hạn" },
  { code: "3", name: "Hợp đồng không xác định thời hạn" },
  { code: "4", name: "Học việc" },
  { code: "5", name: "Hợp đồng mùa vụ" },
  { code: "6", name: "Hợp đồng dịch vụ" }
];

export const allowances = [
  { code: "1", name: "Lương ngày công (lương cơ bản theo tháng)" },
  { code: "2", name: "Lương doanh số" },
  { code: "3", name: "Khen thưởng cho nhân viên" },
  { code: "4", name: "Phụ cấp điện thoại" },
  { code: "5", name: "Phụ cấp đi lại" },
  { code: "6", name: "Phụ cấp trách nhiệm" },
  { code: "7", name: "Quà lễ tết" }
];

export const listBloodType = [
  {
    code: "1",
    name: "A"
  },
  {
    code: "2",
    name: "B"
  },
  {
    code: "3",
    name: "AB"
  },
  {
    code: "4",
    name: "O"
  }
];

export const WORKING_CODE = 1;
export const HAS_RETIRED_CODE = 2;

export const employmentStatus = [
  { code: WORKING_CODE, name: "Đang làm việc" },
  { code: HAS_RETIRED_CODE, name: "Đã nghỉ việc" }
];

export const listMuiTiem = [
  { code: 1, name: "Mũi 1" },
  { code: 2, name: "Mũi 2" },
  { code: 3, name: "Mũi 3" },
  { code: 4, name: "Mũi 4" },
  { code: 5, name: "Mũi 5" },
  { code: 6, name: "Mũi 6" }
];

export const STRING_TYPE = "string";

export enum TYPE_OF {
  NUMBER = "number",
  STRING = "string",
  OBJECT = "object"
}

export const INIT_DEDUCT: IDeduct = {
  tenKhoanKhauTru: null,
  giaTri: "",
  tinhCongHuongLuong: false
}

export const INIT_QUALIFICATION_INFO: IQualificationInfo = {
  nuocDaoTao: null,
  coSoDaoTao: null,
  tuNgay: null,
  denNgay: null,
  hinhThucDaoTao: null,
  trinhDoDaoTao: null,
  chuyenNganhDaoTao: null,
  xepLoai: null,
  coSoDaoTaoKhac: "",
  chuyenNganhDaoTaoKhac: "",
}

export const INIT_STATE_MANAGEMENT_INFO: IStateManagementInfo = {
  daoTaoTuNgay: null,
  daoTaoDenNgay: null,
  trinhDoQuanLy: null,
  coSoDaoTao: null,
  coSoDaoTaoKhac: "",
}

export const INIT_IT_QUALIFICATION_INFO: ITQualificationInfo = {
  daoTaoTuNgay: null,
  daoTaoDenNgay: null,
  trinhDoTinHoc: null,
  coSoDaoTao: null,
  coSoDaoTaoKhac: "",
  thoiGianHieuLucTuNgay: null,
  thoiGianHieuLucDenNgay: null
}

export const INIT_FOREIGN_LANGUAGE_LEVEL_INFO: IForeignLanguageLevelInfo = {
  daoTaoTuNgay: null,
  daoTaoDenNgay: null,
  ngoaiNgu: null,
  trinhDoNgoaiNgu: null,
  coSoDaoTao: null,
  coSoDaoTaoKhac: ""
}

export const INIT_NATIONAL_DEFENSE_INFO: INationalDefenseInfo = {
  daoTaoTuNgay: null,
  daoTaoDenNgay: null,
  vanBang: "",
  coSoDaoTao: null,
  coSoDaoTaoKhac: "",
}

export const INIT_SPECIALIZE_TRAINING_INFO: ISpecializeTrainingInfo = {
  tenKhoaHocChungChi: "",
  daoTaoTuNgay: "",
  daoTaoDenNgay: "",
  coSoDaoTao: null,
}

export const INIT_ETHNIC_LANGUAGE_INFO: IEthnicLanguageInfo = {
  tiengDanToc: "",
  daoTaoTuNgay: "",
  daoTaoDenNgay: "",
  coSoDaoTao: null,
  coSoDaoTaoKhac: "",
  hinhThucDaoTao: null
}

export const INIT_BANK: IBank = {
  tkNganHang: "",
  nganHangId: "",
  nganHangText: "",
  chiNhanh: "",
  nganHang: null
}

export const INIT_VACCINE: VaccineInfo = {
  diaDiemTiem: "",
  employeeId: "",
  lanTiemTiepTheo: "",
  loaiVacxin: "",
  luuY: "",
  muiTiem: null,
  ngayTiem: "",
  phongBenhId: "",
  phongBenhText: "",
  tinhTrangSkSauTiem: "",
  phongBenh: null
}

export const CODE_HDLD = {
  HOP_DONG_UNDEFINED: 3,
  HOP_DONG_LD: 6
}