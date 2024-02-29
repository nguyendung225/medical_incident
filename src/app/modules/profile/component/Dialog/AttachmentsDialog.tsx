import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addTaiLieuDinhKem, updateTaiLieuDinhKem } from "../../services/DialogServices";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUpload from "../../../component/FileUpload/FileUpload";
import { TYPE_OF } from "../../const/DialogConstant";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import TextValidator from "../../../component/input-field/TextValidator";
import { INIT_TAI_LIEU_DINH_KEM } from "../../const/ProfileConst";
import { ITaiLieuDinhKemInfo } from "../../models/ProfileModels";
import { RESPONSE_STATUS_CODE } from "../../../utils/Constant";
import { useEffect } from "react";
import useMultiLanguage from "../../../../hook/useMultiLanguage";

type Props = {
  handleCloseAttachmentsDialog: () => void;
  identify: string;
  isView?: boolean;
  attachmentEdit: ITaiLieuDinhKemInfo;
};

const AttachmentsDialog = (props: Props) => {
  const { lang } = useMultiLanguage();
  const { handleCloseAttachmentsDialog, identify, attachmentEdit, isView } = props;

  useEffect(() => {
    console.log(attachmentEdit)
    formik.setValues(attachmentEdit)
  }, [attachmentEdit])

  const handleSubmit = async (values: ITaiLieuDinhKemInfo) => {
    const data = { ...values, employeeId: identify, id: attachmentEdit?.id };
    if (typeof identify === TYPE_OF.STRING && identify) {
      try {
        const res = attachmentEdit?.id
          ? await updateTaiLieuDinhKem(attachmentEdit?.id, data)
          : await addTaiLieuDinhKem(data);
        handleApiResponse(res);
      } catch (error) {
        toast.error(lang("GENERAL.ERROR"));
      }
    } else {
      toast.warning(lang("MESSAGE.BASIC.FIRST"));
    }
  };

  const handleApiResponse = (res: any) => {
    if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      const message = attachmentEdit?.id
        ? "TOAST.EDIT.SUCCESS"
        : "TOAST.ADD.SUCCESS";
      toast.success(lang(message));
      handleCloseAttachmentsDialog();
    } else {
      toast.error(`${res?.data?.message}`);
    }
  };

  const validationSchema = Yup.object().shape({
    fileName: Yup.string()
      .required(lang("VALIDATION.REQUIRE"))
      .nullable(),
    fileId: Yup.string()
      .required(lang("VALIDATION.REQUIRE"))
      .nullable(),
  });

  const formik = useFormik({
    initialValues: INIT_TAI_LIEU_DINH_KEM,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <Modal
      show={true}
      size="lg"
      onHide={handleCloseAttachmentsDialog}
      centered
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {lang("GENERAL.INFO.ATTACHMENTS")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="spaces px-8">
            <Col xs={6}>
              <TextValidator
                lable={lang("GENERAL.INFO.ATTACHMENTS.NAME")}
                name="fileName"
                value={formik.values?.fileName || ""}
                type="text"
                isRequired
                onChange={formik.handleChange}
                errors={formik.errors?.fileName}
                touched={formik.touched?.fileName}
              />
            </Col>
            <Col xs={6}>
              <FileUpload
                required
                label="CONTRACT.ATTACHMENTS"
                setFieldValue={(data: string) => {
                  formik.setFieldValue("fileId", data);
                }}
                fileName={formik.values?.fileId}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX},${FILE_TYPE.JPG},${FILE_TYPE.JPEG},${FILE_TYPE.PNG},${FILE_TYPE.TXT}`}
                errors={formik.errors?.fileId}
              />
            </Col>
          </Row>
          <Row className="spaces px-8 pt-8">
            <Col xs={6}>
              <Form.Check
                className="custom-form-check"
                label={lang("GENERAL.INFO.ATTACHMENTS.ALLOW")}
                name="choPhepTaiVe"
                checked={formik.values?.choPhepTaiVe}
                onChange={handleChangeCheckBox}
              />
            </Col>
            <Col xs={6}>
              <TextValidator
                lable={lang("ALLOWANCE.NOTE")}
                name="ghiChu"
                value={formik.values?.ghiChu || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!isView && (
          <Modal.Footer className="flex-center">
            <Button variant="outline-secondary" className="button-secondary btn-sm" onClick={() => handleCloseAttachmentsDialog()}>
              {lang("BTN.CANCEL")}
            </Button>
            <Button variant="primary" className="button-primary btn-sm" type="submit">
              {lang("BTN.SAVE")}
            </Button>
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
};

export default AttachmentsDialog;
