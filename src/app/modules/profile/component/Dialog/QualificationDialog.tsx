/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import UploadFile from "../../../component/FileUpload/UploadFile";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import TextValidator from "../../../component/input-field/TextValidator";
import "../../../styles/index.scss";
import { numberExceptThisSymbols, useCustomIntl } from "../../../utils/FunctionUtils";
import { politicalTheoryTrainingForms, rankOfEducation } from "../../const/DialogChildConstants";
import { INIT_QUALIFICATION_INFO } from "../../const/DialogConstant";
import { IFile, IQualificationInfo } from "../../models/DialogModels";
import { getAllCountry, searchAllSimpleValue } from "../../../services";
import { TYPE_CATEGORY } from "../../../constant";
import { COUNTRY, SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { addQualification, updateQualification } from "../../services/DialogServices";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import AppContext from "../../../../AppContext";

interface IProps {
  handleCloseQualificationDialog: () => void;
  identify: string;
  isView: boolean;
  qualificationEdit: IQualificationInfo;
  updateData: () => Promise<void>;
}
export const QualificationDialog: React.FC<IProps> = ({ handleCloseQualificationDialog, identify, qualificationEdit, isView, updateData }) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isCheckNganhDaoTao, setIsCheckNganhDaoTao] = useState<boolean>(qualificationEdit?.nganhDaoTaoKhac ? true : false);
  const [isCheckChuyenNganhDaoTao, setIsCheckChuyenNganhDaoTao] = useState<boolean>(qualificationEdit?.chuyenNganhDaoTaoKhac ? true : false);
  const [isCheckNuocDaoTao, setIsCheckNuocDaoTao] = useState<boolean>(qualificationEdit?.nuocDaoTaoKhac ? true : false);
  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(qualificationEdit?.coSoDaoTaoKhac ? true : false);
  const [countryList, setCountryList] = useState<any>([]);

  const validationSchema = Yup.object().shape({
    nuocDaoTao: !isCheckNuocDaoTao
      ? Yup.object().required(intl.formatMessage({ id: "VALIDATION.REQUIRE" })).nullable()
      : Yup.object().nullable(),
    nuocDaoTaoKhac: isCheckNuocDaoTao
      ? Yup.string().required(intl.formatMessage({ id: "VALIDATION.REQUIRE" })).nullable()
      : Yup.string().nullable(),
    coSoDaoTao: !isCheckCoSoDaoTao
      ? Yup.object().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.object().nullable(),
    coSoDaoTaoKhac: isCheckCoSoDaoTao
      ? Yup.string().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.string().nullable(),
    tuNgay: Yup.date()
      .concat(checkInvalidDate(intl))
      .when("denNgay", {
        is: (denNgay: Date | null) => denNgay,
        then: Yup.date()
          .max(
            Yup.ref("denNgay"),
            lang("VALIDATION.MAXDATE") +
              lang("INPUT.QUALIFICATION.TRAINING_TIME_END")
          )
          .nullable()
      }).required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    denNgay: Yup.date().concat(checkInvalidDate(intl)).nullable(),
    namTotNghiep: Yup.number()
      .min(1000, intl.formatMessage({ id: "VALIDATION.FOUR_DIGITS" }))
      .max(9999, intl.formatMessage({ id: "VALIDATION.FOUR_DIGITS" }))
      .nullable(),
    hinhThucDaoTao: Yup.object()
      .shape({})
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    trinhDoDaoTao: Yup.object()
      .shape({})
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    chuyenNganhDaoTao: !isCheckChuyenNganhDaoTao
      ? Yup.object().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.object().nullable(),
    chuyenNganhDaoTaoKhac: isCheckChuyenNganhDaoTao
      ? Yup.string().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.string().nullable()
  });

  const convertDataQualification = (data: IQualificationInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      },
      trinhDoDaoTao: {
        id: data?.trinhDoDaoTaoId,
        value: data?.trinhDoDaoTaoText
      },
      nganhDaoTao: {
        id: data?.nganhDaoTaoId,
        value: data?.nganhDaoTaoText
      },
      chuyenNganhDaoTao: {
        id: data?.chuyenNganhDaoTaoId,
        value: data?.chuyenNganhDaoTaoText
      },
      nuocDaoTao: {
        id: data?.nuocDaoTaoId,
        name: data?.nuocDaoTaoText
      }
    }
  }

  useEffect(() => {
    async function fetchAllCountry() {
      try {
        let { data } = await getAllCountry();
        if (data?.code === SUCCESS_CODE) {
          setCountryList(data?.data)
          let defaultCountry = data?.data?.find((country: any) => country?.code === COUNTRY.CODE.VIET_NAM);
          if (!formik.values?.nuocDaoTao?.id) {
            formik.setFieldValue(VARIABLE_STRING.NUOC_DAO_TAO, defaultCountry);
          }
        }
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    }
    fetchAllCountry();
  }, [])

  const handleFormSubmit = async (values: IQualificationInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values.coSoDaoTao?.id,
        coSoDaoTaoText: values.coSoDaoTao?.value,
        nuocDaoTaoId: values.nuocDaoTao?.id,
        nuocDaoTaoText: values.nuocDaoTao?.name,
        chuyenNganhDaoTaoId: values.chuyenNganhDaoTao?.id,
        chuyenNganhDaoTaoText: values.chuyenNganhDaoTao?.value,
        nganhDaoTaoId: values.nganhDaoTao?.id,
        nganhDaoTaoText: values.nganhDaoTao?.value,
        trinhDoDaoTaoId: values.trinhDoDaoTao?.id,
        trinhDoDaoTaoText: values.trinhDoDaoTao?.value
      }
      try {
        setPageLoading(true);
        const res = qualificationEdit?.id
          ? await updateQualification(qualificationEdit?.id, { ..._values })
          : await addQualification({ ..._values });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = qualificationEdit?.id
            ? "TOAST.EDIT.QUALIFICATION.SUCCESS"
            : "TOAST.ADD.QUALIFICATION.SUCCESS";
          toast.success(intl.formatMessage({ id: message }));
          setPageLoading(false);
        } else {
          toast.error(`${res?.data?.message}`);
          setPageLoading(false);
        }
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
        setPageLoading(false);
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
    await updateData();
    handleCloseQualificationDialog();
  };


  const formik = useFormik({
    initialValues: qualificationEdit?.id ? convertDataQualification(qualificationEdit) : INIT_QUALIFICATION_INFO,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    if (name === VARIABLE_STRING.NGANH_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.NGANH_DAO_TAO_KHAC, null)
    }
    if (name === VARIABLE_STRING.CHUYEN_NGANH_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.CHUYEN_NGANH_DAO_TAO_KHAC, null)
    }
    if (name === VARIABLE_STRING.NUOC_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.NUOC_DAO_TAO_KHAC, null)
    }
    formik.setFieldValue(name, value);
  }

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    formik.setFieldValue(name, checked);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, nameObj: string) => {
    const { name, value } = event.target
    formik.setFieldValue(name, value)
    formik.setFieldValue(nameObj, null)
  }

  const handleFile = (data: IFile) => {
    formik.setFieldValue("fileId", data.id);
    formik.setFieldValue("fileName", data.name);
  }

  return (
    <Modal
      show={true}
      size="xl"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleCloseQualificationDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(`${qualificationEdit
              ? "INFO.QUALIFICATION.ADD"
              : "INFO.QUALIFICATION.UPDATE"
              }`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.QUALIFICATION.TRAINING_COUNTRY")}
                isReadOnly={isView}
                formCheckBox={true}
                isRequired
                value={isCheckNuocDaoTao ? formik.values?.nuocDaoTaoKhac : formik.values?.nuocDaoTao}
                name={isCheckNuocDaoTao ? VARIABLE_STRING.NUOC_DAO_TAO_KHAC : VARIABLE_STRING.NUOC_DAO_TAO}
                setIsCheckBox={setIsCheckNuocDaoTao}
                isCheckBox={isCheckNuocDaoTao}
                onChange={(selectedOption) => isCheckNuocDaoTao ? handleChange(selectedOption, VARIABLE_STRING.NUOC_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.NUOC_DAO_TAO, selectedOption)}
                options={countryList}
                errors={isCheckNuocDaoTao ? formik.errors?.nuocDaoTaoKhac : formik.errors?.nuocDaoTao}
                touched={isCheckNuocDaoTao ? formik.touched?.nuocDaoTaoKhac : formik.touched?.nuocDaoTao}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.QUALIFICATION.TRAINING_FACILITIES")}
                isReadOnly={isView}
                options={[]}
                isRequired
                formCheckBox={true}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.noiDaoTao
                }}
                getOptionLabel={(option) => option?.value}
                value={isCheckCoSoDaoTao ? formik.values?.coSoDaoTaoKhac : formik.values?.coSoDaoTao}
                name={isCheckCoSoDaoTao ? VARIABLE_STRING.CO_SO_DAO_TAO_KHAC : VARIABLE_STRING.CO_SO_DAO_TAO}
                onChange={(selectedOption) => isCheckCoSoDaoTao ? handleChange(selectedOption, VARIABLE_STRING.CO_SO_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.CO_SO_DAO_TAO, selectedOption)}
                setIsCheckBox={setIsCheckCoSoDaoTao}
                isCheckBox={isCheckCoSoDaoTao}
                errors={isCheckCoSoDaoTao ? formik.errors?.coSoDaoTaoKhac : formik.errors?.coSoDaoTao}
                touched={isCheckCoSoDaoTao ? formik.touched?.coSoDaoTaoKhac : formik.touched?.coSoDaoTao}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.QUALIFICATION.TRAINING_TIME")}
                isRequired
                startDateName="tuNgay"
                endDateName="denNgay"
                isView={isView}
                handleChange={formik.handleChange}
                value={formik.values}
                setFieldValue={formik.setFieldValue}
                touch={formik.touched}
                errors={formik.errors}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.QUALIFICATION.CERTIFICATE")}
                name="vanBang"
                value={formik.values?.vanBang || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.vanBang}
                errors={formik.errors?.vanBang}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.QUALIFICATION.TRAINING_FORM")}
                isReadOnly={isView}
                options={politicalTheoryTrainingForms}
                isRequired
                value={formik.values?.hinhThucDaoTao}
                name="hinhThucDaoTao"
                onChange={(selectedOption) =>
                  handleChangeSelect("hinhThucDaoTao", selectedOption)
                }
                errors={formik.errors?.hinhThucDaoTao}
                touched={formik.touched?.hinhThucDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.QUALIFICATION.TRAINING_LEVEL")}
                isReadOnly={isView}
                options={[]}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.trinhDoDaoTao
                }}
                isRequired
                value={formik.values?.trinhDoDaoTao}
                name="trinhDoDaoTao"
                onChange={(selectedOption) =>
                  handleChangeSelect("trinhDoDaoTao", selectedOption)
                }
                errors={formik.errors?.trinhDoDaoTao}
                touched={formik.touched?.trinhDoDaoTao}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.QUALIFICATION.TRAINING_SECTOR")}
                formCheckBox={true}
                value={isCheckNganhDaoTao ? formik.values?.nganhDaoTaoKhac : formik.values?.nganhDaoTao}
                name={isCheckNganhDaoTao ? VARIABLE_STRING.NGANH_DAO_TAO_KHAC : VARIABLE_STRING.NGANH_DAO_TAO}
                setIsCheckBox={setIsCheckNganhDaoTao}
                isCheckBox={isCheckNganhDaoTao}
                onChange={(selectedOption) => isCheckNganhDaoTao ? handleChange(selectedOption, VARIABLE_STRING.NGANH_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.NGANH_DAO_TAO, selectedOption)}
                isReadOnly={isView}
                options={[]}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.chuyenNganh
                }}
                getOptionLabel={(option) => option?.value}
                errors={formik.errors?.nganhDaoTao}
                touched={formik.touched?.nganhDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.QUALIFICATION.TRAINING_MAJOR")}
                isReadOnly={isView}
                formCheckBox={true}
                value={isCheckChuyenNganhDaoTao ? formik.values?.chuyenNganhDaoTaoKhac : formik.values?.chuyenNganhDaoTao}
                name={isCheckChuyenNganhDaoTao ? VARIABLE_STRING.CHUYEN_NGANH_DAO_TAO_KHAC : VARIABLE_STRING.CHUYEN_NGANH_DAO_TAO}
                setIsCheckBox={setIsCheckChuyenNganhDaoTao}
                isCheckBox={isCheckChuyenNganhDaoTao}
                onChange={(selectedOption) => isCheckChuyenNganhDaoTao ? handleChange(selectedOption, VARIABLE_STRING.CHUYEN_NGANH_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.CHUYEN_NGANH_DAO_TAO, selectedOption)}
                options={[]}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.chuyenNganh
                }}
                getOptionLabel={(option) => option?.value}
                isRequired
                errors={isCheckChuyenNganhDaoTao ? formik.errors?.chuyenNganhDaoTaoKhac : formik.errors?.chuyenNganhDaoTao}
                touched={isCheckChuyenNganhDaoTao ? formik.touched?.chuyenNganhDaoTaoKhac : formik.touched?.chuyenNganhDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Form.Check
                label={useCustomIntl("INPUT.QUALIFICATION.MAIN_MAJOR")}
                name="chuyenNganhChinh" 
                disabled={isView}
                className="checkBox custom-form-check"
                checked={formik.values?.chuyenNganhChinh}
                onChange={handleChangeCheckBox}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.QUALIFICATION.GRADUATE_TYPE")}
                isReadOnly={isView}
                options={rankOfEducation}
                value={formik.values?.xepLoai}
                name="xepLoai"
                onChange={(selectedOption) =>
                  handleChangeSelect("xepLoai", selectedOption)
                }
                errors={formik.errors?.xepLoai}
                touched={formik.touched?.xepLoai}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.QUALIFICATION.GRADUATE_YEAR")}
                name="namTotNghiep"
                type="number"
                value={formik.values?.namTotNghiep}
                onChange={formik.handleChange}
                onKeyDown={numberExceptThisSymbols}
                readOnly={isView}
                errors={formik.errors?.namTotNghiep}
                touched={formik.touched?.namTotNghiep}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <UploadFile
                label="INPUT.QUALIFICATION.FILE"
                setValue={handleFile}
                fileValue={{
                  id: formik.values.fileId || "",
                  name: formik.values.fileName || ""}}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={12} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.QUALIFICATION.NOTE")}
                name="note"
                type="text"
                as="textarea"
                rows="3"
                value={formik.values?.note}
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!isView && (
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleCloseQualificationDialog()}
            >
              {intl.formatMessage({ id: "BTN.CANCEL" })}
            </Button>

            <Button
              variant="primary"
              className="button-primary btn-sm"
              type="submit"
            >
              {intl.formatMessage({ id: "BTN.SAVE" })}
            </Button>
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
};
