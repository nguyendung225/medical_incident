/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import "../../../styles/index.scss";
import { IRelativesFamily } from "../../models/DialogModels";
import { INIT_RELATIVES_FAMILY_INFO } from "../../const/ProfileConst";
import TextValidator from "../../../component/input-field/TextValidator";
import { useCustomIntl } from "../../../utils/FunctionUtils";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { addSimpleAttributeValue, getAllSimpleAttributeValue } from "../../../services";
import { SEARCH_OBJECT_MAX_SIZE } from "../../../utils/Constant";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
  onUpdate?: () => void;
  handleSaveItem: (newItem: any) => void;
  title: string;
  typeContent: number
}

const AddAttributeValueDialog = (props: Props) => {
  const intl = useIntl();
  const { onClose, onUpdate, handleSaveItem, title, typeContent } = props;
  const [listType, setListType] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .nullable(),
  });

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value)
  }

  const handleSubmit = async (values: IRelativesFamily) => {
    let data = {
      ...values,
      value: values?.name,
      scategoryId: values?.type?.scategoryId,
      attributeId: values?.type?.id,
    };
    try {
      const res = await addSimpleAttributeValue(data);
      if (res?.data?.code === SUCCESS_CODE) {
        const message = "TOAST.ADD.SUCCESS";
        toast.success(intl.formatMessage({ id: message }));
        handleSaveItem(res?.data?.data);
        onUpdate ? onUpdate() : onClose();
      } else {
        toast.error(`${res?.data?.message}`);
      }
    } catch (error) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  };

  const formik = useFormik({
    initialValues: INIT_RELATIVES_FAMILY_INFO,
    validationSchema,
    onSubmit: handleSubmit
  })

  const getData = async () => {
    try {
      const {data} = await getAllSimpleAttributeValue({ ...SEARCH_OBJECT_MAX_SIZE, type: typeContent })
      setListType(data?.data?.content)
      setIsDataLoaded(false)
    }
    catch (err) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  }

  useEffect(() => {
    getData()
  }, [typeContent])

  useEffect(() => {
    if (listType?.length > 0 && !isDataLoaded) {
      formik.setFieldValue("type", listType[0]);
      setIsDataLoaded(true);
    }
  }, [listType, isDataLoaded, formik])

  return (
    <>
      <Modal
        show={true}
        size="lg"
        centered
        className="custom-modal"
        aria-labelledby="example-custom-modal-styling-title"
        onHide={onClose}
      >
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title
              id="example-custom-modal-styling-title"
              className="heading-5"
            >
              {useCustomIntl(title)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="spaces px-8 pt-6">
              <Col xs={6}>
                <Autocomplete
                  lable="Loại"
                  name="type"
                  value={formik.values?.type || ""}
                  options={listType}
                  isReadOnly={true}
                  onChange={(selectedOption) =>
                    handleChangeSelect("type", selectedOption)
                  }
                  errors={formik.errors?.type}
                  touched={formik.touched?.type}
                />
              </Col>
              <Col xs={6}>
                <TextValidator
                  lable={useCustomIntl("CATEGORY.NAME")}
                  name="name"
                  value={formik.values?.name || ""}
                  type="text"
                  isRequired
                  onChange={formik.handleChange}
                  errors={formik.errors?.name}
                  touched={formik.touched?.name}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => onClose()}
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
        </Form>
      </Modal>
    </>
  );
};
export default AddAttributeValueDialog