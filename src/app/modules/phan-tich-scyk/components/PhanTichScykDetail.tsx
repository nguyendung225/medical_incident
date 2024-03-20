import moment from "moment";
import { OPTION_XAC_NHAN, printStyles } from "../../bao-cao-su-co-y-khoa/const/constants";
import {
    HANH_VI_OPTIONS,
    HA_TANG_CO_SO_OPTIONS,
    HO_SO_TAI_LIEU_OPTIONS,
    KHAC_OPTIONS,
    MAU_VA_CAC_CHE_PHAM_MAU_OPTIONS,
    MOI_TRUONG_LAM_VIEC_OPTIONS,
    MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS,
    MUC_DO_TON_THUONG_TREN_TO_CHUC_OPTIONS,
    NHAN_VIEN_HOAC_NGUOI_BENH_OPTIONS,
    NHIEM_KHUAN_BENH_VIEN_OPTIONS,
    QUAN_LY_NGUON_LUC_TO_CHUC_OPTIONS,
    TAI_NAN_DOI_VOI_NGUOI_BENH_OPTIONS,
    THIET_BI_Y_TE_OPTIONS,
    THUOC_VA_DICH_TRUYEN_OPTIONS,
    THU_THUAT_KY_THUAT_CHUYEN_MON_OPTIONS,
    TO_CHUC_DICH_VU_OPTIONS,
    YEU_TO_BEN_NGOAI_OPTIONS
} from "../constants/constants";
import { IPhanTichScyk } from "../models/PhanTichSCYKModels";
import { MedicalIncidentInfo } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";

type TProps = {
    phanTichScyk: IPhanTichScyk,
    thongTinScyk: MedicalIncidentInfo,
}

const PhanTichsScykDetail = ({ phanTichScyk, thongTinScyk }: TProps) => {

    return (
        <div style={printStyles.container} id="in-phieu-phan-tich-scyk">
            <div style={printStyles.formTitle}>PHIẾU TÌM HIỂU VÀ PHÂN TÍCH SỰ CỐ</div>
            <div style={printStyles.fontWeight.bold}>Số báo cáo/Mã số sự cố: {thongTinScyk?.code}</div>
            <div style={printStyles.contentTitle}>A. Dành cho nhân viên chuyên trách</div>
            <div style={printStyles.contentTitle}>I. Mô tả chi tiết sự cổ</div>
            <div>{phanTichScyk?.moTa}</div>
            <div style={printStyles.contentTitle}>II. Phân loại sự cố theo nhóm sự cố (Incident type)</div>
            <div style={printStyles.fontWeight.bold}>1. Thực hiện quy trình kỹ thuật, thủ thuật chuyên môn</div>
            {THU_THUAT_KY_THUAT_CHUYEN_MON_OPTIONS.map(item => (
                <div style={printStyles.d_flex_align_center}>
                    <div style={printStyles.box_square}>
                        <span style={phanTichScyk?.thucHienQuyTrinhChuyenMon?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                    </div>
                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                </div>
            ))}
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>2. Nhiễm khuẩn bệnh viện</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {NHIEM_KHUAN_BENH_VIEN_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.nhiemKhuanBenhVien?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>3. Thuốc và dịch truyền</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {THUOC_VA_DICH_TRUYEN_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.thuocVaDichTruyen?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>4. Máu và các chế phẩm máu</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {MAU_VA_CAC_CHE_PHAM_MAU_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.mauVaCacChePhamMau?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>5. Thiết bị y tế</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {THIET_BI_Y_TE_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.thietBiYTe?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>6. Hành vi</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {HANH_VI_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.hanhVi?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.d_flex_align_center, ...printStyles.marginTop._10px }}>
                <div style={printStyles.fontWeight.bold}>7. Tai nạn đối với người bệnh</div>
                {TAI_NAN_DOI_VOI_NGUOI_BENH_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.marginLeft._10px }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.taiNanDoiVoiNguoiBenh?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>8. Hạ tầng cơ sở</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {HA_TANG_CO_SO_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.haTangCoSo?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>9. Quản lý nguồn lực, tổ chức</div>
            {QUAN_LY_NGUON_LUC_TO_CHUC_OPTIONS.map(item => (
                <div style={printStyles.d_flex_align_center}>
                    <div style={printStyles.box_square}>
                        <span style={phanTichScyk?.quanLyNguonLucToChuc?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                    </div>
                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                </div>
            ))}
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>10. Hồ sơ tài liệu, thủ tục, hành chính</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {HO_SO_TAI_LIEU_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.hoSoTaiLieuThuTuc?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.d_flex_align_center, ...printStyles.marginTop._10px }}>
                <div style={printStyles.fontWeight.bold}>11. Khác</div>
                {KHAC_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.marginLeft._10px }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.nhomSuCoKhac?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={printStyles.contentTitle}>
                III. Điều trị y lệnh đã được thực hiện
            </div>
            <div>{phanTichScyk?.dieuTriYLenh}</div>
            <div style={printStyles.contentTitle}>
                IV. Phân tích sự cố theo nhóm nguyên nhân xảy ra sự cố
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>1. Nhân viên</div>
            {NHAN_VIEN_HOAC_NGUOI_BENH_OPTIONS.map(item => (
                <div style={printStyles.d_flex_align_center}>
                    <div style={printStyles.box_square}>
                        <span style={phanTichScyk?.nhanVien?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                    </div>
                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                </div>
            ))}
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>2. Người bệnh</div>
            {NHAN_VIEN_HOAC_NGUOI_BENH_OPTIONS.map(item => (
                <div style={printStyles.d_flex_align_center}>
                    <div style={printStyles.box_square}>
                        <span style={phanTichScyk?.nguoiBenh?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                    </div>
                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                </div>
            ))}
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>3. Môi trường làm việc</div>
            {MOI_TRUONG_LAM_VIEC_OPTIONS.map(item => (
                <div style={printStyles.d_flex_align_center}>
                    <div style={printStyles.box_square}>
                        <span style={phanTichScyk?.moiTruongLamViec?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                    </div>
                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                </div>
            ))}
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>4. Tổ chức/dịch vụ</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {TO_CHUC_DICH_VU_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.toChucDichVu?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginTop._10px }}>5. Yếu tố bên ngoài</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {YEU_TO_BEN_NGOAI_OPTIONS.map(item => (
                    <div style={{ ...printStyles.d_flex_align_center, ...printStyles.width._48persent }}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.yeuToBenNgoai?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...printStyles.d_flex_align_center, ...printStyles.marginTop._10px }}>
                <div style={printStyles.fontWeight.bold}>6. Khác</div>
                <div style={{ ...printStyles.d_flex_align_center, ...printStyles.marginLeft._10px }}>
                    <div style={printStyles.box_square}>
                        <span style={phanTichScyk?.nhomNguyenNhanKhac?.includes("1") ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                    </div>
                    <span style={printStyles.marginLeft._10px}>
                        Các yếu tố không đề cập trong các mục từ 1 đến 5
                    </span>
                </div>
            </div>
            <div style={printStyles.d_flex_j_between}>
                <div style={printStyles.width._48persent}>
                    <div style={printStyles.contentTitle}>V. Hành động khắc phục sự cố</div>
                    <div>{phanTichScyk?.hanhDongXuLy}</div>
                </div>
                <div style={printStyles.width._48persent}>
                    <div style={printStyles.contentTitle}>VI. Đề xuất, khuyến cáo phòng ngừa</div>
                    <div>{phanTichScyk?.deXuatKhuyenCaoPhongNgua}</div>
                </div>
            </div>
            <div style={printStyles.contentTitle}>B. Dành cho cấp quản lý</div>
            <div style={printStyles.contentTitle}>I. Dánh giá của trưởng nhóm chuyên gia</div>
            <div style={printStyles.fontWeight.bold}>Mô tả kết quả phát hiện được (không lặp lại các mô tả sự cố)</div>
            <div>{phanTichScyk?.moTaKetQuaPhatHien}</div>
            <div style={printStyles.fontWeight.bold}>Đã thảo luận đưa khuyến cáo/hướng xử lý với người báo cáo</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {OPTION_XAC_NHAN.map(item => (
                    <div style={printStyles.d_flex_align_center}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.thaoLuanDuaKhuyenCaoNbc === item.code ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={printStyles.fontWeight.bold}>Phù hợp với các khuyến cáo chính thức được ban hành Ghi cụ thể khuyến cáo:</div>
            <div style={{ ...printStyles.d_flex_j_between, ...printStyles.d_flex_wrap }}>
                {OPTION_XAC_NHAN.map(item => (
                    <div style={printStyles.d_flex_align_center}>
                        <div style={printStyles.box_square}>
                            <span style={phanTichScyk?.phuHopVoiKhuyenCao === item.code ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                        </div>
                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div style={printStyles.contentTitle}>II. Đánh giá mức độ tổn thương</div>
            <div style={printStyles.d_flex}>
                <div style={printStyles.width._60persent}>
                    <div style={printStyles.fontWeight.bold}>Trên người bệnh</div>
                    <div style={printStyles.d_flex}>
                        <div style={printStyles.width._60persent}>1. Chưa xảy ra (NC0)</div>
                        {MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.CHUA_XAY_RA.map(item => (
                            <div style={printStyles.d_flex_align_center}>
                                <div style={printStyles.box_square}>
                                    <span style={phanTichScyk?.tonHaiNguoiBenh === item.code ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                </div>
                                <span style={printStyles.marginLeft._10px}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                    <div style={printStyles.d_flex}>
                        <div style={printStyles.width._60persent}>2. Tổn thương nhẹ (NC1)</div>
                        <div>
                            {MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.NHE.map(item => (
                                <div style={printStyles.d_flex_align_center}>
                                    <div style={printStyles.box_square}>
                                        <span style={phanTichScyk?.tonHaiNguoiBenh === item.code ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                    </div>
                                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={printStyles.d_flex}>
                        <div style={printStyles.width._60persent}>3. Tồn thương trung bình (NC2)</div>
                        <div>
                            {MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.TRUNG_BINH.map(item => (
                                <div style={printStyles.d_flex_align_center}>
                                    <div style={printStyles.box_square}>
                                        <span style={phanTichScyk?.tonHaiNguoiBenh === item.code ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                    </div>
                                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={printStyles.d_flex}>
                        <div style={printStyles.width._60persent}>4. Tồn thương nặng (NC3)</div>
                        <div>
                            {MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.NANG.map(item => (
                                <div style={printStyles.d_flex_align_center}>
                                    <div style={printStyles.box_square}>
                                        <span style={phanTichScyk?.tonHaiNguoiBenh === item.code ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                    </div>
                                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={printStyles.width._40persent}>
                    <div style={printStyles.fontWeight.bold}>Trên tổ chức</div>
                    {MUC_DO_TON_THUONG_TREN_TO_CHUC_OPTIONS.map(item => (
                        <div style={printStyles.d_flex_align_center}>
                            <div style={printStyles.box_square}>
                                <span style={phanTichScyk?.tonHaiToChuc?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                            </div>
                            <span style={printStyles.marginLeft._10px}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div style={printStyles.d_flex}>
                <div style={printStyles.width._48persent}>
                    <span style={printStyles.fontWeight.bold}>Tên: </span> <span> {phanTichScyk?.tenNguoiPhanTich}</span>
                </div>
                <div style={printStyles.width._48persent}>
                    <span style={printStyles.fontWeight.bold}>Ký tên: </span>
                </div>
            </div>
            <div style={printStyles.d_flex}>
                <div style={printStyles.width._48persent}>
                    <span style={printStyles.fontWeight.bold}>Chức danh: </span>
                    <span>{phanTichScyk?.chucDanhNguoiPhanTich}</span>
                </div>
                <div style={printStyles.width._48persent}>
                    <span style={printStyles.fontWeight.bold}>Ngày: </span>  <span> {moment(phanTichScyk?.ngayPhanTich).format("DD/MM/YYYY")} </span>
                    <span style={printStyles.fontWeight.bold}>Giờ: </span>
                </div>
            </div>
            <div style={printStyles.marginTop._20px}>
                <div>[1] Tốn thương nhẹ là tổn thượng tự hồi phục hoặc không cần can thiệp điều trị</div>
                <div>[2] Tồn thương trung bình là tổn thương đòi hỏi can thiệp điều trị, kéo dài thời gian nằm viện, ảnh hưởng đến chức năng lâu dài.</div>
                <div>[3] Tổn thương nặng là tồn thương đòi hỏi phải cấp cứu hoặc can thiệp điều trị lớn, gây mất chức năng vĩnh viễn hoặc gây tử vong.</div>
            </div>
        </div>
    )
}

export default PhanTichsScykDetail;