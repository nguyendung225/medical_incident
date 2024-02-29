/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { RESPONSE_STATUS_CODE } from "../../../auth/core/_consts";
import { TYPE_CATEGORY } from "../../../constant";
import { getAllSimpleValue } from "../../../services";
import "../../../styles/index.scss";
import { INIT_VACCINE, listMuiTiem } from "../../const/DialogConstant";
import { VaccineInfo } from "../../models/DialogModels";
import { addTiemChung, updateTiemChung } from "../../services/DialogServices";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import Autocomplete from "../../../component/input-field/Autocomplete";
import TextValidator from "../../../component/input-field/TextValidator";
import { handleBlurDate } from "../../../utils/FunctionUtils";
import AppContext from "../../../../AppContext";
import moment from "moment";
interface Props {
  open: boolean;
  handleClose: () => void;
  handleReload: () => Promise<void>;
  identify: string;
  isView: boolean;
  dataSelect: VaccineInfo;
  lastDate?: string | null;
}
export const VaccinationDialog = (props: Props) => {
  const { open, handleReload, dataSelect, handleClose, identify, isView, lastDate } = props;
  const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  useEffect(() => {
    if (dataSelect?.id) {
      const dataUI = {
        ...dataSelect,
        phongBenh: dataSelect?.phongBenhId
          ? {
            id: dataSelect?.phongBenhId || "",
            value: dataSelect?.phongBenhText || ""
          }
          : null
      };
      formik.setValues(dataUI);
    } else {
      formik.setValues(INIT_VACCINE);
    }
  }, [dataSelect]);

  const handleFormSubmit = async (values: VaccineInfo) => {
    try {
      setPageLoading(true);
      const dataSubmit = {
        ...values,
        phongBenhId: values.phongBenh?.id || "",
        phongBenhText: String(values.phongBenh?.value || ""),
        employeeId: identify
      };
      const res = values?.id ? await updateTiemChung(values?.id, dataSubmit) : await addTiemChung(dataSubmit);
      if (res?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        toast.success(values.id ? lang("TOAST.EDIT.SUCCESS") : lang("TOAST.CREATE.SUCCESS"));
        await handleReload();
        handleClose();
        setPageLoading(false);
      } else {
        toast.error(`${res.data.message}`);
        setPageLoading(false);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  let validationSchema = Yup.object().shape({
    phongBenh: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    muiTiem: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    loaiVacxin: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
  });

  if (lastDate) {
    validationSchema = validationSchema.shape({
      ngayTiem: Yup.date()
        .required(lang("VALIDATION.REQUIRE"))
        .nullable()
        .min(moment(lastDate, "YYYY-MM-DD")
          .add(1, 'days'), lang("VALIDATE.NEXT_VACCINE_AFTER_LAST_VACCINE"))
    });
  } else {
    validationSchema = validationSchema.shape({
      ngayTiem: Yup.date()
        .required(lang("VALIDATION.REQUIRE"))
        .nullable()
    });
  }

  const formik = useFormik({
    initialValues: INIT_VACCINE,
    onSubmit: handleFormSubmit,
    validationSchema
  });

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Modal
      show={open}
      size="xl"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleClose}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {lang("INPUT.VACCINATION")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Row className="px-8">
                <Col xs={4}>
                  <Autocomplete
                    isRequired
                    lable={lang("INPUT.VACCINATION.DISEASES")}
                    name="phongBenh"
                    isReadOnly={isView}
                    value={formik.values?.phongBenh || null}
                    searchFunction={getAllSimpleValue}
                    searchObject={TYPE_CATEGORY.phongBenh}
                    onChange={(value) => handleChangeSelect("phongBenh", value)}
                    errors={formik.errors?.phongBenh}
                    touched={formik.touched?.phongBenh}
                    options={[]}
                    getOptionLabel={(options) => options?.value}
                  />
                </Col>
                <Col xs={4}>
                  <TextValidator
                    name="loVaccine"
                    lable={lang("INPUT.VACCINATION.CONSIGNMENT")}
                    type="text"
                    value={formik.values?.loVaccine || ""}
                    readOnly={isView}
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col xs={4}>
                  <TextValidator
                    isRequired
                    name="loaiVacxin"
                    lable={lang("INPUT.VACCINATION.KIND")}
                    type="text"
                    value={formik.values?.loaiVacxin || ""}
                    readOnly={isView}
                    onChange={formik.handleChange}
                    errors={formik.errors?.loaiVacxin}
                    touched={formik.touched?.loaiVacxin}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <Autocomplete
                    isRequired
                    lable={lang("INPUT.VACCINATION.COUNT")}
                    name="muiTiem"
                    value={formik.values?.muiTiem}
                    isReadOnly={isView}
                    options={listMuiTiem}
                    onChange={(value) => handleChangeSelect("muiTiem", value)}
                    errors={formik.errors?.muiTiem}
                    touched={formik.touched?.muiTiem}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <TextValidator
                    isRequired
                    name="ngayTiem"
                    lable={lang("INPUT.VACCINATION.DATE")}
                    type="date"
                    readOnly={isView}
                    value={formik.values?.ngayTiem || ""}
                    onChange={formik.handleChange}
                    errors={formik.errors?.ngayTiem}
                    touched={formik.touched?.ngayTiem}
                    onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayTiem, "ngayTiem")}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <TextValidator
                    name="diaDiemTiem"
                    lable={lang("INPUT.VACCINATION.PLACE")}
                    type="text"
                    readOnly={isView}
                    value={formik.values?.diaDiemTiem || ""}
                    onChange={formik.handleChange}
                    errors={formik.errors?.diaDiemTiem}
                    touched={formik.touched?.diaDiemTiem}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <TextValidator
                    name="tinhTrangSkSauTiem"
                    lable={lang("INPUT.VACCINATION.STATUSAFTER")}
                    type="text"
                    readOnly={isView}
                    value={formik.values?.tinhTrangSkSauTiem || ""}
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <TextValidator
                    name="lanTiemTiepTheo"
                    lable={lang("INPUT.VACCINATION.NEXTTIME")}
                    type="date"
                    readOnly={isView}
                    value={formik.values?.lanTiemTiepTheo || ""}
                    onChange={(e: any) => {
                      formik.handleChange(e);
                      let { value } = e.target
                      if(moment(value).diff(formik.values.ngayTiem) < 0){
                        formik.setFieldError("lanTiemTiepTheo", "Lần tiêm tiếp theo phải lớn hơn ngày tiêm")
                      }
                    }}
                    onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.lanTiemTiepTheo, "lanTiemTiepTheo")}
                    errors={formik.errors?.lanTiemTiepTheo}
                    touched={formik.touched?.lanTiemTiepTheo}
                  />
                </Col>
                <Col xs={4} className="pt-6">
                  <TextValidator
                    name="luuY"
                    lable={lang("INPUT.VACCINATION.NOTE")}
                    type="text"
                    readOnly={isView}
                    value={formik.values?.luuY || ""}
                    onChange={formik.handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        {!isView && (
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleClose()}
            >
              {lang("BTN.CANCEL")}
            </Button>
            <Button
              variant="primary"
              className="button-primary btn-sm"
              type="submit"
            >
              {lang("BTN.SAVE")}
            </Button>
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
};
