import { MedicalIncidentInfo } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";

export interface NguoiThamDuXacMinh {
    orgId?: string | null;
    bienBanXacMinhId: string;
    name: string;
    maChucVu: string;
    donVi: string;
    donViId: string;
    isActive?: boolean;
    tenChucVu?: string;
    tenDonVi?: string
}

export interface IBienBanXacMinh {
    id: string;
    orgId: string | null;
    hoiXacMinh?: string
    ngayXacMinh?: string
    hoiKetThuc?: string
    ngayKetThuc?: string
    thangKetThuc?: string
    namKetThuc?: string
    ngayGioXacMinh: string;
    noiXacMinh: string;
    tenNguoiChuTri: string;
    maChucVuNguoiChuTri: string;
    donViNguoiChuTri: string;
    tenThanhVienDoan: string;
    maChucVuThanhVienDoan: string;
    donViThanhVienDoan: string;
    tenNguoiChungKien: string;
    maChucVuNguoiChungKien: string;
    donViNguoiChungKien: string;
    nguoiThamDus: NguoiThamDuXacMinh[];
    veViec: string;
    ketQua: string;
    yKien: string;
    ngayGioKetThuc: string;
    soTrang: number | null;
    soBan: number | null;
    isNguoiChuTriKy: boolean | null | number;
    isNguoiChungKienKy: boolean | null | number;
    isNguoiThamDuKy: boolean | null | number;
    isThanhVienDoanKy: boolean | null | number;
    isNguoiLapKy: boolean | null | number;
    trangThai: number;
    isActive: boolean;
    benhNhanId: string;
    maBenhNhan: string;
    tenBenhNhan: string;
    khoaPhongDieuTri: string;
    suCoId: string;
    tenSuCo: string;
    maSuCo: string;
    hinhThuc: number;
    phanLoaiSuCo: number;
    ngayTao: string;
    suCoResp?: MedicalIncidentInfo;
    tenChucVuNguoiChuTri?: string
    tenChucVuNguoiChungKien?: string
    tenChucVuThanhVienDoan?: string
    tenDonViNguoiChuTri?: string
    tenDonViNguoiChungKien?: string
    tenDonViThanhVienDoan?: string

}

