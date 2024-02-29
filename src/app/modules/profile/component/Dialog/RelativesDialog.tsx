/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { TYPE_CATEGORY, regex } from "../../../constant";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { getAllSimpleValue, searchNationality } from "../../../services";
import "../../../styles/index.scss";
import { IRelativesInfo, IRelativesInfoDto } from "../../models/DialogModels";
import { addQuanHeGiaDinh, updateQuanHeGiaDinh } from "../../services/DialogServices";
import { INIT_RELATIVES_INFO } from "../../const/ProfileConst";
import TextValidator from "../../../component/input-field/TextValidator";
import { numberExceptThisSymbols, useCustomIntl } from "../../../utils/FunctionUtils";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { convertDataFamilyDto } from "../../utils/FunctionUtils";
import TextArea from "../../../component/input-field/TextArea";
import AddAttributeValueDialog from "./AddAttributeValueDialog";
import AppContext from "../../../../AppContext";

interface Props {
  handleCloseRelativesDialog: () => void;
  identify: string;
  dataRelativeEdit: IRelativesInfo;
  isView: boolean;
}

export const RelativesDialog = (props: Props) => {
  const intl = useIntl();
  const { setPageLoading } = useContext(AppContext);

  const { handleCloseRelativesDialog, identify, isView, dataRelativeEdit } = props;
  const [showAddRelativeDialog, setShowAddRelativeDialog] = useState(false);
  const [loadPersonalRelation, setLoadPersonalRelation] = useState<boolean>(true);

  useEffect(() => {
    formik.setValues(dataRelativeEdit)
  }, [dataRelativeEdit])

  const validationSchema = Yup.object().shape({
    ten: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    // moreDetails: Yup.string()
    //   .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
    //   .nullable(),
    quanHeNV: Yup.object()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    // ngaySinh: Yup.date()
    //   .concat(checkInvalidDate(intl))
    //   .nullable(),
    namSinh: Yup.number()
      .min(1000, intl.formatMessage({ id: "VALIDATION.FOUR_DIGITS" }))
      .max(9999, intl.formatMessage({ id: "VALIDATION.FOUR_DIGITS" }))
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
    email: Yup.string().email(intl.formatMessage({ id: "VALIDATION.EMAILINVALID" })).nullable(),
    dienThoai: Yup.string()
      .matches(regex.phone, intl.formatMessage({ id: "VALIDATION.ISPHONE" }))
      .nullable(),
  });

  const handleSubmit = async (values: IRelativesInfo) => {
    let data = { ...values, employeeId: identify };
    if (identify) {
      try {
        setPageLoading(true);
        const dataFamily: IRelativesInfoDto = convertDataFamilyDto(data)
        const res = dataRelativeEdit?.id
          ? await updateQuanHeGiaDinh(dataRelativeEdit?.id, dataFamily)
          : await addQuanHeGiaDinh(dataFamily);
        if (res?.data?.code === SUCCESS_CODE) {
          const message = dataRelativeEdit?.id
            ? "TOAST.EDIT.SUCCESS"
            : "TOAST.ADD.SUCCESS";
          toast.success(intl.formatMessage({ id: message }));
          setPageLoading(false);
        } else {
          toast.error(`${res?.data?.message}`);
          setPageLoading(false);
        }
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
        setPageLoading(false);
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
    handleCloseRelativesDialog();
  };


  const formik = useFormik({
    initialValues: dataRelativeEdit?.id ? dataRelativeEdit : INIT_RELATIVES_INFO,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value)
  }

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    formik.setFieldValue(name, checked);
  };

  useEffect(() => {
    if (dataRelativeEdit?.id) return;
    getNationality()
  }, [dataRelativeEdit])

  const getNationality = async () => {
    const { data } = await searchNationality(SEARCH_OBJECT_MAX_SIZE)
    const nationality = data?.data?.content?.length > 0 ? data?.data?.content?.find((item: any) => item?.name === VARIABLE_STRING.VIET_NAM) : null
    formik.setFieldValue("nationality", nationality)
  }

  const handleOpenAddAttributeValueDialog = () => {
    setShowAddRelativeDialog(true);
  };

  const handleCloseAddAttributeValueDialog = () => {
    setShowAddRelativeDialog(false);
  };

  const handleUpdateAddAttributeValueDialog = () => {
    setLoadPersonalRelation(!loadPersonalRelation);
    setShowAddRelativeDialog(false);
  }

  const handleSaveItem = (newItem :any) => {
    handleChangeSelect("quanHeNV", newItem);
    handleCloseAddAttributeValueDialog();
  };

  return (
    <>
      <Modal
        show={true}
        size="xl"
        centered
        aria-labelledby="example-custom-modal-styling-title"
        onHide={handleCloseRelativesDialog}
      >
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title
              id="example-custom-modal-styling-title"
              className="heading-5"
            >
              {useCustomIntl("GENERAL.INFO.RELATIVES")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="spaces px-8 pt-6">
              <Col xs={4}>
                <Autocomplete
                  isRequired
                  lable={useCustomIntl("INPUT.FAMILY.RELATION")}
                  name="quanHeNV"
                  value={formik.values?.quanHeNV || ""}
                  searchFunction={getAllSimpleValue}
                  searchObject={TYPE_CATEGORY.quanHeGiaDinh}
                  isReadOnly={isView}
                  onChange={(selectedOption) =>
                    handleChangeSelect(VARIABLE_STRING.QUAN_HE_NV, selectedOption)
                  }
                  errors={formik.errors?.quanHeNV}
                  touched={formik.touched?.quanHeNV}
                  options={[]}
                  getOptionLabel={(option) => option?.value}
                  isAddNew={true}
                  onAddNew={handleOpenAddAttributeValueDialog}
                  dependencies={[loadPersonalRelation]}
                />
              </Col>
              <Col xs={4}>
                <TextValidator
                  lable={useCustomIntl("INPUT.RELATIVE.FULLNAME")}
                  name="ten"
                  value={formik.values?.ten || ""}
                  type="text"
                  isRequired
                  readOnly={isView}
                  onChange={formik.handleChange}
                  errors={formik.errors?.ten}
                  touched={formik.touched?.ten}
                />
              </Col>
              <Col xs={4}>
                <TextValidator
                  lable={useCustomIntl("INPUT.FAMILY.BIRTH")}
                  name="namSinh"
                  value={formik.values?.namSinh || ""}
                  type="number"
                  isRequired
                  readOnly={isView}
                  onChange={formik.handleChange}
                  onKeyDown={numberExceptThisSymbols}
                  errors={formik.errors?.namSinh}
                  touched={formik.touched?.namSinh}
                />
              </Col>
            </Row>
            <Row className="spaces px-8 pt-6">
              <Col xs={4}>
                <Autocomplete
                  lable={useCustomIntl("INPUT.RELATIVE.NATION")}
                  isReadOnly={isView}
                  options={[]}
                  value={formik.values?.nationality || null}
                  name="nationality"
                  onChange={(selectedOption) => handleChangeSelect("nationality", selectedOption)}
                  searchFunction={searchNationality}
                  searchObject={SEARCH_OBJECT_MAX_SIZE}
                />
              </Col>
              <Col xs={4}>
                <TextValidator
                  lable={useCustomIntl("INPUT.RELATIVE.PHONE")}
                  name="dienThoai"
                  value={formik.values?.dienThoai || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  errors={formik.errors?.dienThoai}
                  touched={formik.touched?.dienThoai}
                />
              </Col>
            </Row>
            <Row className="spaces px-8 pt-6">
              <Col xs={4}>
                <Form.Check
                  className="py-4"
                  label={useCustomIntl("INPUT.FAMILY.IS_SAME_ORGANIZATION")}
                  name="isSameOrganization"
                  checked={formik.values?.isSameOrganization}
                  disabled={isView}
                  onChange={handleChangeCheckBox}
                />
              </Col>
              <Col xs={4}>
                <Form.Check
                  className="py-4"
                  label={useCustomIntl("INPUT.FAMILY.IS_DEATH")}
                  name="isDeadth"
                  checked={formik.values?.isDeadth}
                  disabled={isView}
                  onChange={handleChangeCheckBox}
                />
              </Col>
              <Col xs={4}>
                <Form.Check
                  className="py-4"
                  label={useCustomIntl("INPUT.FAMILY.IS_DEPENDENT_PERSON")}
                  name="isDependentPerson"
                  checked={formik.values?.isDependentPerson}
                  disabled={isView}
                  onChange={handleChangeCheckBox}
                />
              </Col>
            </Row>
            <Row className="spaces px-8 pt-6">
              <Col xs={12} className="pt-6">
                <TextArea
                  lable={useCustomIntl("INPUT.FAMILY.MORE_INFO")}
                  name="moreDetails"
                  value={formik.values?.moreDetails || ""}
                  type="text"
                  as="textarea"
                  rows="3"
                  readOnly={isView}
                  onChange={(value: any) => formik.setFieldValue("moreDetails", value)}
                  touched={formik.touched?.moreDetails}
                  errors={formik.errors?.moreDetails}
                />
              </Col>
              <Col xs={12} className="pt-6">
                <TextArea
                  className="w-100"
                  lable={useCustomIntl("INPUT.FAMILY.NOTE")}
                  name="note"
                  value={formik.values?.note || ""}
                  type="text"
                  as="textarea"
                  rows="3"
                  readOnly={isView}
                  onChange={(value: any) => formik.setFieldValue("note", value)}
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
                onClick={() => handleCloseRelativesDialog()}
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
      {showAddRelativeDialog && (
        <AddAttributeValueDialog
          onClose={handleCloseAddAttributeValueDialog}
          onUpdate={handleUpdateAddAttributeValueDialog}
          handleSaveItem={handleSaveItem}
          title={"GENERAL.INFO.RELATIVES_FAMILY"}
          typeContent={TYPE_CATEGORY.quanHeGiaDinh}
        />
      )}
    </>
  );
};
