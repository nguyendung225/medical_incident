import { MedicalIncidentInfo } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";

export interface IPhanTichScyk {
  id: string;
  suCoId: string;
  moTa: string;
  thucHienQuyTrinhChuyenMon: string[];
  nhiemKhuanBenhVien: string[];
  thuocVaDichTruyen: string[];
  mauVaCacChePhamMau: string[];
  thietBiYTe: string[];
  hanhVi: string[];
  taiNanDoiVoiNguoiBenh: string[];
  haTangCoSo: string[];
  quanLyNguonLucToChuc: string[];
  hoSoTaiLieuThuTuc: string[];
  nhomSuCoKhac: string[];
  nhomSuCoKhacText: string;
  dieuTriYLenh: string;
  nhanVien: string[];
  nguoiBenh: string[];
  moiTruongLamViec: string[];
  toChucDichVu: string[];
  yeuToBenNgoai: string[];
  nhomNguyenNhanKhac: string[];
  nhomNguyenNhanKhacText: string;
  hanhDongXuLy: string;
  deXuatKhuyenCaoPhongNgua: string;
  moTaKetQuaPhatHien: string;
  thaoLuanDuaKhuyenCaoNbc: 0;
  phuHopVoiKhuyenCao: 0;
  cuTheKhuyenCao: string;
  tonHaiNguoiBenh: string;
  tonHaiToChuc: string[];
  tonHaiToChucKhacText: string;
  tenNguoiPhanTich: string;
  chucDanhNguoiPhanTich: string;
  ngayPhanTich: string;
  gioPhanTich: string;
  trangThaiXuLy: string | number;
  suCoResp?: MedicalIncidentInfo;
}
