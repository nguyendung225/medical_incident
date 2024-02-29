/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FileUpload from "../../../component/FileUpload/FileUpload";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import TextValidator from "../../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../../constant";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { searchAllSimpleValue } from "../../../services";
import "../../../styles/index.scss";
import { SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../../utils/Constant";
import { checkObject, useCustomIntl } from "../../../utils/FunctionUtils";
import { politicalTheoryTrainingForms, rankOfEducation } from "../../const/DialogChildConstants";
import { TYPE_OF } from "../../const/DialogConstant";
import { INIT_DEGREE_INFO } from "../../const/ProfileConst";
import { DegreeInfo } from "../../models/DialogModels";
import { addBangCap, updateBangCap } from "../../services/DialogServices";
import moment from "moment";

interface Props {
  shouldOpenDegreeDialog: boolean;
  handleCloseDegreeDialog: () => void;
  identify: string;
  isView: boolean;
  degreeEdit: DegreeInfo;
  updateData: () => Promise<void>;
  updateDataTrainingInfo: () => Promise<void>;
}
export const DegreeDialog = (props: Props) => {
  const intl = useIntl();
  const { shouldOpenDegreeDialog, handleCloseDegreeDialog,updateDataTrainingInfo , identify, degreeEdit, isView, updateData } = props;
  const [isCheckNoiDaoTao, setIsCheckNoiDaoTao] = useState<boolean>(degreeEdit?.noiDaoTaoKhac ? true : false);
  const [isCheckChuyenNganhDaoTao, setIsCheckChuyenNganhDaoTao] = useState<boolean>(degreeEdit?.chuyenNganhKhac ? true : false);

  const handleFormSubmit = async (values: DegreeInfo) => {
    if (typeof identify === TYPE_OF.STRING && identify !== "") {
      try {
        const res = degreeEdit?.id
          ? await updateBangCap(degreeEdit?.id, convertData(values))
          : await addBangCap(convertData({ ...values, employeeId: identify }));
        handleApiResponse(res)
      } catch (error) {
        toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
      }
    } else {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    }
    await updateData();
    handleCloseDegreeDialog();
  };

  const handleApiResponse = (res: any) => {
    if (res?.data?.code === SUCCESS_CODE) {
      const message = degreeEdit?.id
        ? "TOAST.EDIT.SUCCESS"
        : "TOAST.ADD.SUCCESS";
      toast.success(intl.formatMessage({ id: message }));
      handleCloseDegreeDialog();
      updateDataTrainingInfo()
    } else {
      toast.error(`${res?.data?.message}`);
    }
  };

  const validationSchema = Yup.object().shape({
    // chuyenNganhId: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRE' })).nullable(),
    // noiDaoTaoId: Yup.string().required(intl.formatMessage({ id: 'VALIDATION.REQUIRE' })).nullable(),
    // trinhDoDaoTao: Yup.object().required(intl.formatMessage({ id: 'VALIDATION.REQUIRE' })).nullable(),
    // hinhThucDaoTao: Yup.object().required(intl.formatMessage({ id: 'VALIDATION.REQUIRE' })).nullable()
  });

  const formik = useFormik({
    initialValues: checkObject(degreeEdit) ? INIT_DEGREE_INFO : degreeEdit,
    validationSchema,
    onSubmit: handleFormSubmit
  })

  useEffect(() => {
    formik.setValues(checkObject(degreeEdit) ? INIT_DEGREE_INFO : {
      ...degreeEdit,
      noiDaoTao: degreeEdit.noiDaoTaoText ? {
        id: degreeEdit.noiDaoTaoId,
        value: degreeEdit.noiDaoTaoText
      } : null,
      chuyenNganh: degreeEdit.chuyenNganhText ? {
        id: degreeEdit.chuyenNganhId,
        value: degreeEdit.chuyenNganhText
      } : null,
      trinhDoDaoTao: degreeEdit.trinhDoDaoTaoText ? {
        id: degreeEdit.trinhDoDaoTaoId,
        value: degreeEdit.trinhDoDaoTaoText
      } : null,
      thoiGianDaoTao: degreeEdit?.thoiGianDaoTao ? moment(new Date(Number(degreeEdit.thoiGianDaoTao))).format("YYYY-MM-DD") : null
    })
  }, [degreeEdit])

  const convertData = (data: any) => {
    const value = {
      id: data?.id,
      employeeId: data?.employeeId,
      chuyenNganhId: data?.chuyenNganh?.id,
      chuyenNganhText: data?.chuyenNganh?.value,
      chuyenNganhKhac: data?.chuyenNganhKhac,
      xepLoai: data?.xepLoai,
      noiDaoTaoId: data?.noiDaoTao?.id,
      noiDaoTaoText: data?.noiDaoTao?.value,
      thoiGianDaoTao: data?.thoiGianDaoTao,
      taiLieuDinhKem: data?.taiLieuDinhKem,
      hinhThucDaoTao: data?.hinhThucDaoTao,
      noiDaoTaoKhac: data?.noiDaoTaoKhac,
      trinhDoDaoTaoText: data?.trinhDoDaoTao?.value,
      trinhDoDaoTaoId: data?.trinhDoDaoTao?.id
    }

    return value;
  }

  const handleChangeSelect = (name: string, value: any) => {
    if (name === VARIABLE_STRING.CHUYEN_NGANH) {
      formik.setFieldValue(VARIABLE_STRING.CHUYEN_NGANH_ID, value?.id)
    }

    if (name === VARIABLE_STRING.NOI_DAO_TAO) {
      formik.setFieldValue(VARIABLE_STRING.NOI_DAO_TAO_ID, value?.id)
      formik.setFieldValue(VARIABLE_STRING.NOI_DAO_TAO_KHAC, "")
    }

    formik.setFieldValue(name, value)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>, nameObj: string) => {
    const { name, value } = event.target
    formik.setFieldValue(name, value)
    formik.setFieldValue(nameObj, null)
  }

  return (
    <Modal
      show={shouldOpenDegreeDialog}
      size="lg"
      centered
      aria-labelledby="example-custom-modal-styling-title"
      onHide={handleCloseDegreeDialog}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="heading-5"
          >
            {useCustomIntl("INFO.DEGREE")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="px-4">
            <Col xs={4} className="spaces pt-10">
              <Autocomplete
                lable={useCustomIntl("INPUT.DEGREE.PLACETRAINING")}
                formCheckBox={true}
                isReadOnly={isView}
                options={[]}
                value={isCheckNoiDaoTao ? formik.values?.noiDaoTaoKhac : formik.values?.noiDaoTao}
                name={isCheckNoiDaoTao ? VARIABLE_STRING.NOI_DAO_TAO_KHAC : VARIABLE_STRING.NOI_DAO_TAO}
                setIsCheckBox={setIsCheckNoiDaoTao}
                isCheckBox={isCheckNoiDaoTao}
                onChange={(selectedOption) => isCheckNoiDaoTao ? handleChange(selectedOption, VARIABLE_STRING.NOI_DAO_TAO) : handleChangeSelect(VARIABLE_STRING.NOI_DAO_TAO, selectedOption)}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.noiDaoTao
                }}
                errors={formik.errors?.noiDaoTaoId}
                touched={formik.touched?.noiDaoTaoId}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
            <Col xs={4} className="spaces pt-10">
              <Autocomplete
                lable={useCustomIntl("INPUT.DEGREE.SPECIALIZED")}
                // isRequired
                formCheckBox={true}
                isCheckBox={isCheckChuyenNganhDaoTao}
                setIsCheckBox={setIsCheckChuyenNganhDaoTao}
                name={isCheckChuyenNganhDaoTao ? VARIABLE_STRING.CHUYEN_NGANH_KHAC : VARIABLE_STRING.CHUYEN_NGANH}
                value={isCheckChuyenNganhDaoTao ? formik.values?.chuyenNganhKhac : formik.values?.chuyenNganh}
                onChange={(selectedOption) => isCheckChuyenNganhDaoTao ? handleChange(selectedOption, VARIABLE_STRING.CHUYEN_NGANH) :
                  handleChangeSelect(
                    VARIABLE_STRING.CHUYEN_NGANH,
                    selectedOption
                  )
                }
                isReadOnly={isView}
                options={[]}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.chuyenNganh
                }}
                errors={formik.errors?.chuyenNganhId}
                touched={formik.touched?.chuyenNganhId}
                getOptionLabel={(option) => option?.value}
              />
            </Col>
            <Col xs={4} className="spaces pt-10">
              <Autocomplete
                lable={useCustomIntl("INPUT.DEGREE.TRAINING_FORM")}
                // isRequired
                isReadOnly={isView}
                options={politicalTheoryTrainingForms}
                value={formik.values?.hinhThucDaoTao}
                name="hinhThucDaoTao"
                onChange={(selectedOption) =>
                  handleChangeSelect("hinhThucDaoTao", selectedOption)
                }
                errors={formik.errors?.hinhThucDaoTao}
                touched={formik.touched?.hinhThucDaoTao}
              />
            </Col>
            <Col xs={4} className="spaces pt-10">
              <Autocomplete
                lable={useCustomIntl("INPUT.DEGREE.LEVEL")}
                isReadOnly={isView}
                options={[]}
                value={formik.values?.trinhDoDaoTao}
                name="trinhDoDaoTao"
                onChange={(selectedOption) =>handleChangeSelect("trinhDoDaoTao", selectedOption)}
                searchFunction={searchAllSimpleValue}
                getOptionLabel={(option) => option?.value}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, type: TYPE_CATEGORY.trinhDoDaoTao }}
              />
            </Col>
            <Col xs={4} className="spaces pt-10">
              <TextValidator
                lable={useCustomIntl("INPUT.DEGREE.TRAINING_DATE")}
                name="thoiGianDaoTao"
                type="date"
                value={formik.values?.thoiGianDaoTao || ""}
                readOnly={isView}
                onChange={formik.handleChange}
                errors={formik.errors?.thoiGianDaoTao}
                touched={formik.touched?.thoiGianDaoTao}
              />
            </Col>
            <Col xs={4} className="spaces pt-10">
              <Autocomplete
                lable={useCustomIntl("INPUT.DEGREE.RANK")}
                isReadOnly={isView}
                options={rankOfEducation}
                value={formik.values?.xepLoai}
                name="xepLoai"
                onChange={(selectedOption) =>
                  handleChangeSelect("xepLoai", selectedOption)
                }
                errors={formik.errors?.xepLoai}
                touched={formik.touched?.xepLoai}
              />
            </Col>
            <Col xs={4} className="spaces pt-10">
              <FileUpload
                label="CONTRACT.ATTACHMENTS"
                setFieldValue={(data: string) => {
                  formik.setFieldValue("taiLieuDinhKem", data);
                }}
                fileName={formik.values.taiLieuDinhKem || ""}
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
              onClick={() => handleCloseDegreeDialog()}
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
