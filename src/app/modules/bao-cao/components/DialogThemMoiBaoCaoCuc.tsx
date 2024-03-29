import { Formik } from "formik";
import { Button, Col, Modal, Row } from "react-bootstrap";
import * as Yup from "yup";
import TextField from "../../component/TextField";
import { MEDICAL_INCIDENT_REPORT_STATUS } from "../../utils/Constant";
import LabelRequired from "../../component/LabelRequired";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { localStorageItem } from "../../utils/LocalStorage";
import { MedicalIncidentInfo } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import Autocomplete from "../../component/input-field/Autocomplete";
import { SINGIN_OPTION } from "../../bien-ban-xac-minh/const/constants";
import { heightSelectMutil } from "../../component/input-field/StyleComponent";
type Props = {
	handleClose: () => void;
	updatePageData: (objectSearch: any) => void;
	thongTinSCYK: MedicalIncidentInfo
};

export default function DialogThemMoiBaoCaoCuc({
	handleClose,
	thongTinSCYK,
}: Props) {
	const validationSchema = Yup.object().shape({
		noiDungBaoCao: Yup.string().required("Bắt buộc nhập"),
		noiXayRa: Yup.string().required("Bắt buộc nhập"),
		thoiGianBaoCao: Yup.string().required("Bắt buộc nhập"),
		ngayXayRa: Yup.string().required("Bắt buộc nhập"),
		ketLuan: Yup.string().required("Bắt buộc nhập"),
		ngayBaoCao: Yup.string().required("Bắt buộc nhập"),
		signStatus: Yup.string().required("Bắt buộc nhập"),
		noiNhan: Yup.string().required("Bắt buộc nhập"),
		khoaPhong: Yup.string().required("Bắt buộc nhập"),
	});

	const handleSubmit = async () => {
	};

	return (
		<Modal
			show={true}
			centered
			onHide={handleClose}
			size="xl"
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
					values,
					handleChange,
					handleSubmit,
					setFieldValue,
				}) => {
					return (
						<form onSubmit={handleSubmit}>
							<Modal.Body className="spaces p-10">
								<>
									<Row className="form-container flex-row">
										<Col xs={12}>
											<Row>
												<Col xs={4}>
													<div className="d-flex">
														<LabelRequired
															label="Mã sự cố y khoa"
															className="spaces min-w-140 fw-500"
														/>
														<Autocomplete
															onChange={() => { }}
															getOptionLabel={(option) => option.code}
															className="spaces h-25 width-100"
															name="suCoId"
															options={[]}
														/>
													</div>
												</Col>
												<Col xs={4}>
													<div className="d-flex">
														<LabelRequired
															label="Tên báo cáo"
															className="spaces min-w-140 fw-500"
														/>
														<TextField
															disabled
															className="spaces h-25 width-100"
															type="text"
															name="tenBaoCao"
														/>
													</div>
												</Col>
											</Row>
										</Col>
										<Col xs={12}>
											<div className="d-flex">
												<LabelRequired
													label="Báo cáo về việc"
													className="spaces min-w-140 fw-500"
												/>
												<TextField
													className="spaces h-25 width-100"
													type="text"
													name="noiDungBaoCao"
												/>
											</div>
										</Col>
										<Col xs={12}>
											<div className="spaces d-flex">
												<LabelRequired
													isRequired
													className="spaces min-w-140 h-24"
													label="Địa điểm xảy ra"
												/>
												<TextField
													disabled
													name="noiXayRa"
													type="text"
													className="spaces h-25 width-100"
													handleChange={handleChange}
												/>
											</div>
										</Col>
										<Col xs={12}>
											<Row >
												<Col xs={3}>
													<div className="d-flex">
														<LabelRequired
															label="Thời gian"
															className="spaces min-w-60 fw-500"
														/>
														<TextField
															className="spaces width-100"
															name="thoiGianBaoCao"
															type="time"
														/>
													</div>
												</Col>
												<Col xs={3}>
													<div className="d-flex">
														<LabelRequired
															label="Ngày"
															className="spaces min-w-60 fw-500"
														/>
														<TextField
															className="spaces width-100"
															name="ngayXayRa"
															type="date"
														/>
													</div>
												</Col>
											</Row>
										</Col>
										<Col xs={12}>
											<LabelRequired
												label="Kết luận của bệnh viện"
												className="spaces min-w-140 fw-600 mb-5 text-cyan"
											/>
											<TextField
												className="spaces min-w-242"
												name="ketLuan"
												as="textarea"
												rows={3}
											/>
										</Col>
										<Col xs={12}>
											<LabelRequired
												label="Thông tin báo cáo"
												className="spaces min-w-140 fw-600 mb-5 text-cyan"
											/>
											<Row >
												<Col xs={3}>
													<LabelRequired
														label="Ngày báo cáo"
														className="spaces min-w-80 fw-500"
													/>
													<TextField
														className="spaces width-100"
														name="ngayBaoCao"
														type="date"
													/>
												</Col>
												<Col xs={3}>
													<LabelRequired
														label="Giám đốc"
														className="spaces min-w-140 fw-500"
													/>
													<Autocomplete
														menuPlacement="top"
														className="spaces h-25 min-w-242"
														name="signStatus"
														options={SINGIN_OPTION}
														value={null}
													/>
												</Col>
												<Col xs={3}>
													<LabelRequired
														label="Nơi nhận"
														className="spaces min-w-140 fw-500"
													/>
													<Autocomplete
														menuPlacement="top"
														className="spaces h-25 min-w-242"
														name="noiNhan"
														styles={heightSelectMutil("auto", "24px")}
														isMulti
														options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
														value={null}
														getOptionLabel={(option) => option.name}
														getOptionValue={option => option.id}
													/>
												</Col>
												<Col xs={3}>
													<LabelRequired
														label="Khoa/Phòng"
														className="spaces min-w-140 fw-500"
													/>
													<Autocomplete
														menuPlacement="top"
														className="spaces h-25 min-w-242"
														name="khoaPhong"
														options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_PHONG_BAN)}
														value={values?.benhNhan?.khoaPhongDieuTriId}
														getOptionLabel={(option) => option.name}
														getOptionValue={option => option.id}
													/>
												</Col>
											</Row>
										</Col>
									</Row>
								</>
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
