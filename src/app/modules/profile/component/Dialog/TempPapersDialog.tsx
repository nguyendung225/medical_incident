import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useIntl } from "react-intl";
import { tempPapers as loaiGiayTo } from "../../const/DialogChildConstants";
import { handleBlurDate, useCustomIntl } from "../../../utils/FunctionUtils";
import { addGiayToDinhKem, updateGiayToDinhKem } from "../../services/DialogServices";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';
import FileUpload from "../../../component/FileUpload/FileUpload";
import { TYPE_OF } from "../../const/DialogConstant";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import { IGiayToDinhKemInfo } from "../../models/ProfileModels";
import { INIT_GIAY_TO_DINH_KEM } from "../../const/ProfileConst";
import Autocomplete from "../../../component/input-field/Autocomplete";
import TextValidator from "../../../component/input-field/TextValidator";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import { RESPONSE_STATUS_CODE } from "../../../utils/Constant";

type Props = {
  handleCloseTempPapersDialog: () => void;
  identify: string;
  isView: boolean;
  tempPapersEdit: IGiayToDinhKemInfo;
};
const TempPapersDialog = (props: Props) => {
  const intl = useIntl();
  const { handleCloseTempPapersDialog, identify, tempPapersEdit, isView } = props;

  useEffect(() => {
    formik.setValues({ ...tempPapersEdit, employeeId: identify });
  }, [tempPapersEdit]);

  const validationSchema = Yup.object().shape({
    tenGiayTo: Yup.object().shape({})
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    ngayCap: Yup.date()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .concat(checkInvalidDate(intl))
      .max(Yup.ref('ngayHetHan'), intl.formatMessage({ id: "VALIDATION.MAXDATE" }) + intl.formatMessage({ id: "INPUT.EXPIRATIONDATE" }))
      .nullable(),
    ngayHetHan: Yup.date()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .concat(checkInvalidDate(intl))
      .min(Yup.ref('ngayCap'), intl.formatMessage({ id: "VALIDATION.MINDATE" }) + intl.formatMessage({ id: "INPUT.DATERANGE" }))
      .nullable(),
  });

  const handleSubmit = async (values: IGiayToDinhKemInfo) => {
    const data = { ...values, employeeId: identify, id: tempPapersEdit?.id };
    if (typeof identify === TYPE_OF.STRING && identify !== "") {
      try {
        const res = tempPapersEdit?.id
          ? await updateGiayToDinhKem(tempPapersEdit?.id, data)
          : await addGiayToDinhKem(data);
        handleApiResponse(res);
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
  };

  const handleApiResponse = (res: any) => {
    if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      const message = tempPapersEdit?.id
        ? "TOAST.EDIT.SUCCESS"
        : "TOAST.ADD.SUCCESS";
      toast.success(intl.formatMessage({ id: message }));
      handleCloseTempPapersDialog();
    } else {
      toast.error(`${res?.data?.message}`);
    }
  };

  const formik = useFormik({
    initialValues: INIT_GIAY_TO_DINH_KEM,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value)
  }

  return (
    <Modal
      show={true}
      size="xl"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleCloseTempPapersDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {intl.formatMessage({ id: "GENERAL.INFO.TEMP.PAPERS" })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="px-8 pt-2">
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("GENERAL.INFO.TEMP.PAPERS.NAME")}
                options={loaiGiayTo}
                value={formik.values?.tenGiayTo || null}
                name="tenGiayTo"
                isReadOnly={isView}
                onChange={(selectedOption) => handleChangeSelect("tenGiayTo", selectedOption)}
                errors={formik.errors?.tenGiayTo}
                touched={formik.touched?.tenGiayTo}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.DATERANGE")}
                name="ngayCap"
                value={formik.values?.ngayCap || ""}
                type="date"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayCap, "ngayCap")}
                errors={formik.errors?.ngayCap}
                touched={formik.touched?.ngayCap}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.EXPIRATIONDATE")}
                name="ngayHetHan"
                value={formik.values?.ngayHetHan || ""}
                type="date"
                isRequired
                readOnly={isView}
                onChange={formik.handleChange}
                onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayHetHan, "ngayHetHan")}
                errors={formik.errors?.ngayHetHan}
                touched={formik.touched?.ngayHetHan}
              />
            </Col>
          </Row>
          <Row className="px-8 pt-6">
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.PLACERANGE")}
                name="noiCap"
                value={formik.values?.noiCap || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKEXPERIENCE.NOTE")}
                name="ghiChu"
                value={formik.values?.ghiChu || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
            <Col xs={4}>
              <FileUpload
                label="CONTRACT.ATTACHMENTS"
                setFieldValue={(data: string) => {
                  formik.setFieldValue("attachment", data);
                }}
                fileName={formik.values.attachment}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!isView && (
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleCloseTempPapersDialog()}
            >
              {intl.formatMessage({ id: "BTN.CANCEL" })}
            </Button>
            <Button variant="primary" className="button-primary btn-sm" type="submit">
              {intl.formatMessage({ id: "BTN.SAVE" })}
            </Button>
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
};

export default TempPapersDialog;
