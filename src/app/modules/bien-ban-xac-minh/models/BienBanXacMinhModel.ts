interface NguoiThamDuXacMinh {
    orgId: string;
    bienBanXacMinhId: string;
    name: string;
    maChucVu: string;
    donVi: string;
    isActive: boolean;
}

export interface IBienBanXacMinh {
    id: string;
    orgId: string;
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
    nguoiThamDuXacMinhs: NguoiThamDuXacMinh[] | null;
    veViec: string;
    ketQua: string;
    yKien: string;
    ngayGioKetThuc: string;
    soTrang: number;
    soBan: number;
    isNguoiChuTruKy: boolean;
    isNguoiChungKienKy: boolean;
    isThanhVienDoanKy: boolean;
    isNguoiLapKy: boolean;
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
}

