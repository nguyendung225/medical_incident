import { useFormik } from "formik";
import { FC } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { allowanceOpt } from "../const/AllowanceConst";
import { IAllowance } from "../services/models/IAllowance";
import { TextFieldCustom } from "./TextFieldCustom";
import { IContractInfo } from "../services/models/IContract";
import {
  addNewAllowance,
  updateAllowance,
} from "../services/allowanceServices";
import { INIT_ALLOWANCE, SUCCESS_CODE } from "../const/ContractConst";
import { toast } from "react-toastify";
import TextValidator from "../../component/input-field/TextValidator";
import { numberExceptThisSymbols, useCustomIntl } from "../../utils/FunctionUtils";
import Autocomplete from "../../component/input-field/Autocomplete";

interface IProps {
  handleCLoseAllowanceDialog: () => void;
  allowanceInfo: IAllowance;
  getListAllowance: () => Promise<void>;
  contractInfo: IContractInfo;
}

const AddNewAllowanceDialog: FC<IProps> = (props) => {
  const {
    handleCLoseAllowanceDialog,
    getListAllowance,
    allowanceInfo,
    contractInfo,
  } = props;
  const intl = useIntl();
  
  const validationSchema = Yup.object().shape({
    tenKhoanPhuCap: Yup.object()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    giaTri: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable()
      .max(10, intl.formatMessage({ id: "VALIDATION.10MAX" })),
    ghiChu: Yup.string().nullable().max(255, intl.formatMessage({ id: "VALIDATION.255MAX" })),
  });

  const handleSubmit = async (values: IAllowance) => {
    try {
      values.employeeId = contractInfo.employeeId;
      values.hopDongLaoDongId = contractInfo.id;
      const res = allowanceInfo.id
        ? await updateAllowance(allowanceInfo.id, values)
        : await addNewAllowance(values);
      if (res?.data?.code === SUCCESS_CODE) {
        toast.success(
          allowanceInfo.id
            ? intl.formatMessage({ id: "TOAST.EDIT.SUCCESS" })
            : intl.formatMessage({ id: "TOAST.CREATE.SUCCESS" })
        );
        await getListAllowance();
        handleCLoseAllowanceDialog();
      } else {
        toast.error(`${res?.data?.message}`);
      }
    } catch (err) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  };

  const formik = useFormik({
    initialValues: allowanceInfo?.id ? allowanceInfo : INIT_ALLOWANCE,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value)
  }

  return (
    <Modal
      show={true}
      onHide={handleCLoseAllowanceDialog}
      size="lg"
      className="custom-modal"
      centered
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="heading-5">
            {intl.formatMessage({
              id: "GENERAL.ALLOWANCE.ADD",
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="ps-4">
            <Col xs={6}>
              <Autocomplete
                isRequired
                lable={useCustomIntl("ALLOWANCE.NAME")}
                options={allowanceOpt}
                value={formik.values?.tenKhoanPhuCap || null}
                name="tenKhoanPhuCap"
                onChange={(selectedOption) => handleChangeSelect("tenKhoanPhuCap", selectedOption)}
                touched={formik.touched?.tenKhoanPhuCap}
                errors={formik.errors?.tenKhoanPhuCap}
              />
            </Col>
            <Col xs={6}>
              <TextValidator
                lable={useCustomIntl("ALLOWANCE.VALUE")}
                name="giaTri"
                value={formik.values?.giaTri || ""}
                type="number"
                isRequired
                onChange={formik.handleChange}
                onKeyDown={numberExceptThisSymbols}
                errors={formik.errors?.giaTri}
                touched={formik.touched?.giaTri}
              />
            </Col>
          </Row>
          <Row className="ps-4 pt-4">
            <Col xs={6}>
              <TextFieldCustom
                name="tinhCongHuongLuong"
                title="ALLOWANCE.PAYROLL"
                type="checkbox"
                values={formik?.values?.tinhCongHuongLuong}
                errors={formik?.errors?.tinhCongHuongLuong}
                handleChange={formik?.handleChange}
              />
            </Col>
            <Col xs={6}>
              <TextValidator
                lable={useCustomIntl("ALLOWANCE.NOTE")}
                name="ghiChu"
                value={formik.values?.ghiChu || ""}
                type="text"
                onChange={formik.handleChange}
                errors={formik.errors?.ghiChu}
                touched={formik.touched?.ghiChu}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="btn btn-secondary  btn-sm"
            onClick={handleCLoseAllowanceDialog}
          >
            {intl.formatMessage({
              id: "BTN.CANCEL",
            })}
          </Button>
          <Button className="btn btn-primary btn-sm" type="submit">
            {intl.formatMessage({ id: "BTN.SAVE" })}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export { AddNewAllowanceDialog };
