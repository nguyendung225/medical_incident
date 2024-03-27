import { ErrorMessage, Field, Formik } from "formik";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import TextField from "../../component/TextField";
import Autocomplete from "../../component/input-field/Autocomplete";
import RadioGroup from "../../component/input-field/RadioGroup";
import { regex } from "../../constant";
import { MEDICAL_INCIDENT_REPORT_STATUS, RESPONSE_STATUS_CODE } from "../../utils/Constant";
import {
    DOI_TUONG_XAY_RA_SC,
    GENDER_OPTION,
    OPTION_HINH_THUC_BC,
    OPTION_MUC_DO_AH,
    OPTION_XAC_NHAN,
    OTHER_FIELD_LOAI_NBC,
    TT_NGUOI_THONG_BAO
} from "../const/constants";
import { MedicalIncidentInfo } from "../models/BaoCaoSCYKModels";
import { addSCYK, updateSCYK } from "../services/BaoCaoSCYKServices";
import LabelRequired from "./../../component/LabelRequired";
import { checkInvalidDate } from "../../utils/ValidationSchema";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { localStorageItem } from "../../utils/LocalStorage";
import { useContext } from "react";
import AppContext from "../../../AppContext";
import { usePageData } from "../../../../_metronic/layout/core";

type Props = {
	handleClose: () => void;
	updatePageData: (objectSearch: any) => void;
    thongTinSCYK:MedicalIncidentInfo
};

export default function DialogThemMoiSCYK({
	handleClose,
    thongTinSCYK,
	updatePageData,
}: Props) {
    const { setUpdateDataTiepNhan } = usePageData()
	const { lang, intl } = useMultiLanguage();
	const { setPageLoading } = useContext(AppContext);
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
		deXuat: Yup.string().required("Bắt buộc nhập"),
		dieuTriBanDau: Yup.string().required("Bắt buộc nhập"),
		thongBaoChoBacSi: Yup.string().required("Bắt buộc nhập"),
        donViBaoCao: Yup.string().required("Bắt buộc chọn").nullable(),
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

        try {
			setPageLoading(true);
            const { data: { code, message } } = thongTinSCYK?.id
                ? await updateSCYK(thongTinSCYK, thongTinSCYK.id)
                : await addSCYK(thongTinSCYK);
            if (code === RESPONSE_STATUS_CODE.CREATED || code === RESPONSE_STATUS_CODE.SUCCESS) {
                updatePageData({});
                setUpdateDataTiepNhan(prev => !prev)
                handleClose();
                toast.success(message);
            }
			setPageLoading(false);
        } catch (error) {
			setPageLoading(false);
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
        }
    };

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
					{thongTinSCYK?.id ? "Cập nhật báo cáo sự cố y khoa" : "Thêm mới báo cáo sự cố y khoa"}
				</Modal.Title>
			</Modal.Header>
			<Formik
				validationSchema={validationSchema}
				initialValues={thongTinSCYK}
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
							<Modal.Body className="spaces p-10">
								<div className="form-container">
									<div className="hinh-thuc-bao-cao-sc form-child-container">
										<div className="d-flex spaces gap-32 h-24">
											<LabelRequired
												isRequired
												className="text-primary spaces fw-700"
												label="Hình thức báo cáo sự cố"
											/>
											<RadioGroup
												labelClassName="spaces min-w-120"
												className="d-flex"
												name="hinhThuc"
												value={values?.hinhThuc}
												handleChange={handleChange}
												radioItemList={
													OPTION_HINH_THUC_BC
												}
											/>
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													label="Mã sự cố y khoa"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													disabled
													className="spaces min-w-242"
													name="code"
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
													name="name"
													type="text "
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													isRequired
													label="Đơn vị báo cáo"
													className="spaces min-w-140 fw-500"
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
													className="spaces h-25 min-w-242"
													name="donViBaoCao"
                                                    options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
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
													handleChange={handleChange}
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
													name="ngayXayRa"
													type="date"
													handleChange={handleChange}
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
													name="thoiGianXayRa"
													type="time"
													handleChange={handleChange}
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
													className="spaces h-25 min-w-242"
													name="benhNhan"
													value={values.benhNhan}
													errors={errors?.benhNhan}
													touched={touched?.benhNhan}
                                                    options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_BENH_NHAN)}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Họ và tên"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													readOnly
													className="spaces min-w-242"
                                                    name="benhNhan.name"
                                                    value={values.benhNhan?.name}
													type="text "
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Sổ bệnh án"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													readOnly
													className="spaces min-w-242"
                                                    name="benhNhan.soBenhAn"
                                                    value={values.benhNhan?.soBenhAn}
													type="text "
													handleChange={handleChange}
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
													readOnly
													className="spaces min-w-242"
                                                    name="benhNhan.ngaySinh"
                                                    value={values.benhNhan?.ngaySinh && moment(values.benhNhan?.ngaySinh).format('YYYY-MM-DD')}
													type="date"
													handleChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Giới tính"
													className="spaces min-w-140 fw-500"
												/>
												<Autocomplete
													isReadOnly
													className="spaces h-25 min-w-242"
													name="gioiTinh"
                                                    value={values?.benhNhan?.gioiTinh}
													options={GENDER_OPTION}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Khoa/Phòng"
													className="spaces min-w-140 fw-500"
												/>
												<Autocomplete
													isReadOnly
													className="spaces h-25 min-w-242"
													name="khoaPhong"
                                                    options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
													value={values?.benhNhan?.khoaPhongDieuTriId}
												/>
											</div>
										</div>
									</div>
									<div className="doi-tuong-xay-ra-su-co">
										<div className="d-flex spaces gap-32 h-24">
											<LabelRequired
                                                isRequired
												className="text-primary spaces fw-700"
												label="Đối tượng xảy ra sự cố"
											/>
										</div>
										<div className="d-flex spaces gap-32 h-24">
											{DOI_TUONG_XAY_RA_SC.map((data) => (
												<label className="d-flex align-items-center gap-2 min-w-200px">
													<Field
														type="checkbox"
														name="loaiDoiTuong"
														value={data.code}
													/>
													{data.name}
												</label>
											))}
                                        </div>
                                        <ErrorMessage name="loaiDoiTuong" className="text-danger" component="div" />
                                    </div>
									<div className="d-flex spaces gap-20 align-items-center">
										<div className="w-50">
											<div className="khoa-phong-xay-ra-su-co spaces pb-4">
												<LabelRequired
													isRequired
													className="text-primary spaces fw-700 h-24 mb-4"
													label="Khoa/Phòng/Vị trí xảy ra sự cố"
												/>
												<TextField
													className="spaces min-w-242"
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
													className="spaces min-w-242"
													name="viTriCuThe"
													type="text "
													handleChange={handleChange}
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
													name="deXuat"
													as="textarea"
													rows={4}
													handleChange={handleChange}
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
													name="moTa"
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
													name="dieuTriBanDau"
													as="textarea"
													rows={4}
													handleChange={handleChange}
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
													<RadioGroup
														labelClassName="spaces min-w-120"
														className="d-flex"
														name="thongBaoChoBacSi"
														value={
															values?.thongBaoChoBacSi
														}
														handleChange={
															handleChange
														}
														radioItemList={
															OPTION_XAC_NHAN
														}
													/>
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
													<RadioGroup
														labelClassName="spaces min-w-120"
														className="d-flex"
														name="thongBaoNguoiNha"
														value={
															values?.thongBaoNguoiNha
														}
														handleChange={
															handleChange
														}
														radioItemList={
															OPTION_XAC_NHAN
														}
													/>
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
													<RadioGroup
														labelClassName="spaces min-w-120"
														className="d-flex"
														name="phanLoaiBanDau"
														value={
															values?.phanLoaiBanDau
														}
														handleChange={
															handleChange
														}
														radioItemList={
															OPTION_XAC_NHAN
														}
													/>
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
													<RadioGroup
														labelClassName="spaces min-w-120"
														className="d-flex"
														name="thongBaoNguoiBenh"
														value={
															values?.thongBaoNguoiBenh
														}
														handleChange={
															handleChange
														}
														radioItemList={
															OPTION_XAC_NHAN
														}
													/>
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
													<RadioGroup
														labelClassName="spaces min-w-120"
														className="d-flex"
														name="ghiNhanHoSo"
														value={
															values?.ghiNhanHoSo
														}
														handleChange={
															handleChange
														}
														radioItemList={
															OPTION_XAC_NHAN
														}
													/>
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
													<RadioGroup
														labelClassName="spaces min-w-120"
														className="d-flex"
														name="danhGiaBanDau"
														value={
															values?.danhGiaBanDau
														}
														handleChange={
															handleChange
														}
														radioItemList={
															OPTION_MUC_DO_AH
														}
													/>
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
													name="tenNbc"
													type="text "
													handleChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Số điện thoại"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="soDienThoaiNbc"
													type="text "
													handleChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Email"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="emailNbc"
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</div>
										<div className="spaces max-w-783 h-63 my-10">
											<RadioGroup
												className="d-flex"
												name="loaiNbc"
												labelClassName="spaces min-w-200"
												value={values?.loaiNbc}
												handleChange={handleChange}
												radioItemList={
													TT_NGUOI_THONG_BAO
												}
                                                otherField={
                                                    values.loaiNbc === OTHER_FIELD_LOAI_NBC && <TextField
                                                        className="spaces min-w-242"
                                                        name="loaiNbcKhac"
                                                        handleChange={handleChange}
                                                        type="text"
                                                    />
                                                }
											/>
										</div>
										<div className="d-flex spaces gap-20 h-29">
											<div className="d-flex">
												<LabelRequired
													label="Người chưng kiến 1"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="tenNck1"
													type="text "
													handleChange={handleChange}
												/>
											</div>
											<div className="d-flex">
												<LabelRequired
													label="Người chứng kiến 2"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces min-w-242"
													name="tenNck2"
													type="text "
													handleChange={handleChange}
												/>
											</div>
										</div>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer className="d-flex justify-content-center">
								<Button
									className="button-primary"
									type="submit"
									onClick={() =>
										setFieldValue(
											"trangThaiXuLy",
											MEDICAL_INCIDENT_REPORT_STATUS.DRAFT
										)
									}
								>
									Lưu nháp
								</Button>
								<Button
									className="button-primary"
									type="submit"
									onClick={() =>
										setFieldValue(
											"trangThaiXuLy",
											MEDICAL_INCIDENT_REPORT_STATUS.CHO_TIEP_NHAN
										)
									}
								>
									Gửi báo cáo
								</Button>
								<Button 
									className="button-gray" 
									onClick={handleClose}
								>
									Hủy
								</Button>
							</Modal.Footer>
						</form>
					);
				}}
			</Formik>
		</Modal>
	);
}
