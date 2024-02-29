import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import "../../../styles/index.scss";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleBlurDate, useCustomIntl } from "../../../utils/FunctionUtils";
import { addKiemNhiem, updateKiemNhiem } from "../../services/DialogServices";
import { toast } from "react-toastify";
import { IConcurrentlyOutput, IConcurrentlyOutputDto } from "../../models/ProfileModels";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { searchListWorkUnit } from "../../../utils/CategoryServices";
import { TYPE_CATEGORY } from "../../../constant";
import { TYPE_OF } from "../../const/DialogConstant";
import { INIT_CONCURENTLY } from "../../const/ProfileConst";
import TextValidator from "../../../component/input-field/TextValidator";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { searchAllSimpleValue } from "../../../services";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE } from "../../../utils/Constant";
import { convertDataInfoDto } from "../../utils/FunctionUtils";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
interface Props {
  handleCloseConcurrentlyDialog: () => void;
  identify: string;
  isView: boolean;
  concurrentlyEdit: IConcurrentlyOutput;
}
export const ConcurrentlyDialog = (props: Props) => {
  const intl = useIntl();
  const { handleCloseConcurrentlyDialog, identify, concurrentlyEdit, isView } = props;

  useEffect(() => {
    formik.setValues(concurrentlyEdit)
  }, [concurrentlyEdit])

  const handleSubmit = async (values: IConcurrentlyOutput) => {
    if (typeof identify === TYPE_OF.STRING && identify) {
      try {
        const dataConcurrently: IConcurrentlyOutputDto = convertDataInfoDto({...values, employeeId: identify, id: concurrentlyEdit?.id})
        const res = concurrentlyEdit?.id
          ? await updateKiemNhiem(concurrentlyEdit?.id, dataConcurrently)
          : await addKiemNhiem(dataConcurrently);

        if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
          const message = concurrentlyEdit?.id
            ? "TOAST.EDIT.CONTRACT.SUCCESS"
            : "TOAST.ADD.CONTRACT.SUCCESS";
          toast.success(intl.formatMessage({ id: message }));
          handleCloseConcurrentlyDialog();
        } else {
          toast.error(`${res?.data?.message}`);
        }
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
  };

  const validationSchema = Yup.object().shape({
    tuNgay: Yup.date()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .concat(checkInvalidDate(intl))
      .max(Yup.ref('denNgay'), intl.formatMessage({ id: "VALIDATION.MAXDATE" }) + intl.formatMessage({ id: "INPUT.WORKEXPERIENCE.DATE.END" }),)
      .nullable(),
    denNgay: Yup.date()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .concat(checkInvalidDate(intl))
      .min(Yup.ref('tuNgay'), intl.formatMessage({ id: "VALIDATION.MINDATE" }) + intl.formatMessage({ id: "INPUT.WORKEXPERIENCE.DATE.START" }))
  });

  const formik = useFormik({
    initialValues: INIT_CONCURENTLY,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value)
  }
  
  return (

    <Modal
      show={true}
      size="lg"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleCloseConcurrentlyDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" className="heading-5">
            {intl.formatMessage({ id: "GENERAL.INFO.CONCURRENTLY" })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="px-8 pt-2">
            <Col xs={6}>
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
            <Col xs={6}>
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
          </Row>
          <Row className="px-8  pt-6">
            <Col xs={6}>
              <Autocomplete
                lable={useCustomIntl("APPOINTMENT.JOBPOSITION")}
                options={[]}
                value={formik.values?.viTriCongViec || null}
                name="viTriCongViec"
                onChange={(selectedOption) => handleChangeSelect("viTriCongViec", selectedOption)}
                searchFunction={searchAllSimpleValue}
                getOptionLabel={(option) => option?.value}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, type: TYPE_CATEGORY.viTriCongViec }}
              />
            </Col>
            <Col xs={6}>
              <Autocomplete
                lable={useCustomIntl("GENERAL.CURRENT_ORGANIZATION")}
                options={[]}
                value={formik.values?.donViCongTac || null}
                name="donViCongTac"
                onChange={(selectedOption) => handleChangeSelect("donViCongTac", selectedOption)}
                searchFunction={searchListWorkUnit}
                searchObject={SEARCH_OBJECT_MAX_SIZE}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!isView &&
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleCloseConcurrentlyDialog()}
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
