import { formData } from "./ReportModels";

export const INIT_REPORT_DATA: formData = {
  fromDate: "",
  toDate: "",
  khoaBaoCao: null,
  maKhoaPhong: "",
  dieuDuongTongSo: null,
  dieudDuongHienCo: null,
  dieuDuongVang: null,
  dieuDuongTrucTongSo: null,
  dieuDuongTruc: null,
  dieuDuongNghiOmTongSo: null,
  dieuDuongNghiOm: null,
  dieuDuongNghiTrucTongSo:null,
  dieuDuongNghiTruc: null,
  dieuDuongCongTacTongSo:null,
  dieuDuongCongTac: null,
  dieuDuongDiHocTongSo:null,
  danhSachDiHoc: null,
  dieuDuongChoHuuTongSo:null,
  dieuDuongChoHuu: null,
  dieuDuongNghiKhacTongSo:null,
  dieuDuongNghiKhac: null,
  soLuongDangCongTac: null,
  soLuongNghiHuu: null,
};

export const listGender = [
  { code: 1, name: "Nam" },
  { code: 2, name: "Nữ" },
  { code: 4, name: "Khác" },
];

export const listNurse = [
  { code: 1, name: "Nam" },
  { code: 2, name: "Hoàng" },
  { code: 3, name: "Linh" },
  { code: 4, name: "Huy" },
  { code: 5, name: "Sơn" },
  { code: 6, name: "Trung" },
  { code: 7, name: "Thắng" },
];