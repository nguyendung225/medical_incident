import moment from "moment";
import { MedicalIncidentInfo } from "../models/BaoCaoSCYKModels";
import { DOI_TUONG_XAY_RA_SC, OPTION_HINH_THUC_BC, OPTION_MUC_DO_AH, OPTION_PHAN_LOAI, OPTION_XAC_NHAN, TT_NGUOI_THONG_BAO } from "../const/constanst";
import { convertGenderToString } from "../../utils/FormatUtils";

export const styles = {
    box_square: {
        display: "inline-block",
        border: "1px solid #333",
        width: "15px",
        height: "15px",
        margin: "0 1px",
        position: "relative" as "relative",
    },
    checked: {
        position: "absolute" as "absolute",
        top: "-4px",
        left: "1px"
    },
    d_none: {
        display: "none",
    },
    d_flex: {
        display: "flex",
    },
    d_flex_align_center: {
        display: "flex",
        alignItems: "center",
    },
    d_flex_j_between: {
        display: "flex",
        justifyContent: "space-between",
    },
    width: {
        _30persent: {
            width: "30%"
        },
        _40persent: {
            width: "40%"
        },
        _48persent: {
            width: "48%"
        },
        _60persent: {
            width: "60%"
        }
    },
    marginLeft: {
        _10px: {
            marginLeft: "10px"
        },
    },
    marginTop: {
        _0px: {
            marginTop: "0",
        },
        _10px: {
            marginTop: "10px"
        },
    },
    fontWeight: {
        bold: {
            fontWeight: "bold",
        }
    },
    lable: {
        fontWeight: "bold",
        marginTop: "10px",
    },
    contentTitle: {
        fontWeight: "700",
        marginTop: "10px",
        color: "#1a5e83"
    },
    container: {
        background: "white",
        padding: "10px",
        overflow: "scroll",
        height: "calc(100vh - 160px)",
        marginTop: "3px"
    },
    formTitle: {
        textAlign: "center" as "center",
        fontSize: "15px",
        fontWeight: "600",
        marginBottom: "20px"
    }
};

type TProps = {
    thongTinSCYK: MedicalIncidentInfo;
}

const BaoCaoSCYKDetail = ({ thongTinSCYK }: TProps) => {
    return (
        <div style={styles.container} id="in-phieu-bao-cao-scyk">
            <div style={styles.formTitle}>PHIẾU BÁO CÁO SỰ CỐ Y KHOA</div>
            <div style={styles.d_flex_j_between}>
                <div style={styles.width._48persent}>
                    <div style={{...styles.contentTitle, ...styles.marginTop._0px}}>Hình thức báo cáo sự cố y khoa</div>
                    {OPTION_HINH_THUC_BC.map(item => {
                        return (
                            <div style={{...styles.d_flex_align_center}}>
                                <div style={styles.box_square}>
                                    <span style={item.code === thongTinSCYK.hinhThuc ? styles.checked : styles.d_none}>&#10003;</span>
                                </div>
                                <span style={styles.marginLeft._10px}>{item.name}</span>
                            </div>
                        )
                    })}
                    <div style={styles.contentTitle}>Thông tin người bệnh</div>
                    <div><span style={styles.lable}>Họ và tên: </span>{thongTinSCYK?.benhNhan?.name}</div>
                    <div><span style={styles.lable}>Số bệnh án: </span> {thongTinSCYK?.benhNhan?.code}</div>
                    <div><span style={styles.lable}>Ngày sinh: </span> {moment(thongTinSCYK?.benhNhan?.ngaySinh).format("DD/MM/YYYY")}</div>
                    <div>
                        <span style={styles.lable}>Giới tính: </span> {convertGenderToString(thongTinSCYK?.benhNhan?.gioiTinh)}      
                        <span style={{...styles.lable, ...styles.marginLeft._10px}}> Khoa phòng: </span> {thongTinSCYK.tenKhoaPhong}
                    </div>
                </div>
                <div style={styles.width._48persent}>
                    <div><span style={styles.lable}>Số báo cáo/Mã số sự cố: </span> {thongTinSCYK?.code}</div>
                    <div><span style={styles.lable}>Ngày báo cáo: </span> {moment(thongTinSCYK.ngayBaoCao).format("DD/MM/YYYY")}</div>
                    <div><span style={styles.lable}>Đơn vị báo cáo: </span> {thongTinSCYK.tenDonViBaoCao}</div>
                    <div style={styles.contentTitle}>Đội tượng xảy ra sự cố</div>
                    <div>
                        {DOI_TUONG_XAY_RA_SC.map((item) => {
                            return (
                                <div style={{...styles.d_flex_align_center}}>
                                    <div style={styles.box_square}>
                                        <span style={thongTinSCYK.loaiDoiTuong.includes(item.code.toString()) ? styles.checked : styles.d_none}>&#10003;</span>
                                    </div>
                                    <span style={styles.marginLeft._10px}>{item.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div style={styles.contentTitle}>Nơi xảy ra xự cố</div>
            <div>
                <div><span style={styles.lable}>Khoa/phòng/vị trí xảy ra sự cố: </span> {thongTinSCYK.noiXayRa}</div>
                <div><span style={styles.lable}>Vị trí cụ thể: </span> {thongTinSCYK.viTriCuThe}</div>
            </div>
            <div style={styles.d_flex_j_between}>
                <div style={styles.width._48persent}><span style={styles.lable}>Ngày xảy ra sự cố: </span>{moment(thongTinSCYK?.ngayXayRa).format("DD/MM/YYYY")}</div>
                <div style={styles.width._48persent}><span style={styles.lable}>Thời gian: </span>{thongTinSCYK.thoiGianXayRa}</div>
            </div>
            <div><span style={styles.lable}>Mô tả ngắn gọn về sự cố: </span>{thongTinSCYK.moTa}</div>
            <div><span style={styles.lable}>Đề xuất giải pháp ban đầu: </span>{thongTinSCYK.deXuat}</div>
            <div><span style={styles.lable}>Điều trị/xử lí ban đầu đã được thực hiện: </span> {thongTinSCYK.dieuTriBanDau}</div>
            <div style={styles.d_flex_j_between}>
                <div style={styles.width._48persent}>
                    <div>
                        <div style={styles.contentTitle}>Thông báo cho Bác sĩ điều trị/người có trách nhiệm</div>
                        <div style={styles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...styles.d_flex_align_center}}>
                                        <div style={styles.box_square}>
                                            <span style={item.code === thongTinSCYK.thongBaoChoBacSi ? styles.checked : styles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={styles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div style={styles.contentTitle}>Thông báo cho người nhà/người bảo hộ</div>
                        <div style={styles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...styles.d_flex_align_center}}>
                                        <div style={styles.box_square}>
                                            <span style={item.code === thongTinSCYK.thongBaoNguoiNha ? styles.checked : styles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={styles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div style={styles.width._48persent}>
                    <div>
                        <div style={styles.contentTitle}>Ghi nhận vào hồ sơ bệnh án/giấy tờ liên quan</div>
                        <div style={styles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...styles.d_flex_align_center}}>
                                        <div style={styles.box_square}>
                                            <span style={item.code === thongTinSCYK.ghiNhanHoSo ? styles.checked : styles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={styles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div style={styles.contentTitle}>Thông báo cho người bệnh</div>
                        <div style={styles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...styles.d_flex_align_center}}>
                                        <div style={styles.box_square}>
                                            <span style={item.code === thongTinSCYK.thongBaoNguoiBenh ? styles.checked : styles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={styles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={styles.contentTitle}>Phân loại ban đầu về sự cố</div>
                <div style={styles.d_flex_j_between}>
                    {OPTION_PHAN_LOAI.map((item) => {
                        return (
                            <div style={{...styles.d_flex_align_center, ...styles.width._48persent}}>
                                <div style={styles.box_square}>
                                    <span style={item.code === thongTinSCYK.phanLoaiBanDau ? styles.checked : styles.d_none}>&#10003;</span>
                                </div>
                                <span style={styles.marginLeft._10px}>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <div style={styles.contentTitle}>Đánh giá ban đầu về mức độ ảnh hưởng của sự cố</div>
                <div style={styles.d_flex}>
                    {OPTION_MUC_DO_AH.map((item) => {
                        return (
                            <div style={{...styles.d_flex_align_center, ...styles.width._30persent}}>
                                <div style={styles.box_square}>
                                    <span style={item.code === thongTinSCYK.danhGiaBanDau ? styles.checked : styles.d_none}>&#10003;</span>
                                </div>
                                <span style={styles.marginLeft._10px}>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div style={styles.contentTitle}>
                Thông tin người báo cáo
            </div>
            <div style={styles.d_flex}>
                <div style={styles.width._30persent}><span style={styles.lable}>Họ tên: </span> {thongTinSCYK.tenNbc}</div>
                <div style={styles.width._30persent}><span style={styles.lable}>Số điện thoại: </span> {thongTinSCYK.soDienThoaiNbc}</div>          
                <div style={styles.width._30persent}><span style={styles.lable}>Email: </span> {thongTinSCYK.emailNbc}</div>
            </div>
            <div style={{...styles.d_flex, flexWrap: "wrap", margin: "5px 0"}}>
                {TT_NGUOI_THONG_BAO.map((item) => {
                    return (
                        <div style={{...styles.d_flex_align_center, ...styles.width._30persent}}>
                            <div style={styles.box_square}>
                                <span style={item.code === thongTinSCYK.loaiNbc ? styles.checked : styles.d_none}>&#10003;</span>
                            </div>
                            <span style={styles.marginLeft._10px}>{item.name}</span>
                            {item.code === thongTinSCYK.loaiNbc && item.code === 5 && (
                                <span>: {thongTinSCYK.loaiNbcKhac}</span>
                            )}
                        </div>
                    )
                })}
            </div>
            <div style={styles.d_flex_j_between}>
                <div style={styles.width._48persent}>
                    <span style={styles.lable}>Người chứng kiến 1: </span> {thongTinSCYK.tenNck1}
                </div>
                <div style={styles.width._48persent}>
                    <span style={styles.lable}>Người chứng kiến 2: </span> {thongTinSCYK.tenNck2}
                </div>
            </div>
        </div>
    )
}

export default BaoCaoSCYKDetail