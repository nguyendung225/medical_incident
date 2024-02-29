import { BenhNhan } from "../models/ReportModels";

export const DATA_IMPORT: BenhNhan[] = [
 
];

export const DOI_TUONG_BENH_NHAN = [
  { code: 1, name: "Bảo hiểm" },
  { code: 2, name: "Dân" },
  { code: 3, name: "Viện phí" },
  { code: 4, name: "Yêu cầu" },
  { code: 5, name: "Miễn phí" },
];

export const DON_TIEP_CCCD = [
  { code: 0, name: "Có" },
  { code: 1, name: "Không" },
];

export const GIOI_TINH = [
  { code: 0, name: "Nam" },
  { code: 1, name: "Nữ" },
  { code: 2, name: "LGBT" },
  { code: 3, name: "Khác" },
];

export const HINH_THUC_VAO_KHOA = [
  { code: 1, name: "Điều trị kết hợp" },
  { code: 2, name: "Nhập viện" },
  { code: 3, name: "Khoa cấp cứu" },
  { code: 4, name: "Khoa khác chuyển đến" },
  { code: 5, name: "Bắt đầu đối tượng điều trị mới" },
];

export const TUYEN_KHAM_CHUA_BENH = [
  { code: 1, name: "Đúng tuyến" },
  { code: 2, name: "Đúng tuyến (cấp cứu)" },
  { code: 3, name: "Đúng tuyến (giới thiệu)" },
  { code: 4, name: "Đúng tuyến (giấy hẹn)" },
  { code: 5, name: "Trái tuyến" },
  { code: 6, name: "Thông tuyến huyện" },
  { code: 7, name: "Trái tuyến (thông tuyến tỉnh)" },
];

export const XU_TRI = [
  { code: 1, name: "Chuyển khoa" },
  { code: 2, name: "Đang điều trị" },
  { code: 3, name: "Xin về" },
  { code: 4, name: "Ra viện" },
  { code: 5, name: "Chờ nhập viện" },
  { code: 6, name: "Chuyển phòng khám" },
  { code: 7, name: "Cấp toa cho về" },
  { code: 8, name: "Bỏ khám" },
  { code: 9, name: "Tử vong" },
  { code: 10, name: "Kết thúc khám bệnh" },
];
export const DOI_TUONG_BHYT = [
  { code: 1, name: "Chính sách" },
  { code: 2, name: "Quân nhân" },
  { code: 3, name: "Thân nhân" },
  { code: 4, name: "Thường" },
  { code: 5, name: "Trẻ em < 6T" },
  { code: 6, name: "Người dân" },
  { code: 7, name: "Quốc tế" },
];

export const LIST_KHOA_PHONG=[
    { code: "083ee115-83d1-11ee-a024-0242ac110002", name: "Khoa ngoại trú" },
    { code: "0b8ddf31-83d1-11ee-a024-0242ac110002", name: "Khoa phẫu thuật" },
    { code: "0ddf70d6-83d1-11ee-a024-0242ac110002", name: "Khoa Y học hình ảnh" },
    { code: "5d5c3c7a-83d1-11ee-a024-0242ac110002", name: "Khoa sản nhi" },
    { code: "60b7ed2d-380a-4440-96f0-9c0022cb32e5", name: "Khoa nhi" },
  ]