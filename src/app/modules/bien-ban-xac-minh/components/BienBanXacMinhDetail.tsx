import { seperateTime } from "../../utils/FormatUtils";
import { IBienBanXacMinh } from "../models/BienBanXacMinhModel";

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
		top: "-3px",
		left: "1px",
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
	d_flex_wrap: {
		display: "flex",
		flexWrap: "wrap" as "wrap",
	},
	d_flex_j_between: {
		display: "flex",
		justifyContent: "space-between",
	},
	width: {
		_30persent: {
			width: "30%",
		},
		_40persent: {
			width: "40%",
		},
		_48persent: {
			width: "48%",
		},
		_60persent: {
			width: "60%",
		},
	},
	marginLeft: {
		_10px: {
			marginLeft: "10px",
		},
	},
	marginTop: {
		_0px: {
			marginTop: "0",
		},
		_10px: {
			marginTop: "10px",
		},
		_80px: {
			marginTop: "80px",
		},
	},
	marginBottom: {
		_0px: {
			marginBottom: "0",
		},
		_10px: {
			marginBottom: "10px",
		},
		_80px: {
			marginBottom: "80px",
		},
	},
	fontWeight: {
		bold: {
			fontWeight: "bold",
		},
		normal: {
			fontWeight: "normal",
		},
	},
	font_italic: {
		fontStyle: "italic",
	},
	lable: {
		fontWeight: "bold",
		marginTop: "10px",
	},
	container: {
		background: "white",
		padding: "10px",
		overflow: "scroll",
		height: "calc(100vh - 200px)",
		marginTop: "3px",
	},
	text_center: {
		textAlign: "center" as "center",
	},
	header: {
		fontWeight: "bold",
		textAlign: "center" as "center",
	},
	content_text: {
		padding: "0 2px",
	},
	contentTitle: {
		fontWeight: "700",
		marginTop: "4px",
		color: "#1a5e83",
	},
};

type TProps = {
	thongTinBienBan: IBienBanXacMinh;
};

const BienBanXacMinhDetail = ({ thongTinBienBan }: TProps) => {
	const timeXacMinh = seperateTime(thongTinBienBan?.ngayGioXacMinh);
	const timeKetThuc = seperateTime(thongTinBienBan?.ngayGioKetThuc);
	return (
		<div style={styles.container} id="bien-ban-xac-minh">
			<div style={styles.header}>
				CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
				<p>Độc lập - Tự do - Hạnh phúc</p>
			</div>
			<div>
				<div style={styles.fontWeight.bold}>
					BIÊN BẢN XÁC MINH SỰ CỐ Y KHOA
				</div>
				<div>
					Hồi{" "}
					<span style={styles.content_text}>{timeXacMinh.time}</span>{" "}
					giờ ngày{" "}
					<span style={styles.content_text}>{timeXacMinh.day}</span>{" "}
					tháng{" "}
					<span style={styles.content_text}>{timeXacMinh.month}</span>{" "}
					năm{" "}
					<span style={styles.content_text}>{timeXacMinh.year}</span>{" "}
					tại{" "}
					<span style={styles.content_text}>
						{thongTinBienBan?.noiXacMinh}
					</span>
					.
				</div>
				<div style={{ ...styles.contentTitle }}>Chúng tôi gồm :</div>
				<div style={styles.d_flex_wrap}>
					<div style={styles.width._40persent}>
						<span>Ông/bà:</span>{" "}
						<span style={styles.content_text}>
							{thongTinBienBan.tenNguoiChuTri}
						</span>
					</div>
					<div style={styles.width._60persent}>
						{" "}
						Chức vụ:{" "}
						<span style={styles.content_text}>Giám đốc</span>
					</div>
					thuộc Đơn vị:{" "}
					<span style={styles.content_text}>Đơn vị hành chính</span>{" "}
					chủ trì xác minh sự cố y khoa.
				</div>
				<div style={styles.d_flex_wrap}>
					<div style={styles.width._40persent}>
						<span>Ông/bà:</span>{" "}
						<span style={styles.content_text}>
							{thongTinBienBan.tenNguoiChuTri}
						</span>
					</div>
					<div style={styles.width._60persent}>
						{" "}
						Chức vụ:{" "}
						<span style={styles.content_text}>Giám đốc</span>
					</div>
					thuộc Đơn vị:{" "}
					<span style={styles.content_text}>Đơn vị hành chính</span>{" "}
					thành viên đoàn xác minh sự cố y khoa.
				</div>
				<div style={styles.d_flex_wrap}>
					<div style={styles.width._40persent}>
						<span>Ông/bà:</span>{" "}
						<span style={styles.content_text}>
							{thongTinBienBan.tenNguoiChuTri}
						</span>
					</div>
					<div style={styles.width._60persent}>
						{" "}
						Chức vụ:{" "}
						<span style={styles.content_text}>Giám đốc</span>
					</div>
					thuộc Đơn vị:{" "}
					<span style={styles.content_text}>Đơn vị hành chính</span>{" "}
					là người chứng kiến.
				</div>

				<div style={{ ...styles.contentTitle }}>
					Với sự tham dự của:
				</div>
				{thongTinBienBan.nguoiThamDuXacMinhs.map((data) => (
					<div>
						Ông/bà:{" "}
						<span style={styles.content_text}>{data.name}</span>{" "}
						Chức vụ:{" "}
						<span style={styles.content_text}>Giám đốc</span> thuộc
						Đơn vị:{" "}
						<span style={styles.content_text}>
							Đơn vị hành chính
						</span>
					</div>
				))}
				<div style={{ ...styles.contentTitle }}>
					Tiến hành xác minh về việc:
				</div>
				<div>
					<span style={styles.content_text}>
						{thongTinBienBan.veViec}
					</span>
				</div>
				<div
					style={{ ...styles.fontWeight.bold, ...styles.text_center }}
				>
					KẾT QUẢ XÁC MINH
				</div>
				<div>
					Biên bản kết thúc vào hồi{" "}
					<span style={styles.content_text}>{timeKetThuc.time}</span>{" "}
					giờ ngày{" "}
					<span style={styles.content_text}>{timeKetThuc.day}</span>{" "}
					tháng{" "}
					<span style={styles.content_text}>{timeKetThuc.month}</span>{" "}
					năm{" "}
					<span style={styles.content_text}>{timeKetThuc.year}</span>
				</div>
				<div style={{ ...styles.contentTitle }}>
					Ý kiến của những người tham gia xác minh (nếu có):
				</div>
				<div>
					<span style={styles.content_text}>
						{thongTinBienBan.yKien}
					</span>
				</div>
				<div>
					Biên bản này gồm có{" "}
					<span style={styles.content_text}>
						{thongTinBienBan.soTrang}
					</span>{" "}
					trang, được lập thành{" "}
					<span style={styles.content_text}>
						{thongTinBienBan.soBan}
					</span>{" "}
					bản có nội dung và giá trị pháp lý như nhau. Biên bản này
					được đọc cho những người có tên phía trên nghe, công nhận
					đúng sự việc và cùng ký tên xác nhận dưới đây
				</div>

				<div
					style={{
						...styles.d_flex_j_between,
						...styles.marginTop._10px,
					}}
				>
					<div style={styles.fontWeight.bold}>
						THÀNH VIÊN ĐOÀN
						<div
							style={{
								...styles.font_italic,
								...styles.fontWeight.normal,
							}}
						>
							(Ký và ghi rõ họ tên)
						</div>
					</div>
					<div style={styles.fontWeight.bold}>
						NGƯỜI LÀM CHỨNG
						<div
							style={{
								...styles.font_italic,
								...styles.fontWeight.normal,
							}}
						>
							(Ký và ghi rõ họ tên)
						</div>
					</div>
					<div style={styles.fontWeight.bold}>
						CHỦ TRÌ ĐOÀN
						<div
							style={{
								...styles.font_italic,
								...styles.fontWeight.normal,
							}}
						>
							(Ký và ghi rõ họ tên)
						</div>
					</div>
				</div>
				<div
					style={{
						...styles.d_flex_j_between,
						...styles.marginTop._80px,
						...styles.marginBottom._80px,
					}}
				>
					<div style={styles.fontWeight.bold}>
						NHỮNG NGƯỜI THAM DỰ
						<div
							style={{
								...styles.font_italic,
								...styles.fontWeight.normal,
							}}
						>
							(Ký và ghi rõ họ tên)
						</div>
					</div>
					<div style={styles.fontWeight.bold}>
						NGƯỜI LẬP BIÊN BẢN
						<div
							style={{
								...styles.font_italic,
								...styles.fontWeight.normal,
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
