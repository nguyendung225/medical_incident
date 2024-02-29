/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { RESPONSE_STATUS_CODE } from "../../auth/core/_consts";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../constant";
import { searchAllSimpleValue } from "../../services";
import { REGEX, SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../utils/Constant";
import { handleBlurDate } from "../../utils/FunctionUtils";
import { checkInvalidDate } from "../../utils/ValidationSchema";
import { familyElements, listGender, selfElement, statusMarry, typeIdentify } from "../const/DialogConstant";
import { INIT_INFORMATION, REF_TAB } from "../const/ProfileConst";
import { getAllDonVi, handleAddBasicInfo } from "../services/ProfileServices";
import { convertDataInfoDto } from "../utils/FunctionUtils";
import { searchPhongBan_DonVi } from "../services/DialogServices";
import { TYPE_OF_OFFICER } from "../const/DialogChildConstants";
import useMultiLanguage from "../../../hook/useMultiLanguage";

const BasicInformation = (props: any) => {
  const [nation, setNation] = useState([]);

  const { lang, intl } = useMultiLanguage();
  const {
    identify,
    activeTab,
    employeeProfiles,
    isView,
    handleGetEmployee,
    formikRef,
    nationalityDefault,
    nationality,
    handleToggleIsView
  } = props;

  const [isTypeOfOfficer, setIsTypeOfOfficer] = useState<boolean>(false)

  useEffect(() => {
    if (identify && activeTab === REF_TAB.TT_CO_BAN) {
      formik.setValues(employeeProfiles);
    }
  }, [employeeProfiles, activeTab]);

  useEffect(() => {
    formik.setFieldValue(VARIABLE_STRING.QUOC_TICH, nationalityDefault);
  }, [nationalityDefault]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(lang("VALIDATION.REQUIRE"))
      .matches(REGEX.CHARACTER255, lang("VALIDATION.MAX255"))
      .matches(REGEX.TEN, lang("VALIDATION.INVALID_NAME"))
      .nullable(),
    maNhanVien: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    birthDate: Yup.date()
      .max(new Date(), lang("VALIDATION.INVALID_BIRTHDATE"))
      .concat(checkInvalidDate(intl))
      .nullable(),
    soCMNDOrCCCD: Yup.string()
      .required(lang("VALIDATION.REQUIRE"))
      .matches(REGEX.CHARACTER9or12, lang("VALIDATION.CHARACTER9OR12"))
      .matches(REGEX.NOT_ZERO, lang("VALIDATON.INVALID_CMND_CCCD"))
      .nullable(),
    loaiGiayTo: Yup.object()
      .shape({})
      .required(lang("VALIDATION.REQUIRE"))
      .nullable(),
    phongBan: Yup.object()
      .shape({})
      .required(lang("VALIDATION.REQUIRE"))
      .nullable(),
    donViCongTac: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable(),
    ngayCapHoChieu: Yup.date().max(new Date(), lang("VALIDATION.INVALID_ISSUEDATE")).nullable(),
    ngayHetHanHoChieu: Yup.date()
      .min(Yup.ref("ngayCapHoChieu"), lang("VALIDATION.MINDATE") + lang("INPUT.PASSPORT.DATE"))
      .nullable(),
    ngayCapCMNDOrCCCD: Yup.date()
      .max(new Date(), lang("VALIDATION.INVALID_ISSUEDATE"))
      .concat(checkInvalidDate(intl))
      .nullable(),
    ngayHetHanCMNDOrCCCD: Yup.date()
      .min(Yup.ref("ngayCapCMNDOrCCCD"), lang("VALIDATION.MINDATE") + lang("INPUT.DATERANGE"))
      .nullable(),
    danToc: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    quocTich: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    mstCaNhan: Yup.string().matches(REGEX.MA_SO_THUE, lang("VALIDATION.TAX_CODE")).nullable(),
    soCanBo: Yup.string().matches(REGEX.NUMBER, lang("VALIDATION.NUMBER_ONLY")).nullable()
  });

  const handleFormSubmit = async (values: any) => {
    try {
      const dataInfo = convertDataInfoDto(values);
      const { data } = await handleAddBasicInfo(dataInfo);
      if (data?.code === RESPONSE_STATUS_CODE?.SUCCESS) {
        handleToggleIsView();
        toast.success(values?.code ? lang("TOAST.EDIT.SUCCESS") : lang("TOAST.ADD.SUCCESS"));
        handleGetEmployee(data?.data?.id);
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const updateDataDanToc = async () => {
    try {
      const { data, status } = await searchAllSimpleValue({ ...SEARCH_OBJECT_MAX_SIZE, type: TYPE_CATEGORY.danToc });
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS && status === RESPONSE_STATUS_CODE.SUCCESS) {
        setNation(data?.data?.content);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: { ...INIT_INFORMATION, photo: employeeProfiles?.photo },
    validationSchema,
    onSubmit: handleFormSubmit
  });

  useEffect(() => {
    updateDataDanToc();
  }, []);

  useEffect(() => {
    let nationDefault = nation.find((item: any) => item?.value === "Kinh");
    formik.setFieldValue("danToc", nationDefault);
  }, [nation]);

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  const checkLoaiCanBo = (loaiCanBo: any) => {
    const listCondition = [3, 6, 7, 10] //chưa xác đinh, hd lao động, nghị định 68, nghị định 111
    const isCondition = listCondition.some((condition: any) => condition === loaiCanBo?.code)
    if (isCondition) {
      formik.setFieldValue("soCanBo", null)
      formik.setFieldValue("ccvcNgayVao", null)
    }
    setIsTypeOfOfficer(isCondition)
  }

  useEffect(() => {
    if (formik?.values?.loaiCanBo) {
      checkLoaiCanBo(formik?.values?.loaiCanBo)
    }

  }, [formik?.values]);

  const handleChangeFullName = (e: React.ChangeEvent<any>) => {
    let { name, value } = e.target;
    formik.setFieldValue(name, value.toUpperCase());
  }

  return (
    <>
      <div className="basic-info-wrapper">
        <Form
          onSubmit={formik.handleSubmit}
          className="form-info flex-column"
        >
          <>
            <div className="block-content">
              <span className="text-header">{lang("INFO.MAIN")}</span>
              <div className="content">
                <TextValidator
                  lable={lang("INPUT.ID_NV")}
                  name="code"
                  value={formik.values?.code || ""}
                  type="text"
                  readOnly={true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("INPUT.CODE_NEW")}
                  name="maNhanVien"
                  isRequired
                  value={formik.values?.maNhanVien || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  errors={formik.errors?.maNhanVien}
                  touched={formik.touched?.maNhanVien}
                />
                <TextValidator
                  lable={lang("INPUT.FULLNAME")}
                  name="name"
                  value={formik.values?.name.toUpperCase()}
                  type="text"
                  isRequired
                  readOnly={isView}
                  onChange={(e: React.ChangeEvent<any>) => handleChangeFullName(e)}
                  errors={formik.errors?.name}
                  touched={formik.touched?.name}
                />
                <TextValidator
                  lable={lang("INPUT.ALIAS_NAME")}
                  name="otherName"
                  value={formik.values?.otherName}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  errors={formik.errors?.otherName}
                  touched={formik.touched?.otherName}
                />
                <div className="h-36">
                  <Autocomplete
                    lable={lang("INPUT.GENDER")}
                    isReadOnly={isView}
                    // isRequired
                    options={listGender}
                    value={formik.values?.gender}
                    name="gender"
                    onChange={(selectedOption) => handleChangeSelect("gender", selectedOption)}
                  />
                </div>
                <TextValidator
                  lable={lang("INPUT.BIRTHDAY")}
                  name="birthDate"
                  // isRequired
                  value={formik.values?.birthDate || ""}
                  type="date"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.birthDate, "birthDate")}
                  errors={formik.errors?.birthDate}
                  touched={formik.touched?.birthDate}
                />
                <div className="h-36">
                  <Autocomplete
                    lable={lang("INPUT.NATION")}
                    isReadOnly={isView}
                    options={nation || []}
                    isRequired
                    value={formik.values?.danToc || null}
                    name="danToc"
                    onChange={(selectedOption) => handleChangeSelect("danToc", selectedOption)}
                    getOptionLabel={(option) => option?.value}
                    touched={formik.touched?.quocTich}
                    errors={formik.errors?.quocTich}
                  />
                </div>
                <div className="h-36">
                  <Autocomplete
                    lable={lang("INPUT.RELIGION")}
                    isReadOnly={isView}
                    options={[]}
                    value={formik.values?.tonGiao || null}
                    name="tonGiao"
                    onChange={(selectedOption) => handleChangeSelect("tonGiao", selectedOption)}
                    searchFunction={searchAllSimpleValue}
                    getOptionLabel={(option) => option?.value}
                    searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, type: TYPE_CATEGORY.tonGiao }}
                  />
                </div>
                <div className="h-36">
                  <Autocomplete
                    lable={lang("INPUT.NATIONALITY")}
                    isReadOnly={isView}
                    options={nationality || []}
                    isRequired
                    value={formik.values?.quocTich || null}
                    name="quocTich"
                    onChange={(selectedOption) => handleChangeSelect("quocTich", selectedOption)}
                    touched={formik.touched?.quocTich}
                    errors={formik.errors?.quocTich}
                  />
                </div>
                <TextValidator
                  lable={lang("INPUT.PLACEOFBIRTH")}
                  name="noiSinh"
                  value={formik.values?.noiSinh || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("INPUT.DOMICILE")}
                  name="nguyenQuan"
                  value={formik.values?.nguyenQuan || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
                <div className="h-36">
                  <Autocomplete
                    lable={lang("INPUT.MARRY.STATUS")}
                    isReadOnly={isView}
                    options={statusMarry}
                    value={formik.values?.tinhTrangHonNhan || null}
                    name="tinhTrangHonNhan"
                    onChange={(selectedOption) => handleChangeSelect("tinhTrangHonNhan", selectedOption)}
                  />
                </div>
                <TextValidator
                  lable={lang("INPUT.TAXCODE")}
                  name="mstCaNhan"
                  value={formik.values?.mstCaNhan || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  touched={formik.touched?.mstCaNhan}
                  errors={formik.errors?.mstCaNhan}
                />
                <div className="h-36">
                  <Autocomplete
                    lable={lang("INPUT.ELEMENT.FAMILY")}
                    isReadOnly={isView}
                    options={familyElements}
                    value={formik.values?.tpGiaDinh || null}
                    name="tpGiaDinh"
                    onChange={(selectedOption) => handleChangeSelect("tpGiaDinh", selectedOption)}
                  />
                </div>
                <div className="h-36">
                  <Autocomplete
                    lable={lang("INPUT.ELEMENT.SELF")}
                    isReadOnly={isView}
                    options={selfElement}
                    value={formik.values?.tpBanThan || null}
                    name="tpBanThan"
                    onChange={(selectedOption) => handleChangeSelect("tpBanThan", selectedOption)}
                  />
                </div>
                <div className="h-36">
                  <Autocomplete
                    isRequired
                    lable={lang("GENERAL.CURRENT_ORGANIZATION")}
                    isReadOnly={isView}
                    options={[]}
                    value={formik.values?.donViCongTac || null}
                    name="donViCongTac"
                    onChange={(selectedOption) => handleChangeSelect("donViCongTac", selectedOption)}
                    searchFunction={getAllDonVi}
                    searchObject={SEARCH_OBJECT_MAX_SIZE}
                    touched={formik.touched?.donViCongTac}
                    errors={formik.errors?.donViCongTac}
                  />
                </div>
                <div className="h-36">
                  <Autocomplete
                    isRequired
                    lable={lang("INPUT.DEPARTMENTS")}
                    isReadOnly={isView}
                    options={[]}
                    value={formik.values?.phongBan || null}
                    name="phongBan"
                    onChange={(selectedOption) => handleChangeSelect("phongBan", selectedOption)}
                    urlData="data.data"
                    searchFunction={searchPhongBan_DonVi}
                    searchObject={{ id: formik.values?.donViCongTac?.id }}
                    touched={formik.touched?.phongBan}
                    errors={formik.errors?.phongBan}
                    dependencies={[formik.values?.donViCongTac]}
                  />
                </div>
                <div>
                  <Autocomplete
                    lable={lang("GENERAL.EMPLOYEE.MANAGER.TYPE")}
                    name="loaiCanBo"
                    value={formik?.values.loaiCanBo || null}
                    isReadOnly={isView}
                    onChange={(selectedOption) => handleChangeSelect("loaiCanBo", selectedOption)}
                    options={TYPE_OF_OFFICER}
                  />
                </div>
                <div>
                  <TextValidator
                    lable={lang("GENERAL.EMPLOYEE.MANAGER.NUMBER")}
                    name="soCanBo"
                    value={formik.values.soCanBo || ""}
                    type="text"
                    readOnly={isView ? isView : isTypeOfOfficer}
                    onChange={formik.handleChange}
                    touched={formik.touched?.soCanBo}
                    errors={formik.errors?.soCanBo}
                  />
                </div>
                <div>
                  <TextValidator
                    lable={lang("GENERAL.EMPLOYEE.MANAGER.CCVC_DATE")}
                    name="ccvcNgayVao"
                    type="date"
                    value={formik.values?.ccvcNgayVao || ""}
                    onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ccvcNgayVao, "ccvcNgayVao")}
                    readOnly={isView ? isView : isTypeOfOfficer}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="block-content">
              <span className="text-header">{lang("INFO.IDENTIFICATION")}</span>
              <div className="content">
                <Autocomplete
                  isRequired
                  lable={lang("INPUT.KINDOFPAPERS")}
                  isReadOnly={isView}
                  options={typeIdentify}
                  value={formik.values?.loaiGiayTo || null}
                  name="loaiGiayTo"
                  onChange={(selectedOption) => handleChangeSelect("loaiGiayTo", selectedOption)}
                  touched={formik.touched?.loaiGiayTo}
                  errors={formik.errors?.loaiGiayTo}
                />
                <TextValidator
                  lable={lang("INPUT.IDENTIFICATION")}
                  name="soCMNDOrCCCD"
                  value={formik.values?.soCMNDOrCCCD || ""}
                  type="text"
                  isRequired
                  readOnly={isView}
                  onChange={formik.handleChange}
                  touched={formik.touched?.soCMNDOrCCCD}
                  errors={formik.errors?.soCMNDOrCCCD}
                />
                <TextValidator
                  lable={lang("INPUT.DATERANGE")}
                  name="ngayCapCMNDOrCCCD"
                  value={formik.values?.ngayCapCMNDOrCCCD || ""}
                  type="date"
                  // isRequired
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(formik.setFieldValue, formik.values?.ngayCapCMNDOrCCCD, "ngayCapCMNDOrCCCD")
                  }
                  touched={formik.touched?.ngayCapCMNDOrCCCD}
                  errors={formik.errors?.ngayCapCMNDOrCCCD}
                />
                <TextValidator
                  lable={lang("INPUT.EXPIRATIONDATE")}
                  name="ngayHetHanCMNDOrCCCD"
                  value={formik.values?.ngayHetHanCMNDOrCCCD || ""}
                  type="date"
                  // isRequired
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(formik.setFieldValue, formik.values?.ngayHetHanCMNDOrCCCD, "ngayHetHanCMNDOrCCCD")
                  }
                  touched={formik.touched?.ngayHetHanCMNDOrCCCD}
                  errors={formik.errors?.ngayHetHanCMNDOrCCCD}
                />
                <TextValidator
                  lable={lang("INPUT.PLACERANGE")}
                  name="noiCapCMNDOrCCCD"
                  // isRequired
                  value={formik.values?.noiCapCMNDOrCCCD || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("INPUT.PASSPORT")}
                  name="soHoChieu"
                  value={formik.values?.soHoChieu || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("INPUT.PASSPORT.PLACE")}
                  name="noiCapHoChieu"
                  value={formik.values?.noiCapHoChieu || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("INPUT.PASSPORT.DATE")}
                  name="ngayCapHoChieu"
                  value={formik.values?.ngayCapHoChieu || ""}
                  type="date"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  errors={formik.errors?.ngayCapHoChieu}
                  touched={formik.touched?.ngayCapHoChieu}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayCapHoChieu, "ngayCapHoChieu")}
                />
                <TextValidator
                  lable={lang("INPUT.PASSPORT.DATE.EXPIRATION")}
                  name="ngayHetHanHoChieu"
                  value={formik.values?.ngayHetHanHoChieu || ""}
                  type="date"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(formik.setFieldValue, formik.values?.ngayHetHanHoChieu, "ngayHetHanHoChieu")
                  }
                  touched={formik.touched?.ngayHetHanHoChieu}
                  errors={formik.errors?.ngayHetHanHoChieu}
                />
              </div>
            </div>
            {/* <div className="block-content">
              <span className="text-header">{lang("INFO.ACCOUNT")}</span>
              <div className="content">
                <TextValidator
                  lable={lang("INPUT.USERNAME")}
                  name="username"
                  value={""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("AUTH.INPUT.PASSWORD")}
                  name="username"
                  value={""}
                  type="password"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
              </div>
            </div> */}
          </>
        </Form>
      </div>
    </>
  );
};
export { BasicInformation };
