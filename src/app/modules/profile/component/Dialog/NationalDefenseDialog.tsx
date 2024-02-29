/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppContext from "../../../../AppContext";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import UploadFile from "../../../component/FileUpload/UploadFile";
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
import { TRAINING_TYPE } from "../../const/DialogChildConstants";
import { INIT_NATIONAL_DEFENSE_INFO } from "../../const/DialogConstant";
import { IFile, INationalDefenseInfo } from "../../models/DialogModels";
import { addNationalDefense, updateNationalDefense } from "../../services/DialogServices";

interface IProps {
  handleCloseNationalDefenseDialog: () => void;
  identify: string;
  isView: boolean;
  nationalDefenseEdit: INationalDefenseInfo;
  updateData: () => Promise<void>;
}
export const NationalDefenseDialog: React.FC<IProps> = ({ handleCloseNationalDefenseDialog, identify, nationalDefenseEdit, isView, updateData }) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(nationalDefenseEdit?.coSoDaoTaoKhac ? true : false);

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
    vanBang: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable()
  });

  const convertDataNationalDefense = (data: INationalDefenseInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      }
    }
  }

  const handleFormSubmit = async (values: INationalDefenseInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values.coSoDaoTao?.id,
        coSoDaoTaoText: values.coSoDaoTao?.value,
        type: TRAINING_TYPE.QUOC_PHONG
      }
      try {
        setPageLoading(true);
        const res = nationalDefenseEdit?.id
          ? await updateNationalDefense(nationalDefenseEdit?.id, { ..._values })
          : await addNationalDefense({ ..._values });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = nationalDefenseEdit?.id
            ? "TOAST.EDIT.NATIONAL_DEFENSE.SUCCESS"
            : "TOAST.ADD.NATIONAL_DEFENSE.SUCCESS";
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
    handleCloseNationalDefenseDialog();
  };


  const formik = useFormik({
    initialValues: nationalDefenseEdit?.id ? convertDataNationalDefense(nationalDefenseEdit) : INIT_NATIONAL_DEFENSE_INFO,
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
      onHide={handleCloseNationalDefenseDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(`${nationalDefenseEdit
              ? "INFO.NATIONAL_DEFENSE.ADD"
              : "INFO.NATIONAL_DEFENSE.UPDATE"
              }`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.NATIONAL_DEFENSE.TRAINING_TIME")}
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
                lable={useCustomIntl("INPUT.NATIONAL_DEFENSE.TRAINING_FACILITIES")}
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
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.NATIONAL_DEFENSE.CERTIFICATE")}
                isRequired
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
                label="INPUT.NATIONAL_DEFENSE.ATTACHMENTS"
                setValue={handleFile}
                fileValue={{
                  id: formik.values.fileId || "",
                  name: formik.values.fileName || ""}}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={8} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.NATIONAL_DEFENSE.NOTE")}
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
              onClick={() => handleCloseNationalDefenseDialog()}
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
