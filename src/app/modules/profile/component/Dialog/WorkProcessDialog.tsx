import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import UploadFile from "../../../component/FileUpload/UploadFile";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import TextValidator from "../../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../../constant";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { getAllSimpleValue, searchAllSimpleValue } from "../../../services";
import "../../../styles/index.scss";
import { searchListWorkUnit, } from "../../../utils/CategoryServices";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { handleBlurDate, useCustomIntl } from "../../../utils/FunctionUtils";
import { LIST_STATUS_NV } from "../../const/DialogChildConstants";
import { TYPE_OF, natureOfWork } from "../../const/DialogConstant";
import { INIT_WORKING_PROCESS } from "../../const/ProfileConst";
import { IFile } from "../../models/DialogModels";
import { IWorkingProcessInfoOutput } from "../../models/ProfileModels";
import { addQuaTrinhCongTac, searchPhongBan_DonVi, updateQuaTrinhCongTac, } from "../../services/DialogServices";
interface Props {
  handleCloseWorkProcessDialog: () => void;
  identify: string;
  isView: boolean;
  workProcessEdit: IWorkingProcessInfoOutput;
}
export const WorkProcessDialog = (props: Props) => {
  const intl = useIntl();
  const { handleCloseWorkProcessDialog, identify, workProcessEdit, isView } = props;

  const [isCheckDonViCongTac, setIsCheckDonViCongTac] = useState<boolean>(workProcessEdit?.donViCongTacKhac ? true : false);

  useEffect(()=>{
    formik.setValues(workProcessEdit)
  },[workProcessEdit])

  const handleSubmit = async (values: IWorkingProcessInfoOutput) => {
    const data = {
      ...values,
      employeeId: identify,
      donViCongTacId: values.donViCongTac?.id,
      donViCongTacText: values.donViCongTac?.name || values.donViCongTac?.value,
      phongBanId: values.phongBan?.id,
      phongBanText: values.phongBan?.name || values.phongBan?.value,
      viTriCongViecId: values.viTriCongViec?.id,
      viTriCongViecText: values.viTriCongViec?.name || values.viTriCongViec?.value,
      chucDanhId: values.chucDanh?.id,
      chucDanhText: values.chucDanh?.name || values.chucDanh?.value
    };

    if (typeof identify === TYPE_OF.STRING && identify !== "") {
      try {
        const res = workProcessEdit?.id
          ? await updateQuaTrinhCongTac(workProcessEdit?.id, { ...data, id: workProcessEdit?.id})
          : await addQuaTrinhCongTac(data);

        handleApiResponse(res);
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
  };

  const handleApiResponse = (res: any) => {
    if (res?.data?.code === SUCCESS_CODE) {
      const message = workProcessEdit?.id
        ? "TOAST.EDIT.SUCCESS"
        : "TOAST.ADD.SUCCESS";
      toast.success(intl.formatMessage({ id: message }));
      handleCloseWorkProcessDialog();
    } else {
      toast.error(`${res?.data?.message}`);
    }
  };

  const validationSchema = Yup.object().shape({
    // tuNgay: Yup.date()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .concat(checkInvalidDate(intl))
    //   .nullable(),
    // denNgay: Yup.date()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .concat(checkInvalidDate(intl))
    //   .nullable(),
    // ngayQuyetDinh: Yup.date()
    //   .concat(checkInvalidDate(intl))
    //   .nullable(),
    // donViCongTac: Yup.object()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
    // tinhChatLaoDong: Yup.object()
    //   .shape({})
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
    // viTriCongViec: Yup.object()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
    // loaiThuTuc: Yup.object()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
    // phongBan: Yup.object()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
  });

  const formik = useFormik({
    initialValues: INIT_WORKING_PROCESS,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    if (name === VARIABLE_STRING.DON_VI_CONG_TAC) {
      formik.setFieldValue(VARIABLE_STRING.DON_VI_CONG_TAC_KHAC, "")
      formik.setFieldValue(VARIABLE_STRING.PHONG_BAN_KHAC, "")
    }

    if (name === VARIABLE_STRING.PHONG_BAN) {
      formik.setFieldValue(VARIABLE_STRING.PHONG_BAN_KHAC, "")
    }

    formik.setFieldValue(name, value)
  }

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    formik.setFieldValue(name, checked);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, nameObj: string) => {
    const { name, value } = event.target;

    if (name === VARIABLE_STRING.DON_VI_CONG_TAC_KHAC) {
      formik.setFieldValue(VARIABLE_STRING.DON_VI_CONG_TAC, null)
      formik.setFieldValue(VARIABLE_STRING.PHONG_BAN, null)
      formik.setFieldValue(name, value)
      return;
    }

    formik.setFieldValue(nameObj, null)
    formik.setFieldValue(name, value)
  }

  const handleUploadFile = (data: IFile) => {
    formik.setFieldValue("fileId", data.id);
    formik.setFieldValue("fileName", data.name);
  }

  return (
    <Modal
      show={true}
      size="xl"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleCloseWorkProcessDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl("INPUT.WORKPROCESS.TITLE")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className=" pt-2">
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.WORKPROCESS.KIND")}
                isReadOnly={isView}
                isRequired
                options={[]}
                value={formik.values?.loaiThuTuc || null}
                name="loaiThuTuc"
                onChange={(selectedOption) =>
                  handleChangeSelect("loaiThuTuc", selectedOption)
                }
                searchFunction={searchAllSimpleValue}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, type: TYPE_CATEGORY.loaiThuTuc }}
                errors={formik.errors?.loaiThuTuc}
                touched={formik.touched?.loaiThuTuc}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={intl.formatMessage({
                  id: "INPUT.WORKPROCESS.WORKING_TIME"
                })}
                isRequired
                startDateName="tuNgay"
                endDateName="denNgay"
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
                isRequired
                lable={useCustomIntl("GENERAL.CURRENT_ORGANIZATION")}
                formCheckBox={true}
                isCheckBox={isCheckDonViCongTac}
                setIsCheckBox={setIsCheckDonViCongTac}
                name={isCheckDonViCongTac ? VARIABLE_STRING.DON_VI_CONG_TAC_KHAC : VARIABLE_STRING.DON_VI_CONG_TAC}
                value={isCheckDonViCongTac ? formik.values?.donViCongTacKhac : formik.values?.donViCongTac}
                onChange={(selectedOption) => isCheckDonViCongTac ? handleChange(selectedOption, VARIABLE_STRING.DON_VI_CONG_TAC) :
                  handleChangeSelect(
                    VARIABLE_STRING.DON_VI_CONG_TAC,
                    selectedOption
                  )
                }
                options={[]}
                searchFunction={searchListWorkUnit}
                searchObject={SEARCH_OBJECT_MAX_SIZE}
                errors={formik.errors?.donViCongTac}
                touched={formik.touched?.donViCongTac}
              />
            </Col>
          </Row>
          <Row className="pt-6">
            <Col xs={4}>
              <Autocomplete
                isRequired
                lable={intl.formatMessage({ id: "INPUT.DEPARTMENTS" })}
                isReadOnly={isView}
                options={[]}
                isCheckBox={isCheckDonViCongTac}
                setIsCheckBox={setIsCheckDonViCongTac}
                name={isCheckDonViCongTac ? VARIABLE_STRING.PHONG_BAN_KHAC : VARIABLE_STRING.PHONG_BAN}
                value={isCheckDonViCongTac ? formik.values?.phongBanKhac : formik.values?.phongBan}
                onChange={(selectedOption) => isCheckDonViCongTac ? handleChange(selectedOption, VARIABLE_STRING.PHONG_BAN) :
                  handleChangeSelect(
                    VARIABLE_STRING.PHONG_BAN,
                    selectedOption
                  )
                }
                urlData="data.data"
                searchFunction={searchPhongBan_DonVi}
                searchObject={{ id: formik.values?.donViCongTac?.id }}
                touched={formik.touched?.phongBan}
                errors={formik.errors?.phongBan}
                dependencies={[formik.values?.donViCongTac]}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                isRequired
                lable={useCustomIntl("INPUT_APPOINTMENT_JOB_POSITION")}
                options={[]}
                value={formik.values?.viTriCongViec || null}
                name="viTriCongViec"
                onChange={(selectedOption) =>
                  handleChangeSelect("viTriCongViec", selectedOption)
                }
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.chucDanh
                }}
                errors={formik.errors?.viTriCongViec}
                touched={formik.touched?.viTriCongViec}
                getOptionLabel={(option) => option?.value || option?.name}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={intl.formatMessage({ id: "INPUT.WORKPROCESS.JOB_TITLE" })}
                name="chucVu"
                value={formik.values?.chucDanh || ""}
                searchFunction={getAllSimpleValue}
                searchObject={TYPE_CATEGORY.viTriCongViec}
                isReadOnly={isView}
                onChange={(selectedOption) =>
                  handleChangeSelect(VARIABLE_STRING.CHUC_DANH, selectedOption)
                }
                options={[]}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
          </Row>
          <Row className="pt-6">
            <Col xs={4}>
              <Autocomplete
                // isRequired
                lable={useCustomIntl("INPUT.WORKPROCESS.NATURE")}
                isReadOnly={isView}
                options={natureOfWork}
                value={formik.values?.tinhChatLaoDong || null}
                name="tinhChatLaoDong"
                onChange={(selectedOption) =>
                  handleChangeSelect("tinhChatLaoDong", selectedOption)
                }
                errors={formik.errors?.tinhChatLaoDong}
                touched={formik.touched?.tinhChatLaoDong}
              />
            </Col>
            <Col xs={4}>
              <Autocomplete
                lable={useCustomIntl("INPUT.WORKPROCESS.STATUS")}
                isReadOnly={isView}
                options={LIST_STATUS_NV}
                value={formik.values?.trangThaiLaoDong || null}
                name="trangThaiLaoDong"
                onChange={(selectedOption) =>
                  handleChangeSelect("trangThaiLaoDong", selectedOption)
                }
              />
            </Col>
          </Row>
          <Row className="pt-6">
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKPROCESS.DECISION.DATE")}
                name="ngayQuyetDinh"
                value={formik.values?.ngayQuyetDinh || ""}
                type="date"
                readOnly={isView}
                onChange={formik.handleChange}
                onBlur={() =>
                  handleBlurDate(
                    formik.setFieldValue,
                    formik.values?.ngayQuyetDinh,
                    "ngayQuyetDinh"
                  )
                }
                errors={formik.errors?.ngayQuyetDinh}
                touched={formik.touched?.ngayQuyetDinh}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={useCustomIntl("INPUT.WORKPROCESS.DECISION.NUMBER")}
                name="soQuyetDinh"
                value={formik.values?.soQuyetDinh || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
            <Col xs={4}>
              <UploadFile
                  isReadOnly={isView}
                  label="CONTRACT.ATTACHMENTS"
                  setValue={handleUploadFile}
                  fileValue={{
                    id: formik.values.fileId || "",
                    name: formik.values.fileName || ""
                  }}
                  allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
                  errors={formik?.errors?.fileName}
                />
            </Col>
          </Row>
          <Row className="pt-6">
            <Col xs={12}>
              <TextValidator
                lable={useCustomIntl("INPUT.FAMILY.NOTE")}
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
              onClick={() => handleCloseWorkProcessDialog()}
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
