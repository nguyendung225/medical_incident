/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { ChangeEvent, useEffect } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { regex } from "../../constant";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import {
  searchAllProvince,
  searchCommuneByDistrict,
  searchDistrictByProvince,
} from "../../services";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../utils/Constant";
import { INIT_CONTACT, REF_TAB } from "../const/ProfileConst";
import { IContact } from "../models/ProfileModels";
import { handleAddContactInfo } from "../services/ProfileServices";
import { combineAddressDetail, convertDataInfoDto } from "../utils/FunctionUtils";
import useMultiLanguage from "../../../hook/useMultiLanguage";

export const ContactInformation = (props: any) => {
  const {
    identify,
    employeeProfiles,
    isView,
    handleGetEmployee,
    formikRef,
    nationalityDefault,
    nationality,
    handleToggleIsView,
    activeTab
  } = props;
  const { lang } = useMultiLanguage();

  useEffect(() => {
    formik.setFieldValue(VARIABLE_STRING.HK_QUOC_GIA, nationalityDefault);
    formik.setFieldValue(VARIABLE_STRING.HN_QUOC_GIA, nationalityDefault);
  }, [nationalityDefault]);

  useEffect(() => {
    if (identify && activeTab === REF_TAB.TT_LIEN_HE) {
      formik.setValues(employeeProfiles);
    }
  }, [employeeProfiles, activeTab]);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      // .required(lang("VALIDATION.REQUIRE"))
      .matches(regex.phone, lang("VALIDATION.ISPHONE"))
      .nullable(),
    otherPhone: Yup.string()
      .matches(regex.phone, lang("VALIDATION.ISPHONE"))
      .nullable(),
    emailCoQuan: Yup.string()
      .email(lang("VALIDATION.EMAILINVALID"))
      .nullable(),
    emailCaNhan: Yup.string()
      .email(lang("VALIDATION.EMAILINVALID"))
      .nullable(),
    // hnQuocGia: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // hnTinh: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // hnHuyen: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // hnXa: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // hkQuocGia: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // hkTinh: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // hkHuyen: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // hkXa: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable()
  });

  const handleFormSubmit = async (values: IContact) => {
    try {
      const dataSubmit = convertDataInfoDto(values);
      const data = await handleAddContactInfo(dataSubmit, employeeProfiles?.id);
      if (data?.data?.code === SUCCESS_CODE) {
        toast.success(lang("TOAST.EDIT.SUCCESS"));
        handleToggleIsView()
        handleGetEmployee(employeeProfiles?.id);
      } else {
        toast.error(`${data?.data?.message}`);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: INIT_CONTACT,
    validationSchema,
    onSubmit: handleFormSubmit
  });

  const { hkXa, hkHuyen, hkQuocGia, hkTinh, hkSoNha,
    hnXa, hnHuyen, hnQuocGia, hnTinh, hnSoNha,
    ttXa, ttHuyen, ttTinh, ttSoNha,
    queQuanXa, queQuanHuyen, queQuanTinh, queQuanDiaChi,
    noiSinhXa, noiSinhHuyen, noiSinhTinh, noiSinhDiaChi,
  } = formik.values;

  useEffect(() => {
    let dataAddress = {
      houseNumber: hkSoNha,
      wards: hkXa?.name,
      districts: hkHuyen?.name,
      province: hkTinh?.name,
      national: hkQuocGia?.name
    };
    let addressDetail = combineAddressDetail(dataAddress);
    formik.setFieldValue(VARIABLE_STRING.HK_DIA_CHI, addressDetail);
  }, [hkXa, hkHuyen, hkQuocGia, hkTinh, hkSoNha]);

  useEffect(() => {
    let dataAddress = {
      houseNumber: hnSoNha,
      wards: hnXa?.name,
      districts: hnHuyen?.name,
      province: hnTinh?.name,
      national: hnQuocGia?.name
    };
    let addressDetail = combineAddressDetail(dataAddress);
    formik.setFieldValue(VARIABLE_STRING.HN_DIA_CHI, addressDetail);
  }, [hnXa, hnHuyen, hnQuocGia, hnTinh, hnSoNha]);

  useEffect(() => {
    let dataAddress = {
      houseNumber: queQuanDiaChi,
      wards: queQuanXa?.name,
      districts: queQuanHuyen?.name,
      province: queQuanTinh?.name
    };
    let addressDetail = combineAddressDetail(dataAddress);
    formik.setFieldValue(VARIABLE_STRING.QQ_DCCT, addressDetail);
  }, [queQuanXa, queQuanHuyen, queQuanTinh, queQuanDiaChi]);

  useEffect(() => {
    let dataAddress = {
      houseNumber: noiSinhDiaChi,
      wards: noiSinhXa?.name,
      districts: noiSinhHuyen?.name,
      province: noiSinhTinh?.name
    };
    let addressDetail = combineAddressDetail(dataAddress);
    formik.setFieldValue(VARIABLE_STRING.NS_DCCT, addressDetail);
  }, [noiSinhXa, noiSinhHuyen, noiSinhTinh, noiSinhDiaChi]);

  useEffect(() => {
    let dataAddress = {
      houseNumber: ttSoNha,
      wards: ttXa?.name,
      districts: ttHuyen?.name,
      province: ttTinh?.name
    };
    let addressDetail = combineAddressDetail(dataAddress);
    formik.setFieldValue(VARIABLE_STRING.TT_DIA_CHI, addressDetail);
  }, [ttXa, ttHuyen, ttTinh, ttSoNha]);

  const handleChangeSelect = (name: string, value: any) => {
    switch (name) {
      case VARIABLE_STRING.HK_TINH:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.HK_HUYEN, null);
        formik.setFieldValue(VARIABLE_STRING.HK_XA, null);
        break;
      case VARIABLE_STRING.QQ_TINH:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.QQ_HUYEN, null);
        formik.setFieldValue(VARIABLE_STRING.QQ_XA, null);
        break;
      case VARIABLE_STRING.NS_TINH:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.NS_HUYEN, null);
        formik.setFieldValue(VARIABLE_STRING.NS_XA, null);
        break;
      case VARIABLE_STRING.HN_TINH:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.HN_HUYEN, null);
        formik.setFieldValue(VARIABLE_STRING.HN_XA, null);
        break;
      case VARIABLE_STRING.TT_TINH:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.TT_HUYEN, null);
        formik.setFieldValue(VARIABLE_STRING.TT_XA, null);
        break;
      case VARIABLE_STRING.HK_HUYEN:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.HK_XA, null);
        break;
      case VARIABLE_STRING.QQ_HUYEN:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.QQ_XA, null);
        break;
      case VARIABLE_STRING.NS_HUYEN:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.NS_XA, null);
        break;
      case VARIABLE_STRING.HN_HUYEN:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.HN_XA, null);
        break;
      case VARIABLE_STRING.TT_HUYEN:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.TT_XA, null);
        break;
      default:
        formik.setFieldValue(name, value);
        break;
    }
  };

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    let { checked, name } = event?.target;
    switch (name) {
      case VARIABLE_STRING.HN_GIONG_HO_KHAU:
        formik.setValues({
          ...formik.values,
          hnGiongHoKhau: checked,
          hnQuocGia: checked ? formik.values?.hkQuocGia : null,
          hnTinh: checked ? formik.values?.hkTinh : null,
          hnHuyen: checked ? formik.values?.hkHuyen : null,
          hnXa: checked ? formik.values?.hkXa : null,
          hnSoNha: checked ? formik.values?.hkSoNha : ""
        });
        break;
      case VARIABLE_STRING.HK_LA_CHU_HO:
        formik.setValues({
          ...formik.values,
          hkLaChuHo: checked
        });
        break;
    }
  };

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  return (
    <div className="basic-info-wrapper">
      <Form
        onSubmit={formik.handleSubmit}
        className="form-info"
      >
        <>
          <div className="block-content">
            <span className="text-header">{lang("PROFILE.CONTACT.INFO")}</span>
            <div className="content">
              <TextValidator
                lable={lang("GENERAL.PHONE")}
                name="phone"
                value={formik.values?.phone || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                // isRequired
                errors={formik.errors?.phone}
                touched={formik.touched?.phone}
              />
              <TextValidator
                lable={lang("GENERAL.OTHER_PHONE")}
                name="otherPhone"
                value={formik.values?.otherPhone || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                errors={formik.errors?.otherPhone}
                touched={formik.touched?.otherPhone}
              />
              <TextValidator
                lable={lang("GENERAL.PERSONAL_EMAIL")}
                name="emailCaNhan"
                value={formik.values?.emailCaNhan || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                errors={formik.errors?.emailCaNhan}
                touched={formik.touched?.emailCaNhan}
              />
              <TextValidator
                lable={lang("GENERAL.ORGAN_EMAIL")}
                name="emailCoQuan"
                value={formik.values?.emailCoQuan || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                errors={formik.errors?.emailCoQuan}
                touched={formik.touched?.emailCoQuan}
              />
            </div>
          </div>
          <div className="block-content">
            <span className="text-header">{lang("TITLE.PERMANENT_RESIDENCE")}</span>
            <div className="content">
              <Autocomplete
                lable={lang("GENERAL.NATIONAL")}
                isReadOnly={isView}
                options={nationality || []}
                // isRequired
                value={formik.values?.hkQuocGia || null}
                name="hkQuocGia"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HK_QUOC_GIA, selectedOption)}
                errors={formik.errors?.hkQuocGia}
                touched={formik.touched?.hkQuocGia}
              />
              <Autocomplete
                lable={lang("GENERAL.PROVINCE")}
                isReadOnly={isView}
                options={[]}
                // isRequired
                value={formik.values?.hkTinh || null}
                name="hkTinh"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HK_TINH, selectedOption)}
                searchFunction={searchAllProvince}
                searchObject={SEARCH_OBJECT_MAX_SIZE}
                errors={formik.errors?.hkTinh}
                touched={formik.touched?.hkTinh}
              />
              <Autocomplete
                lable={lang("GENERAL.DISTRICT")}
                isReadOnly={isView}
                options={[]}
                // isRequired
                value={formik.values?.hkHuyen || null}
                name="hkHuyen"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HK_HUYEN, selectedOption)}
                searchFunction={searchDistrictByProvince}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.hkTinh?.id }}
                dependencies={[formik.values?.hkTinh?.id]}
                errors={formik.errors?.hkHuyen}
                touched={formik.touched?.hkHuyen}
              />
              <Autocomplete
                lable={lang("GENERAL.COMMUNE")}
                isReadOnly={isView}
                options={[]}
                // isRequired
                value={formik.values?.hkXa || null}
                name="hkXa"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HK_XA, selectedOption)}
                searchFunction={searchCommuneByDistrict}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.hkHuyen?.id }}
                dependencies={[formik.values?.hkTinh?.id, formik.values?.hkHuyen?.id]}
                errors={formik.errors?.hkXa}
                touched={formik.touched?.hkXa}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.SPECIFIC")}
                name="hkSoNha"
                value={formik.values?.hkSoNha || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
              <TextValidator
                lable={lang("GENERAL.NUMBER_OF_HABITANTS")}
                name="hkSoHoKhau"
                value={formik.values?.hkSoHoKhau || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
              <TextValidator
                lable={lang("GENERAL.HOUSEHOLD_CODE")}
                name="hkMaSoHoGiaDinh"
                value={formik.values?.hkMaSoHoGiaDinh || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
              <div className="grid-column-3 flex">
                <TextValidator
                  className="flex-1"
                  lable={lang("GENERAL.PERMANENT_RESIDENCE")}
                  name="hkDiachi"
                  // isRequired
                  value={formik.values?.hkDiachi || ""}
                  type="text"
                  readOnly={true}
                />
                <Form.Check
                  label={lang("GENERAL.ISHOUSEHOLDER")}
                  className="custom-form-check spaces ml-16"
                  name="hkLaChuHo"
                  checked={formik.values?.hkLaChuHo}
                  disabled={isView}
                  onChange={handleCheckbox}
                />
              </div>
            </div>
          </div>
          <div className="block-content">
            <span className="text-header">{lang("TITLE.ADDRESS.CURRENT")}</span>
            <div className="content">
              <Form.Check
                label={lang("GENERAL.PERMANENT_RESIDENCE_SAME")}
                className="checkBox custom-form-check"
                name="hnGiongHoKhau"
                checked={formik.values?.hnGiongHoKhau}
                onChange={handleCheckbox}
                disabled={isView}
              />
              <Autocomplete
                lable={lang("GENERAL.NATIONAL")}
                isReadOnly={isView}
                options={nationality || []}
                // isRequired
                value={formik.values?.hnQuocGia || ""}
                name="hnQuocGia"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HN_QUOC_GIA, selectedOption)}
                errors={formik.errors?.hnQuocGia}
                touched={formik.touched?.hnQuocGia}
              />
              <Autocomplete
                lable={lang("GENERAL.PROVINCE")}
                isReadOnly={isView}
                options={[]}
                // isRequired
                value={formik.values?.hnTinh || null}
                name="hnTinh"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HN_TINH, selectedOption)}
                searchFunction={searchAllProvince}
                searchObject={SEARCH_OBJECT_MAX_SIZE}
                errors={formik.errors?.hnTinh}
                touched={formik.touched?.hnTinh}
              />
              <Autocomplete
                lable={lang("GENERAL.DISTRICT")}
                isReadOnly={isView}
                options={[]}
                // isRequired
                value={formik.values?.hnHuyen || null}
                name="hnHuyen"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HN_HUYEN, selectedOption)}
                searchFunction={searchDistrictByProvince}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.hnTinh?.id }}
                dependencies={[formik.values?.hnTinh?.id]}
                errors={formik.errors?.hnHuyen}
                touched={formik.touched?.hnHuyen}
              />
              <Autocomplete
                lable={lang("GENERAL.COMMUNE")}
                isReadOnly={isView}
                options={[]}
                // isRequired
                value={formik.values?.hnXa || null}
                name="hnHuyen"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.HN_XA, selectedOption)}
                searchFunction={searchCommuneByDistrict}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.hnHuyen?.id }}
                dependencies={[formik.values?.hnTinh?.id, formik.values?.hnHuyen?.id]}
                errors={formik.errors?.hnXa}
                touched={formik.touched?.hnXa}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.SPECIFIC")}
                name="hnSoNha"
                value={formik.values?.hnSoNha || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
              <TextValidator
                className="grid-column-4"
                lable={lang("GENERAL.ADDRESS.CURRENT")}
                name="hnDiachi"
                // isRequired
                value={formik.values?.hnDiachi || ""}
                type="text"
                readOnly={true}
              />
            </div>
          </div>
          <div className="block-content">
            <span className="text-header">{lang("TITLE.ADDRESS.HOMETOWN")}</span>
            <div className="original-address">
              <TextValidator
                lable={lang("GENERAL.ADDRESS.BY_ORIGINAL_PROFILE")}
                name="quequanTheoHoSoGoc"
                value={formik?.values?.quequanTheoHoSoGoc || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </div>
            <span className="text-lable-input lable mb-2 mt-7">{lang("CONTACT.CURENT_ADMIT_UNIT")}</span>
            <div className="content cols-4">
              <Autocomplete
                lable={lang("GENERAL.PROVINCE")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.queQuanTinh || null}
                name="queQuanTinh"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.QQ_TINH, selectedOption)}
                searchFunction={searchAllProvince}
                searchObject={SEARCH_OBJECT_MAX_SIZE}
                // errors={formik.errors?.ttTinh}
                touched={formik.touched?.queQuanTinh}
              />
              <Autocomplete
                lable={lang("GENERAL.DISTRICT")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.queQuanHuyen || null}
                name="queQuanHuyen"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.QQ_HUYEN, selectedOption)}
                searchFunction={searchDistrictByProvince}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.queQuanTinh?.id }}
                dependencies={[formik.values?.queQuanTinh?.id]}
                // errors={formik.errors?.queQuanHuyen}
                touched={formik.touched?.queQuanHuyen}
              />
              <Autocomplete
                lable={lang("GENERAL.COMMUNE")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.queQuanXa || null}
                name="queQuanXa"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.QQ_XA, selectedOption)}
                searchFunction={searchCommuneByDistrict}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.queQuanHuyen?.id }}
                dependencies={[formik.values?.queQuanTinh?.id, formik.values?.queQuanHuyen?.id]}
                // errors={formik.errors?.ttXa}
                touched={formik.touched?.queQuanXa}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.SPECIFIC")}
                name="queQuanDiaChi"
                value={formik.values?.queQuanDiaChi || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.DETAIL")}
                name="queQuanDiaChiChiTiet"
                value={formik.values?.queQuanDiaChiChiTiet || ""}
                type="text"
                readOnly={true}
                className="grid-column-2"
              />
            </div>
          </div>
          <div className="block-content">
            <span className="text-header">{lang("INPUT.PLACEOFBIRTH")}</span>
            <div className="content content cols-4">
              <Autocomplete
                lable={lang("GENERAL.PROVINCE")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.noiSinhTinh || null}
                name="ttTinh"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.NS_TINH, selectedOption)}
                searchFunction={searchAllProvince}
                searchObject={SEARCH_OBJECT_MAX_SIZE}
                // errors={formik.errors?.ttTinh}
                touched={formik.touched?.noiSinhTinh}
              />
              <Autocomplete
                lable={lang("GENERAL.DISTRICT")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.noiSinhHuyen || null}
                name="ttHuyen"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.NS_HUYEN, selectedOption)}
                searchFunction={searchDistrictByProvince}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.noiSinhTinh?.id }}
                dependencies={[formik.values?.noiSinhHuyen?.id]}
                // errors={formik.errors?.ttHuyen}
                touched={formik.touched?.noiSinhHuyen}
              />
              <Autocomplete
                lable={lang("GENERAL.COMMUNE")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.noiSinhXa || null}
                name="ttXa"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.NS_XA, selectedOption)}
                searchFunction={searchCommuneByDistrict}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.noiSinhHuyen?.id }}
                dependencies={[formik.values?.noiSinhTinh?.id, formik.values?.noiSinhHuyen?.id]}
                // errors={formik.errors?.ttXa}
                touched={formik.touched?.noiSinhXa}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.SPECIFIC")}
                name="noiSinhDiaChi"
                value={formik.values?.noiSinhDiaChi || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.DETAIL")}
                name="noiSinhDiaChiChiTiet"
                value={formik.values?.noiSinhDiaChiChiTiet || ""}
                type="text"
                readOnly={true}
                className="grid-column-2"
              />
            </div>
          </div>
          <div className="block-content">
            <span className="text-header">{lang("TITLE.ADDRESS.TEMPORARY")}</span>
            <div className="content cols-4">
              <Autocomplete
                lable={lang("GENERAL.PROVINCE")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.ttTinh || null}
                name="ttTinh"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.TT_TINH, selectedOption)}
                searchFunction={searchAllProvince}
                searchObject={SEARCH_OBJECT_MAX_SIZE}
                // errors={formik.errors?.ttTinh}
                touched={formik.touched?.ttTinh}
              />
              <Autocomplete
                lable={lang("GENERAL.DISTRICT")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.ttHuyen || null}
                name="ttHuyen"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.TT_HUYEN, selectedOption)}
                searchFunction={searchDistrictByProvince}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.ttTinh?.id }}
                dependencies={[formik.values?.ttTinh?.id]}
                // errors={formik.errors?.ttHuyen}
                touched={formik.touched?.ttHuyen}
              />
              <Autocomplete
                lable={lang("GENERAL.COMMUNE")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.ttXa || null}
                name="ttXa"
                onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.TT_XA, selectedOption)}
                searchFunction={searchCommuneByDistrict}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, id: formik.values?.ttHuyen?.id }}
                dependencies={[formik.values?.ttTinh?.id, formik.values?.ttHuyen?.id]}
                // errors={formik.errors?.ttXa}
                touched={formik.touched?.ttXa}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.SPECIFIC")}
                name="ttSoNha"
                value={formik.values?.ttSoNha || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
              <TextValidator
                lable={lang("GENERAL.ADDRESS.DETAIL")}
                name="ttDiachi"
                value={formik.values?.ttDiachi || ""}
                type="text"
                readOnly={true}
                className="grid-column-2"
              />
            </div>
          </div>
        </>
      </Form>
    </div>
  );
};
