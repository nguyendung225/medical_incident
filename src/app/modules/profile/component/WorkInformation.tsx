/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../constant";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import { getAllSimpleValue } from "../../services";
import { RESPONSE_STATUS_CODE, VARIABLE_STRING } from "../../utils/Constant";
import { handleBlurDate } from "../../utils/FunctionUtils";
import { LIST_STATUS_NV } from "../const/DialogChildConstants";
import { HAS_RETIRED_CODE, listContractType, natureOfWork } from "../const/DialogConstant";
import { INIT_WORK, REF_TAB } from "../const/ProfileConst";
import "../profile.scss";
import { getContractByEmployee, getNguoiQuanLy, handleAddWorkInfo } from "../services/ProfileServices";
import { convertDataInfoDto } from "../utils/FunctionUtils";
import { getBacLuongByChucDanh } from "./../services/DialogServices";

export const WorkInformation = (props: any) => {
  const { employeeProfiles, activeTab, isView, handleGetEmployee, identify, formikRef, handleToggleIsView } = props;
  const { lang } = useMultiLanguage();
  const [isWorking, setIsWorking] = useState(true);

  const updateContractType = async () => {
    if (identify) {
      try {
        const { data } = await getContractByEmployee(identify);
        if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
          formik.setFieldValue(VARIABLE_STRING.LOAI_HOP_DONG, data?.data?.loaiHopDong || null);
        }
      } catch (error) {
        toast.error(lang("GENERAL.ERROR"));
      }
    }
  };

  const validationSchema = Yup.object().shape({
    donViCongTac: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    phongBan: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    viTriCongViec: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable()
    // trangThaiLaoDong: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // ngayNghiViec: Yup.string()
    //   .nullable()
    //   .when(["trangThaiLaoDong"], {
    //     is: (trangThaiLaoDong: any) => trangThaiLaoDong?.code === HAS_RETIRED_CODE,
    //     then: Yup.string()
    //       .required(lang("VALIDATION.REQUIRE"))
    //       .nullable()
    //   }),
    // lyDoNghi: Yup.string()
    //   .nullable()
    //   .when(["trangThaiLaoDong"], {
    //     is: (trangThaiLaoDong: any) => trangThaiLaoDong?.code === HAS_RETIRED_CODE,
    //     then: Yup.string()
    //       .required(lang("VALIDATION.REQUIRE"))
    //       .nullable()
    //   })
  });

  useEffect(() => {
    if (activeTab !== REF_TAB.TT_CONG_VIEC) return;
    if (identify) {
      formik.setValues(employeeProfiles);
      updateContractType();
    } else {
      formik.setValues(INIT_WORK);
    }
  }, [employeeProfiles, activeTab]);

  const handleFormSubmit = async (values: any) => {
    try {
      const dataInfo = convertDataInfoDto(values);
      const data = await handleAddWorkInfo(dataInfo, employeeProfiles?.id);
      if (data?.data?.code === SUCCESS_CODE) {
        toast.success(lang("TOAST.EDIT.SUCCESS"));
        handleToggleIsView();
        handleGetEmployee(employeeProfiles?.id);
      }
    } catch (err) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: INIT_WORK,
    validationSchema,
    onSubmit: handleFormSubmit
  });

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    formik.setFieldValue(name, checked);
  };

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  const handleChangeTrangThaiLaoDong = (value: any) => {
    formik.setFieldValue(VARIABLE_STRING.TRANG_THAI_LAO_DONG, value);
    switch (value?.code) {
      case HAS_RETIRED_CODE:
        setIsWorking(false);
        break;
      default:
        formik.setFieldValue(VARIABLE_STRING.NGAY_NGHI_VIEC, "");
        formik.setFieldValue(VARIABLE_STRING.LY_DO_NGHI, "");
        setIsWorking(true);
        break;
    }
  };

  return (
    <div className="">
      <Form
        className="form-info flex-column"
        onSubmit={formik.handleSubmit}
      >
        <>
          <div className="block-content">
            <span className="text-header">{lang("PROFILE.TITLE")}</span>
            <Row className="g-4">
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  isRequired
                  lable={lang("GENERAL.CURRENT_ORGANIZATION")}
                  name="donViCongTac"
                  type="text"
                  value={formik.values?.donViCongTac?.name || ""}
                  readOnly={true}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  isRequired
                  lable={lang("INPUT.DEPARTMENTS")}
                  name="phongBan"
                  type="text"
                  value={formik.values?.phongBan?.name || ""}
                  readOnly={true}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Autocomplete
                  isRequired
                  lable={lang("GENERAL.EMPLOYEE.POSITION")}
                  name="chucVu"
                  value={formik.values?.chucVu || ""}
                  searchFunction={getAllSimpleValue}
                  searchObject={TYPE_CATEGORY.chucDanh}
                  isReadOnly={isView}
                  onChange={(value) => handleChangeSelect("chucVu", value)}
                  // errors={formik.errors?.viTriCongViec}
                  // touched={formik.touched?.viTriCongViec}
                  options={[]}
                  getOptionLabel={(option) => option?.value}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Autocomplete
                  lable={lang("GENERAL.EMPLOYEE.TITLE")}
                  name="viTriCongViec"
                  isRequired
                  value={formik.values?.viTriCongViec || ""}
                  searchFunction={getAllSimpleValue}
                  searchObject={TYPE_CATEGORY.viTriCongViec}
                  isReadOnly={isView}
                  onChange={(selectedOption) => handleChangeSelect("viTriCongViec", selectedOption)}
                  options={[]}
                  getOptionLabel={(option) => option?.value}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={4}>
                <TextValidator
                  isRequired
                  lable={lang("GENERAL.EMPLOYEE.WORKPLACE")}
                  name="coSoLamViec"
                  type="text"
                  value={`${formik.values?.phongBan?.name} - ${formik.values?.donViCongTac?.name}`}
                  readOnly={true}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Autocomplete
                  lable={lang("GENERAL.EMPLOYEE.RANK")}
                  name="bac"
                  value={formik.values?.bac || ""}
                  searchFunction={getBacLuongByChucDanh}
                  searchObject={formik.values?.viTriCongViec?.id}
                  sort={(data: any) => data.sort((a: any, b: any) => a.bacLuong - b.bacLuong)}
                  urlData="data.data"
                  isReadOnly={isView}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.BAC, value)}
                  options={[]}
                  getOptionLabel={(option) => option?.bacLuong}
                  dependencies={[formik.values?.viTriCongViec?.id]}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Autocomplete
                  lable={lang("GENERAL.EMPLOYEE.CONTRACT_TYPE")}
                  name="loaiHopDong"
                  value={formik.values?.loaiHopDong || null}
                  options={listContractType}
                  isReadOnly={true}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Autocomplete
                  lable={lang("GENERAL.EMPLOYEE.MANAGER")}
                  name="nguoiQuanLy"
                  value={formik.values?.nguoiQuanLy || ""}
                  searchFunction={getNguoiQuanLy}
                  searchObject={{}}
                  isReadOnly={isView}
                  onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.NGUOI_QUAN_LY, selectedOption)}
                  options={[]}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Form.Check
                  label={lang("GENERAL.EMPLOYEE.HAS_UNION")}
                  name="thamGiaCongDoan"
                  className="checkBox custom-form-check"
                  checked={formik.values?.thamGiaCongDoan}
                  onChange={handleChangeCheckBox}
                />
              </Col>
            </Row>
            <Row className="g-4 pt-4">
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  lable={lang("GENERAL.EMPLOYEE.PROBATIONARY_START_DATE")}
                  name="ngayVaoCoQuan"
                  type="date"
                  value={formik.values?.ngayVaoCoQuan || ""}
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayVaoCoQuan, "ngayVaoCoQuan")}
                  errors={formik.errors?.ngayVaoCoQuan}
                  touched={formik.touched?.ngayVaoCoQuan}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  lable={lang("DATE.TRIAL")}
                  name="ngayThuViec"
                  type="date"
                  value={formik.values?.ngayThuViec || ""}
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayThuViec, "ngayThuViec")}
                  errors={formik.errors?.ngayThuViec}
                  touched={formik.touched?.ngayThuViec}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  lable={lang("DATE.PROBATIONARY")}
                  name="ngayTapSu"
                  type="date"
                  value={formik.values?.ngayTapSu || ""}
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayTapSu, "ngayTapSu")}
                  errors={formik.errors?.ngayTapSu}
                  touched={formik.touched?.ngayTapSu}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  lable={lang("GENERAL.EMPLOYEE.OFFICIAL_DATE")}
                  name="ngayChinhThuc"
                  type="date"
                  value={formik.values?.ngayChinhThuc || ""}
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayChinhThuc, "ngayChinhThuc")}
                  errors={formik.errors?.ngayChinhThuc}
                  touched={formik.touched?.ngayChinhThuc}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  isRequired={!isWorking}
                  lable={lang("GENERAL.EMPLOYEE.RESIGN_DATE")}
                  name="ngayNghiViec"
                  type="date"
                  value={formik.values?.ngayNghiViec || ""}
                  readOnly={isView || isWorking}
                  // disabled={isWorking}
                  onChange={formik.handleChange}
                  errors={formik.errors?.ngayNghiViec}
                  touched={formik.touched?.ngayNghiViec}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  lable={lang("GENERAL.EMPLOYEE.RESIGN_REASON")}
                  name="lyDoNghi"
                  value={formik.values?.lyDoNghi || ""}
                  type="text"
                  readOnly={isView || isWorking}
                  // disabled={isWorking}
                  onChange={formik.handleChange}
                  errors={formik.errors?.lyDoNghi}
                  touched={formik.touched?.lyDoNghi}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  lable={lang("INPUT.RETIRE_INFO.EXPECTED_RETIREMENT_DATE")}
                  name="ngayNghiHuuDuKien"
                  value={formik.values?.ngayNghiHuuDuKien || ""}
                  type="date"
                  readOnly={isView || isWorking}
                  // disabled={isWorking}
                  onChange={formik.handleChange}
                  errors={formik.errors?.ngayNghiHuuDuKien}
                  touched={formik.touched?.ngayNghiHuuDuKien}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <TextValidator
                  lable={lang("INPUT.RETIRE_INFO.OFFICIAL_RETIREMENT_DATE")}
                  name="ngayNghiHuuChinhThuc"
                  value={formik.values?.ngayNghiHuuChinhThuc || ""}
                  type="date"
                  readOnly={isView || isWorking}
                  // disabled={isWorking}
                  onChange={formik.handleChange}
                  errors={formik.errors?.ngayNghiHuuChinhThuc}
                  touched={formik.touched?.ngayNghiHuuChinhThuc}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Autocomplete
                  lable={lang("GENERAL.EMPLOYEE.NATURE_OF_WORK")}
                  name="tinhChatLaoDong"
                  // isRequired
                  value={formik.values?.tinhChatLaoDong || null}
                  options={natureOfWork}
                  isReadOnly={isView}
                  onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.TINH_CHAT_LAO_DONG, selectedOption)}
                />
              </Col>
              <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={2}>
                <Autocomplete
                  // isRequired={true}
                  lable={lang("GENERAL.EMPLOYEE.ACTIVE_STATUS")}
                  name="trangThaiLaoDong"
                  value={formik.values?.trangThaiLaoDong}
                  options={LIST_STATUS_NV}
                  isReadOnly={isView}
                  onChange={(selectedOption) => handleChangeTrangThaiLaoDong(selectedOption)}
                  // touched={formik.touched?.trangThaiLaoDong}
                  // errors={formik.errors?.trangThaiLaoDong}
                />
              </Col>
            </Row>
          </div>
        </>
      </Form>
    </div>
  );
};
