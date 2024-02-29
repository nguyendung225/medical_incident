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
import { INIT_IT_QUALIFICATION_INFO } from "../../const/DialogConstant";
import { IFile, ITQualificationInfo } from "../../models/DialogModels";
import { useCustomIntl } from "../../../utils/FunctionUtils";
import { TRAINING_TYPE, politicalTheoryTrainingForms } from "../../const/DialogChildConstants";
import { TYPE_CATEGORY } from "../../../constant";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { searchAllSimpleValue } from "../../../services";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { toast } from "react-toastify";
import { addITQualification, updateITQualification } from "../../services/DialogServices";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import UploadFile from "../../../component/FileUpload/UploadFile";
import AppContext from "../../../../AppContext";

interface IProps {
  handleCloseITQualificationDialog: () => void;
  identify: string;
  isView: boolean;
  ITQualificationEdit: ITQualificationInfo;
  updateData: () => Promise<void>;
}
export const ITQualificationDialog: React.FC<IProps> = ({ handleCloseITQualificationDialog, identify, ITQualificationEdit, isView, updateData }) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(ITQualificationEdit?.coSoDaoTaoKhac ? true : false);

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
    trinhDoTinHoc: Yup.object()
      .shape({})
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable()
  });

  const convertDataITQualification = (data: ITQualificationInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      },
      trinhDoTinHoc: {
        id: data?.trinhDoId,
        value: data?.trinhDoText
      }
    }
  }

  const handleFormSubmit = async (values: ITQualificationInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values.coSoDaoTao?.id,
        coSoDaoTaoText: values.coSoDaoTao?.value,
        trinhDoId: values.trinhDoTinHoc?.id,
        trinhDoText: values.trinhDoTinHoc?.value,
        type: TRAINING_TYPE.TIN_HOC
      }
      try {
        setPageLoading(true);
        const res = ITQualificationEdit?.id
          ? await updateITQualification(ITQualificationEdit?.id, { ..._values })
          : await addITQualification({ ..._values });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = ITQualificationEdit?.id
            ? "TOAST.EDIT.IT_QUALIFICATION.SUCCESS"
            : "TOAST.ADD.IT_QUALIFICATION.SUCCESS";
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
    handleCloseITQualificationDialog();
  };

  const formik = useFormik({
    initialValues: ITQualificationEdit?.id ? convertDataITQualification(ITQualificationEdit) : INIT_IT_QUALIFICATION_INFO,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    if(name === VARIABLE_STRING.CO_SO_DAO_TAO){
      formik.setFieldValue(VARIABLE_STRING.CO_SO_DAO_TAO_KHAC, "");
    }
    formik.setFieldValue(name, value)
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
      onHide={handleCloseITQualificationDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(`${ITQualificationEdit
              ? "INFO.IT_QUALIFICATION.ADD"
              : "INFO.IT_QUALIFICATION.UPDATE"
              }`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.IT_QUALIFICATION.TRAINING_TIME")}
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
                lable={useCustomIntl("INPUT.IT_QUALIFICATION.TRAINING_LEVEL")}
                isReadOnly={isView}
                options={[]}
                isRequired
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.trinhDoTinHoc
                }}
                value={formik.values?.trinhDoTinHoc}
                name="trinhDoTinHoc"
                onChange={(selectedOption) =>
                  handleChangeSelect("trinhDoTinHoc", selectedOption)
                }
                errors={formik.errors?.trinhDoTinHoc}
                touched={formik.touched?.trinhDoTinHoc}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.IT_QUALIFICATION.TRAINING_FORM")}
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
                lable={useCustomIntl("INPUT.IT_QUALIFICATION.TRAINING_FACILITIES")}
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
                lable={useCustomIntl("INPUT.IT_QUALIFICATION.CERTIFICATE")}
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
                label="INPUT.IT_QUALIFICATION.ATTACHMENTS"
                setValue={handleFile}
                fileValue={{
                  id: formik.values.fileId || "",
                  name: formik.values.fileName || ""}}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={8} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.IT_QUALIFICATION.NOTE")}
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
              onClick={() => handleCloseITQualificationDialog()}
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
