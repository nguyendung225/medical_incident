import { printStyles } from "../../bao-cao-su-co-y-khoa/const/constants";
import { seperateTime } from "../../utils/FormatUtils";
import { IBienBanXacMinh } from "../models/BienBanXacMinhModel";

type TProps = {
	thongTinBienBan: IBienBanXacMinh;
};

const BienBanXacMinhDetail = ({ thongTinBienBan }: TProps) => {
	const timeXacMinh = seperateTime(thongTinBienBan?.ngayGioXacMinh);
	const timeKetThuc = seperateTime(thongTinBienBan?.ngayGioKetThuc);
	return (
		<div style={printStyles.container} id="in-phieu-bien-ban-xac-minh">
			<div style={printStyles.header}>
				CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
				<p>Độc lập - Tự do - Hạnh phúc</p>
			</div>
			<div>
				<div style={printStyles.header_title}>
					BIÊN BẢN XÁC MINH SỰ CỐ Y KHOA
				</div>
				<div>
					Hồi{" "}
					<span style={printStyles.content_text}>{timeXacMinh.time}</span>{" "}
					giờ ngày{" "}
					<span style={printStyles.content_text}>{timeXacMinh.day}</span>{" "}
					tháng{" "}
					<span style={printStyles.content_text}>{timeXacMinh.month}</span>{" "}
					năm{" "}
					<span style={printStyles.content_text}>{timeXacMinh.year}</span>{" "}
					tại{" "}
					<span style={printStyles.content_text}>
						{thongTinBienBan?.noiXacMinh}
					</span>
					.
				</div>
				<div style={{ ...printStyles.contentTitle }}>Chúng tôi gồm :</div>
				<div style={printStyles.d_flex_wrap}>
					<div style={printStyles.width._40persent}>
						<span>Ông/bà:</span>{" "}
						<span style={printStyles.content_text}>
							{thongTinBienBan?.tenNguoiChuTri}
						</span>
					</div>
					<div style={printStyles.width._60persent}>
						{" "}
						Chức vụ:{" "}
						<span style={printStyles.content_text}>{thongTinBienBan?.maChucVuNguoiChuTri}</span>
					</div>
					thuộc Đơn vị:{" "}
					<span style={printStyles.content_text}>{thongTinBienBan?.donViNguoiChuTri}</span>{" "}
					chủ trì xác minh sự cố y khoa.
				</div>
				<div style={printStyles.d_flex_wrap}>
					<div style={printStyles.width._40persent}>
						<span>Ông/bà:</span>{" "}
						<span style={printStyles.content_text}>
							{thongTinBienBan?.tenThanhVienDoan}
						</span>
					</div>
					<div style={printStyles.width._60persent}>
						{" "}
						Chức vụ:{" "}
						<span style={printStyles.content_text}>{thongTinBienBan?.maChucVuThanhVienDoan}</span>
					</div>
					thuộc Đơn vị:{" "}
					<span style={printStyles.content_text}>{thongTinBienBan?.donViThanhVienDoan}</span>{" "}
					thành viên đoàn xác minh sự cố y khoa.
				</div>
				<div style={printStyles.d_flex_wrap}>
					<div style={printStyles.width._40persent}>
						<span>Ông/bà:</span>{" "}
						<span style={printStyles.content_text}>
							{thongTinBienBan?.tenNguoiChungKien}
						</span>
					</div>
					<div style={printStyles.width._60persent}>
						{" "}
						Chức vụ:{" "}
						<span style={printStyles.content_text}>{thongTinBienBan?.maChucVuNguoiChungKien}</span>
					</div>
					thuộc Đơn vị:{" "}
					<span style={printStyles.content_text}>{thongTinBienBan?.donViNguoiChungKien}</span>{" "}
					là người chứng kiến.
				</div>

				<div style={{ ...printStyles.contentTitle }}>
					Với sự tham dự của:
				</div>
				{thongTinBienBan?.nguoiThamDuXacMinhs?.map((nguoiThamDu) => (
					<div>
						Ông/bà:{" "}
						<span style={printStyles.content_text}>{nguoiThamDu.name}</span>{" "}
						Chức vụ:{" "}
						<span style={printStyles.content_text}>{nguoiThamDu.maChucVu}</span> thuộc
						Đơn vị:{" "}
						<span style={printStyles.content_text}>
							{nguoiThamDu.tenDonVi}
						</span>
					</div>
				))}
				<div style={{ ...printStyles.contentTitle }}>
					Tiến hành xác minh về việc:
				</div>
				<div>
					<span style={printStyles.content_text}>
						{thongTinBienBan?.veViec}
					</span>
				</div>
				<div
					style={{ ...printStyles.fontWeight.bold, ...printStyles.text_center }}
				>
					KẾT QUẢ XÁC MINH
				</div>
				<div>
					Biên bản kết thúc vào hồi{" "}
					<span style={printStyles.content_text}>{timeKetThuc.time}</span>{" "}
					giờ ngày{" "}
					<span style={printStyles.content_text}>{timeKetThuc.day}</span>{" "}
					tháng{" "}
					<span style={printStyles.content_text}>{timeKetThuc.month}</span>{" "}
					năm{" "}
					<span style={printStyles.content_text}>{timeKetThuc.year}</span>
				</div>
				<div style={{ ...printStyles.contentTitle }}>
					Ý kiến của những người tham gia xác minh (nếu có):
				</div>
				<div>
					<span style={printStyles.content_text}>
						{thongTinBienBan?.yKien}
					</span>
				</div>
				<div>
					Biên bản này gồm có{" "}
					<span style={printStyles.content_text}>
						{thongTinBienBan?.soTrang}
					</span>{" "}
					trang, được lập thành{" "}
					<span style={printStyles.content_text}>
						{thongTinBienBan?.soBan}
					</span>{" "}
					bản có nội dung và giá trị pháp lý như nhau. Biên bản này
					được đọc cho những người có tên phía trên nghe, công nhận
					đúng sự việc và cùng ký tên xác nhận dưới đây
				</div>

				<div
					style={{
						...printStyles.d_flex_j_between,
						...printStyles.marginTop._10px,
					}}
				>
					<div style={printStyles.fontWeight.bold}>
						THÀNH VIÊN ĐOÀN
						<div
							style={{
								...printStyles.font_italic,
								...printStyles.fontWeight.normal,
							}}
						>
							(Ký và ghi rõ họ tên)
						</div>
					</div>
					<div style={printStyles.fontWeight.bold}>
						NGƯỜI LÀM CHỨNG
						<div
							style={{
								...printStyles.font_italic,
								...printStyles.fontWeight.normal,
							}}
						>
							(Ký và ghi rõ họ tên)
						</div>
					</div>
					<div style={printStyles.fontWeight.bold}>
						CHỦ TRÌ ĐOÀN
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
				<div
					style={{
						...printStyles.d_flex_j_between,
						...printStyles.marginTop._80px,
						...printStyles.marginBottom._80px,
					}}
				>
					<div style={printStyles.fontWeight.bold}>
						NHỮNG NGƯỜI THAM DỰ
						<div
							style={{
								...printStyles.font_italic,
								...printStyles.fontWeight.normal,
							}}
						>
							(Ký và ghi rõ họ tên)
						</div>
					</div>
					<div style={printStyles.fontWeight.bold}>
						NGƯỜI LẬP BIÊN BẢN
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

export default BienBanXacMinhDetail;
