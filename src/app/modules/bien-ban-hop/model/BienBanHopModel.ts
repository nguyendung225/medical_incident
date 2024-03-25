import { MedicalIncidentInfo } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";

export interface IBienBanHop {
    id: string;
    departmentId: string;
    code: string;
    bienBan: string;
    name: string;
    suCoId: string;
    ngayGioHop: string;
    ngayHop: string;
    gioHop: string;
    diaDiem: string;
    noiDung: string;
    chuTriObj?: any;
    thuKyObj?: any;
    chuTriId: string;
    tenChuTri: string;
    tenChucDanhChuTri: string;
    chucDanhChuTriId?: string;
    chucVuChuTriId?: string;
    tenChucVuChuTri: string;
    thuKyId: string;
    tenThuKy: string;
    tenChucDanhThuKy: string;
    tenChucVuThuKy: string;
    chucDanhThuKyId?: string;
    chucVuThuKyId?: string;
    nguoiTrinhBayId: string;
    tenNguoiTrinhBay: string;
    trinhBayObj?: any;
    tenChucDanhNguoiTrinhBay: string;
    tenChucVuNguoiTrinhBay: string;
    chucVuNguoiTrinhBayId?: string;
    chucDanhNguoiTrinhBayId?: string;
    soThanhVienCoMat: number | null;
    tongSo: number | null;
    tomTatNoiDung: string;
    thaoLuan: string;
    yKien: string;
    bieuQuyet: string;
    ngayGioKetThuc: string;
    ngayKetThuc: string;
    gioKetThuc: string;
    noiNhan: string[] | string;
    isChuTriKy: boolean | number | null;
    isThuKyKy: boolean | number | null;
    trangThaiXuLy: number;
    ketLuan: string;
    isActive: boolean;
    suCoResp?: MedicalIncidentInfo
    fileDinhKems?: any

}
