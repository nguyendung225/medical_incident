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
import { INIT_FOREIGN_LANGUAGE_LEVEL_INFO } from "../../const/DialogConstant";
import { IFile, IForeignLanguageLevelInfo } from "../../models/DialogModels";
import { useCustomIntl } from "../../../utils/FunctionUtils";
import { TRAINING_TYPE, foreignLanguages, politicalTheoryTrainingForms } from "../../const/DialogChildConstants";
import { searchAllSimpleValue } from "../../../services";
import { TYPE_CATEGORY } from "../../../constant";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { addForeignLanguageLevel, updateForeignLanguageLevel } from "../../services/DialogServices";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import UploadFile from "../../../component/FileUpload/UploadFile";
import AppContext from "../../../../AppContext";

interface IProps {
  handleCloseForeignLanguageLevelDialog: () => void;
  identify: string;
  isView: boolean;
  foreignLanguageLevelEdit: IForeignLanguageLevelInfo;
  updateData: () => Promise<void>;
}
export const ForeignLanguageLevelDialog: React.FC<IProps> = ({ handleCloseForeignLanguageLevelDialog, identify, foreignLanguageLevelEdit, isView, updateData }) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(foreignLanguageLevelEdit?.coSoDaoTaoKhac ? true : false);

  const validationSchema = Yup.object().shape({
    coSoDaoTao: !isCheckCoSoDaoTao
      ? Yup.object().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.object().nullable(),
    coSoDaoTaoKhac: isCheckCoSoDaoTao
      ? Yup.string().required(lang("VALIDATION.REQUIRE")).nullable()
      : Yup.string().nullable(),
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
    thoiGianHieuLucTuNgay: Yup.date()
      .concat(checkInvalidDate(intl))
      .when("thoiGianHieuLucDenNgay", {
        is: (thoiGianHieuLucDenNgay: Date | null) => thoiGianHieuLucDenNgay,
        then: Yup.date()
          .max(
            Yup.ref("thoiGianHieuLucDenNgay"),
            lang("VALIDATION.MAXDATE") +
              lang("INPUT.CERTIFICATE.EFFECTIVE_TIME_END")
          )
          .nullable()
      })
      .nullable(),
    thoiGianHieuLucDenNgay: Yup.date().concat(checkInvalidDate(intl)).nullable(),
    ngoaiNgu: Yup.object()
      .shape({})
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    trinhDoNgoaiNgu: Yup.object()
      .shape({})
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable()
  });

  const convertDataForeignLanguageLevel = (data: IForeignLanguageLevelInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      },
      trinhDoNgoaiNgu: {
        id: data?.trinhDoId,
        value: data?.trinhDoText
      }
    }
  }

  const handleFormSubmit = async (values: IForeignLanguageLevelInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values.coSoDaoTao?.id,
        coSoDaoTaoText: values.coSoDaoTao?.value,
        trinhDoId: values.trinhDoNgoaiNgu?.id,
        trinhDoText: values.trinhDoNgoaiNgu?.value,
        type: TRAINING_TYPE.NGOAI_NGU
      }
      try {
        setPageLoading(true);
        const res = foreignLanguageLevelEdit?.id
          ? await updateForeignLanguageLevel(foreignLanguageLevelEdit?.id, { ..._values })
          : await addForeignLanguageLevel({ ..._values });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = foreignLanguageLevelEdit?.id
            ? "TOAST.EDIT.FOREIGN_LANGUAGE.SUCCESS"
            : "TOAST.ADD.FOREIGN_LANGUAGE.SUCCESS";
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
    handleCloseForeignLanguageLevelDialog();
  };

  const formik = useFormik({
    initialValues: foreignLanguageLevelEdit?.id ? convertDataForeignLanguageLevel(foreignLanguageLevelEdit) : INIT_FOREIGN_LANGUAGE_LEVEL_INFO,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    if (name === VARIABLE_STRING.CO_SO_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.CO_SO_DAO_TAO_KHAC, "");
    }
    formik.setFieldValue(name, value);
  }

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
      onHide={handleCloseForeignLanguageLevelDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(`${foreignLanguageLevelEdit
              ? "INFO.FOREIGN_LANGUAGE_LEVEL.ADD"
              : "INFO.FOREIGN_LANGUAGE_LEVEL.UPDATE"
              }`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.FOREIGN_LANGUAGE_LEVEL.TRAINING_TIME")}
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
                lable={useCustomIntl("INPUT.FOREIGN_LANGUAGE_LEVEL.LANGUAGE")}
                isReadOnly={isView}
                options={foreignLanguages}
                isRequired
                value={formik.values?.ngoaiNgu}
                name="ngoaiNgu"
                onChange={(selectedOption) =>
                  handleChangeSelect("ngoaiNgu", selectedOption)
                }
                errors={formik.errors?.ngoaiNgu}
                touched={formik.touched?.ngoaiNgu}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.FOREIGN_LANGUAGE_LEVEL.TRAINING_LEVEL")}
                isReadOnly={isView}
                options={[]}
                isRequired
                value={formik.values?.trinhDoNgoaiNgu}
                name="trinhDoNgoaiNgu"
                onChange={(selectedOption) =>
                  handleChangeSelect("trinhDoNgoaiNgu", selectedOption)
                }
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.trinhDoNgoaiNgu
                }}
                getOptionLabel={(option) => option?.value}
                errors={formik.errors?.trinhDoNgoaiNgu}
                touched={formik.touched?.trinhDoNgoaiNgu}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.FOREIGN_LANGUAGE_LEVEL.TRAINING_FORM")}
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
                lable={useCustomIntl("INPUT.FOREIGN_LANGUAGE_LEVEL.TRAINING_FACILITIES")}
                isReadOnly={isView}
                isRequired
                formCheckBox={true}
                value={isCheckCoSoDaoTao ? formik.values?.coSoDaoTaoKhac : formik.values?.coSoDaoTao || null}
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
              <RangeDatePicker
                label={useCustomIntl("INPUT.CERTIFICATE.EFFECTIVE_TIME")}
                startDateName="thoiGianHieuLucTuNgay"
                endDateName="thoiGianHieuLucDenNgay"
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
                lable={useCustomIntl("INPUT.FOREIGN_LANGUAGE_LEVEL.CERTIFICATE")}
                name="vanBang"
                value={formik.values?.vanBang || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.vanBang}
                errors={formik.errors?.vanBang}
              />
              <div className="pt-6">
                <UploadFile
                  label="INPUT.FOREIGN_LANGUAGE_LEVEL.ATTACHMENTS"
                  setValue={handleFile}
                  fileValue={{
                    id: formik.values.fileId || "",
                    name: formik.values.fileName || ""}}
                  allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
                />
              </div>
            </Col>
            <Col xs={8} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.FOREIGN_LANGUAGE_LEVEL.NOTE")}
                name="note"
                className="foreign-language-note"
                type="text"
                as="textarea"
                rows="4"
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
              onClick={() => handleCloseForeignLanguageLevelDialog()}
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
