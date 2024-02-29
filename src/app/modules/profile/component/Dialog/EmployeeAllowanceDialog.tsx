import { useFormik } from "formik";
import { FC, useContext, useEffect, useState } from "react";
import {Col, Modal, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Autocomplete from "../../../component/input-field/Autocomplete";
import TextValidator from "../../../component/input-field/TextValidator";
import { SUCCESS_CODE } from "../../../contract/const/ContractConst";
import { IAllowance, ILoaiPhuCap } from "../../../contract/services/models/IAllowance";
import { addPhuCap, updatePhuCap } from "../../services/DialogServices";
import { INIT_ALLOWANCE, coGiaHan, heSoPhanTramGiaTri, loaiPhuCapList } from "./../../../contract/const/AllowanceConst";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import FileUpload from "../../../component/FileUpload/FileUpload";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import { RangeDatePicker } from "../../../component/input-field/RangeDatePicker";
import AppContext from "../../../../AppContext";
interface IProps {
  handleCLoseAllowanceDialog: (isAddAndUpdate?: boolean) => void;
  allowanceInfo: IAllowance;
  isView: boolean;
  getListAllowance: () => Promise<void>;
  employeeId: string | undefined;
}

const EmployeeAllowanceDialog: FC<IProps> = (props) => {
  const { handleCLoseAllowanceDialog, getListAllowance, allowanceInfo, employeeId, isView } = props;
  const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const [isAddAndUpdate, setIsAddAndUpdate] = useState(false);

  const validationSchema = Yup.object().shape({
    // tenKhoanPhuCap: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    heSoPhanTramHuong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    thoiGianHieuLucBatDau: Yup.date()
      .required(lang("VALIDATION.REQUIRE"))
      .when('thoiGianHieuLucKetThuc', {
        is: (thoiGianHieuLucKetThuc: Date | null) => thoiGianHieuLucKetThuc && thoiGianHieuLucKetThuc < (new Date()),
        then: Yup.date().max(Yup.ref('thoiGianHieuLucKetThuc'), lang("VALIDATION.MAXDATE") + lang("ALLOWANCE.TIME_EFFECT_END")).nullable(),
      })
      .max(new Date(), lang("VALIDATION.INVALID_ISSUEDATE"))
      .nullable(),
    thoiGianHieuLucKetThuc: Yup.date()
      .min(Yup.ref("thoiGianHieuLucBatDau"), lang("VALIDATION.MINDATE") + lang("ALLOWANCE.TIME_EFFECT_START"))
      .nullable(),
    hinhThucHuong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable()
  });

  const handleSubmit = async (values: IAllowance) => {
    try {
      setPageLoading(true);
      values.employeeId = String(employeeId);
      const res = allowanceInfo?.id ? await updatePhuCap(allowanceInfo?.id, values) : await addPhuCap(values);
      if (res?.data?.code === SUCCESS_CODE) {
        toast.success(allowanceInfo?.id ? lang("TOAST.EDIT.SUCCESS") : lang("TOAST.CREATE.SUCCESS"));
        await getListAllowance();
        handleCLoseAllowanceDialog(isAddAndUpdate);
        setPageLoading(false);
      } else {
        toast.error(`${res?.data?.message}`);
        setPageLoading(false);
      }
    } catch (err) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: INIT_ALLOWANCE,
    onSubmit: handleSubmit,
    validationSchema
  });

  useEffect(() => {
    if (allowanceInfo?.id) {
      formik.setValues(allowanceInfo);
    } else {
      formik.setValues(INIT_ALLOWANCE);
    }
  }, [allowanceInfo]);

  const hanldeChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked);
  };

  const hanleChangeLoaiPhuCap = (value: ILoaiPhuCap) => {
    let hinhThucHuong = "";

    switch (value.heSoPhanTramGiaTri) {
      case heSoPhanTramGiaTri.COEFFICIENT:
        hinhThucHuong = lang("ALLOWANCE.COEFFICIENT");
        break;
      case heSoPhanTramGiaTri.PERCENT:
        hinhThucHuong = lang("ALLOWANCE.PERCENT");
        break;
      case heSoPhanTramGiaTri.MONEY:
        hinhThucHuong = lang("ALLOWANCE.MONEY");
        break;
      default:
        hinhThucHuong = lang("ALLOWANCE.COEFFICIENT");
        break;
    }

    let coGiaHanValue: boolean = false;
    let phuCapBHXH: boolean = false;

    switch (value.coGiaHan) {
      case coGiaHan.KHONG_TICH:
        coGiaHanValue = false;
        phuCapBHXH = false;
        break;
      case coGiaHan.BHXH:
        coGiaHanValue = false;
        phuCapBHXH = true;
        break;
      case coGiaHan.CO_GIA_HAN:
        coGiaHanValue = true;
        phuCapBHXH = false;
        break;
      case coGiaHan.BOTH:
        coGiaHanValue = true;
        phuCapBHXH = true;
        break;
      default:
        coGiaHanValue = false;
        phuCapBHXH = false;
        break;
    }

    formik.setValues({
      ...formik.values,
      tenKhoanPhuCap: value,
      coGiaHan: coGiaHanValue,
      phuCapBHXH,
      hinhThucHuong
    });
  };

  return (
    <Modal
      show={true}
      onHide={() => handleCLoseAllowanceDialog()}
      size="xl"
      className="custom-modal"
      centered
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{lang(`${allowanceInfo ? "GENERAL.ALLOWANCE.UPDATE" : "GENERAL.ALLOWANCE.ADD"}`)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="gap-col-modal">
            <Col xs={4}>
              <Autocomplete
                lable={lang("ALLOWANCE.TYPE")}
                name="tenKhoanPhuCap"
                options={loaiPhuCapList}
                value={formik.values?.tenKhoanPhuCap || null}
                isReadOnly={isView}
                onChange={(value) => hanleChangeLoaiPhuCap(value)}
                // isRequired
                errors={formik.errors?.tenKhoanPhuCap}
                touched={formik.touched?.tenKhoanPhuCap}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("ALOWNCE.BONUS_FORM")}
                name="hinhThucHuong"
                isRequired
                value={formik.values?.hinhThucHuong || ""}
                type="text"
                readOnly={true}
                onChange={formik.handleChange}
                errors={formik.errors?.hinhThucHuong}
                touched={formik.touched?.hinhThucHuong}
              />
            </Col>
            <Col xs={4}>
              <TextValidator
                lable={lang("ALLOWANCE.COEFFICIENT_PERCENT_VALUE")}
                name="heSoPhanTramHuong"
                value={formik.values?.heSoPhanTramHuong || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                isRequired
                errors={formik.errors?.heSoPhanTramHuong}
                touched={formik.touched?.heSoPhanTramHuong}
              />
            </Col>
            <Col xs={4}>
              <RangeDatePicker
                label={lang("ALLOWANCE.TIME_EFFECT")}
                isRequired
                startDateName="thoiGianHieuLucBatDau"
                endDateName="thoiGianHieuLucKetThuc"
                isView={isView}
                handleChange={formik.handleChange}
                value={formik.values}
                setFieldValue={formik.setFieldValue}
                touch={formik.touched}
                errors={formik.errors}
              />
            </Col>
            <Col xs={4} className="flex">
              <Form.Check
                label={lang("ALLOWANCE.BHXH")}
                className="custom-form-check spaces mr-16"
                name="phuCapBHXH"
                checked={formik.values?.phuCapBHXH || false}
                readOnly={true}
              // onChange={hanldeChangeCheckBox}
              />
              {/* </Col>
            <Col xs={2}> */}
              <Form.Check
                label={lang("ALLOWANCE.IS_EXTENSION")}
                className="custom-form-check"
                name="coGiaHan"
                checked={formik.values?.coGiaHan || false}
                readOnly={true}
              // onChange={hanldeChangeCheckBox}
              />
            </Col>
            <Col xs={4}>
              <FileUpload
                isReadOnly={isView}
                label="ALLOWANCE.DOCUMENT_DECISION"
                setFieldValue={(data: string) => {
                  formik.setFieldValue("taiLieuDinhKem", data);
                }}
                fileName={formik.values?.taiLieuDinhKem || ""}
                allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
              />
            </Col>
            <Col xs={12}>
              <TextValidator
                lable={lang("ALLOWANCE.NOTE")}
                name="ghiChu"
                value={formik.values?.ghiChu || ""}
                as="textarea"
                rows={3}
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="flex-center">
          <button
            type="button"
            className="button-gray-outline"
            onClick={() => handleCLoseAllowanceDialog()}
          >
            {lang("BTN.CANCEL")}
          </button>
          {!isView && (
            <button
              type="submit"
              className="button-primary"
            >
              {lang("BTN.SAVE")}
            </button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export { EmployeeAllowanceDialog };
