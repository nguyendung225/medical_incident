import { Form, Formik } from "formik";
import { FC, useContext } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Autocomplete from "../../../component/input-field/Autocomplete";
import TextValidator from "../../../component/input-field/TextValidator";
import { TextFieldCustom } from "../../../contract/components/TextFieldCustom";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { INIT_DEDUCT } from "../../const/DialogConstant";
import { EmployeeProfile, IDeduct } from "../../models/ProfileModels";
import { addKhauTru, updateKhauTru } from "../../services/DialogServices";
import { deductOpt } from "./../../../contract/const/AllowanceConst";
import AppContext from "../../../../AppContext";
interface IProps {
  handleCLoseDeductDialog: () => void;
  deductInfo: IDeduct;
  isView: boolean;
  getListDeduct: () => Promise<void>;
  profileInfo: EmployeeProfile;
}
const DeductDialog: FC<IProps> = (props) => {
  const { handleCLoseDeductDialog, getListDeduct, deductInfo, profileInfo, isView } = props;
  const intl = useIntl();
  const { setPageLoading } = useContext(AppContext);

  const validationSchema = Yup.object().shape({
    tenKhoanKhauTru: Yup.object()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    giaTri: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
  });
  const handleSubmit = async (values: IDeduct) => {
    try {
      setPageLoading(true);
      values.employeeId = String(profileInfo?.id);
      const res = deductInfo?.id
        ? await updateKhauTru(deductInfo?.id, values)
        : await addKhauTru(values);
      if (res?.data?.code === SUCCESS_CODE) {
        toast.success(
          deductInfo?.id
            ? intl.formatMessage({ id: "TOAST.EDIT.SUCCESS" })
            : intl.formatMessage({ id: "TOAST.CREATE.SUCCESS" })
        );
        await getListDeduct();
        handleCLoseDeductDialog();
        setPageLoading(false);
      } else {
        toast.error(`${res?.data?.message}`);
      }
    } catch (err) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      setPageLoading(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={deductInfo ? deductInfo : INIT_DEDUCT}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <Modal show={true} onHide={handleCLoseDeductDialog} size="lg" centered>
              <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {intl.formatMessage({
                      id: `${deductInfo ? "GENERAL.DEDUCT.UPDATE" : "GENERAL.DEDUCT.ADD"}`
                    })}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row className="ps-4">
                    <Col xs={4}>
                      <Autocomplete
                        lable={intl.formatMessage({
                          id: "ALLOWANCE.NAME"
                        })}
                        name="tenKhoanKhauTru"
                        options={deductOpt}
                        value={values?.tenKhoanKhauTru}
                        isReadOnly={isView}
                        onChange={(selectedOption) =>
                          setFieldValue("tenKhoanKhauTru", selectedOption)
                        }
                      />
                    </Col>
                    <Col xs={4}>
                      <TextValidator
                        lable={intl.formatMessage({
                          id: "ALLOWANCE.VALUE"
                        })}
                        name="giaTri"
                        value={values?.giaTri || ""}
                        type="text"
                        readOnly={isView}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs={4}>
                      <TextFieldCustom
                        name="tinhCongHuongLuong"
                        title="ALLOWANCE.PAYROLL"
                        type="checkbox"
                        values={values?.tinhCongHuongLuong}
                        errors={errors?.tinhCongHuongLuong}
                        handleChange={handleChange}
                        readOnly={isView}
                      />
                    </Col>
                  </Row>
                </Modal.Body>
                {
                  !isView &&
                  <Modal.Footer className="d-flex justify-content-center">
                    <Button className="btn btn-secondary  btn-sm" onClick={handleCLoseDeductDialog}>
                      {intl.formatMessage({ id: "BTN.CANCEL" })}
                    </Button>
                    <Button className="btn btn-primary btn-sm" type="submit">
                      {intl.formatMessage({ id: "BTN.SAVE" })}
                    </Button>
                  </Modal.Footer>
                }
              </Form>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
export { DeductDialog };

