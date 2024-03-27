import { Col, Row } from "react-bootstrap";
import LabelRequired from "../../component/LabelRequired";
import TextField from "../../component/TextField";
import "../PhanTichSCYK.scss";
import RadioGroup from "../../component/input-field/RadioGroup";
import CheckboxGroup from "../../component/input-field/CheckboxGroup";
import { MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS, MUC_DO_TON_THUONG_TREN_TO_CHUC_OPTIONS } from "../constants/constants";
import { OPTION_XAC_NHAN } from "../../bao-cao-su-co-y-khoa/const/constants";
import { IPhanTichScyk } from "../models/PhanTichSCYKModels";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import Autocomplete from "../../component/input-field/Autocomplete";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";

const TabCapQuanLy = () => {
	const {
		values,
		setFieldValue,
		handleChange,
	} = useFormikContext<IPhanTichScyk>();

	useEffect(() => {
		setFieldValue("gioNgayPhanTich", values?.ngayPhanTich + "T" + values?.gioPhanTich);
	}, []);

	return (
		<>
			<Row className="form-container flex-row">
				<Col xs={12}>
					<LabelRequired
						label="Đánh giá của Trưởng nhóm chuyên gia"
						className="spaces min-w-140 fw-900 mb-5 text-cyan"
					/>
					<Row className="spaces align-items-center pl-10">
						<Col xs={12}>
							<LabelRequired
								label="Mô tả kết quả phát hiện được"
								className="spaces min-w-140 fw-500 mb-5"
							/>
							<TextField
								className="spaces min-w-242 mb-10"
								name="moTaKetQuaPhatHien"
								as="textarea"
								rows={3}
							/>
						</Col>
						<Col xs={12}>
							<LabelRequired
								label="Đã thảo luận đưa khuyến cáo/hướng xử lý với người báo cáo"
								className="spaces min-w-140 fw-500 mb-5"
							/>
							<RadioGroup
								name="thaoLuanDuaKhuyenCaoNbc"
								radioItemList={OPTION_XAC_NHAN}
								className="spaces mb-10"
								handleChange={handleChange}
								value={values?.thaoLuanDuaKhuyenCaoNbc}
							/>
						</Col>
						<Col xs={12}>
							<LabelRequired
								label="Phù hợp với các khuyến cáo chính thức được ban hành"
								className="spaces min-w-140 fw-500 mb-5"
							/>
							<RadioGroup
								name="phuHopVoiKhuyenCao"
								radioItemList={OPTION_XAC_NHAN}
								className="spaces mb-10"
								handleChange={handleChange}
								value={values?.phuHopVoiKhuyenCao}
							/>
						</Col>
						<Col xs={4}>
							<div className="d-flex">
								<LabelRequired
									label="Cụ thể khuyến cáo"
									className="spaces min-w-140 fw-500"
								/>
								<TextField
									className="spaces min-w-220"
									type="text"
									name="cuTheKhuyenCao"
									value={values?.cuTheKhuyenCao}
									handleChange={handleChange}
								/>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<LabelRequired
						label="Đánh giá mức độ tổn thương"
						className="spaces min-w-140 fw-900 mb-5 text-cyan"
					/>
					<Row className="spaces align-items-center pl-10 mb-5">
						<Col xs={12}>
							<LabelRequired
								label="Trên người bệnh"
								className="spaces min-w-140 fw-500 mb-5"
							/>
						</Col>
						<Col xs={12}>
							<Row className="spaces align-items-center pl-10">
								<Col xs={4}>
									<RadioGroup
										lable="Chưa xảy ra (NC0)"
										name="tonHaiNguoiBenh"
										radioItemList={MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.CHUA_XAY_RA}
										handleChange={handleChange}
										className="d-flex"
										classLable="spaces min-w-180 flex-0"
										value={values?.tonHaiNguoiBenh}
									/>
								</Col>
								<Col xs={4}>
									<RadioGroup
										lable="Tổn thương nhẹ (NC1)"
										name="tonHaiNguoiBenh"
										radioItemList={MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.NHE}
										handleChange={handleChange}
										className="d-flex"
										classLable="spaces min-w-180 flex-0"
										value={values?.tonHaiNguoiBenh}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row className="spaces align-items-center pl-10 mb-5">
						<Col xs={12}>
							<Row className="spaces align-items-center pl-10">
								<Col xs={4}>
									<RadioGroup
										lable="Tổn thương trung bình (NC2)"
										name="tonHaiNguoiBenh"
										radioItemList={MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.TRUNG_BINH}
										handleChange={handleChange}
										className="d-flex"
										classLable="spaces min-w-180 flex-0"
										value={values?.tonHaiNguoiBenh}
									/>
								</Col>
								<Col xs={4}>
									<RadioGroup
										lable="Tổn thương nặng (NC3)"
										name="tonHaiNguoiBenh"
										radioItemList={MUC_DO_TON_THUONG_TREN_NGUOI_DUNG_OPTIONS.NANG}
										handleChange={handleChange}
										className="d-flex"
										classLable="spaces min-w-180 flex-0"
										value={values?.tonHaiNguoiBenh}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row className="spaces align-items-center pl-10">
						<Col xs={12}>
							<LabelRequired
								label="Trên tổ chức"
								className="spaces min-w-140 fw-500 mb-5"
							/>
						</Col>
						<Col xs={8}>
							<CheckboxGroup
								checkboxItemList={MUC_DO_TON_THUONG_TREN_TO_CHUC_OPTIONS}
								handleChange={
									(values) => {
										setFieldValue("tonHaiToChuc", values)
									}
								}
								classCheckbox="spaces flex-basis-50 mb-5"
								value={values?.tonHaiToChuc}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<LabelRequired
						label="Thông tin người phân tích"
						className="spaces min-w-140 fw-900 mb-5 text-cyan"
					/>
					<Row className="spaces align-items-center pl-10">
						<Col xs={4}>
							<div className="d-flex">
								<LabelRequired
									label="Họ tên"
									className="spaces min-w-100 fw-500"
								/>
								<TextField
									className="spaces min-w-242"
									type="text"
									name="tenNguoiPhanTich"
								/>
							</div>
						</Col>
						<Col xs={4}>
							<div className="d-flex">
								<LabelRequired
									label="Chức danh"
									className="spaces min-w-100 fw-500"
								/>
                                <Autocomplete
                                    menuPlacement="top"
                                    className="spaces h-25 width-100"
                                    name="chucDanhNguoiPhanTich"
                                    options={localStorageItem.get(KEY_LOCALSTORAGE.LIST_CHUC_DANH)}
                                    value={values.chucDanhNguoiPhanTich}
                                    onChange={(option) => {
										setFieldValue("chucDanhNguoiPhanTich",option.id);
									}}
                                />
							</div>
						</Col>
						<Col xs={4}>
							<div className="d-flex">
								<LabelRequired
									label="Giờ / Ngày"
									className="spaces min-w-100 fw-500"
								/>
								<TextField
									className="spaces min-w-242"
									type="datetime-local"
									name="gioNgayPhanTich"
									value={values?.gioNgayPhanTich}
									handleChange={() => {
										setFieldValue("gioNgayPhanTich", values?.gioNgayPhanTich);
									}}
								/>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<div>(1) Tổn thương nhẹ là</div>
					<div>(2) Tổn thương trung bình là</div>
					<div>(3) Tổn thương nặng là</div>
				</Col>
			</Row>
		</>

	);
};

export default TabCapQuanLy;
