import { OptionReactSelect } from "../../models/models";
import { IAllowance, ILoaiPhuCap } from "../services/models/IAllowance";
import { OptionType } from "../services/models/IContract";

export const allowanceOpt: OptionReactSelect[] = [
  {
    name: "Lương ngày công",
    code: "1"
  },
  {
    name: "Lương doanh số",
    code: "2"
  },
  {
    name: "Khen thưởng nhân viên",
    code: "3"
  },
  {
    name: "Phụ cấp điện thoại",
    code: "4"
  },
  {
    name: "Phụ cấp đi lại",
    code: "5"
  },
  {
    name: "Phụ cấp trách nhiệm",
    code: "6"
  },
  {
    name: "Quà lễ tết",
    code: "7"
  }
];

export const deductOpt: OptionReactSelect[] = [
  {
    name: "Phạt vi phạm quy trình",
    code: "1"
  },
  {
    name: "Phạt vi phạm giờ giấc",
    code: "2"
  },
  {
    name: "Phạt vi phạm trang phục",
    code: "3"
  },
  {
    name: "Phạt vi phạm vệ sinh",
    code: "4"
  }
];

export const heSoPhanTramGiaTri = {
  COEFFICIENT: "1",
  PERCENT: "2",
  MONEY: "3"
}

export const coGiaHan = {
  KHONG_TICH: "0",
  BHXH: "1",
  CO_GIA_HAN: "2",
  BOTH: "3"
}

export const loaiPhuCapList: ILoaiPhuCap[] = [
  {
    code: "1",
    name: "Phụ cấp kiêm nhiệm",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.PERCENT,
    coGiaHan: coGiaHan.CO_GIA_HAN
  },
  {
    code: "2",
    name: "Phụ cấp khu vực",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.COEFFICIENT,
    coGiaHan: coGiaHan.BOTH
  },
  {
    code: "3",
    name: "Phụ cấp đặc biệt",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.MONEY,
    coGiaHan: coGiaHan.CO_GIA_HAN
  },
  {
    code: "4",
    name: "Phụ cấp thu hút",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.PERCENT,
    coGiaHan: coGiaHan.BOTH
  },
  {
    code: "5",
    name: "Phụ cấp lưu động",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.COEFFICIENT,
    coGiaHan: coGiaHan.BOTH
  },
  {
    code: "6",
    name: "Phụ cấp độc hại, nguy hiểm",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.COEFFICIENT,
    coGiaHan: coGiaHan.BHXH
  },
  {
    code: "7",
    name: "Phụ cấp thâm niên nghề",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.PERCENT,
    coGiaHan: coGiaHan.BOTH
  },
  {
    code: "8",
    name: "Phụ cấp trách nhiệm công việc",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.COEFFICIENT,
    coGiaHan: coGiaHan.BOTH
  },
  {
    code: "9",
    name: "Phụ cấp chức vụ lãnh đạo",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.COEFFICIENT,
    coGiaHan: coGiaHan.BOTH
  },
  {
    code: "10",
    name: "Phụ cấp ưu đãi theo nghề",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.PERCENT,
    coGiaHan: coGiaHan.CO_GIA_HAN
  },
  {
    code: "11",
    name: "Phụ cấp công vụ",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.MONEY,
    coGiaHan: coGiaHan.CO_GIA_HAN
  },
  {
    code: "12",
    name: "Phụ cấp công tác đảng",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.PERCENT,
    coGiaHan: coGiaHan.KHONG_TICH
  },
  {
    code: "13",
    name: "Phụ cấp khác",
    heSoPhanTramGiaTri: heSoPhanTramGiaTri.COEFFICIENT,
    coGiaHan: coGiaHan.KHONG_TICH
  }
];


export const INIT_ALLOWANCE: IAllowance = {
  id: "",
  employeeId: "",
  hopDongLaoDongId: "",
  tenKhoanPhuCap: null,
  tinhCongHuongLuong: false,
  ghiChu: "",
  hinhThucHuong: "",
  heSoPhanTramHuong: "",
  phuCapBHXH: false,
  coGiaHan: false,
  thoiGianHieuLucBatDau: null,
  thoiGianHieuLucKetThuc: null,
  taiLieuDinhKem: ""
}