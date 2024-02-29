import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppContext from "../../../../AppContext";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import TextValidator from "../../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../../constant";
import { getAllSimpleValue } from "../../../services";
import { RESPONSE_STATUS_CODE, VARIABLE_STRING } from "../../../utils/Constant";
import { checkInvalidDate, convertNumberPrice, convertTextPrice, covertDateToString, handleBlurDate } from "../../../utils/FunctionUtils";
import { TYPE_OF_OFFICER } from "../../const/DialogChildConstants";
import { INIT_SALARY_DEVELOPMENT, salaryAdjustmentTypes, salaryRate, salaryTypes } from "../../const/ProfileConst";
import {
  addLichSuLuong,
  getBacLuongByChucDanh,
  getNgayHuongLuongDenNgay,
  searchPhongBan_DonVi,
  updateLichSuLuong
} from "../../services/DialogServices";
import { convertDataSubmit, convertDataUI } from "../../utils/SalaryDevelopmentUtil";

interface Props {
  handleClose: () => void;
  isView: boolean;
  salaryInfo: any;
  show: boolean;
  employeeProfiles: any;
  updateParrentTable: any;
}

function SalaryDevelopmentDialog(props: Props) {
  const { handleClose, isView, salaryInfo, show, employeeProfiles, updateParrentTable } = props;
  const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const { SUCCESS } = RESPONSE_STATUS_CODE;
  const [isAddAndUpdate, setIsAddAndUpadate] = useState(false);

  useEffect(() => {
    if (salaryInfo?.id) {
      formik.setValues(convertDataUI(salaryInfo));
    } else {
      formik.setValues(INIT_SALARY_DEVELOPMENT);
      bindingDataToWorkInfo();
    }
  }, [salaryInfo]);

  const handleFormSubmit = async (values: any) => {
    try {
      setPageLoading(true);
      const dataSubmit = convertDataSubmit(values, employeeProfiles?.id);
      const { data, status } = await (!salaryInfo?.id
        ? addLichSuLuong(dataSubmit)
        : updateLichSuLuong(salaryInfo?.id, dataSubmit));
      if (status === SUCCESS && data?.code === SUCCESS) {
        toast.success(lang(`${salaryInfo?.id ? "TOAST.EDIT.SUCCESS" : "TOAST.ADD.SUCCESS"}`));
        updateParrentTable();
        // isAddAndUpdate ? formik.setValues(INIT_SALARY_DEVELOPMENT) : handleClose();
        handleClose();
        setPageLoading(false);
      } else {
        toast.error(lang("TOAST.CREATE.ERROR"));
        setPageLoading(false);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    loaiCanBo: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    phongBan: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    // chucVu: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    chucDanh: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    loaiLuong: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    bac: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    heSoBacLuong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    ngayHuongLuongTuNgay: Yup.date().required(lang("VALIDATION.REQUIRE")).nullable(),
    ngayQuyetDinh: Yup.date()
      .when("ngayHuongLuongTuNgay", {
        is: (ngayHuongLuongTuNgay: Date | null) => ngayHuongLuongTuNgay && ngayHuongLuongTuNgay < (new Date()),
        then: Yup.date()
        .max(
          Yup.ref("ngayHuongLuongTuNgay"),
          lang("VALIDATION.MAXDATE") +
          lang("INPUT.SALARY.BENEFIT_TIME")
        )
        .nullable()
      })
      .max(new Date(), lang("VALIDATION.INVALID_ISSUEDATE"))
      .nullable(),
    // loaiDieuChinhLuong: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable()
  });
  
  const formik = useFormik({
    initialValues: INIT_SALARY_DEVELOPMENT,
    onSubmit: handleFormSubmit,
    validationSchema
  });

  const handleChangeSelect = (name: string, value: any) => {
    switch (name) {
      case VARIABLE_STRING.BAC:
        formik.setValues({
          ...formik.values,
          [name]: value,
          heSoBacLuong: value?.heSoLuong
        });
        break;
      default:
        formik.setFieldValue(name, value);
        break;
    }
  };

  const getNgayHuongLuongToiNgay = async (params: any) => {
    try {
      let { data } = await getNgayHuongLuongDenNgay(params);
      if (data?.code === SUCCESS) {
        formik.setValues({
          ...formik.values,
          ngayHuongLuongDenNgay: data?.data,
          thoiGianGiuBacDuKienKetThuc: data?.data
        })
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  useEffect(() => {
    let ngayHuongLuongTuNgay = formik.values?.ngayHuongLuongTuNgay;
    if (checkInvalidDate(ngayHuongLuongTuNgay)) return;
    getNgayHuongLuongToiNgay({
      employeeId: employeeProfiles?.id,
      ngayHuongLuongTuNgay
    });
  }, [formik.values?.ngayHuongLuongTuNgay]);

  const bindingDataToWorkInfo = async () => {
    let dataBinding = {
      ...formik.values,
      loaiCanBo: employeeProfiles?.loaiCanBo,
      phongBan: employeeProfiles?.phongBan,
      chucVu: employeeProfiles?.chucVu,
      chucDanh: employeeProfiles?.viTriCongViec,
      bac: employeeProfiles?.bac,
    }

    if (employeeProfiles?.bacId) {
      const { data } = await getBacLuongByChucDanh(employeeProfiles?.viTriCongViecId);
      const bacLuong =
        data?.code === RESPONSE_STATUS_CODE.SUCCESS
          ? data?.data?.find((item: any) => item?.id === employeeProfiles?.bacId)
          : {};
      dataBinding = {
        ...dataBinding,
        heSoBacLuong: bacLuong?.heSoLuong
      }
    }

    formik.setValues(dataBinding);
  };

  const handleChangeRangeDatePicker = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    switch (name) {
      case VARIABLE_STRING.NGAY_HUONG_LUONG_TU:
        formik.setValues({
          ...formik.values,
          [name]: value,
          thoiGianGiuBacDuKienBatDau: value
        });
        break;
      case VARIABLE_STRING.NGAY_HUONG_LUONG_DEN:
        formik.setValues({
          ...formik.values,
          [name]: value,
          thoiGianGiuBacDuKienKetThuc: value
        });
        break;
      default:
        formik.setFieldValue(name, value);
        break;
    }
  };

  const handleChangeMoney = (event: React.ChangeEvent<any>) => {
    const {name, value} = event.target;
    formik.setFieldValue(name, convertTextPrice(value));
  }

  return (
    <Modal
      show={show}
      size="xl"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={() => handleClose()}
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="heading-5"
        >
          {lang("SALARY.DEVELOPMENT")}
        </Modal.Title>
      </Modal.Header>
      <Form
        className="form-info"
        onSubmit={formik.handleSubmit}
      >
        <Modal.Body>
          <Row className="gap-col-modal">
            <Col xs={4}>
              <Autocomplete
                isRequired
                lable={lang("CONTRACT.NEW.TYPE_CCVC")}
                name="loaiCanBo"
                value={formik.values?.loaiCanBo || ""}
                isReadOnly={isView}
                options={TYPE_OF_OFFICER}
                onChange={(value) => handleChangeSelect("loaiCanBo", value)}
                errors={formik.errors?.loaiCanBo}
                touched={formik.touched?.loaiCanBo}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                isRequired
                lable={lang("INPUT.SALARY.DEPARTMENT")}
                name="phongBan"
                value={formik.values?.phongBan || null}
                isReadOnly={isView}
                searchFunction={searchPhongBan_DonVi}
                searchObject={{ id: employeeProfiles?.donViCongTacId }}
                onChange={(value) => handleChangeSelect("phongBan", value)}
                urlData="data.data"
                options={[]}
                errors={formik.errors?.phongBan}
                touched={formik.touched?.phongBan}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                // isRequired
                lable={lang("PROFILE.ROLE")}
                name="chucVu"
                value={formik.values?.chucVu || ""}
                searchFunction={getAllSimpleValue}
                searchObject={TYPE_CATEGORY.chucDanh}
                isReadOnly={isView}
                onChange={(value) => handleChangeSelect("chucVu", value)}
                options={[]}
                getOptionLabel={(options) => options.value}
                // errors={formik.errors?.chucVu}
                // touched={formik.touched?.chucVu}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                isRequired
                lable={lang("GENERAL.EMPLOYEE.TITLE")}
                name="chucDanh"
                value={formik.values?.chucDanh || ""}
                searchFunction={getAllSimpleValue}
                searchObject={TYPE_CATEGORY.viTriCongViec}
                isReadOnly={isView}
                onChange={(value) => handleChangeSelect("chucDanh", value)}
                options={[]}
                getOptionLabel={(options) => options.value}
                errors={formik.errors?.chucDanh}
                touched={formik.touched?.chucDanh}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={lang("INPUT.SALARY.KIND")}
                isRequired
                isReadOnly={isView}
                options={salaryTypes}
                value={formik.values?.loaiLuong}
                name="loaiLuong"
                onChange={(value) => handleChangeSelect(VARIABLE_STRING.LOAI_LUONG, value)}
                errors={formik.errors?.loaiLuong}
                touched={formik.touched?.loaiLuong}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={lang("INPUT.SALARY.RANK")}
                name="bac"
                value={formik.values?.bac || ""}
                searchFunction={getBacLuongByChucDanh}
                searchObject={formik.values?.chucDanh?.id || employeeProfiles?.viTriCongViecId}
                sort={(data: any) => data.sort((a: any, b: any) => a.bacLuong - b.bacLuong)}
                urlData="data.data"
                isReadOnly={isView}
                onChange={(value) => handleChangeSelect(VARIABLE_STRING.BAC, value)}
                options={[]}
                getOptionLabel={(option) => option?.bacLuong}
                dependencies={[formik.values?.chucDanh?.id, employeeProfiles?.viTriCongViecId]}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                isRequired
                lable={lang("INPUT.SALARY.COEFFICIENT")}
                name="heSoBacLuong"
                type="number"
                value={formik.values?.heSoBacLuong || null}
                readOnly={true}
                errors={formik.errors?.heSoBacLuong}
                touched={formik.touched?.heSoBacLuong}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={lang("INPUT.SALARY.BENEFIT_TIME")}
                isRequired
                startDateName="ngayHuongLuongTuNgay"
                endDateName="ngayHuongLuongDenNgay"
                isView={isView}
                isReadOnlyEndDate={true}
                handleChange={handleChangeRangeDatePicker}
                value={formik.values}
                setFieldValue={formik.setFieldValue}
                touch={formik.touched}
                errors={formik.errors}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={lang("INPUT.SALARY.KEEP_LEVEL_TIME")}
                startDateName="thoiGianGiuBacDuKienBatDau"
                endDateName="thoiGianGiuBacDuKienKetThuc"
                isView={true}
                handleChange={formik.handleChange}
                value={formik.values}
                setFieldValue={formik.setFieldValue}
                touch={formik.touched}
                errors={formik.errors}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={lang("INPUT.SALARY.ADJUSTMENT.TYPE")}
                // isRequired
                isReadOnly={isView}
                options={salaryAdjustmentTypes}
                value={formik.values?.loaiDieuChinhLuong || null}
                name="loaiDieuChinhLuong"
                onChange={(selectedOption) => handleChangeSelect("loaiDieuChinhLuong", selectedOption)}
                // errors={formik.errors?.loaiDieuChinhLuong}
                // touched={formik.touched?.loaiDieuChinhLuong}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={lang("INPUT.SALARY.RATE")}
                isReadOnly={isView}
                options={salaryRate}
                value={formik.values?.phanTramHuong}
                name="phanTramHuong"
                onChange={(selectedOption) => handleChangeSelect("phanTramHuong", selectedOption)}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("SALARY.SENIORITY_ALLOWANCES")}
                name="phuCapThamNienVuotKhung"
                value={convertNumberPrice(formik.values?.phuCapThamNienVuotKhung || null)}
                type="text"
                readOnly={isView}
                onChange={handleChangeMoney}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("SALARY.DIFFERENT_ALLOWANCES")}
                name="phuCapChenhLechBaoLuu"
                value={convertNumberPrice(formik.values?.phuCapChenhLechBaoLuu || null)}
                type="text"
                readOnly={isView}
                onChange={handleChangeMoney}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("INPUT.SALARY.AGREEMENTS")}
                name="luongThoaThuan"
                value={convertNumberPrice(formik.values?.luongThoaThuan || null)}
                type="text"
                readOnly={isView}
                onChange={handleChangeMoney}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("INPUT.WORKPROCESS.DECISION.DATE")}
                name="ngayQuyetDinh"
                value={covertDateToString(formik.values?.ngayQuyetDinh) || ""}
                type="date"
                onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayQuyetDinh, "ngayQuyetDinh")}
                readOnly={isView}
                onChange={formik.handleChange}
                errors={formik.errors?.ngayQuyetDinh}
                touched={formik.touched?.ngayQuyetDinh}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("INPUT.WORKPROCESS.DECISION.NUMBER")}
                name="soQuyetDinh"
                value={formik.values?.soQuyetDinh || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("SALARY.PLACE_OF_DECISION")}
                name="noiQuyetDinh"
                value={formik.values?.noiQuyetDinh || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="flex-center">
          <button
            type="button"
            className="button-gray-outline"
            onClick={() => handleClose()}
          >
            {lang("BTN.CANCEL")}
          </button>
          {!isView && (
            <>
              {/* <button
                type="submit"
                className="button-primary-outline"
                onClick={() => setIsAddAndUpadate(true)}
              >
                {lang("BTN.ADDANDSAVE")}
              </button> */}
              <button
                type="submit"
                className="button-primary"
                onClick={() => setIsAddAndUpadate(false)}
              >
                {lang("BTN.SAVE")}
              </button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default SalaryDevelopmentDialog;
