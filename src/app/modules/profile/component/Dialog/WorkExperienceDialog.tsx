/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppContext from "../../../../AppContext";
import TextValidator from "../../../component/input-field/TextValidator";
import { regex } from "../../../constant";
import "../../../styles/index.scss";
import { RESPONSE_STATUS_CODE } from "../../../utils/Constant";
import { handleBlurDate, useCustomIntl } from "../../../utils/FunctionUtils";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import { TYPE_OF } from "../../const/DialogConstant";
import { INIT_WORK_EXPERIENCE } from "../../const/ProfileConst";
import { IWorkExperienceOutput } from "../../models/ProfileModels";
import { addKinhNghiem, updateKinhNghiem } from "../../services/DialogServices";
interface Props {
  handleCloseWorkExperienceDialog: () => void;
  identify: string;
  isView: boolean;
  workExpEdit: IWorkExperienceOutput;
}
export const WorkExperienceDialog = (props: Props) => {
  const intl = useIntl();
  const { setPageLoading } = useContext(AppContext);

  const { handleCloseWorkExperienceDialog, identify, workExpEdit, isView } = props;

  useEffect(()=>{
    formik.setValues(workExpEdit)
  },[workExpEdit])

  const handleSubmit = async (values: IWorkExperienceOutput) => {
    const data = { ...values, employeeId: identify };
    if (typeof identify === TYPE_OF.STRING && identify) {
      try {
        setPageLoading(true);
        const res = workExpEdit?.id
          ? await updateKinhNghiem(workExpEdit?.id, data)
          : await addKinhNghiem(data);
        handleApiResponse(res)
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
        setPageLoading(false);
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
  };

  const handleApiResponse = (res: any) => {
    if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      const message = workExpEdit?.id
        ? "TOAST.EDIT.SUCCESS"
        : "TOAST.ADD.SUCCESS";
      toast.success(intl.formatMessage({ id: message }));
      handleCloseWorkExperienceDialog();
      setPageLoading(false);
    } else {
      toast.error(`${res?.data?.message}`);
      setPageLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    tuNgay: Yup.date()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .concat(checkInvalidDate(intl))
      .max(Yup.ref('denNgay'),
        intl.formatMessage({ id: "VALIDATION.MAXDATE" }) + intl.formatMessage({ id: "INPUT.WORKEXPERIENCE.DATE.END" })
      )
      .nullable(),
    denNgay: Yup.date()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .concat(checkInvalidDate(intl))
      .min(Yup.ref('tuNgay'),
        intl.formatMessage({ id: "VALIDATION.MINDATE" }) + intl.formatMessage({ id: "INPUT.WORKEXPERIENCE.DATE.START" })
      )
      .nullable(),
    noiLamViec: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    // chucDanh: Yup.string()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
    // viTriCongViec: Yup.string()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
    dienthoai: Yup.string()
      .matches(regex.phone, intl.formatMessage({ id: "VALIDATION.ISPHONE" }))
      .nullable(),
  });

  const formik = useFormik({
    initialValues: INIT_WORK_EXPERIENCE,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <Modal
      show={true}
      size="xl"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleCloseWorkExperienceDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title" className="heading-5">
          {useCustomIntl("INPUT.WORKEXPERIENCE")}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Row className=" pt-2">
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKEXPERIENCE.DATE.START")}
                name="tuNgay"
                value={formik.values?.tuNgay || ""}
                type="date"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.tuNgay, "tuNgay")}
                errors={formik.errors?.tuNgay}
                touched={formik.touched?.tuNgay}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKEXPERIENCE.DATE.END")}
                name="denNgay"
                value={formik.values?.denNgay || ""}
                type="date"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.denNgay, "denNgay")}
                errors={formik.errors?.denNgay}
                touched={formik.touched?.denNgay}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKEXPERIENCE.PLACE")}
                name="noiLamViec"
                value={formik.values?.noiLamViec || ""}
                type="text"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                errors={formik.errors?.noiLamViec}
                touched={formik.touched?.noiLamViec}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("APPOINTMENT.JOBPOSITION")}
                name="viTriCongViec"
                value={formik.values?.viTriCongViec || ""}
                type="text"
                // isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                // errors={formik.errors?.viTriCongViec}
                // touched={formik.touched?.viTriCongViec}
              />
            </Col>
          </Row>
          <Row className=" pt-6">
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("GENERAL.EMPLOYEE.TITLE")}
                name="chucDanh"
                value={formik.values?.chucDanh || ""}
                type="text"
                // isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                // errors={formik.errors?.chucDanh}
                // touched={formik.touched?.chucDanh}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKEXPERIENCE.PEOPLE.LEGIT")}
                name="nguoiDoiChieu"
                value={formik.values?.nguoiDoiChieu || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKEXPERIENCE.PEOPLE.PHONE")}
                name="dienthoai"
                value={formik.values?.dienthoai || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                errors={formik.errors?.dienthoai}
                touched={formik.touched?.dienthoai}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKEXPERIENCE.DESC")}
                name="moTaCongViec"
                value={formik.values?.moTaCongViec || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
          <Row className="pt-6">
            <Col xs={3}>
              <Form.Check
                label={useCustomIntl("INPUT.WORKEXPERIENCE.PEOPLE.CHECK")}
                name="daKiemTra"
                checked={formik.values?.daKiemTra}
                disabled={isView}
                onChange={handleChangeCheckBox}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!isView &&
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleCloseWorkExperienceDialog()}
            >
              {intl.formatMessage({ id: "BTN.CANCEL" })}
            </Button>
            <Button variant="primary" className="button-primary btn-sm" type="submit">
              {intl.formatMessage({ id: "BTN.SAVE" })}
            </Button>
          </Modal.Footer>
        }
      </Form>
    </Modal>

  );
};
