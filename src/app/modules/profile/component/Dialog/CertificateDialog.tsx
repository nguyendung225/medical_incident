/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { ChangeEvent, useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import TextValidator from "../../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../../constant";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { searchAllSimpleValue } from "../../../services";
import "../../../styles/index.scss";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { handleBlurDate, useCustomIntl } from "../../../utils/FunctionUtils";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import { INIT_CRETIFICAFE_INFO } from "../../const/ProfileConst";
import { CertificateInfo, IFile } from "../../models/DialogModels";
import { addChungChi, updateChungChi } from "../../services/DialogServices";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { TRAINING_TYPE } from "../../const/DialogChildConstants";
import UploadFile from "../../../component/FileUpload/UploadFile";
import AppContext from "../../../../AppContext";

interface Props {
  handleCloseCertificateDialog: () => void;
  identify: string;
  isView: boolean;
  certificateEdit: CertificateInfo;
  updateData: () => Promise<void>;
}
export const CertificateDialog = (props: Props) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const { handleCloseCertificateDialog, identify, certificateEdit, isView, updateData } = props;
  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(certificateEdit?.coSoDaoTaoKhac ? true : false);

  const validationSchema = Yup.object().shape({
    tenChungChi: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
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
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
      thoiGianHieuLucDenNgay: Yup.date().concat(checkInvalidDate(intl)).nullable(),
    soCCHN: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    chuyenNganh: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    ngayCap: Yup.date()
      .when("thoiGianHieuLucTuNgay", {
        is: (thoiGianHieuLucTuNgay: Date | null) => thoiGianHieuLucTuNgay && thoiGianHieuLucTuNgay < (new Date()),
        then: Yup.date()
        .max(
          Yup.ref("thoiGianHieuLucTuNgay"),
          lang("VALIDATION.MAXDATE") +
          lang("INPUT.CERTIFICATE.EFFECTIVE_TIME_START")
          )
          .nullable()
      })
      .max(new Date(), lang("VALIDATION.INVALID_ISSUEDATE"))
      .nullable(),
  });

  const convertDataCertificate = (data: CertificateInfo) => {
    return {
      ...data,
      coSoDaoTao: {
        id: data?.coSoDaoTaoId,
        value: data?.coSoDaoTaoText
      }
    }
  }

  const handleFormSubmit = async (values: CertificateInfo) => {
    if (identify) {
      let _values = {
        ...values,
        employeeId: identify,
        coSoDaoTaoId: values?.coSoDaoTao?.id,
        coSoDaoTaoText: values?.coSoDaoTao?.value,
        type: TRAINING_TYPE.CHUNG_CHI_HANH_NGHE
      }
      try {
        setPageLoading(true);
        const res = certificateEdit?.id
          ? await updateChungChi(certificateEdit?.id, _values)
          : await addChungChi(_values);
        if (res?.data?.code === SUCCESS_CODE) {
          const message = certificateEdit?.id
            ? "TOAST.EDIT.CERTIFICATE.SUCCESS"
            : "TOAST.ADD.CERTIFICATE.SUCCESS";
          toast.success(intl.formatMessage({ id: message }));
          setPageLoading(false);
        } else {
          toast.error(`${res?.data?.message}`);
          setPageLoading(false);
        }
      } catch (error) {
        setPageLoading(false);
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
    await updateData();
    handleCloseCertificateDialog();
  };


  const formik = useFormik({
    initialValues: certificateEdit?.id ? convertDataCertificate(certificateEdit) : INIT_CRETIFICAFE_INFO,
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
      onHide={handleCloseCertificateDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl(
              `${certificateEdit
                ? "INFO.CERTIFICATE.ADD"
                : "INFO.CERTIFICATE.UPDATE"
              }`
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="px-8 ">
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.CERTIFICATE")}
                name="tenChungChi"
                value={formik.values?.tenChungChi || ""}
                type="text"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.tenChungChi}
                errors={formik.errors?.tenChungChi}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INFO.CERTIFICATE.NUMBER")}
                name="soCCHN"
                value={formik.values?.soCCHN || ""}
                type="text"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.soCCHN}
                errors={formik.errors?.soCCHN}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={useCustomIntl("INPUT.CERTIFICATE.EFFECTIVE_TIME")}
                isRequired
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
                lable={useCustomIntl("INFO.CERTIFICATE.SPECIALIZED_TRAINING")}
                name="chuyenNganh"
                value={formik.values?.chuyenNganh || ""}
                type="text"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.chuyenNganh}
                errors={formik.errors?.chuyenNganh}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <Autocomplete
                lable={useCustomIntl("INPUT.CERTIFICATE.TRAINING_FACILITIES")}
                isReadOnly={isView}
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
                errors={formik.errors?.coSoDaoTao}
                touched={formik.touched?.coSoDaoTao}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INFO.CERTIFICATE.PROFESSIONAL_DIPLOMA")}
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
                lable={useCustomIntl("INPUT.CERTIFICATE.DATE.PROVIDE")}
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
                lable={useCustomIntl("INPUT.CERTIFICATE.PLACE")}
                name="noiCap"
                value={formik.values?.noiCap || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.noiCap}
                errors={formik.errors?.noiCap}
              />
            </Col>
            <Col xs={4} className="pt-6">
              <UploadFile
                label="CONTRACT.ATTACHMENTS"
                setValue={handleFile}
                fileValue={{
                  id: formik.values.fileId || "",
                  name: formik.values.fileName || ""}}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={6} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.CERTIFICATE.RANGE_DESCRIPTION")}
                name="moTa"
                value={formik.values?.moTa || ""}
                type="text"
                as="textarea"
                rows="3"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.moTa}
                errors={formik.errors?.moTa}
              />
            </Col>
            <Col xs={6} className="pt-6">
              <TextValidator
                lable={useCustomIntl("INPUT.CERTIFICATE.NOTE")}
                name="note"
                value={formik.values?.note || ""}
                type="text"
                as="textarea"
                rows="3"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.note}
                errors={formik.errors?.note}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!isView && (
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleCloseCertificateDialog()}
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
