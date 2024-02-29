import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import TextValidator from "../../../component/input-field/TextValidator";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import "../../../styles/index.scss";
import { handleBlurDate } from "../../../utils/FunctionUtils";
import { INIT_TRAINING_PROCESS_INFO } from "../../const/ProfileConst";
import { TrainingProcessInfo } from "../../models/DialogModels";
import { addTrainingProcess, updateTrainingProcess } from "../../services/DialogServices";
import { useEffect, useState } from "react";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { TYPE_CATEGORY } from "../../../constant";
import { searchAllSimpleValue } from "../../../services";
import Autocomplete from "../../../component/input-field/Autocomplete";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { checkInvalidDate } from "../../../utils/ValidationSchema";

interface Props {
  handleCloseTrainingProcessDialog: () => void;
  identify: string;
  isView: boolean;
  trainingProcessEdit: TrainingProcessInfo;
  updateData: () => Promise<void>;
  updateDataTrainingInfo: () => Promise<void>;
}
export const TrainingProcessDialog = (props: Props) => {
  const { lang, intl } = useMultiLanguage();
  const { handleCloseTrainingProcessDialog, updateDataTrainingInfo, identify, trainingProcessEdit, isView, updateData } = props;
  const [isCheckCoSoDaoTao, setIsCheckCoSoDaoTao] = useState<boolean>(
    trainingProcessEdit?.noiDaoTaoKhac ? true : false
  );

  useEffect(() => {
    formik.setValues(
      trainingProcessEdit?.id
        ? {
          ...trainingProcessEdit,
          noiDaoTao: trainingProcessEdit?.noiDaoTaoId
            ? {
              id: trainingProcessEdit?.noiDaoTaoId || "",
              value: trainingProcessEdit?.noiDaoTaoText || ""
            }
            : null
        }
        : INIT_TRAINING_PROCESS_INFO
    );
  }, [trainingProcessEdit]);

  const validationSchema = Yup.object().shape({
    tuNgay: Yup.date()
      .concat(checkInvalidDate(intl))
      .nullable(),
    denNgay: Yup.date()
      .concat(checkInvalidDate(intl))
      .min(
        Yup.ref("tuNgay"),
        lang("VALIDATION.MINDATE") + lang("INPUT.WORKEXPERIENCE.DATE.START")
      )
      .nullable(),
    // tenKhoaHoc: Yup.string()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable()
  });

  const handleFormSubmit = async (values: TrainingProcessInfo) => {
    if (identify) {
      try {
        const dataSubmit: TrainingProcessInfo = {
          ...values,
          noiDaoTaoId: values?.noiDaoTao?.id || "",
          noiDaoTaoText: String(values?.noiDaoTao?.value || "")
        };
        const res = trainingProcessEdit?.id
          ? await updateTrainingProcess(trainingProcessEdit?.id, dataSubmit)
          : await addTrainingProcess({ ...dataSubmit, employeeId: identify });

        if (res?.data?.code === SUCCESS_CODE) {
          const message = trainingProcessEdit?.id ? "TOAST.EDIT.TRAINING.SUCCESS" : "TOAST.ADD.TRAINING.SUCCESS";
          await updateDataTrainingInfo();
          toast.success(lang(message));
        } else {
          toast.error(`${res?.data?.message}`);
        }
      } catch (error) {
        toast.error(lang("GENERAL.ERROR"));
      }
    } else {
      toast.warning(lang("MESSAGE.BASIC.FIRST"));
    }
    await updateData();
    handleCloseTrainingProcessDialog();
  };

  const formik = useFormik({
    initialValues: INIT_TRAINING_PROCESS_INFO,
    validationSchema,
    onSubmit: handleFormSubmit
  });

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, nameObj: string) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    formik.setFieldValue(nameObj, null);
  };

  return (
    <Modal
      show={true}
      size="lg"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleCloseTrainingProcessDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {lang("INFO.TRAINING_PROCESS")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="px-4">
            <Col xs={4}>
              <TextValidator
                lable={lang("INPUT.TRAINING_PROCESS.DATE.START")}
                name="tuNgay"
                // isRequired
                value={formik.values?.tuNgay || ""}
                type="date"
                readOnly={isView}
                onChange={formik.handleChange}
                onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.tuNgay, "tuNgay")}
                errors={formik.errors?.tuNgay}
                touched={formik.touched?.tuNgay}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("INPUT.TRAINING_PROCESS.DATE.END")}
                name="denNgay"
                // isRequired
                value={formik.values?.denNgay || ""}
                type="date"
                readOnly={isView}
                onChange={formik.handleChange}
                onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.denNgay, "denNgay")}
                errors={formik.errors?.denNgay}
                touched={formik.touched?.denNgay}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("INPUT.TRAINING_PROCESS.NAME.COURSE")}
                name="tenKhoaHoc"
                // isRequired
                value={formik.values?.tenKhoaHoc || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.tenKhoaHoc}
                errors={formik.errors?.tenKhoaHoc}
              />
            </Col>
          </Row>
          <Row className="px-4 mt-6">
            <Col xs={4}>
              {/* <TextValidator
                lable={lang("INPUT.TRAINING_PROCESS.TRANNING_FACILITY")}
                name="noiDaoTaoKhac"
                value={formik.values?.noiDaoTaoKhac || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.noiDaoTaoKhac}
                errors={formik.errors?.noiDaoTaoKhac}
              /> */}
              <Autocomplete
                lable={lang("INPUT.DEGREE.PLACETRAINING")}
                formCheckBox={true}
                isReadOnly={isView}
                options={[]}
                value={isCheckCoSoDaoTao ? formik.values?.noiDaoTaoKhac : formik.values?.noiDaoTao}
                name={isCheckCoSoDaoTao ? VARIABLE_STRING.NOI_DAO_TAO_KHAC : VARIABLE_STRING.NOI_DAO_TAO}
                setIsCheckBox={setIsCheckCoSoDaoTao}
                isCheckBox={isCheckCoSoDaoTao}
                onChange={(value) =>
                  isCheckCoSoDaoTao
                    ? handleChange(value, VARIABLE_STRING.NOI_DAO_TAO)
                    : handleChangeSelect(VARIABLE_STRING.NOI_DAO_TAO, value)
                }
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.noiDaoTao
                }}
                errors={formik.errors?.noiDaoTao}
                touched={formik.touched?.noiDaoTao}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("INPUT.TRAINING_PROCESS.RESULT")}
                name="ketQua"
                value={formik.values?.ketQua || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                touched={formik.touched?.ketQua}
                errors={formik.errors?.ketQua}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!isView && (
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleCloseTrainingProcessDialog()}
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
