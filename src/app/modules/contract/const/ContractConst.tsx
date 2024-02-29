import { OptionReactSelect } from "../../models/models";
import { TYPE } from "../../utils/Constant";
import { useCustomIntl } from "../../utils/FunctionUtils";
import { IAllowance } from "../services/models/IAllowance";
import { IContractAnnexInfo, IContractInfo, OptionType } from "../services/models/IContract";

export const contractDuration: OptionReactSelect[] = [
  {
    code: "1",
    name: "1 tháng",
  },
  {
    code: "2",
    name: "2 tháng",
  },
  {
    code: "3",
    name: "3 tháng",
  },
  {
    code: "4",
    name: "6 tháng",
  },
  {
    code: "4",
    name: "1 năm",
  },
  {
    code: "5",
    name: "3 năm",
  },
];
export const contractAnnex: IContractAnnexInfo[] = [];

export const SUCCESS_CODE = 200;

export const administrativeUnits: OptionType[] = [
  {
    title: "Đơn vị 1",
    value: "1",
  },
  {
    title: "Đơn vị 2",
    value: "2",
  },
  {
    title: "Đơn vị 3",
    value: "3",
  },
];

export const workPositions: OptionType[] = [
  {
    title: "Vị trí 1",
    value: "1",
  },
  {
    title: "Vị trí 2",
    value: "2",
  },
  {
    title: "Vị trí 3",
    value: "3",
  },
];

export const contractTypes: OptionReactSelect[] = [
  {
    code: "1",
    name: "Thử việc",
  },
  {
    code: "2",
    name: "Hợp đồng xác định thời hạn",
  },
  {
    code: "3",
    name: "Hợp đồng không xác định thời hạn",
  },
  {
    code: "4",
    name: "Học việc",
  },
  {
    code: "5",
    name: "Hợp đồng mùa vụ",
  },
  {
    code: "6",
    name: "Hợp đồng dịch vụ",
  },
];

export const workForms: OptionReactSelect[] = [
  {
    code: "1",
    name: "Toàn thời gian",
  },
  {
    code: "2",
    name: "Bán thời gian",
  },
  {
    code: "3",
    name: "Cộng tác viên",
  },
];
export const signinStatus: OptionReactSelect[] = [
  {
    code: 1,
    name: "Chưa ký",
  },
  {
    code: 2,
    name: "Đã ký",
  },
];
export const representtativeTitle: OptionType[] = [
  {
    title: "Chức danh 1",
    value: "1",
  },
  {
    title: "Chức danh 2",
    value: "2",
  },
  {
    title: "Chức danh 3",
    value: "3",
  },
];

export const INIT_ALLOWANCE: IAllowance = {
  id: "",
  employeeId: "",
  hopDongLaoDongId: "",
  tenKhoanPhuCap: null,
  tinhCongHuongLuong: false,
  giaTri: "",
  ghiChu: "",
}

export const INIT_CONTACT: IContractInfo = {
  id: "",
  employeeId: "",
  donViKyHopDong: null,
  viTriCongViec: null,
  soHopDong: "",
  tenHopDong: "",
  nguoiDaiDienCtyKy: null,
  nguoiDaiDienCtyChucDanh: null,
  loaiHopDong: null,
  thoiHanHopDong: null,
  hinhThucLamViec: null,
  ngayCoHieuLuc: "",
  ngayHetHan: "",
  ngayKyHopDong: "",
  luongCoBan: "",
  luongDongBaoHiem: "",
  tyLeHuongLuong: "",
  ghiChu: "",
  fileId: "",
  tenNguoiLaoDong: "",
  employeeCode: "",
  trangThaiKy: null,
  trangThaiHopDong: null,
  employee: undefined,
  phongBan: null,
  vienChuc: false,
  hopDongLaoDong: true,
  caLamViec: null,
  giayUyQuyen: false,
  nguoiDaiDienCtyChucDanhText: "",
  nguoiDaiDienCtyChucDanhId: "",
  nguoiDaiDienCtyKyId: "",
  nguoiDaiDienCtyKyText: ""
}

export const INIT_CONTACT_ANNEX_INFO: IContractAnnexInfo = {
  employeeId: "",
  fileId: "",
  ghiChu: "",
  hopDongGoc: "",
  hopDongLaoDongId: "",
  id: "",
  luongCoBan: "",
  luongDongBaoHiem: "",
  ngayCoHieuLuc: "",
  ngayCoHieuLucPhuLuc: "",
  ngayHetHan: "",
  ngayKy: "",
  soPhuLuc: "",
  tenPhuLuc: "",
  tyLeHuongLuong: "",
  donViKyHopDong: null,
  viTriCongViec: null,
  nguoiDaiDienCtyKy: null,
  nguoiDaiDienCtyChucDanh: null,
  hinhThucLamViec: null,
  loaiHopDong: null,
  thoiHanHopDong: null,
  trangThaiKy: null,
}

export const ListSearch = () => {
  return [
    {
      name: useCustomIntl("CONTRACT.SIGNINGDATE"),
      field: "ngayKyHopDong",
      type: TYPE.DATE,
    },
    {
      name: useCustomIntl("CONTRACT.NUMBER"),
      field: "soHopDong",
      type: TYPE.TEXT,
    },
    {
      name: useCustomIntl("CONTRACT.WORKERFULLNAME"),
      field: "tenNguoiLaoDong",
      type: TYPE.TEXT,
    },
    {
      name: useCustomIntl("CONTRACT.JOBPOSITION"),
      field: "viTriCongViecText",
      type: TYPE.TEXT,
    },
    {
      name: useCustomIntl("CONTRACT.SIGNINGUNIT"),
      field: "donViKyHopDongText",
      type: TYPE.TEXT,
    },
    {
      name: useCustomIntl("CONTRACT.TYPE"),
      field: "loaiHopDong",
      type: TYPE.SELECT,
      listOption: contractDuration,
    },
    {
      name: useCustomIntl("CONTRACT.DURATION"),
      field: "thoiHanHopDong",
      type: TYPE.DATE,
    },
    {
      name: useCustomIntl("CONTRACT.EFFECTIVEDATE"),
      field: "ngayHetHan",
      type: TYPE.DATE,
    },
    {
      name: useCustomIntl("CONTRACT.EXPIRATIONDATE"),
      field: "ngayCoHieuLuc",
      type: TYPE.DATE,
    },
    {
      name: useCustomIntl("CONTRACT.BASESALARY"),
      field: "luongCoBan",
      type: TYPE.TEXT,
    },
    {
      name: useCustomIntl("CONTRACT.INSURANCECONTRIBUTION"),
      field: "luongDongBaoHiem",
      type: TYPE.TEXT,
    },
    {
      name: useCustomIntl("CONTRACT.SIGNINGSTATUS"),
      field: "trangThaiKy",
      type: TYPE.SELECT,
      listOption: signinStatus,
    },
    {
      name: useCustomIntl("CONTRACT.STATUS"),
      field: "trangThaiHopDong",
      type: TYPE.TEXT,
    },
  ]
} 

export const CODE_HOP_DONG = {
  VIEN_CHUC_DAI_HAN: 1,
  HOP_DONG_DAI_HAN: 5,
  ONE_YEAR: 7
};

export const contractTypeBienChe: OptionReactSelect[] = [
  {
    code: 1,
    name: "Hợp đồng dài hạn"
  },
  {
    code: 2,
    name: "Hợp đồng có thời hạn"
  },
  {
    code: 3,
    name: "Hợp đồng tập sự"
  },
  {
    code: 4,
    name: "Hợp đồng nghị định 111 (HĐ 68 cũ)"
  }
]

export const contractTypeHopDong: OptionReactSelect[] = [
  {
    code: 5,
    name: "Hợp đồng dài hạn"
  },
  {
    code: 6,
    name: "Hợp đồng có thời hạn"
  },
  {
    code: 7,
    name: "Thời hạn 1 năm"
  },
  {
    code: 8,
    name: "Cộng tác viên thường xuyên"
  },
  {
    code: 9,
    name: "Cộng tác viên"
  },
  {
    code: 10,
    name: "Hợp đồng thử việc"
  },
  {
    code: 11,
    name: "Hợp đồng học việc"
  },
  {
    code: 12,
    name: "Hợp đồng đào tạo thực hành"
  }
]

export const workShifts:  OptionReactSelect[] = [
  {
    code: 1,
    name: "Không giới hạn số giờ"
  },
  {
    code: 2,
    name: "40h/tuần"
  },
  {
    code: 3,
    name: "44h/tuần"
  },
  {
    code: 4,
    name: "48h/tuần"
  }
]

export const codeStatusContract = {
  IN_EFFECT: 1,
  EXPIRE: 2,
}

export const contractStatus:  OptionReactSelect[] = [
  {
    code: codeStatusContract.IN_EFFECT,
    name: "Còn hiệu lực"
  },
  {
    code: codeStatusContract.EXPIRE,
    name: "Hết hiệu lực"
  }
]