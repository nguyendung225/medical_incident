/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import TextValidator from "../../../component/input-field/TextValidator";
import "../../../styles/index.scss";
import { INIT_STATE_MANAGEMENT_INFO } from "../../const/DialogConstant";
import { IFile, IStateManagementInfo } from "../../models/DialogModels";
import { useCustomIntl } from "../../../utils/FunctionUtils";
import { TRAINING_TYPE, politicalTheoryTrainingForms } from "../../const/DialogChildConstants";
import { getAllCountry, searchAllSimpleValue } from "../../../services";
import { TYPE_CATEGORY } from "../../../constant";
import { COUNTRY, SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { addStateManagement, updateStateManagement } from "../../services/DialogServices";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import UploadFile from "../../../component/FileUpload/UploadFile";
import AppContext from "../../../../AppContext";

interface IProps {
  handleCloseStateManagementDialog: () => void;
  identify: string;
  isView: boolean;
  stateManagementEdit: IStateManagementInfo;
  updateData: () => Promise<void>;
}
export const StateManagementDialog: React.FC<IProps> = ({ handleCloseStateManagementDialog, identify, stateManagementEdit, isView, updateData }) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(stateManagementEdit?.coSoDaoTaoKhac ? true : false);
  const [isCheckNuocDaoTao, setIsCheckNuocDaoTao] = useState<boolean>(stateManagementEdit?.nuocDaoTaoKhac ? true : false);
  const [countryList, setCountryList] = useState<any>([]);

  let validationSchema = Yup.object({
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
    trinhDoQuanLy: Yup.object()
      .shape({})
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable()
  });

  const convertDataStateManagement = (data: IStateManagementInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      },
      nuocDaoTao: {
        id: data?.nuocDaoTaoId,
        name: data?.nuocDaoTaoText
      },
      trinhDoQuanLy: {
        id: data?.trinhDoId,
        value: data?.trinhDoText
      }
    }
  }

  const handleFormSubmit = async (values: IStateManagementInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values.coSoDaoTao?.id,
        coSoDaoTaoText: values.coSoDaoTao?.value,
        nuocDaoTaoId: values.nuocDaoTaoKhac ? "" : values.nuocDaoTao?.id,
        nuocDaoTaoText: values.nuocDaoTaoKhac ? "" : values.nuocDaoTao?.name,
        trinhDoId: values.trinhDoQuanLy?.id,
        trinhDoText: values.trinhDoQuanLy?.value,
        type: TRAINING_TYPE.QUAN_LY_NHA_NUOC
      }
      try {
        setPageLoading(true);
        const res = stateManagementEdit?.id
          ? await updateStateManagement(stateManagementEdit?.id, { ..._values })
          : await addStateManagement({ ..._values });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = stateManagementEdit?.id
            ? "TOAST.EDIT.STATE_MGMT.SUCCESS"
            : "TOAST.ADD.STATE_MGMT.SUCCESS";
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
    handleCloseStateManagementDialog();
  };

  useEffect(() => {
    async function fetchAllCountry() {
      try {
        let { data } = await getAllCountry();
        if (data?.code === SUCCESS_CODE && !isCheckNuocDaoTao) {
          setCountryList(data?.data)
          let defaultCountry = data?.data?.find((country: any) => country?.code === COUNTRY.CODE.VIET_NAM);
          if (!formik.values?.nuocDaoTao?.id) {
            formik.setFieldValue(VARIABLE_STRING.NUOC_DAO_TAO, defaultCountry);
            formik.setFieldValue(VARIABLE_STRING.NUOC_DAO_TAO_KHAC, "");
          }
        }
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    }
    fetchAllCountry();
  }, [isCheckNuocDaoTao])


  const formik = useFormik({
    initialValues: stateManagementEdit?.id ? convertDataStateManagement(stateManagementEdit) : INIT_STATE_MANAGEMENT_INFO,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    if (name === VARIABLE_STRING.CO_SO_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.CO_SO_DAO_TAO_KHAC, null)
    }
    if (name === VARIABLE_STRING.NUOC_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.NUOC_DAO_TAO_KHAC, null)
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
      onHide={handleCloseStateManagementDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(`${stateManagementEdit
              ? "INFO.STATE_MANAGEMENT.ADD"
              : "INFO.STATE_MANAGEMENT.UPDATE"
              }`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.STATE_MANAGEMENT.TRAINING_TIME")}
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
                lable={useCustomIntl("INPUT.STATE_MANAGEMENT.TRAINING_LEVEL")}
                isReadOnly={isView}
                options={[]}
                isRequired
                value={formik.values?.trinhDoQuanLy}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.trinhDoQuanLyNhaNuoc
                }}
                name="trinhDoQuanLy"
                onChange={(selectedOption) =>
                  handleChangeSelect("trinhDoQuanLy", selectedOption)
                }
                errors={formik.errors?.trinhDoQuanLy}
                touched={formik.touched?.trinhDoQuanLy}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.STATE_MANAGEMENT.TRAINING_FORM")}
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
                lable={useCustomIntl("INPUT.STATE_MANAGEMENT.TRAINING_FACILITIES")}
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
              <TextValidator
                lable={useCustomIntl("INPUT.STATE_MANAGEMENT.CERTIFICATE")}
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
                lable={useCustomIntl("INPUT.QUALIFICATION.TRAINING_COUNTRY")}
                isReadOnly={isView}
                formCheckBox={true}
                value={isCheckNuocDaoTao ? formik.values?.nuocDaoTaoKhac : formik.values?.nuocDaoTao}
                name={isCheckNuocDaoTao ? VARIABLE_STRING.NUOC_DAO_TAO_KHAC : VARIABLE_STRING.NUOC_DAO_TAO}
                setIsCheckBox={setIsCheckNuocDaoTao}
                isCheckBox={isCheckNuocDaoTao}
                onChange={(selectedOption) => isCheckNuocDaoTao ? handleChange(selectedOption, VARIABLE_STRING.NUOC_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.NUOC_DAO_TAO, selectedOption)}
                options={countryList}
                errors={formik.errors?.nuocDaoTao}
                touched={formik.touched?.nuocDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <UploadFile
                label="INPUT.STATE_MANAGEMENT.ATTACHMENTS"
                setValue={handleFile}
                fileValue={{
                  id: formik.values.fileId || "",
                  name: formik.values.fileName || ""}}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={8} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.STATE_MANAGEMENT.NOTE")}
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
              onClick={() => handleCloseStateManagementDialog()}
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
