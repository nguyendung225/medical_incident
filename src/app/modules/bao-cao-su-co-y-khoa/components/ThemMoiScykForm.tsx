import { ErrorMessage, Field, Formik } from "formik";
import LabelRequired from "../../component/LabelRequired";
import TextField from "../../component/TextField";
import Autocomplete from "../../component/input-field/Autocomplete";
import RadioGroup from "../../component/input-field/RadioGroup";
import * as Yup from "yup";
import { checkInvalidDate } from "../../utils/ValidationSchema";
import { regex } from "../../constant";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../AppContext";
import UploadImagePopup, { IUploadImage } from "../../component/upload-image/UploadImagePopup";
import { MedicalIncidentInfo } from "../models/BaoCaoSCYKModels";
import moment from "moment";
import { toast } from "react-toastify";
import { 
	DOI_TUONG_XAY_RA_SC, 
	GENDER_OPTION, 
	InitThongTinSCYK, 
	OPTION_HINH_THUC_BC, 
	OPTION_MUC_DO_AH, 
	OPTION_PHAN_LOAI, 
	OPTION_XAC_NHAN, 
	OTHER_FIELD_LOAI_NBC, 
	TT_NGUOI_THONG_BAO 
} from "../const/constants";
import { convertLabelByCode } from "../../utils/FormatUtils";
import { Button, Col, Row } from "react-bootstrap";
import { addScykByQrCode, getDSBenhNhan, getDSPhongBan } from "../services/BaoCaoSCYKServices";
import { useNavigate } from "react-router-dom";
import { MEDICAL_INCIDENT_REPORT_STATUS } from "../../utils/Constant";

const ThemMoiScykForm = () => {
	const { lang, intl } = useMultiLanguage();
	const { setPageLoading } = useContext(AppContext);
	const navigate = useNavigate()
	const [shouldOpenUploadImageModal, setShouldOpenUploadImageModal] = useState(false);
	const [imageList, setImageList] = useState<IUploadImage[]>([]);
	const [phongBanList, setPhongBanList] = useState([]);
	const [benhNhanList, setBenhNhanList] = useState([]);

	const validationSchema = Yup.object().shape({
		hinhThuc: Yup.string().required("Bắt buộc chọn"),
		moTa: Yup.string().required("Bắt buộc nhập"),
		name: Yup.string().required("Bắt buộc nhập"),
		ngayBaoCao: Yup.date()
			.concat(checkInvalidDate(intl))
			.required(lang("VALIDATION.REQUIRE"))
			.when("ngayXayRa", {
				is: (tuNgay: Date | null) => tuNgay,
				then: Yup.date()
					.min(
						Yup.ref("ngayXayRa"),
						lang("VALIDATION.MINDATE") +
						lang("ngày xảy ra")
					)
					.max(new Date(), "Không được lớn hơn ngày hiện tại")
					.nullable()
			})
			.nullable(),
		ngayXayRa: Yup.date()
			.concat(checkInvalidDate(intl))
			.required(lang("VALIDATION.REQUIRE"))
			.nullable(),
		thoiGianXayRa: Yup.string().required("Bắt buộc nhập"),
		thongBaoChoBacSi: Yup.string().required("Bắt buộc nhập"),
		noiXayRa: Yup.string().required("Bắt buộc nhập"),
		soDienThoaiNbc: Yup.string().matches(regex.phone, 'Số điện thoại không hợp lệ'),
		loaiDoiTuong: Yup.array()
			.of(Yup.string())
			.min(1, 'Yêu cầu chọn loại dối tượng').nullable()
	});

	const handleSubmit = async (values: MedicalIncidentInfo) => {
		const thongTinSCYK = { ...values };
		thongTinSCYK.loaiDoiTuong = thongTinSCYK.loaiDoiTuong?.toString();
		thongTinSCYK.benhNhanId = thongTinSCYK.benhNhan?.id;
		thongTinSCYK.thoiGianXayRa = moment(`${thongTinSCYK.ngayXayRa}T${thongTinSCYK.thoiGianXayRa}`).format("HH:mm:ss");
		thongTinSCYK.files = imageList;
        thongTinSCYK.trangThaiXuLy = MEDICAL_INCIDENT_REPORT_STATUS.CHO_TIEP_NHAN;

		try {
			setPageLoading(true);
			const { data } = await addScykByQrCode(thongTinSCYK);
			toast.success("Báo cáo sự cố y khoa thành công");
            setTimeout(() => {
				navigate("/");
			}, 3000)
		} catch (error) {
			toast.error("Lỗi hệ thống, vui lòng thử lại!");
		} finally {
			setPageLoading(false);
		}
	};

	const handleRemoveImageFile = (imageFile: IUploadImage) => {
		const imageListTemp = imageList.filter(imageItem => imageItem.src !== imageFile.src);
		setImageList(imageListTemp);
	}

	const handleGetCatagoryInfo = async () => {
		try {
            setPageLoading(true);
            const donViBaoCaoListTemp = await getDSPhongBan();
			const benhNhanListTemp = await getDSBenhNhan();
            setPhongBanList(donViBaoCaoListTemp?.data?.data);
            setBenhNhanList(benhNhanListTemp?.data?.data);
        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        } finally {
			setPageLoading(false);
		}
	}

	const handleCapture = (e: any) => {
		if (e.target.files && e.target.files.length > 0) {
            const files = [...e.target.files];
			const reader = new FileReader();
			reader.addEventListener("load", () =>
				setImageList([
					...imageList,
					{
						src: reader.result,
						files: files,
						isEmpty: false,
						formData: ""	
					}
				])
			);
			reader.readAsDataURL(files[0]);
        }
	}

	useEffect(() => {
		handleGetCatagoryInfo();
	}, [])

	return (
		<div className="bao-cao-scyk-container">
			<Formik
				validationSchema={validationSchema}
				initialValues={InitThongTinSCYK}
				onSubmit={handleSubmit}
			>
				{({
					errors,
					values,
					touched,
					handleChange,
					handleSubmit,
					setFieldValue,
				}) => {
					return (
						<form onSubmit={handleSubmit}>
							<div className="form-container modal-fullscreen">
								<div className="text-center spaces fs-24 fw-bold">Báo cáo SCYK</div>
								<div className="form-child-container">
									<div className="d-flex spaces gap-32 hinh-thuc-bao-cao">
										<LabelRequired
											isRequired
											className="text-primary spaces min-w-130 fw-700"
											label="Hình thức báo cáo sự cố"
										/>
										<RadioGroup
											labelClassName="spaces min-w-120"
											groupContainerClassName="d-flex"
											className="d-flex"
											name="hinhThuc"
											value={values?.hinhThuc}
											handleChange={handleChange}
											radioItemList={
												OPTION_HINH_THUC_BC
											}
										/>
									</div>
								</div>
								<div className="form-child-container">
									<Row className="spaces max-width-1280">
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Mã sự cố y khoa"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													disabled
													className="spaces flex-1"
													name="code"
													type="text"
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Tên sự cố y khoa"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													className="spaces flex-1"
													name="name"
													type="text "
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Đơn vị báo cáo"
													className="spaces min-w-130 fw-500"
												/>
												<Autocomplete
													onChange={(
														selectedOption
													) =>
														setFieldValue(
															"donViBaoCao",
															selectedOption?.id
														)
													}
													className="spaces h-25 flex-1"
													name="donViBaoCao"
													options={phongBanList}
													value={values?.donViBaoCao}
													errors={errors?.donViBaoCao}
													touched={
														touched?.donViBaoCao
													}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Ngày báo cáo"
													className="spaces min-w-130 fw-500 "
												/>
												<TextField
													className="spaces flex-1"
													name="ngayBaoCao"
													type="date"
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Ngày xảy ra sự cố"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													isRequired
													className="spaces flex-1"
													name="ngayXayRa"
													type="date"
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Thời gian xảy ra sự cố"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													className="spaces flex-1"
													name="thoiGianXayRa"
													type="time"
													handleChange={handleChange}
												/>
											</div>
										</Col>
									</Row>
								</div>
								<div className="form-child-container">
									<div className="d-flex spaces gap-32 h-24">
										<LabelRequired
											className="text-primary spaces fw-700"
											label="Thông tin người bệnh"
										/>
									</div>
									<Row className="spaces max-width-1280">
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Mã bệnh nhân"
													className="spaces min-w-130 fw-500"
												/>
												<Autocomplete
													onChange={(
														selectedOption
													) =>
														setFieldValue(
															"benhNhan",
															selectedOption,
														)
													}
													getOptionLabel={(option) =>
														`${option.code}`
													}
													className="spaces h-25 flex-1"
													name="benhNhan"
													value={values.benhNhan}
													errors={errors?.benhNhan}
													touched={touched?.benhNhan}
													options={benhNhanList}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Họ và tên"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													disabled
													className="spaces flex-1"
													name="benhNhan.name"
													value={values.benhNhan?.name || ""}
													type="text "
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Sổ bệnh án"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													disabled
													className="spaces flex-1"
													name="benhNhan.soBenhAn"
													value={values.benhNhan?.soBenhAn}
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Ngày sinh"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													disabled
													className="spaces flex-1"
													name="benhNhan.ngaySinh"
													value={(values.benhNhan?.ngaySinh && moment(values.benhNhan?.ngaySinh).format('YYYY-MM-DD')) || ""}
													type="date"
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Giới tính"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													disabled
													className="spaces flex-1"
													type="text"
													name="gioiTinh"
													value={convertLabelByCode(GENDER_OPTION, values?.benhNhan?.gioiTinh) || ""}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Khoa/Phòng"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													disabled
													className="spaces flex-1"
													name="khoaphong"
													type="text"
													value={convertLabelByCode(phongBanList, values?.benhNhan?.khoaPhongDieuTriId) || ""}
												/>
											</div>
										</Col>
									</Row>
								</div>
								<div>
									<div className="d-flex spaces gap-32 h-24">
										<LabelRequired
											isRequired
											className="text-primary spaces fw-700"
											label="Đối tượng xảy ra sự cố"
										/>
									</div>
									<Row className="spaces max-w-1280">
										{DOI_TUONG_XAY_RA_SC.map((data) => (
											<Col xs={12} sm={12} md={6} lg={6} xl={3} className="spaces mt-5">
												<label className="d-flex align-items-center gap-2 min-w-200px">
													<Field
														type="checkbox"
														name="loaiDoiTuong"
														value={data.code}
													/>
													{data.name}
												</label>
											</Col>
										))}
									</Row>
									<ErrorMessage name="loaiDoiTuong" className="text-danger" component="div" />
								</div>
								<Row>
									<Col xs={12} sm={12} md={6} lg={6} className="spaces mt-5">
										<div className="khoa-phong-xay-ra-su-co spaces pb-4">
											<LabelRequired
												isRequired
												className="text-primary spaces fw-700 h-24 mb-4"
												label="Khoa/Phòng/Vị trí xảy ra sự cố"
											/>
											<TextField
												className="spaces flex-1"
												name="noiXayRa"
												type="text"
												handleChange={handleChange}
											/>
										</div>
										<div className="viTriCuThe spaces pb-4 mt-10">
											<LabelRequired
												className="text-primary spaces fw-700 h-24 mb-4"
												label="Vị trí cụ thể"
											/>
											<TextField
												className="spaces flex-1"
												name="viTriCuThe"
												type="text "
												handleChange={handleChange}
											/>
										</div>
									</Col>
									<Col xs={12} sm={12} md={6} lg={6} className="spaces mt-5">
										<div className="mo-ta-su-co spaces pb-4">
											<LabelRequired
												className="text-primary spaces fw-700 h-24 mb-4"
												label="Mô tả ngắn gọn sự cố"
												isRequired
											/>
											<TextField
												className="spaces flex-1 h-92"
												name="moTa"
												as="textarea"
												rows={4}
											/>
										</div>
									</Col>
								</Row>
								<div className="d-flex spaces gap-20 align-items-center">
									<div className="w-100 ">
										<div className="d-flex flex-wrap spaces gap-10">
											<LabelRequired
												className="text-primary spaces fw-700 h-24 mb-4 width-100"
												label="Hình ảnh sự cố"
											/>
											<Button 
												className="button-primary"
												onClick={() => setShouldOpenUploadImageModal(true)}
											> 
												+ Thêm hình ảnh sự cố
											</Button>
											<div>
												<label htmlFor="picture" className="button-primary">+ Chụp ảnh sự cố</label>
												<input type="file" id="picture" name="picture" accept="image/*" capture="environment" 
													onChange={handleCapture}
												/>
											</div>
										</div>
										<div className="d-flex flex-wrap spaces gap-12 mt-20">
											{imageList.length > 0 && imageList.map((image: IUploadImage) => {
												return (
													<div className="img-box-container">
														<div
															className="btn-remove-img btn-close"
															onClick={() => handleRemoveImageFile(image)}
														></div>
														<img src={image.src} className="img w-100" alt="" />
													</div>
												)
											})}
										</div>
										<UploadImagePopup
											open={shouldOpenUploadImageModal}
											handleClose={() => setShouldOpenUploadImageModal(false)}
											handleUpdate={(value) => {
												setImageList([...imageList, ...value]);
												setShouldOpenUploadImageModal(false);
											}}
										/>
									</div>
								</div>
								<Row>
									<Col xs={12} sm={12} md={6} lg={6} className="spaces mt-5">
										<div className="spaces pb-4 mt-10">
											<LabelRequired
												className="text-primary spaces fw-700 h-24 mb-4"
												label="Đề xuất giải pháp ban đầu"
											/>
											<TextField
												className="spaces flex-1 h-92"
												name="deXuat"
												as="textarea"
												rows={4}
												handleChange={handleChange}
											/>
										</div>
									</Col>
									<Col xs={12} sm={12} md={6} lg={6} className="spaces mt-5">
										<div className="spaces pb-4 mt-10">
											<LabelRequired
												className="text-primary spaces fw-700 h-24 mb-4"
												label="Điều trị/xử lý ban đầu đã thực hiện"
											/>
											<TextField
												className="spaces flex-1 h-92"
												name="dieuTriBanDau"
												as="textarea"
												rows={4}
												handleChange={handleChange}
											/>
										</div>
									</Col>
								</Row>
								<div className="radio-group-container">
									<div className="radio-group-wrapper">
										<div>
											<div className="d-flex spaces gap-32 mb-4">
												<LabelRequired
													className="text-primary spaces fw-700"
													label="Thông báo cho bác sĩ, người có trách nhiệm"
													isRequired
												/>
											</div>
											<div className="d-flex spaces gap-32">
												<RadioGroup
													labelClassName="spaces min-w-100"
													className="d-flex"
													name="thongBaoChoBacSi"
													value={values?.thongBaoChoBacSi}
													handleChange={handleChange}
													radioItemList={OPTION_XAC_NHAN}
												/>
											</div>
										</div>
										<div className="spaces mt-10">
											<div className="d-flex spaces gap-32 mb-4">
												<LabelRequired
													className="text-primary spaces fw-700"
													label="Thông báo cho người nhà/Người bảo hộ"
													isRequired
												/>
											</div>
											<div className="d-flex spaces gap-32">
												<RadioGroup
													labelClassName="spaces min-w-100"
													className="d-flex"
													name="thongBaoNguoiNha"
													value={values?.thongBaoNguoiNha}
													handleChange={handleChange}
													radioItemList={OPTION_XAC_NHAN}
												/>
											</div>
										</div>
										<div className="spaces mt-10">
											<div className="d-flex spaces gap-32 mb-4">
												<LabelRequired
													className="text-primary spaces fw-700"
													label="Phân loại ban đầu về sự cố"
													isRequired
												/>
											</div>
											<div className="d-flex spaces gap-32">
												<RadioGroup
													labelClassName="spaces min-w-100"
													className="d-flex"
													name="phanLoaiBanDau"
													value={values?.phanLoaiBanDau}
													handleChange={handleChange}
													radioItemList={OPTION_PHAN_LOAI}
												/>
											</div>
										</div>
									</div>
									<div className="radio-group-wrapper">
										<div>
											<div className="d-flex spaces gap-32 mb-4">
												<LabelRequired
													className="text-primary spaces fw-700"
													label="Thông báo cho người bệnh"
													isRequired
												/>
											</div>
											<div className="d-flex spaces gap-32">
												<RadioGroup
													labelClassName="spaces min-w-100"
													className="d-flex"
													name="thongBaoNguoiBenh"
													value={values?.thongBaoNguoiBenh}
													handleChange={handleChange}
													radioItemList={OPTION_XAC_NHAN}
												/>
											</div>
										</div>
										<div className="spaces mt-10">
											<div className="d-flex spaces gap-32 mb-4">
												<LabelRequired
													className="text-primary spaces fw-700"
													label="Ghi nhận vào hồ sơ bệnh án/Giấy tờ liên quan"
													isRequired
												/>
											</div>
											<div className="d-flex spaces gap-32">
												<RadioGroup
													labelClassName="spaces min-w-100"
													className="d-flex"
													name="ghiNhanHoSo"
													value={values?.ghiNhanHoSo}
													handleChange={handleChange}
													radioItemList={OPTION_XAC_NHAN}
												/>
											</div>
										</div>
										<div className="spaces mt-10">
											<div className="d-flex spaces gap-32 mb-4">
												<LabelRequired
													className="text-primary spaces fw-700"
													label="Đánh giá ban đầu về mức độ ảnh hưởng của sự cố"
													isRequired
												/>
											</div>
											<div className="d-flex spaces gap-32">
												<RadioGroup
													labelClassName="spaces min-w-100"
													className="d-flex"
													name="danhGiaBanDau"
													value={values?.danhGiaBanDau}
													handleChange={handleChange}
													radioItemList={OPTION_MUC_DO_AH}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="form-child-container">
									<div className="d-flex spaces gap-32 h-29">
										<LabelRequired
											className="text-primary spaces fw-700"
											label="Thông tin người thông báo"
										/>
									</div>
									<Row className="spaces max-width-1280">
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Họ tên"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													className="spaces flex-1"
													name="tenNbc"
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Số điện thoại"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													className="spaces flex-1"
													name="soDienThoaiNbc"
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Email"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													className="spaces flex-1"
													name="emailNbc"
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</Col>
									</Row>
									<div className="spaces max-w-783 my-10">
										<RadioGroup
											className="d-flex"
											name="loaiNbc"
											labelClassName="spaces min-w-200"
											value={values?.loaiNbc}
											handleChange={handleChange}
											radioItemList={TT_NGUOI_THONG_BAO}
											otherField={
												values.loaiNbc === OTHER_FIELD_LOAI_NBC && <TextField
													className="spaces flex-1 min-w-242"
													name="loaiNbcKhac"
													handleChange={handleChange}
													type="text"
												/>
											}
										/>
									</div>
									<Row className="spaces max-width-1280">
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Người chưng kiến 1"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													className="spaces flex-1"
													name="tenNck1"
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12} sm={12} md={6} lg={6} xl={4} className="spaces mt-5">
											<div className="d-flex">
												<LabelRequired
													label="Người chứng kiến 2"
													className="spaces min-w-130 fw-500"
												/>
												<TextField
													className="spaces flex-1"
													name="tenNck2"
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</Col>
									</Row>
								</div>
							</div>
							<div className="d-flex align-items-center justify-content-center spaces gap-10">
								<Button
									className="button-primary"
									type="submit"
									onClick={() => { }}
								>
									Gửi báo cáo
								</Button>
							</div>
						</form>
					);
				}}
			</Formik>
		</div>
	)
}

export default ThemMoiScykForm;