/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import TextValidator from "../../../component/input-field/TextValidator";
import "../../../styles/index.scss";
import { INIT_SPECIALIZE_TRAINING_INFO } from "../../const/DialogConstant";
import { IFile, ISpecializeTrainingInfo } from "../../models/DialogModels";
import { handleBlurDate, useCustomIntl } from "../../../utils/FunctionUtils";
import { searchAllSimpleValue } from "../../../services";
import { TYPE_CATEGORY } from "../../../constant";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { TRAINING_TYPE, politicalTheoryTrainingForms, specializeTrainingFields } from "../../const/DialogChildConstants";
import { addSpecializeTraining, updateSpecializeTraining } from "../../services/DialogServices";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { toast } from "react-toastify";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import UploadFile from "../../../component/FileUpload/UploadFile";
import AppContext from "../../../../AppContext";

interface IProps {
  handleCloseSpecializeTrainingDialog: () => void;
  identify: string;
  isView: boolean;
  specializeTrainingEdit: ISpecializeTrainingInfo;
  updateData: () => Promise<void>;
}
export const SpecializeTrainingDialog: React.FC<IProps> = ({ handleCloseSpecializeTrainingDialog, identify, specializeTrainingEdit, isView, updateData }) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(specializeTrainingEdit?.coSoDaoTaoKhac ? true : false);

  const validationSchema = Yup.object().shape({
    tenKhoaHocChungChi: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    daoTaoTuNgay: Yup.date()
      .concat(checkInvalidDate(intl))
      .when("daoTaoDenNgay", {
        is: (daoTaoDenNgay: Date | null) => daoTaoDenNgay,
        then: Yup.date()
          .max(
            Yup.ref("daoTaoDenNgay"),
            lang("VALIDATION.MAXDATE") +
              lang("INPUT.QUALIFICATION.TRAINING_TIME_END")
          )
          .nullable()
      })
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    daoTaoDenNgay: Yup.date().concat(checkInvalidDate(intl)).nullable(),
    hieuLucTuNgay: Yup.date()
      .concat(checkInvalidDate(intl))
      .max(
        Yup.ref("hieuLucDenNgay"),
        lang("VALIDATION.MAXDATE") +
          lang("INPUT.QUALIFICATION.TRAINING_TIME_END")
      )
      .nullable(),
    hieuLucDenNgay: Yup.date()
      .concat(checkInvalidDate(intl))
      .min(
        Yup.ref("hieuLucTuNgay"),
        lang("VALIDATION.MINDATE") +
          lang("INPUT.QUALIFICATION.TRAINING_TIME_START")
      )
      .nullable(),
    coSoDaoTao: !isCheckCoSoDaoTao
      ? Yup.object().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.object().nullable(),
    coSoDaoTaoKhac: isCheckCoSoDaoTao
      ? Yup.string().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.string().nullable(),
    ngayCap: Yup.date()
      .when("hieuLucTuNgay", {
        is: (hieuLucTuNgay: Date | null) => hieuLucTuNgay && hieuLucTuNgay < new Date(),
        then: Yup.date()
        .max(
          Yup.ref("hieuLucTuNgay"),
          lang("VALIDATION.MAXDATE") +
          lang("INPUT.CERTIFICATE.EFFECTIVE_TIME_START")
          )
          .nullable()
      })
      .max(new Date(), lang("VALIDATION.INVALID_ISSUEDATE"))
      .nullable(),
  });

  const convertDataSpecializeTraining = (data: ISpecializeTrainingInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      }
    }
  }

  const handleFormSubmit = async (values: ISpecializeTrainingInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values.coSoDaoTao?.id,
        coSoDaoTaoText: values.coSoDaoTao?.value,
        type: TRAINING_TYPE.BOI_DUONG_CHUC_DANH
      }
      try {
        setPageLoading(true);
        const res = specializeTrainingEdit?.id
          ? await updateSpecializeTraining(specializeTrainingEdit?.id, { ..._values })
          : await addSpecializeTraining({ ..._values });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = specializeTrainingEdit?.id
            ? "TOAST.EDIT.SPECIALIZE_TRANINING.SUCCESS"
            : "TOAST.ADD.SPECIALIZE_TRANINING.SUCCESS";
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
    handleCloseSpecializeTrainingDialog();
  };


  const formik = useFormik({
    initialValues: specializeTrainingEdit?.id ? convertDataSpecializeTraining(specializeTrainingEdit) : INIT_SPECIALIZE_TRAINING_INFO,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    if (name === VARIABLE_STRING.CO_SO_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.CO_SO_DAO_TAO_KHAC, "");
    }
    formik.setFieldValue(name, value);
  }

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (name === VARIABLE_STRING.CAP_CHUNG_CHI) {
      formik.setFieldValue(VARIABLE_STRING.VAN_BANG, "");
      formik.setFieldValue(VARIABLE_STRING.NGAY_CAP, "");
      formik.setFieldValue(VARIABLE_STRING.DON_VI_CAP, "");
      formik.setFieldValue(VARIABLE_STRING.HIEU_LUC_TU_NGAY, "");
      formik.setFieldValue(VARIABLE_STRING.HIEU_LUC_DEN_NGAY, "");
      formik.setFieldValue(VARIABLE_STRING.CHUNG_CHI_QUOC_TE, false);
    }
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
      onHide={handleCloseSpecializeTrainingDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(`${specializeTrainingEdit
              ? "INFO.SPECIALIZE_TRAINING.ADD"
              : "INFO.SPECIALIZE_TRAINING.UPDATE"
              }`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.SPECIALIZE_TRAINING.COURSE")}
                name="tenKhoaHocChungChi"
                isRequired
                value={formik.values?.tenKhoaHocChungChi || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.tenKhoaHocChungChi}
                errors={formik.errors?.tenKhoaHocChungChi}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.SPECIALIZE_TRAINING.TRAINING_TIME")}
                isRequired
                startDateName="daoTaoTuNgay"
                endDateName="daoTaoDenNgay"
                isView={isView}
                handleChange={formik.handleChange}
                value={formik.values}
                setFieldValue={formik.setFieldValue}
                touch={formik.touched}
                errors={formik.errors}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.SPECIALIZE_TRAINING.TRAINING_FACILITIES")}
                isReadOnly={isView}
                isRequired
                formCheckBox={true}
                value={isCheckCoSoDaoTao ? formik.values?.coSoDaoTaoKhac : formik.values?.coSoDaoTao}
                name={isCheckCoSoDaoTao ? VARIABLE_STRING.CO_SO_DAO_TAO_KHAC : VARIABLE_STRING.CO_SO_DAO_TAO}
                setIsCheckBox={setIsCheckCoSoDaoTao}
                isCheckBox={isCheckCoSoDaoTao}
                onChange={(selectedOption) => isCheckCoSoDaoTao ? handleChange(selectedOption, VARIABLE_STRING.CO_SO_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.CO_SO_DAO_TAO, selectedOption)}
                options={[]}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.noiDaoTao
                }}
                getOptionLabel={(option) => option?.value}
                errors={isCheckCoSoDaoTao ? formik.errors?.coSoDaoTaoKhac : formik.errors?.coSoDaoTao}
                touched={isCheckCoSoDaoTao ? formik.touched?.coSoDaoTaoKhac : formik.touched?.coSoDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.SPECIALIZE_TRAINING.TRAINING_FORM")}
                isReadOnly={isView}
                options={politicalTheoryTrainingForms}
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
                lable={useCustomIntl("INPUT.SPECIALIZE_TRAINING.FIELD")}
                isReadOnly={isView}
                options={specializeTrainingFields}
                value={formik.values?.linhVucDaoTao}
                name="linhVucDaoTao"
                onChange={(selectedOption) =>
                  handleChangeSelect("linhVucDaoTao", selectedOption)
                }
                errors={formik.errors?.linhVucDaoTao}
                touched={formik.touched?.linhVucDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.SPECIALIZE_TRAINING.RESULT")}
                name="ketQua"
                value={formik.values?.ketQua || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.ketQua}
                errors={formik.errors?.ketQua}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.SPECIALIZE_TRAINING.TRAINING_DURATION")}
                name="thoiLuongDaoTao"
                value={formik.values?.thoiLuongDaoTao || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.thoiLuongDaoTao}
                errors={formik.errors?.thoiLuongDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Form.Check
                label={useCustomIntl("INPUT.SPECIALIZE_TRAINING.IS_PROVIDE_CERTIFICATE")}
                name="capChungChi"
                disabled={isView}
                className="checkBox custom-form-check"
                checked={formik.values?.capChungChi}
                onChange={handleChangeCheckBox}
              />
            </Col>
            {formik.values?.capChungChi && (
              <>
                <Col xs={4} className="pt-6">
                  <TextValidator
                    lable={intl.formatMessage({ id: "INPUT.SPECIALIZE_TRAINING.CERTIFICATE" })}
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
                  <TextValidator
                    lable={intl.formatMessage({ id: "INPUT.SPECIALIZE_TRAINING.PROVIDE_DATE" })}
                    name="ngayCap"
                    value={formik.values?.ngayCap || ""}
                    type="date"
                    readOnly={isView}
                    onChange={formik.handleChange}
                    onBlur={() =>
                      handleBlurDate(
                        formik.setFieldValue,
                        formik.values?.ngayCap,
                        "ngayCap"
                      )
                    }
                    touched={formik.touched?.ngayCap}
                    errors={formik.errors?.ngayCap}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <TextValidator
                    lable={intl.formatMessage({ id: "INPUT.SPECIALIZE_TRAINING.PROVIDE_UNIT" })}
                    name="donViCap"
                    value={formik.values?.donViCap || ""}
                    type="text"
                    readOnly={isView}
                    onChange={formik.handleChange}
                    touched={formik.touched?.donViCap}
                    errors={formik.errors?.donViCap}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <RangeDatePicker
                    label={intl.formatMessage({ id: "INPUT.SPECIALIZE_TRAINING.EFFECTIVE_TIME" })}
                    startDateName="hieuLucTuNgay"
                    endDateName="hieuLucDenNgay"
                    isView={isView}
                    handleChange={formik.handleChange}
                    value={formik.values}
                    setFieldValue={formik.setFieldValue}
                    touch={formik.touched}
                    errors={formik.errors}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <Form.Check
                    label={intl.formatMessage({ id: "INPUT.SPECIALIZE_TRAINING.IS_NATIONALITY_CERTIFICATE" })}
                    name="chungChiQuocTe"
                    disabled={isView}
                    className="checkBox custom-form-check"
                    checked={formik.values?.chungChiQuocTe}
                    onChange={handleChangeCheckBox}
                  />
                </Col>
              </>
            )}
            <Col xs={4} className="pt-6">
              <UploadFile
                label="INPUT.SPECIALIZE_TRAINING.ATTACHMENTS"
                setValue={handleFile}
                fileValue={{
                  id: formik.values.fileId || "",
                  name: formik.values.fileName || ""}}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={formik.values?.capChungChi ? 4 : 12} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.SPECIALIZE_TRAINING.NOTE")}
                name="note"
                type="text"
                as="textarea"
                rows="3"
                value={formik.values?.note}
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
              onClick={() => handleCloseSpecializeTrainingDialog()}
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
