import moment from "moment";
import { IBenhNhan, MedicalIncidentInfo } from "../models/BaoCaoSCYKModels";
import { 
    DOI_TUONG_XAY_RA_SC, 
    OPTION_HINH_THUC_BC, 
    OPTION_MUC_DO_AH, 
    OPTION_PHAN_LOAI, 
    OPTION_XAC_NHAN, 
    TT_NGUOI_THONG_BAO, 
} from "../const/constants";
import { convertGenderToString } from "../../utils/FormatUtils";
import { printStyles } from "../../utils/Constant";

type TProps = {
    thongTinSCYK: MedicalIncidentInfo;
    thongTinBenhNhan: IBenhNhan;
}

const BaoCaoSCYKDetail = ({ thongTinSCYK, thongTinBenhNhan }: TProps) => {
    return (
        <div style={printStyles.container} id="in-phieu-bao-cao-scyk">
            <div style={printStyles.formTitle}>PHIẾU BÁO CÁO SỰ CỐ Y KHOA</div>
            <div style={printStyles.d_flex_j_between}>
                <div style={printStyles.width._48persent}>
                    <div style={{...printStyles.contentTitle, ...printStyles.marginTop._0px}}>Hình thức báo cáo sự cố y khoa</div>
                    {OPTION_HINH_THUC_BC.map(item => {
                        return (
                            <div style={{...printStyles.d_flex_align_center}}>
                                <div style={printStyles.box_square}>
                                    <span style={item.code === thongTinSCYK?.hinhThuc ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                </div>
                                <span style={printStyles.marginLeft._10px}>{item.name}</span>
                            </div>
                        )
                    })}
                    <div style={printStyles.contentTitle}>Thông tin người bệnh</div>
                    <div><span style={printStyles.lable}>Họ và tên: </span>{thongTinBenhNhan?.name}</div>
                    <div><span style={printStyles.lable}>Sổ bệnh án: </span> {thongTinBenhNhan?.soBenhAn}</div>
                    <div><span style={printStyles.lable}>Ngày sinh: </span> {thongTinBenhNhan?.ngaySinh && moment(thongTinBenhNhan?.ngaySinh).format("DD/MM/YYYY")}</div>
                    <div>
                        <span style={printStyles.lable}>Giới tính: </span> {thongTinBenhNhan?.gioiTinh && convertGenderToString(thongTinBenhNhan?.gioiTinh)}      
                        <span style={{...printStyles.lable, ...printStyles.marginLeft._10px}}> Khoa phòng: </span> {thongTinBenhNhan?.tenKhoaPhongDieuTri}
                    </div>
                </div>
                <div style={printStyles.width._48persent}>
                    <div><span style={printStyles.lable}>Số báo cáo/Mã số sự cố: </span> {thongTinSCYK?.code}</div>
                    <div><span style={printStyles.lable}>Ngày báo cáo: </span> {moment(thongTinSCYK?.ngayBaoCao).format("DD/MM/YYYY")}</div>
                    <div><span style={printStyles.lable}>Đơn vị báo cáo: </span> {thongTinSCYK?.tenDonViBaoCao}</div>
                    <div style={printStyles.contentTitle}>Đội tượng xảy ra sự cố</div>
                    <div>
                        {DOI_TUONG_XAY_RA_SC.map((item) => {
                            return (
                                <div style={{...printStyles.d_flex_align_center}}>
                                    <div style={printStyles.box_square}>
                                        <span style={thongTinSCYK?.loaiDoiTuong?.includes(item.code.toString()) ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                    </div>
                                    <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div style={printStyles.contentTitle}>Nơi xảy ra xự cố</div>
            <div>
                <div><span style={printStyles.lable}>Khoa/phòng/vị trí xảy ra sự cố: </span> {thongTinSCYK?.noiXayRa}</div>
                <div><span style={printStyles.lable}>Vị trí cụ thể: </span> {thongTinSCYK?.viTriCuThe}</div>
            </div>
            <div style={printStyles.d_flex_j_between}>
                <div style={printStyles.width._48persent}><span style={printStyles.lable}>Ngày xảy ra sự cố: </span>{moment(thongTinSCYK?.ngayXayRa).format("DD/MM/YYYY")}</div>
                <div style={printStyles.width._48persent}><span style={printStyles.lable}>Thời gian: </span>{thongTinSCYK?.thoiGianXayRa}</div>
            </div>
            <div>
                <span style={printStyles.lable}>Mô tả ngắn gọn về sự cố: </span>
                <div style={printStyles.marginLeft._10px} dangerouslySetInnerHTML={{ __html: thongTinSCYK?.moTa.replace(/\n/g, "<br>") }} />
            </div>
            <div>
                <span style={printStyles.lable}>Đề xuất giải pháp ban đầu: </span>
                <div style={printStyles.marginLeft._10px} dangerouslySetInnerHTML={{ __html: thongTinSCYK?.deXuat.replace(/\n/g, "<br>") }} />
            </div>
            <div>
                <span style={printStyles.lable}>Điều trị/xử lí ban đầu đã được thực hiện: </span> 
                <div style={printStyles.marginLeft._10px} dangerouslySetInnerHTML={{ __html: thongTinSCYK?.dieuTriBanDau.replace(/\n/g, "<br>") }} />
            </div>
            <div style={printStyles.d_flex_j_between}>
                <div style={printStyles.width._48persent}>
                    <div>
                        <div style={printStyles.contentTitle}>Thông báo cho Bác sĩ điều trị/người có trách nhiệm</div>
                        <div style={printStyles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...printStyles.d_flex_align_center}}>
                                        <div style={printStyles.box_square}>
                                            <span style={item.code === thongTinSCYK?.thongBaoChoBacSi ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div style={printStyles.contentTitle}>Thông báo cho người nhà/người bảo hộ</div>
                        <div style={printStyles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...printStyles.d_flex_align_center}}>
                                        <div style={printStyles.box_square}>
                                            <span style={item.code === thongTinSCYK?.thongBaoNguoiNha ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div style={printStyles.width._48persent}>
                    <div>
                        <div style={printStyles.contentTitle}>Ghi nhận vào hồ sơ bệnh án/giấy tờ liên quan</div>
                        <div style={printStyles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...printStyles.d_flex_align_center}}>
                                        <div style={printStyles.box_square}>
                                            <span style={item.code === thongTinSCYK?.ghiNhanHoSo ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div style={printStyles.contentTitle}>Thông báo cho người bệnh</div>
                        <div style={printStyles.d_flex_j_between}>
                            {OPTION_XAC_NHAN.map((item) => {
                                return (
                                    <div style={{...printStyles.d_flex_align_center}}>
                                        <div style={printStyles.box_square}>
                                            <span style={item.code === thongTinSCYK?.thongBaoNguoiBenh ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                        </div>
                                        <span style={printStyles.marginLeft._10px}>{item.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={printStyles.contentTitle}>Phân loại ban đầu về sự cố</div>
                <div style={printStyles.d_flex_j_between}>
                    {OPTION_PHAN_LOAI.map((item) => {
                        return (
                            <div style={{...printStyles.d_flex_align_center, ...printStyles.width._48persent}}>
                                <div style={printStyles.box_square}>
                                    <span style={item.code === thongTinSCYK?.phanLoaiBanDau ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                </div>
                                <span style={printStyles.marginLeft._10px}>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <div style={printStyles.contentTitle}>Đánh giá ban đầu về mức độ ảnh hưởng của sự cố</div>
                <div style={printStyles.d_flex}>
                    {OPTION_MUC_DO_AH.map((item) => {
                        return (
                            <div style={{...printStyles.d_flex_align_center, ...printStyles.width._30persent}}>
                                <div style={printStyles.box_square}>
                                    <span style={item.code === thongTinSCYK?.danhGiaBanDau ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                                </div>
                                <span style={printStyles.marginLeft._10px}>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div style={printStyles.contentTitle}>
                Thông tin người báo cáo
            </div>
            <div style={printStyles.d_flex}>
                <div style={printStyles.width._30persent}><span style={printStyles.lable}>Họ tên: </span> {thongTinSCYK?.tenNbc}</div>
                <div style={printStyles.width._30persent}><span style={printStyles.lable}>Số điện thoại: </span> {thongTinSCYK?.soDienThoaiNbc}</div>          
                <div style={printStyles.width._30persent}><span style={printStyles.lable}>Email: </span> {thongTinSCYK?.emailNbc}</div>
            </div>
            <div style={{...printStyles.d_flex, flexWrap: "wrap", margin: "5px 0"}}>
                {TT_NGUOI_THONG_BAO.map((item) => {
                    return (
                        <div style={{...printStyles.d_flex_align_center, ...printStyles.width._30persent}}>
                            <div style={printStyles.box_square}>
                                <span style={item.code === thongTinSCYK?.loaiNbc ? printStyles.checked : printStyles.d_none}>&#10003;</span>
                            </div>
                            <span style={printStyles.marginLeft._10px}>{item.name}</span>
                            {item.code === thongTinSCYK?.loaiNbc && item.code === 5 && (
                                <span>: {thongTinSCYK?.loaiNbcKhac}</span>
                            )}
                        </div>
                    )
                })}
            </div>
            <div style={printStyles.d_flex_j_between}>
                <div style={printStyles.width._48persent}>
                    <span style={printStyles.lable}>Người chứng kiến 1: </span> {thongTinSCYK?.tenNck1}
                </div>
                <div style={printStyles.width._48persent}>
                    <span style={printStyles.lable}>Người chứng kiến 2: </span> {thongTinSCYK?.tenNck2}
                </div>
            </div>
        </div>
    )
}

export default BaoCaoSCYKDetail