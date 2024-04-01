import moment from "moment";
import { IBienBanHop } from "../model/BienBanHopModel";
import { printStyles } from "../../utils/Constant";

type TProps = {
    thongTinBienBan: IBienBanHop;
};

const BienBanHopDetail = ({ thongTinBienBan }: TProps) => {
    return (
        <div style={printStyles.container} id="in-phieu-bien-ban-hop">
            <div style={printStyles.text_center} >
                <div>
                    BỆNH VIỆN QUÂN Y 103
                </div>
                <div style={printStyles.fontWeight.bold}>
                    BỘ MÔN/KHOA/PHÒNG: Giải phẫu bệnh lý-Pháp y
                </div>
                <div>
                    Số: {thongTinBienBan?.code}
                </div>
            </div>
            <div>
                <div style={printStyles.header_title}>
                    BIÊN BẢN
                    <div>
                        Về việc :{thongTinBienBan?.bienBan}
                    </div>
                </div>
                <div style={{ ...printStyles.contentTitle }}>1.Thời gian họp :</div>
                <div style={{ ...printStyles.marginLeft._10px }}>
                    <div>
                        - Bắt đầu lúc:
                        <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioHop).format("HH:mm")}</span>{" "}
                        giờ ngày{" "}
                        <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioHop).format("DD")}</span>{" "}
                        tháng{" "}
                        <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioHop).format("MM")}</span>{" "}
                        năm{" "}
                        <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioHop).format("YYYY")}</span>{" "}
                    </div>
                    <div>
                        - Địa điểm tại:
                        <span style={printStyles.content_text}>{thongTinBienBan?.diaDiem} </span>{" "}
                    </div>
                    <div>
                        - Nội dung:
                        <span style={printStyles.content_text}>{thongTinBienBan?.noiDung}</span>{" "}
                    </div>
                </div>
                <div style={{ ...printStyles.contentTitle }}>
                    2.   Thành phần dự:
                </div>
                <div style={{ ...printStyles.marginLeft._10px }}>
                    <div>
                        - Chủ trì (ghi rõ họ tên, chức danh, chức vụ công tác):
                        <span style={printStyles.content_text}>{thongTinBienBan?.tenChuTri} - {thongTinBienBan?.tenChucDanhChuTri} - {thongTinBienBan?.tenChucVuChuTri}</span>{" "}
                    </div>
                    <div>
                        - Thư ký (ghi rõ họ tên, chức danh, chức vụ công tác):
                        <span style={printStyles.content_text}>{thongTinBienBan?.tenThuKy} - {thongTinBienBan?.tenChucDanhThuKy} - {thongTinBienBan?.tenChucDanhThuKy}</span>{" "}
                    </div>
                    <div>
                        - Thành viên: có mặt 
                        <span style={printStyles.content_text}>{thongTinBienBan?.soThanhVienCoMat}</span>
                        trên tổng số
                        <span style={printStyles.content_text}>{thongTinBienBan?.tongSo}</span>
                    </div>
                </div>
                <div style={{ ...printStyles.contentTitle }}>
                    3. Nội dung:
                </div>
                <div style={{ ...printStyles.marginLeft._10px }}>
                    <div>
                        - Trình bày báo cáo (ghi rõ họ tên, chức danh, chức vụ công tác):
                        <span style={printStyles.content_text}>{thongTinBienBan?.tenNguoiTrinhBay} - {thongTinBienBan?.tenChucDanhNguoiTrinhBay} - {thongTinBienBan?.tenChucVuNguoiTrinhBay}</span>{" "}
                    </div>
                    <div>
                        - Ghi tóm tắt nội dung báo cáo:
                        <span style={printStyles.content_text}>{thongTinBienBan?.tomTatNoiDung}</span>
                    </div>
                    <div>
                        - Thảo luận:
                        <span style={printStyles.content_text}>{thongTinBienBan?.thaoLuan}</span>
                    </div>
                    <div>
                        - Ý kiến phát biểu:
                        <span style={printStyles.content_text}>{thongTinBienBan?.yKien}</span>
                    </div>
                </div>
                <div>
                    Kết luận của chủ trì:
                    <span style={printStyles.content_text}>{thongTinBienBan?.ketLuan}</span>
                </div>
                <div>
                    Biểu quyết (Nếu có):
                    <span style={printStyles.content_text}>{thongTinBienBan?.bieuQuyet}</span>
                </div>
                <div>
                    Kết thúc cuộc họp vào 
                    <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioKetThuc).format("HH:mm")}</span>{" "}
                    giờ ngày 
                    <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioKetThuc).format("DD")}</span>{" "}
                    tháng 
                    <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioKetThuc).format("MM")}</span>{" "}
                    năm 
                    <span style={printStyles.content_text}>{moment(thongTinBienBan?.ngayGioKetThuc).format("YYYY")}</span>{" "}
                </div>
                <div>
                    Tài liệu kèm theo (nếu có):
                </div>

                <div
                    style={{
                        ...printStyles.d_flex_j_center,
                        ...printStyles.marginBottom._80px,
                        ...printStyles.marginTop._10px
                    }}
                >
                    <div style={{...printStyles.fontWeight.bold, ...printStyles.text_center}}>
                        THƯ KÝ
                        <div
                            style={{
                                ...printStyles.font_italic,
                                ...printStyles.fontWeight.normal,
                            }}
                        >
                            (Ký và ghi rõ họ tên)
                        </div>
                    </div>

                    <div style={{ ...printStyles.fontWeight.bold, ...printStyles.marginLeft._180px, ...printStyles.text_center}}>
                        CHỦ TRÌ
                        <div
                            style={{
                                ...printStyles.font_italic,
                                ...printStyles.fontWeight.normal,
                            }}
                        >
                            (Ký và ghi rõ họ tên)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BienBanHopDetail;
