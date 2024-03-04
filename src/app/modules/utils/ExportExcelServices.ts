import axios from "axios";
const API_PATH = process.env.REACT_APP_API_URL;
export const exportHoSo = (searchObject: any) => {
  let url = `${API_PATH}/download-excel/danh-sach-ho-so`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject,
  });
};
export const exportBangCap = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-bang-cap`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportChungChi = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-chung-chi`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportPoliticalTheory = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-ly-luan-chinh-tri`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportTrainingProcess = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-qt-boi-duong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportGiaDinh = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-gia-dinh`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportTiemChung = (id: string | string[]) => {
  let url = `${API_PATH}/download-excel/danh-sach-tiem-chung`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id.toString() },
  });
};
export const exportKinhNghiem = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-kinh-nghiem-lam-viec`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportCongTac = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-qua-trinh-cong-tac`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportKiemNhiem = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-kiem-nhiem`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportLichSuLuong = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-lich-su-luong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportGiayTo = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-giay-to-co-thoi-han`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportTepDinhKem = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-tai-lieu-dinh-kem`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportKhauTru = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-khau-tru`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportPhuCap = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-phu-cap`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportPhucLoi = () => {
  let url = `${API_PATH}/download-excel/danh-sach-phuc-loi`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};
export const exportPhucLoiThamGia = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-tham-gia-phuc-loi`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { phucLoiId: id },
  });
};
export const exportPhucLoiThamGiaChiTiet = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-tham-gia-phuc-loi-chi-tiet`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportSuCo = () => {
  let url = `${API_PATH}/download-excel/danh-sach-su-co`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};
export const exportSuCoNhanVien = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-su-co-nhan-vien`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { keyword: id },
  });
};
export const exportHopDong = (searchObject: any) => {
  let url = `${API_PATH}/download-excel/danh-sach-hop-dong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject,
  });
};
export const exportHopDongPhuCap = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-cac-khoan-phu-cap`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { hopDongLaoDongId: id }, //
  });
};
export const exportHopDongPhuLuc = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-phu-luc-hop-dong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { hopDongLaoDongId: id },
  });
};
export const exportThuyenChuyen = (searchObject?: any) => {
  let url = `${API_PATH}/download-excel/danh-sach-thuyen-chuyen`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};
export const exportBoNhiem = () => {
  let url = `${API_PATH}/download-excel/danh-sach-bo-nhiem`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};
export const exportMienNhiem = (searchObject: any) => {
  let url = `${API_PATH}/download-excel/danh-sach-mien-nhiem`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject || {},
  });
};
export const exportNghiViec = (searchObject: any) => {
  let url = `${API_PATH}/download-excel/danh-sach-nhan-vien-nghi-viec`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: searchObject,
  });
};
export const exportKhenThuong = () => {
  let url = `${API_PATH}/download-excel/danh-sach-khen-thuong`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};
export const exportDeXuat = () => {
  let url = `${API_PATH}/download-excel/danh-sach-de-xuat`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};
export const exportTiepNhan = () => {
  let url = `${API_PATH}/download-excel/danh-sach-tiep-nhan`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: {},
  });
};

export const exportKhenThuongChiTiet = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-khen-thuong-chi-tiet`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { khenThuongId: id },
  });
};

export const exportLuanChuyengChiTiet = (id: string) => {
  let url = `${API_PATH}/download-excel/danh-sach-luan-chuyen-chi-tiet`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
    data: { khenThuongId: id },
  });
};
