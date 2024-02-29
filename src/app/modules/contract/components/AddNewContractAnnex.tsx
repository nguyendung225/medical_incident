/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FileUpload from "../../component/FileUpload/FileUpload";
import { FILE_TYPE } from "../../component/FileUpload/constant";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../constant";
import { getAllSimpleValue, searchAllSimpleValue } from "../../services";
import { searchAllEmployee, searchListWorkUnit } from "../../utils/CategoryServices";
import { REGEX, SEARCH_OBJECT_MAX_SIZE, VARIABLE_STRING } from "../../utils/Constant";
import { handleBlurDate } from "../../utils/FunctionUtils";
import { checkInvalidDate } from "../../utils/ValidationSchema";
import { CODE_HOP_DONG, INIT_CONTACT_ANNEX_INFO, SUCCESS_CODE, contractTypes, signinStatus } from "../const/ContractConst";
import { addNewAnnex, updateAnnex } from "../services/annexServices";
import { IContractAnnexInfo, IContractInfo } from "../services/models/IContract";
import { convertDataContactDto, filterObject } from "../utils/FunctionUtils";
import useMultiLanguage from "../../../hook/useMultiLanguage";
interface IProps {
  handleCLoseAddContractAnnex: () => void;
  getListAnnex: () => Promise<void>;
  contractInfo: IContractInfo;
  annexInfo: IContractAnnexInfo;
  isView?: boolean;
}
const AddNewContractAnnex: FC<IProps> = (props) => {
  const { handleCLoseAddContractAnnex, getListAnnex, contractInfo, annexInfo, isView = false } = props;
  const { lang, intl } = useMultiLanguage();

  const [isLongTermContract, setIsLongTermContract] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    soPhuLuc: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable().max(255, lang("VALIDATION.255MAX")),
    tenPhuLuc: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable().max(255, lang("VALIDATION.255MAX")),
    ngayKy: Yup.date()
      .concat(checkInvalidDate(intl))
      // .min(Yup.ref('ngayCoHieuLucPhuLuc'), lang("VALIDATE.EXPIRATION_DATE_AFTER_EFFECTIVE_DATE"))
      .nullable(),
    ngayCoHieuLucPhuLuc: Yup.date().required(lang("VALIDATION.REQUIRE")).concat(checkInvalidDate(intl)).nullable(),
    ngayCoHieuLuc: Yup.date().concat(checkInvalidDate(intl)).nullable(),
    ngayHetHan: Yup.date()
      .concat(checkInvalidDate(intl))
      .min(Yup.ref("ngayCoHieuLuc"), lang("VALIDATE.EXPIRATION_DATE_AFTER_EFFECTIVE_DATE"))
      .nullable(),
    donViKyHopDong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    viTriCongViec: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    // loaiHopDong: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    // thoiHanHopDong: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    tyLeHuongLuong: Yup.string().nullable().matches(REGEX.PERCENTAGE, lang("VALIDATE.SALARY.RATE.INVALID"))
  });

  useEffect(() => {
    if(contractInfo?.id) return;
    let contractTypeCode = contractInfo?.loaiHopDong?.code;
    setIsLongTermContract((contractTypeCode === CODE_HOP_DONG.HOP_DONG_DAI_HAN || contractTypeCode === CODE_HOP_DONG.VIEN_CHUC_DAI_HAN));
  }, [contractInfo])

  const convertData = (data: IContractAnnexInfo) => {
    return {
      ...data,
      donViKyHopDong: {
        id: data?.donViKyHopDongId,
        name: data?.donViKyHopDongText
      },
      nguoiDaiDienCtyKy: {
        id: data?.nguoiDaiDienCtyKyId,
        name: data?.nguoiDaiDienCtyKyText
      },
      nguoiDaiDienCtyChucDanh: {
        id: data?.nguoiDaiDienCtyChucDanhId,
        value: data?.nguoiDaiDienCtyChucDanhText
      },
      viTriCongViec: {
        id: data?.viTriCongViecId,
        value: data?.viTriCongViecText
      }
    };
  };

  useEffect(() => {
    if (!contractInfo?.id) return;
    formik.setFieldValue(VARIABLE_STRING.LOAI_HOP_DONG, contractInfo?.loaiHopDong);
    formik.setFieldValue(VARIABLE_STRING.HOP_DONG_GOC, contractInfo?.soHopDong);
    formik.setFieldValue(VARIABLE_STRING.DON_VI_KY_HOP_DONG, contractInfo?.donViKyHopDong);
  }, [contractInfo]);

  const handleSubmit = async (values: IContractAnnexInfo) => {
    try {
      values.employeeId = contractInfo.employeeId || "";
      values.hopDongLaoDongId = contractInfo.id;
      const dataAnnex = filterObject(convertDataContactDto(values));
      const res = annexInfo.id ? await updateAnnex(annexInfo.id, dataAnnex) : await addNewAnnex(dataAnnex);
      if (res?.data?.code === SUCCESS_CODE) {
        toast.success(annexInfo.id ? lang("TOAST.EDIT.SUCCESS") : lang("TOAST.CREATE.SUCCESS"));
        await getListAnnex();
        handleCLoseAddContractAnnex();
      } else {
        toast.error(`${res?.data?.message}`);
      }
    } catch (err) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: annexInfo?.id ? convertData(annexInfo) : INIT_CONTACT_ANNEX_INFO,
    validationSchema,
    onSubmit: handleSubmit
  });

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <Modal
      show={true}
      size="xl"
      onHide={handleCLoseAddContractAnnex}
      className="custom-modal"
      centered
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="heading-5">{lang("CONTRACT.ANNEX")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="annex-dialog">
          <Row>
            <Row>
              <Col
                xs={12}
                className="mx-4"
              >
                <span className="fs-3 fw-bold">{lang("INFO.MAIN")}</span>
              </Col>
              <Col xs={12}>
                <Row className="ms-8 mt-6">
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("ANNEX.NUMBER")}
                      name="soPhuLuc"
                      value={formik.values?.soPhuLuc || ""}
                      type="text"
                      isRequired
                      readOnly={isView}
                      onChange={formik.handleChange}
                      errors={formik.errors?.soPhuLuc}
                      touched={formik.touched?.soPhuLuc}
                    />
                  </Col>
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("ANNEX.NAME")}
                      name="tenPhuLuc"
                      value={formik.values?.tenPhuLuc || ""}
                      type="text"
                      isRequired
                      readOnly={isView}
                      onChange={formik.handleChange}
                      errors={formik.errors?.tenPhuLuc}
                      touched={formik.touched?.tenPhuLuc}
                    />
                  </Col>
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("ANNEX.SIGNINGDATE")}
                      name="ngayKy"
                      value={formik.values?.ngayKy || ""}
                      type="date"
                      readOnly={isView}
                      onChange={formik.handleChange}
                      onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayKy, "ngayKy")}
                      errors={formik.errors?.ngayKy}
                      touched={formik.touched?.ngayKy}
                    />
                  </Col>
                </Row>
                <Row className="ms-8 mt-6">
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("ANNEX.EFFECTIVEDATE")}
                      name="ngayCoHieuLucPhuLuc"
                      value={formik.values?.ngayCoHieuLucPhuLuc || ""}
                      type="date"
                      isRequired
                      readOnly={isView}
                      onChange={formik.handleChange}
                      onBlur={() =>
                        handleBlurDate(formik.setFieldValue, formik.values?.ngayCoHieuLucPhuLuc, "ngayCoHieuLucPhuLuc")
                      }
                      errors={formik.errors?.ngayCoHieuLucPhuLuc}
                      touched={formik.touched?.ngayCoHieuLucPhuLuc}
                    />
                  </Col>
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("CONTRACT.ORIGINAL")}
                      name="hopDongGoc"
                      value={formik.values?.hopDongGoc || ""}
                      type="text"
                      readOnly={isView}
                      onChange={formik.handleChange}
                    />
                  </Col>
                  <Col xs={4}>
                    <Autocomplete
                      lable={lang("CONTRACT.SIGNINGSTATUS")}
                      options={signinStatus}
                      value={formik.values?.trangThaiKy || null}
                      name="trangThaiKy"
                      isReadOnly={isView}
                      onChange={(selectedOption) => handleChangeSelect("trangThaiKy", selectedOption)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col
                xs={12}
                className="mt-12 mx-4"
              >
                <span className="fs-3 fw-bold ">{lang("INFO.CHANGE")}</span>
              </Col>
              <Col xs={12}>
                <Row className="ms-8 mt-6">
                  <Col xs={4}>
                    <Autocomplete
                      isRequired
                      lable={lang("CONTRACT.SIGNINGUNIT")}
                      options={[]}
                      value={formik.values?.donViKyHopDong || null}
                      name="donViKyHopDong"
                      isReadOnly={isView}
                      onChange={(selectedOption) => handleChangeSelect("donViKyHopDong", selectedOption)}
                      searchFunction={searchListWorkUnit}
                      searchObject={SEARCH_OBJECT_MAX_SIZE}
                      touched={formik.touched?.donViKyHopDong}
                      errors={formik.errors?.donViKyHopDong}
                    />
                  </Col>
                  <Col xs={4}>
                    <Autocomplete
                      isRequired
                      lable={lang("CONTRACT.JOBPOSITION")}
                      options={[]}
                      value={formik.values?.viTriCongViec || null}
                      name="viTriCongViec"
                      isReadOnly={isView}
                      onChange={(selectedOption) => handleChangeSelect("viTriCongViec", selectedOption)}
                      getOptionLabel={(option) => option?.value}
                      searchFunction={getAllSimpleValue}
                      searchObject={TYPE_CATEGORY.chucDanh}
                      touched={formik.touched?.viTriCongViec}
                      errors={formik.errors?.viTriCongViec}
                    />
                  </Col>
                  <Col xs={4}>
                    <Autocomplete
                      isRequired
                      lable={lang("CONTRACT.TYPE")}
                      options={contractTypes}
                      isReadOnly
                      value={formik.values?.loaiHopDong || null}
                      name="loaiHopDong"
                      onChange={(selectedOption) => handleChangeSelect("loaiHopDong", selectedOption)}
                      touched={formik.touched?.loaiHopDong}
                      errors={formik.errors?.loaiHopDong}
                    />
                  </Col>
                </Row>
                <Row className="ms-8 mt-6">
                  {/* <Col xs={4}>
                    <Autocomplete
                      isRequired
                      lable={lang("CONTRACT.DURATION")}
                      options={contractDuration}
                      value={formik.values?.thoiHanHopDong || null}
                      name="thoiHanHopDong"
                      onChange={(selectedOption) => handleChangeSelect("thoiHanHopDong", selectedOption)}
                      touched={formik.touched?.thoiHanHopDong}
                      errors={formik.errors?.thoiHanHopDong}
                    />
                  </Col> */}
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("CONTRACT.EFFECTIVEDATE")}
                      name="ngayCoHieuLuc"
                      value={formik.values?.ngayCoHieuLuc || ""}
                      type="date"
                      readOnly={isView}
                      onChange={formik.handleChange}
                      onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayCoHieuLuc, "ngayCoHieuLuc")}
                      errors={formik.errors?.ngayCoHieuLuc}
                      touched={formik.touched?.ngayCoHieuLuc}
                    />
                  </Col>
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("CONTRACT.EXPIRATIONDATE")}
                      name="ngayHetHan"
                      value={formik.values?.ngayHetHan || ""}
                      type="date"
                      readOnly={isView || isLongTermContract}
                      onChange={formik.handleChange}
                      onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayHetHan, "ngayHetHan")}
                      errors={formik.errors?.ngayHetHan}
                      touched={formik.touched?.ngayHetHan}
                    />
                  </Col>
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("CONTRACT.BASESALARY")}
                      name="luongCoBan"
                      value={formik.values?.luongCoBan || ""}
                      type="text"
                      readOnly={isView}
                      onChange={formik.handleChange}
                    />
                  </Col>
                </Row>
                <Row className="ms-8 mt-6">
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("CONTRACT.INSURANCECONTRIBUTION")}
                      name="luongDongBaoHiem"
                      value={formik.values?.luongDongBaoHiem || ""}
                      type="text"
                      readOnly={isView}
                      onChange={formik.handleChange}
                    />
                  </Col>
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("CONTRACT.SALARYRATE")}
                      name="tyLeHuongLuong"
                      value={formik.values?.tyLeHuongLuong || ""}
                      type="text"
                      readOnly={isView}
                      onChange={formik.handleChange}
                      touched={formik.touched?.tyLeHuongLuong}
                      errors={formik.errors?.tyLeHuongLuong}
                    />
                  </Col>
                  <Col xs={4}>
                    <Autocomplete
                      lable={lang("CONTRACT.SIGNEDCOMPANYREPRESENTATIVE")}
                      options={[]}
                      isReadOnly={isView}
                      value={formik.values?.nguoiDaiDienCtyKy || null}
                      name="nguoiDaiDienCtyKy"
                      onChange={(selectedOption) => handleChangeSelect("nguoiDaiDienCtyKy", selectedOption)}
                      searchFunction={searchAllEmployee}
                      searchObject={SEARCH_OBJECT_MAX_SIZE}
                    />
                  </Col>
                </Row>
                <Row className="ms-8 mt-6">
                  <Col xs={4}>
                    <Autocomplete
                      lable={lang("CONTRACT.REPRESENTATIVETITLE")}
                      options={[]}
                      value={formik.values?.nguoiDaiDienCtyChucDanh || null}
                      name="nguoiDaiDienCtyChucDanh"
                      isReadOnly={isView}
                      onChange={(selectedOption) => handleChangeSelect("nguoiDaiDienCtyChucDanh", selectedOption)}
                      searchFunction={searchAllSimpleValue}
                      getOptionLabel={(option) => option?.value}
                      searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, type: TYPE_CATEGORY.chucDanh }}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Check
                      label={lang("CONTRACT.HAS_AUTHORITY_PAPER")}
                      name="coGiayUyQuyen"
                      checked={formik.values?.coGiayUyQuyen}
                      readOnly={isView}
                      onChange={handleCheckBoxChange}
                      className="checkBox custom-form-check"
                    />
                  </Col>
                  <Col xs={4}>
                    <TextValidator
                      lable={lang("CONTRACT.NOTE")}
                      name="ghiChu"
                      value={formik.values?.ghiChu || ""}
                      type="text"
                      readOnly={isView}
                      onChange={formik.handleChange}
                    />
                  </Col>
                  <Col xs={4} className="pt-4">
                    <FileUpload
                      isReadOnly={isView}
                      label="CONTRACT.ATTACHMENTS"
                      setFieldValue={(data: string) => {
                        formik.setFieldValue("fileId", data);
                      }}
                      fileName={formik?.values.fileId}
                      allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="btn btn-secondary  btn-sm"
            onClick={handleCLoseAddContractAnnex}
          >
            {lang("BTN.CANCEL")}
          </Button>
          {!isView && (
            <Button
              className="btn btn-primary btn-sm"
              type="submit"
            >
              {lang("BTN.SAVE")}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export { AddNewContractAnnex };
