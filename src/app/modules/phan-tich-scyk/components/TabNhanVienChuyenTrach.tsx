import { Col, Row } from "react-bootstrap";
import LabelRequired from "../../component/LabelRequired";
import TextField from "../../component/TextField";
import "../PhanTichSCYK.scss";
import { Checkbox } from "antd";
import { HANH_VI_OPTIONS, HA_TANG_CO_SO_OPTIONS, HO_SO_TAI_LIEU_OPTIONS, KHAC_5_OPTIONS, KHAC_OPTIONS, MAU_VA_CAC_CHE_PHAM_MAU_OPTIONS, MOI_TRUONG_LAM_VIEC_OPTIONS, NHAN_VIEN_HOAC_NGUOI_BENH_OPTIONS, NHIEM_KHUAN_BENH_VIEN_OPTIONS, QUAN_LY_NGUON_LUC_TO_CHUC_OPTIONS, TAI_NAN_DOI_VOI_NGUOI_BENH_OPTIONS, THIET_BI_Y_TE_OPTIONS, THUOC_VA_DICH_TRUYEN_OPTIONS, THU_THUAT_KY_THUAT_CHUYEN_MON_OPTIONS, TO_CHUC_DICH_VU_OPTIONS, YEU_TO_BEN_NGOAI_OPTIONS } from "../constants/constants";
import { IPhanTichScyk } from "../models/PhanTichSCYKModels";
import { useFormikContext } from "formik";
import { getListSuCoChuaPhanTich } from "../services/PhanTichSCYKServices";
import Autocomplete from "../../component/input-field/Autocomplete";
import CheckboxGroup from "../../component/input-field/CheckboxGroup";
import { useEffect, useState } from "react";
import FileUploadDialog from "../../component/FileUpload/FileUploadDialog";
import FileInfo from "../../component/FileUpload/FileInfo";

type Props = {
	thongTinPhanTich: IPhanTichScyk;
};

const TabNhanVienChuyenTrach = ({ thongTinPhanTich }: Props) => {
	const {
		errors,
		values,
		touched,
		setValues,
		setFieldValue,
	} = useFormikContext<IPhanTichScyk>();

	const [openFileDialog, setOpenFileDialog] = useState(false);
	const [listFile, setListFile] = useState<any>(values?.fileDinhKems || []);

	useEffect(() => {
        setFieldValue("toKhaiLietKe", values?.fileDinhKems?.length > 0)
		setListFile(values?.fileDinhKems || []);
	}, [values?.fileDinhKems]);

	return (
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
									isDisabled={!!thongTinPhanTich?.id}
									onChange={(
										selectedOption
									) =>
										setValues({ ...values, suCoId: selectedOption?.id, tenSuCo: selectedOption?.name })
									}
									getOptionLabel={(option) => option.code}
									className="spaces h-25 width-100"
									name="suCoId"
									value={values?.suCoResp?.code ? {
										code: values?.suCoResp.code,
										name: values?.suCoResp.name,
									} : null}
									errors={errors?.suCoId}
									touched={
										touched?.suCoId
									}
									searchObject={{}}
									searchFunction={getListSuCoChuaPhanTich}
									options={[]}
								/>
							</div>
						</Col>
						<Col xs={4}>
							<div className="d-flex">
								<LabelRequired
									label="Tên sự cố y khoa"
									className="spaces min-w-140 fw-500"
								/>
								<TextField
									disabled
									className="spaces h-25 width-100"
									type="text"
									name="tenSuCo"
                                    value={values.suCoId ? values?.tenSuCo : ""}
								/>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<LabelRequired
						label="Mô tả chi tiết sự cố"
						className="spaces min-w-140 fw-600 mb-5 text-cyan"
					/>
					<TextField
						className="spaces min-w-242"
						name="moTa"
						as="textarea"
						rows={3}
					/>
				</Col>
				<Col xs={12}>
					<Row className="spaces align-items-center h-30">
						<Col xs={2}>
							<label className="d-flex align-items-center gap-2 min-w-200px">
								<Checkbox
									className="spaces"
									onChange={(e) => {
										setFieldValue("toKhaiLietKe", e.target.checked);
									}}
									checked={values?.fileDinhKems?.length > 0 || values.toKhaiLietKe}
									disabled={values?.fileDinhKems?.length > 0}
								>
									Tờ khai liệt kê
								</Checkbox>
							</label>
						</Col>
						{values?.toKhaiLietKe && (
							<Col xs={4}>
								<div className="d-flex align-items-center">
									<LabelRequired
										label="Tải tệp đính kèm"
										className="spaces min-w-140 fw-600"
									/>
									<FileInfo 
										numberFile={values?.fileDinhKems?.length || 0}
										handleOpenDialogUpload={() => setOpenFileDialog(true)} 
										error={errors?.fileDinhKems} 
									/>
								</div>
							</Col>
						)}

					</Row>
				</Col>
				<Col xs={12}>
					<Row>
						<Col xs={12}>
							<LabelRequired
								label="Phân loại sự cố theo nhóm (Incident type)"
								className="spaces min-w-140 fw-600 mb-5 text-cyan"
							/>
						</Col>
						<Col xs={6}>
							<CheckboxGroup
								title="1. Thực hiện quy trình kỹ thuật, thủ thuật chuyên môn"
								checkboxItemList={THU_THUAT_KY_THUAT_CHUYEN_MON_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.thucHienQuyTrinhChuyenMon}
								handleChange={(value) => {
									setFieldValue("thucHienQuyTrinhChuyenMon", value);
								}}
							/>
							<CheckboxGroup
								title="3. Thuốc và dịch truyền"
								checkboxItemList={THUOC_VA_DICH_TRUYEN_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.thuocVaDichTruyen}
								handleChange={(value) => {
									setFieldValue("thuocVaDichTruyen", value);
								}}
							/>
							<CheckboxGroup
								title="5. Thiết bị y tế"
								checkboxItemList={THIET_BI_Y_TE_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.thietBiYTe}
								handleChange={(value) => {
									setFieldValue("thietBiYTe", value);
								}}
							/>
							<CheckboxGroup
								title="7. Tai nạn đối với người bệnh"
								checkboxItemList={TAI_NAN_DOI_VOI_NGUOI_BENH_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.taiNanDoiVoiNguoiBenh}
								handleChange={(value) => {
									setFieldValue("taiNanDoiVoiNguoiBenh", value);
								}}
							/>
							<CheckboxGroup
								title="9. Quản lý nguồn lực, tổ chức"
								checkboxItemList={QUAN_LY_NGUON_LUC_TO_CHUC_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.quanLyNguonLucToChuc}
								handleChange={(value) => {
									setFieldValue("quanLyNguonLucToChuc", value);
								}}
							/>
						</Col>
						<Col xs={6}>
							<CheckboxGroup
								title="2. Nhiễm khuẩn bệnh viện"
								checkboxItemList={NHIEM_KHUAN_BENH_VIEN_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.nhiemKhuanBenhVien}
								handleChange={(value) => {
									setFieldValue("nhiemKhuanBenhVien", value);
								}}
							/>
							<CheckboxGroup
								title="4. Máu và các chế phẩm máu"
								checkboxItemList={MAU_VA_CAC_CHE_PHAM_MAU_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.mauVaCacChePhamMau}
								handleChange={(value) => {
									setFieldValue("mauVaCacChePhamMau", value);
								}}
							/>
							<CheckboxGroup
								title="6. Hành vi"
								checkboxItemList={HANH_VI_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.hanhVi}
								handleChange={(value) => {
									setFieldValue("hanhVi", value);
								}}
							/>
							<CheckboxGroup
								title="8. Hạ tầng cơ sở"
								checkboxItemList={HA_TANG_CO_SO_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.haTangCoSo}
								handleChange={(value) => {
									setFieldValue("haTangCoSo", value);
								}}
							/>
							<CheckboxGroup
								title="10. Hồ sơ, tài liệu, thủ tục hành chính"
								checkboxItemList={HO_SO_TAI_LIEU_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.hoSoTaiLieuThuTuc}
								handleChange={(value) => {
									setFieldValue("hoSoTaiLieuThuTuc", value);
								}}
							/>
							<CheckboxGroup
								title="11. Khác"
								checkboxItemList={KHAC_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.nhomSuCoKhac}
								handleChange={(value) => {
									setFieldValue("nhomSuCoKhac", value);
								}}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<LabelRequired
						label="Điều trị y lệnh được thực hiện"
						className="spaces min-w-140 fw-500 mb-5 text-cyan"
					/>
					<TextField
						className="spaces min-w-242"
						name="dieuTriYLenh"
						as="textarea"
						rows={3}
					/>
				</Col>
				<Col xs={12}>
					<Row>
						<Col xs={12}>
							<LabelRequired
								label="Phân loại sự cố theo nhóm nguyên nhân gây ra"
								className="spaces min-w-140 fw-500 mb-5 text-cyan"
							/>
						</Col>
						<Col xs={6}>
							<CheckboxGroup
								title="1. Nhân viên"
								checkboxItemList={NHAN_VIEN_HOAC_NGUOI_BENH_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.nhanVien}
								handleChange={(value) => {
									setFieldValue("nhanVien", value);
								}}
							/>
							<CheckboxGroup
								title="3. Môi trường làm việc"
								checkboxItemList={MOI_TRUONG_LAM_VIEC_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.moiTruongLamViec}
								handleChange={(value) => {
									setFieldValue("moiTruongLamViec", value);
								}}
							/>
							<CheckboxGroup
								title="5. Yếu tố bên ngoài"
								checkboxItemList={YEU_TO_BEN_NGOAI_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.yeuToBenNgoai}
								handleChange={(value) => {
									setFieldValue("yeuToBenNgoai", value);
								}}
							/>
						</Col>
						<Col xs={6}>
							<CheckboxGroup
								title="2. Người bệnh"
								checkboxItemList={NHAN_VIEN_HOAC_NGUOI_BENH_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.nguoiBenh}
								handleChange={(value) => {
									setFieldValue("nguoiBenh", value);
								}}
							/>
							<CheckboxGroup
								title="4. Tổ chức/dịch vụ"
								checkboxItemList={TO_CHUC_DICH_VU_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.toChucDichVu}
								handleChange={(value) => {
									setFieldValue("toChucDichVu", value);
								}}
							/>
							<CheckboxGroup
								title="6. Khác"
								checkboxItemList={KHAC_5_OPTIONS}
								className="spaces flex-column gap-10 mb-15"
								classCheckboxGroup="spaces pl-15 gap-10 width-100"
								classCheckbox="spaces flex-row gap-7 width-100"
								value={values?.nhomNguyenNhanKhac}
								handleChange={(value) => {
									setFieldValue("nhomNguyenNhanKhac", value);
								}}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={12}>
					<LabelRequired
						label="Hành động khắc phục sự cố"
						className="spaces min-w-140 fw-500 mb-5 text-cyan"
					/>
					<TextField
						className="spaces min-w-242"
						name="hanhDongXuLy"
						as="textarea"
						rows={3}
					/>
				</Col>
				<Col xs={12}>
					<LabelRequired
						label="Đề xuất khuyến cáo phòng ngừa sự cố"
						className="spaces min-w-140 fw-500 mb-5 text-cyan"
					/>
					<TextField
						className="spaces min-w-242"
						name="deXuatKhuyenCaoPhongNgua"
						as="textarea"
						rows={3}
					/>
				</Col>
			</Row>
			{
				openFileDialog && <FileUploadDialog listFile={listFile} setListFile={(value: any) => {
					setFieldValue("fileDinhKems", value)
				}} handleClose={() => setOpenFileDialog(false)} />
			}
		</>
	);
};

export default TabNhanVienChuyenTrach;
