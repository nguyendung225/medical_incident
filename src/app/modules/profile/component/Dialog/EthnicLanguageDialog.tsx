/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import TextValidator from "../../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../../constant";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { searchAllSimpleValue } from "../../../services";
import "../../../styles/index.scss";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { useCustomIntl } from "../../../utils/FunctionUtils";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import { politicalTheoryTrainingForms } from "../../const/DialogChildConstants";
import { INIT_ETHNIC_LANGUAGE_INFO } from "../../const/DialogConstant";
import { IEthnicLanguageInfo, IFile } from "../../models/DialogModels";
import { addEthnicLanguage, updateEthnicLanguage } from "../../services/DialogServices";
import UploadFile from "../../../component/FileUpload/UploadFile";
import AppContext from "../../../../AppContext";

interface IProps {
  handleCloseEthnicLanguageDialog: () => void;
  identify: string;
  isView: boolean;
  ethnicLanguageEdit: IEthnicLanguageInfo;
  updateData: () => Promise<void>;
}
export const EthnicLanguageDialog: React.FC<IProps> = ({ handleCloseEthnicLanguageDialog, identify, ethnicLanguageEdit, isView, updateData }) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(ethnicLanguageEdit?.coSoDaoTaoKhac ? true : false);

  const validationSchema = Yup.object().shape({
    hinhThucDaoTao: Yup.object()
      .when("bietTieng", {
        is: true,
        then: Yup.object().notRequired().nullable(),
        otherwise: Yup.object()
          .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
          .nullable()
      })
      .nullable(),
    coSoDaoTao: !isCheckCoSoDaoTao
      ? Yup.object()
          .when("bietTieng", {
            is: true,
            then: Yup.object().notRequired().nullable(),
            otherwise: Yup.object()
              .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
              .nullable()
          })
          .nullable()
      : Yup.object().nullable(),
    coSoDaoTaoKhac: isCheckCoSoDaoTao
      ? Yup.string()
          .when("bietTieng", {
            is: true,
            then: Yup.string().notRequired().nullable(),
            otherwise: Yup.string()
              .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
              .nullable()
          })
          .nullable()
      : Yup.string().nullable(),
    tiengDanToc: Yup.string()
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
      .when("bietTieng", {
        is: true,
        then: Yup.date().notRequired().nullable(),
        otherwise: Yup.date()
          .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
          .nullable()
      })
      .nullable(),
    daoTaoDenNgay: Yup.date().concat(checkInvalidDate(intl)).nullable()
  });

  const convertDataEthnicLanguage = (data: IEthnicLanguageInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      }
    }
  }

  const handleFormSubmit = async (values: IEthnicLanguageInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values.coSoDaoTao?.id,
        coSoDaoTaoText: values.coSoDaoTao?.value
      }
      try {
        setPageLoading(true);
        const res = ethnicLanguageEdit?.id
          ? await updateEthnicLanguage(ethnicLanguageEdit?.id, { ..._values })
          : await addEthnicLanguage({ ..._values });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = ethnicLanguageEdit?.id
            ? "TOAST.EDIT.ETHNIC_LANGUAGE.SUCCESS"
            : "TOAST.ADD.ETHNIC_LANGUAGE.SUCCESS";
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
    handleCloseEthnicLanguageDialog();
  };

  const formik = useFormik({
    initialValues: ethnicLanguageEdit?.id ? convertDataEthnicLanguage(ethnicLanguageEdit) : INIT_ETHNIC_LANGUAGE_INFO,
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
      onHide={handleCloseEthnicLanguageDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(`${ethnicLanguageEdit
              ? "INFO.ETHNIC_LANGUAGE.ADD"
              : "INFO.ETHNIC_LANGUAGE.UPDATE"
              }`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <Form.Check
                label={useCustomIntl("INPUT.ETHNIC_LANGUAGE.IS_KNOW_ETHNIC_LANGUAGE")}
                name="bietTieng"
                disabled={isView}
                className="checkBox custom-form-check"
                checked={formik.values?.bietTieng}
                onChange={handleChangeCheckBox}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.ETHNIC_LANGUAGE.LANGUAGE")}
                name="tiengDanToc"
                value={formik.values?.tiengDanToc || ""}
                type="text"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.tiengDanToc}
                errors={formik.errors?.tiengDanToc}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.ETHNIC_LANGUAGE.TRAINING_TIME")}
                startDateName="daoTaoTuNgay"
                endDateName="daoTaoDenNgay"
                isRequired
                isView={isView}
                handleChange={formik.handleChange}
                value={formik.values}
                setFieldValue={formik.setFieldValue}
                touch={formik.touched}
                errors={formik.errors}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.ETHNIC_LANGUAGE.TRAINING_FACILITIES")}
                isReadOnly={isView}
                options={[]}
                formCheckBox={true}
                setIsCheckBox={setIsCheckCoSoDaoTao}
                isCheckBox={isCheckCoSoDaoTao}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.noiDaoTao
                }}
                getOptionLabel={(option) => option?.value}
                isRequired={!formik.values?.bietTieng}
                value={isCheckCoSoDaoTao ? formik.values?.coSoDaoTaoKhac : formik.values?.coSoDaoTao}
                name={isCheckCoSoDaoTao ? VARIABLE_STRING.CO_SO_DAO_TAO_KHAC : VARIABLE_STRING.CO_SO_DAO_TAO}
                onChange={(selectedOption) => isCheckCoSoDaoTao ? handleChange(selectedOption, VARIABLE_STRING.CO_SO_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.CO_SO_DAO_TAO, selectedOption)}
                errors={isCheckCoSoDaoTao ? formik.errors?.coSoDaoTaoKhac : formik.errors?.coSoDaoTao}
                touched={isCheckCoSoDaoTao ? formik.touched?.coSoDaoTaoKhac : formik.touched?.coSoDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.ETHNIC_LANGUAGE.TRAINING_FORM")}
                isReadOnly={isView}
                options={politicalTheoryTrainingForms}
                isRequired={!formik.values?.bietTieng}
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
              <TextValidator
                lable={useCustomIntl("INPUT.ETHNIC_LANGUAGE.CERTIFICATE")}
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
              <UploadFile
                label="INPUT.ETHNIC_LANGUAGE.ATTACHMENTS"
                setValue={handleFile}
                fileValue={{
                  id: formik.values.fileId || "",
                  name: formik.values.fileName || ""}}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={8} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.ETHNIC_LANGUAGE.NOTE")}
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
              onClick={() => handleCloseEthnicLanguageDialog()}
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
