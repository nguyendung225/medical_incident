import { Field, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import TextField from "../../component/TextField";
import LabelRequired from "./../../component/LabelRequired";
import {
	DOI_TUONG_XAY_RA_SC,
	OPTION_HINH_THUC_BC,
	OPTION_MUC_DO_AH,
	OPTION_PHAN_LOAI,
	OPTION_XAC_NHAN,
	TT_NGUOI_THONG_BAO,
} from "../const/constanst";
import Autocomplete from "../../component/input-field/Autocomplete";

type Props = {
	handleClose: () => void;
};

export default function DialogThemMoiSCYK({ handleClose }: Props) {
	const validationSchema = Yup.object().shape({
		hinhThucBaoCao: Yup.string().required("Bắt buộc chọn"),
		moTaNganGonSuCo: Yup.string().required("Bắt buộc nhập"),
		maSuCoYKhoa: Yup.string().required("Bắt buộc nhập"),
		tenSuCoYKhoa: Yup.string().required("Bắt buộc nhập"),
		ngayBaoCao: Yup.string().required("Bắt buộc nhập"),
		ngayXayRaSuCo: Yup.string().required("Bắt buộc nhập"),
		thoiGianXayRaSuCo: Yup.string().required("Bắt buộc nhập"),
		deXuatGiaiPhap: Yup.string().required("Bắt buộc nhập"),
		dieuTriXuLy: Yup.string().required("Bắt buộc nhập"),
		thongBaoChoBS: Yup.string().required("Bắt buộc nhập"),
		donViBaoCao: Yup.object().required("Bắt buộc nhập").nullable(),
		khoaPhongXayRaSuCo: Yup.object().required("Bắt buộc nhập").nullable(),
	});

	return (
		<Modal
			show={true}
			centered
			onHide={handleClose}
			fullscreen
			contentClassName="spaces width-97 margin-x-auto radius-8"
		>
			<Modal.Header closeButton className="py-5 header-modal">
				<Modal.Title className="title-dialog-color">
					Thêm mới báo cáo sự cố y khoa
				</Modal.Title>
			</Modal.Header>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					moTaNganGonSuCo: "",
					maSuCoYKhoa: "",
					tenSuCoYKhoa: "",
					ngayXayRaSuCo: "",
					ngayBaoCao: "",
					deXuatGiaiPhap: "",
					thoiGianXayRaSuCo: "",
					dieuTriXuLy: "",
					hinhThucBaoCao: "tuNguyen",
					thongBaoChoBS: "0",
					thongBaoChoNguoiNha: "0",
					thongBaoChoNguoiBenh: "0",
					phanLoaiSuCo: "0",
					danhGiaMucDoAnhHuong: "0",
					ghiNhanHoSo: "0",
					donViBaoCao: null,
					khoaPhongXayRaSuCo: "",
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => {
					return (
						<form onSubmit={handleSubmit}>
							<Modal.Body className="spaces p-10">
								<div className="form-container">
									<div className="hinh-thuc-bao-cao-sc form-child-container">
										<div className="d-flex spaces gap-32 h-24">
											<LabelRequired
												isRequired
												className="text-primary spaces fw-700"
												label="Hình thức báo cáo sự cố"
											/>
											{OPTION_HINH_THUC_BC.map((data) => (
												<label className="d-flex align-items-center gap-2">
													<Field
														type="radio"
														name="hinhThucBaoCao"
														value={data?.code}
														checked
													/>
													{data?.name}
												</label>
											))}
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Mã sự cố y khoa"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="maSuCoYKhoa"
													type="text"
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Tên sự cố y khoa"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="tenSuCoYKhoa"
													type="text "
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Đơn vị báo cáo"
													className="spaces min-w-140 fw-500"
												/>
												<Autocomplete
													className="spaces h-25 min-w-242"
													name="donViBaoCao"
													options={[]}
													value={values?.donViBaoCao}
													errors={errors?.donViBaoCao}
													touched={
														touched?.donViBaoCao
													}
												/>
											</div>
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Ngày báo cáo"
													className="spaces min-w-140 fw-500 "
												/>
												<TextField
													className="spaces min-w-242"
													name="ngayBaoCao"
													type="date"
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Ngày xảy ra sự cố"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													isRequired
													className="spaces min-w-242"
													name="ngayXayRaSuCo"
													type="date"
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Thời gian xảy ra sự cố"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="thoiGianXayRaSuCo"
													type="datetime-local"
													onChange={handleChange}
												/>
											</div>
										</div>
									</div>
									<div className="tt-nguoi-benh form-child-container">
										<div className="d-flex spaces gap-32 h-24">
											<LabelRequired
												className="text-primary spaces fw-700"
												label="Thông tin người bệnh"
											/>
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													label="Mã bệnh nhân"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="ngayNhapXuat"
													type="text "
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Họ và tên"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="tenSuCo"
													type="text "
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Sổ bệnh án"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="soBenhAn"
													type="text "
													onChange={handleChange}
												/>
											</div>
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													label="Ngày sinh"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="ngaySinh"
													type="date"
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Giới tính"
													className="spaces min-w-140 fw-500"
												/>
												<Autocomplete
													className="spaces h-25 min-w-242"
													name="gioiTinh"
													options={[]}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Khoa/Phòng"
													className="spaces min-w-140 fw-500"
												/>
												<Autocomplete
													className="spaces h-25 min-w-242"
													name="khoaPhong"
													options={[]}
												/>
											</div>
										</div>
									</div>
									<div className="doi-tuong-xay-ra-su-co">
										<div className="d-flex spaces gap-32 h-24">
											<LabelRequired
												className="text-primary spaces fw-700"
												label="Đối tượng xảy ra sự cố"
											/>
										</div>
										<div className="d-flex spaces gap-32 h-24">
											{DOI_TUONG_XAY_RA_SC.map((data) => (
												<label className="d-flex align-items-center gap-2 min-w-200px">
													<Field
														type="checkbox"
														name="doiTuongXayRaSC"
														value={data.code}
													/>
													{data.name}
												</label>
											))}
										</div>
									</div>
									<div className="d-flex spaces gap-20 align-items-center">
										<div className="w-50">
											<div className="khoa-phong-xay-ra-su-co spaces pb-4">
												<LabelRequired
													isRequired
													className="text-primary spaces fw-700 h-24 mb-4"
													label="Khoa/Phòng/Vị trí xảy ra sự cố"
												/>
												<Autocomplete
													className="spaces h-25"
													name="khoaPhongXayRaSuCo"
													options={[]}
													value={
														values?.khoaPhongXayRaSuCo
													}
													errors={
														errors?.khoaPhongXayRaSuCo
													}
													touched={
														touched?.khoaPhongXayRaSuCo
													}
												/>
											</div>
											<div className="viTriCuThe spaces pb-4 mt-10">
												<LabelRequired
													className="text-primary spaces fw-700 h-24 mb-4"
													label="Vị trí cụ thể"
												/>
												<Autocomplete
													className="spaces h-25"
													name="khoaPhongXayRaSuCo"
													options={[]}
												/>
											</div>
											<div className="de-xuat-giai-phap spaces pb-4 mt-10">
												<LabelRequired
													className="text-primary spaces fw-700 h-24 mb-4"
													label="Đề xuất giải pháp ban đầu"
													isRequired
												/>
												<TextField
													className="spaces min-w-242 h-92"
													name="deXuatGiaiPhap"
													as="textarea"
													rows={4}
													onChange={handleChange}
												/>
											</div>
										</div>
										<div className="w-50">
											<div className="mo-ta-su-co spaces pb-4">
												<LabelRequired
													className="text-primary spaces fw-700 h-24 mb-4"
													label="Mô tả ngắn gọn sự cố"
													isRequired
												/>
												<TextField
													className="spaces min-w-242 h-92"
													name="moTaNganGonSuCo"
													as="textarea"
													rows={4}
												/>
											</div>
											<div className="dieu-tri-xu-ly spaces pb-4 mt-10">
												<LabelRequired
													className="text-primary spaces fw-700 h-24 mb-4"
													label="Điều trị/xử lý ban đầu đã thực hiện"
													isRequired
												/>
												<TextField
													className="spaces min-w-242 h-92"
													name="dieuTriXuLy"
													as="textarea"
													rows={4}
													onChange={handleChange}
												/>
											</div>
										</div>
									</div>
									<div className="d-flex spaces gap-20 align-items-center">
										<div className="w-50">
											<div>
												<div className="d-flex spaces gap-32 h-29 mb-4">
													<LabelRequired
														className="text-primary spaces fw-700"
														label="Thông báo cho bác sĩ, người có trách nhiệm"
														isRequired
													/>
												</div>
												<div className="d-flex spaces gap-32 h-18">
													{OPTION_XAC_NHAN.map(
														(data) => (
															<label className="d-flex align-items-center spaces min-w-120 gap-4">
																<Field
																	type="radio"
																	name="thongBaoChoBS"
																	value={
																		data.code
																	}
																/>
																{data.name}
															</label>
														)
													)}
												</div>
											</div>
											<div className="spaces mt-10">
												<div className="d-flex spaces gap-32 h-29 mb-4">
													<LabelRequired
														className="text-primary spaces fw-700"
														label="Thông báo cho người nhà/Người bảo hộ"
														isRequired
													/>
												</div>
												<div className="d-flex spaces gap-32 h-18">
													{OPTION_XAC_NHAN.map(
														(data) => (
															<label className="d-flex align-items-center spaces min-w-120 gap-4">
																<Field
																	type="radio"
																	name="thongBaoChoNguoiNha"
																	value={
																		data.code
																	}
																/>
																{data.name}
															</label>
														)
													)}
												</div>
											</div>
											<div className="spaces mt-10">
												<div className="d-flex spaces gap-32 h-29 mb-4">
													<LabelRequired
														className="text-primary spaces fw-700"
														label="Phân loại ban đầu về sự cố"
														isRequired
													/>
												</div>
												<div className="d-flex spaces gap-32 h-18">
													{OPTION_PHAN_LOAI.map(
														(data) => (
															<label className="d-flex align-items-center spaces min-w-120 gap-4">
																<Field
																	type="radio"
																	name="phanLoaiSuCo"
																	value={
																		data.code
																	}
																/>
																{data.name}
															</label>
														)
													)}
												</div>
											</div>
										</div>
										<div className="w-50">
											<div>
												<div className="d-flex spaces gap-32 h-29 mb-4">
													<LabelRequired
														className="text-primary spaces fw-700"
														label="Thông báo cho người bệnh"
														isRequired
													/>
												</div>
												<div className="d-flex spaces gap-32 h-18">
													{OPTION_XAC_NHAN.map(
														(data) => (
															<label className="d-flex align-items-center spaces min-w-120 gap-4">
																<Field
																	type="radio"
																	name="thongBaoChoNguoiBenh"
																	value={
																		data.code
																	}
																/>
																{data.name}
															</label>
														)
													)}
												</div>
											</div>
											<div className="spaces mt-10">
												<div className="d-flex spaces gap-32 h-29 mb-4">
													<LabelRequired
														className="text-primary spaces fw-700"
														label="Ghi nhận vào hồ sơ bệnh án/Giấy tờ liên quan"
														isRequired
													/>
												</div>
												<div className="d-flex spaces gap-32 h-18">
													{OPTION_XAC_NHAN.map(
														(data) => (
															<label className="d-flex align-items-center spaces min-w-120 gap-4">
																<Field
																	type="radio"
																	name="ghiNhanHoSo"
																	value={
																		data.code
																	}
																/>
																{data.name}
															</label>
														)
													)}
												</div>
											</div>
											<div className="spaces mt-10">
												<div className="d-flex spaces gap-32 h-29 mb-4">
													<LabelRequired
														className="text-primary spaces fw-700"
														label="Đánh giá ban đầu về mức độ ảnh hưởng của sự cố"
														isRequired
													/>
												</div>
												<div className="d-flex spaces gap-32 h-18">
													{OPTION_MUC_DO_AH.map(
														(data) => (
															<label className="d-flex align-items-center spaces min-w-120 gap-4">
																<Field
																	type="radio"
																	name="danhGiaMucDoAnhHuong"
																	value={
																		data.code
																	}
																/>
																{data.name}
															</label>
														)
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="tt-nguoi-thong-bao form-child-container">
										<div className="d-flex spaces gap-32 h-29">
											<LabelRequired
												className="text-primary spaces fw-700"
												label="Thông tin người thông báo"
											/>
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													label="Họ tên"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="hoTen"
													type="text "
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Số điện thoại"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="soDienThoai"
													type="text "
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Email"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="email"
													type="text "
													onChange={handleChange}
												/>
											</div>
										</div>
										<div className="d-flex spaces gap-10 max-w-800 h-63 my-10  flex-wrap">
											{TT_NGUOI_THONG_BAO?.map((data) => (
												<label className="d-flex align-items-center spaces min-w-200 gap-4 ">
													<Field
														type="radio"
														name="vaitro"
														value={data?.code}
													/>
													{data?.name}
													{data.code ===
														TT_NGUOI_THONG_BAO[4]
															.code && (
														<TextField
															className="spaces min-w-242"
															name="tenSuCo"
															type="text "
															onChange={
																handleChange
															}
														/>
													)}
												</label>
											))}
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													label="Người chưng kiến 1"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="ngChungKien1"
													type="text "
													onChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Người chứng kiến 2"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="ngChungKien2"
													type="text "
													onChange={handleChange}
												/>
											</div>
										</div>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer className="d-flex justify-content-center">
								<Button className="button-primary" type="submit">
									Lưu nháp
								</Button>
								<Button className="button-primary">
									Gửi báo cáo
								</Button>
								<Button className="button-primary">Hủy</Button>
							</Modal.Footer>
						</form>
					);
				}}
			</Formik>
		</Modal>
	);
}
