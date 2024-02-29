/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import Autocomplete from "../../component/input-field/Autocomplete";
import { heightAutocomplete } from "../../component/input-field/StyleComponent";
import TextValidator from "../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../constant";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import { getAllSimpleValue } from "../../services";
import { RESPONSE_STATUS_CODE, TYPE, VARIABLE_STRING } from "../../utils/Constant";
import { handleBlurDate, useCustomIntl } from "../../utils/FunctionUtils";
import { REF_TAB, INIT_TT_DOAN, INIT_TT_DANG, INIT_TT_CHINH_TRI } from "../const/ProfileConst";
import { EmployeeProfile } from "../models/ProfileModels";
import { addNewPoliticInfo, getPoliticInfo, updatePoliticInfo } from "../services/ProfileServices";
import { convertDataInfoDto } from "../utils/FunctionUtils";

type IProps = {
  identify: string;
  employeeProfiles: EmployeeProfile;
  isView: boolean;
  handleGetEmployee: (id: string) => Promise<void>;
  formikRef: any;
  handleToggleIsView: () => void;
  activeTab: string;
}

const PoliticsInformation: React.FC<IProps> = ({
  identify,
  employeeProfiles,
  isView,
  handleGetEmployee,
  formikRef,
  handleToggleIsView,
  activeTab
}) => {
  const intl = useIntl();

  const handleFormSubmit = async (values: any) => {
    try {
      const dataSubmit = convertDataInfoDto(values);
      const dataPoliticRes = dataSubmit?.id ? await updatePoliticInfo(dataSubmit?.id, dataSubmit) : await addNewPoliticInfo({...dataSubmit, employeeId: identify});
      if (dataPoliticRes?.data?.code === SUCCESS_CODE) {
        toast.success(dataSubmit?.id ? intl.formatMessage({ id: "TOAST.EDIT.SUCCESS" }) : intl.formatMessage({ id: "TOAST.ADD.SUCCESS" }));
        handleToggleIsView()
        handleGetEmployee(employeeProfiles?.id || "");
      } else {
        toast.error(`${dataPoliticRes?.data?.message}`);
      }
    } catch (error) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  };

  const getDataPolitic = async () => {
    try {
      const { data }: any = await getPoliticInfo(identify);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        let values = {
          ...data?.data,
          chucVuDoan: {
            id: data?.data?.chucVuDoanId,
            value: data?.data?.chucVuDoanText
          }
        }
        formik.setValues({
          ...formik.values,
          ...values
        })
        return
      }
    } catch (error) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  };

  const formik = useFormik({
    initialValues: INIT_TT_CHINH_TRI,
    onSubmit: handleFormSubmit
  });

  useEffect(() => {
    if(!identify || activeTab !== REF_TAB.TT_CHINH_TRI) return;
    getDataPolitic();
  }, [identify, activeTab]);

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    switch (name) {
      case VARIABLE_STRING.DOAN_VIEN:
        formik.setValues({
          ...formik.values,
          doanVien: checked,
          ...INIT_TT_DOAN
        });
        break;
      case VARIABLE_STRING.DANG_VIEN:
        formik.setValues({
          ...formik.values,
          ...INIT_TT_DANG,
          dangVien: checked
        });
        break;
      case VARIABLE_STRING.NGOAI_CHI_BO_QUAN_LY:
        formik.setValues({
          ...formik.values,
          chiBoSinhHoat: "",
          hienNayTaiDangBo: "",
          hienNayChucVuDang: "",
          hienNayNgayChuyenDenChiBoHienTai: "",
          ngoaiChiBoQuanLy: checked
        });
        break;
      case VARIABLE_STRING.HIEN_NAY_DA_ROI_DANG:
        formik.setValues({
          ...formik.values,
          hienNayNgayRoiDang: "",
          hienNayLyDoRoiDang: "",
          hienNayDaRoiDang: checked
        });
        break;
      default:
        formik.setFieldValue(name, checked);
        break;
    }
  };

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Form
        className="form-info politics-information"
        onSubmit={formik.handleSubmit}
      >
        <div className="block-content">
          <Row>
            <Col xs={3}>
              <Form.Check
                className="w-100 custom-form-check"
                label={intl.formatMessage({ id: "INPUT.UNION.MEMBER" })}
                name="doanVien"
                disabled={isView}
                checked={formik.values?.doanVien}
                onChange={handleChangeCheckBox}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                className="spaces input-politics mt-0"
                type="date"
                lable={intl.formatMessage({ id: "INPUT.UNION.JOIN.DATE" })}
                name="ngayVaoDoan"
                value={formik.values?.ngayVaoDoan || ""}
                readOnly={isView ? true : formik.values?.doanVien ? false : true}
                onChange={formik.handleChange}
                onBlur={() =>
                  handleBlurDate(
                    formik.setFieldValue,
                    formik.values?.ngayVaoDoan,
                    "ngayVaoDoan"
                  )
                }
              />
            </Col>
            <Col xs={3}>
              <Autocomplete
                styles={heightAutocomplete("29px")}
                lable={intl.formatMessage({ id: "INPUT.UNION.ROLE" })}
                name="chucVuDoanId"
                value={formik.values?.chucVuDoan || null}
                searchFunction={getAllSimpleValue}
                searchObject={TYPE_CATEGORY.chucVuDoan}
                isReadOnly={isView ? true : formik.values?.doanVien ? false : true}
                onChange={(value) => handleChangeSelect(VARIABLE_STRING.CHUC_VU_DOAN, value)}
                options={[]}
                getOptionLabel={(options) => options.value}
              />
            </Col>
            <Col xs={3}>
              <TextValidator
                className="input-politics spaces mt-0"
                lable={intl.formatMessage({ id: "INPUT.UNION.JOIN.PLACE" })}
                name="noiKetNapDoan"
                value={formik.values?.noiKetNapDoan || ""}
                type="text"
                readOnly={isView ? true : formik.values?.doanVien ? false : true}
                onChange={formik.handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <Form.Check
                className="w-100 custom-form-check"
                label={intl.formatMessage({ id: "INPUT.PARTY.MEMBER" })}
                name="dangVien"
                disabled={isView}
                checked={formik.values?.dangVien}
                onChange={handleChangeCheckBox}
              />
            </Col>
            <Row className="spaces mt-10">
              <Col xs={6}>
                <h2>{useCustomIntl("INPUT.POLITICAL.PARTY_MEMBER_INFO")}</h2>
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.PARTY_CARD_NUMBER")}
                  name="soThe"
                  value={formik.values.soThe}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.CARD_ISSUANCE_DATE")}
                  name="ngayCapThe"
                  value={formik.values.ngayCapThe}
                  type="date"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(
                      formik.setFieldValue,
                      formik.values?.ngayCapThe,
                      "ngayCapThe"
                    )
                  }
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.CARD_ISSUING_PARTY")}
                  name="dangBoCapThe"
                  value={formik.values.dangBoCapThe}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col xs={6}>
                <h2>
                  {useCustomIntl("INPUT.POLITICAL.OFFCIAL_UNION_ADMINSSION")}
                </h2>
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.ADMISSION_DATE")}
                  name="ngayKetNap"
                  value={formik.values.ngayKetNap}
                  type="date"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(
                      formik.setFieldValue,
                      formik.values?.ngayKetNap,
                      "ngayKetNap"
                    )
                  }
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.AT_THE_DIVISION")}
                  name="chiBoKetNap"
                  value={formik.values.chiBoKetNap}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.AT_THE_PARTY")}
                  name="dangBoKetNapDang"
                  value={formik.values.dangBoKetNapDang}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
              </Col>
            </Row>

            <Row className="spaces mt-10">
              <Col xs={6}>
                <h2>
                  {useCustomIntl(
                    "INPUT.POLITICAL.INFO_ON_RESERE_PARTY_FORMATION"
                  )}
                </h2>
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.ADMISSION_DATE")}
                  name="duBiNgayKetNap"
                  value={formik.values.duBiNgayKetNap}
                  type="date"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(
                      formik.setFieldValue,
                      formik.values?.duBiNgayKetNap,
                      "duBiNgayKetNap"
                    )
                  }
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.AT_THE_DIVISION")}
                  name="duBiChiBo"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  value={formik.values.duBiChiBo}
                  type="text"
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.AT_THE_PARTY")}
                  name="duBiTaiDangBo"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  value={formik.values.duBiTaiDangBo}
                  type="text"
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.PRESENTER_FIRST")}
                  name="duBiNguoiGioiThieu1"
                  value={formik.values.duBiNguoiGioiThieu1}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="h-auto-input spaces mt-16"
                  lable={useCustomIntl("INPUT.POLITICAL.DOING_WHAT_WHERE")}
                  name="duBiThongTinNguoiGioiThieu1"
                  value={formik.values.duBiThongTinNguoiGioiThieu1}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  rows={2}
                  onChange={formik.handleChange}
                  as={TYPE.TEXTAREA}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.PRESENTER_SECEND")}
                  name="duBiNguoiGioiThieu2"
                  value={formik.values.duBiNguoiGioiThieu2}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="h-auto-input spaces mt-16"
                  lable={useCustomIntl("INPUT.POLITICAL.DOING_WHAT_WHERE")}
                  name="duBiThongTinNguoiGioiThieu2"
                  value={formik.values.duBiThongTinNguoiGioiThieu2}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  as={TYPE.TEXTAREA}
                  rows={2}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col xs={6}>
                <h2>
                  {useCustomIntl(
                    "INPUT.POLITICAL.PARTY_ADMISSION_INFORMATION_FOR_THE_SECOND"
                  )}
                </h2>
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.ADMISSION_DATE")}
                  name="ngayKetNapDangLan2"
                  value={formik.values.ngayKetNapDangLan2}
                  type="date"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(
                      formik.setFieldValue,
                      formik.values?.ngayKetNapDangLan2,
                      "ngayKetNapDangLan2"
                    )
                  }
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.AT_THE_DIVISION")}
                  name="chiBoKetNapLan2"
                  value={formik.values.chiBoKetNapLan2}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.AT_THE_PARTY")}
                  name="dangBoKetNapDangLan2"
                  value={formik.values.dangBoKetNapDangLan2}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl("INPUT.POLITICAL.PRESENTER")}
                  name="lan2NguoiGioiThieu"
                  value={formik.values.lan2NguoiGioiThieu}
                  type="text"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  className="input-politics"
                  lable={useCustomIntl(
                    "INPUT.POLITICAL.DATE_OF_LEAVING_THE_PARTY_FOR_THE_FIRST_TIME"
                  )}
                  name="ngayRaKhoiDang"
                  value={formik.values.ngayRaKhoiDang}
                  type="date"
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                  onBlur={() =>
                    handleBlurDate(
                      formik.setFieldValue,
                      formik.values?.ngayRaKhoiDang,
                      "ngayRaKhoiDang"
                    )
                  }
                />
                <TextValidator
                  className="h-auto-input spaces mt-16"
                  lable={useCustomIntl(
                    "INPUT.POLITICAL.REASON_FOR_INTERRUPTION"
                  )}
                  name="lyDoGianDoan"
                  value={formik.values.lyDoGianDoan}
                  as={TYPE.TEXTAREA}
                  rows={2}
                  readOnly={isView ? true : formik.values?.dangVien ? false : true}
                  onChange={formik.handleChange}
                />
              </Col>
            </Row>
            <Row className="spaces mt-10">
              <h2>
                {useCustomIntl("INPUT.POLITICAL.CURRENT_PARTY_INFORMATION")}
              </h2>
              <div className="content">
                <Form.Check
                  className="w-100 custom-form-check"
                  label={useCustomIntl(
                    "INPUT.POLITICAL.OUTSIDE_THE_MANAGEMENT_MINISTRY"
                  )}
                  name="ngoaiChiBoQuanLy"
                  disabled={isView ? true : formik.values?.dangVien ? false : true}
                  checked={formik.values?.ngoaiChiBoQuanLy}
                  onChange={handleChangeCheckBox}
                />
                {formik.values?.ngoaiChiBoQuanLy && (
                  <>
                    <TextValidator
                      className="input-politics"
                      lable={useCustomIntl(
                        "INPUT.POLITICAL.PARTY_ACTIVITIES_DIVISION"
                      )}
                      name="chiBoSinhHoat"
                      readOnly={isView ? true : formik.values?.dangVien ? false : true}
                      value={formik.values.chiBoSinhHoat}
                      onChange={formik.handleChange}
                    />
                    <TextValidator
                      className="input-politics"
                      lable={useCustomIntl("INPUT.POLITICAL.AT_THE_PARTY")}
                      name="hienNayTaiDangBo"
                      readOnly={isView ? true : formik.values?.dangVien ? false : true}
                      value={formik.values.hienNayTaiDangBo}
                      onChange={formik.handleChange}
                    />
                    <TextValidator
                      className="input-politics"
                      lable={useCustomIntl("INPUT.POLITICAL.PARTY_POSITION")}
                      name="hienNayChucVuDang"
                      readOnly={isView ? true : formik.values?.dangVien ? false : true}
                      value={formik.values.hienNayChucVuDang}
                      onChange={formik.handleChange}
                    />
                    <TextValidator
                      className="input-politics"
                      lable={useCustomIntl(
                        "INPUT.POLITICAL.DAY_OF_TRANSFER_TO_THE_PARTY_MINISTRY"
                      )}
                      name="hienNayNgayChuyenDenChiBoHienTai"
                      value={formik.values.hienNayNgayChuyenDenChiBoHienTai}
                      type="date"
                      readOnly={isView ? true : formik.values?.dangVien ? false : true}
                      onChange={formik.handleChange}
                      onBlur={() =>
                        handleBlurDate(
                          formik.setFieldValue,
                          formik.values?.hienNayNgayChuyenDenChiBoHienTai,
                          "hienNayNgayChuyenDenChiBoHienTai"
                        )
                      }
                    />
                  </>
                )}
              </div>
              <div className="content">
                <Form.Check
                  className="w-100 custom-form-check"
                  label={useCustomIntl("INPUT.POLITICAL.LEFT_THE_PARTY")}
                  name="hienNayDaRoiDang"
                  disabled={isView ? true : formik.values?.dangVien ? false : true}
                  checked={formik.values?.hienNayDaRoiDang}
                  onChange={handleChangeCheckBox}
                />
                {formik.values?.hienNayDaRoiDang && (
                  <>
                    <TextValidator
                      className="input-politics"
                      lable={useCustomIntl(
                        "INPUT.POLITICAL.DAY_OF_LEAVING_THE_PARTY"
                      )}
                      name="hienNayNgayRoiDang"
                      readOnly={isView ? true : formik.values?.dangVien ? false : true}
                      type="date"
                      value={formik.values.hienNayNgayRoiDang}
                      onChange={formik.handleChange}
                      onBlur={() =>
                        handleBlurDate(
                          formik.setFieldValue,
                          formik.values?.hienNayNgayRoiDang,
                          "hienNayNgayRoiDang"
                        )
                      }
                    />
                    <TextValidator
                      className="input-politics"
                      lable={useCustomIntl(
                        "INPUT.POLITICAL.REASON_FOR_LEAVING_THE_PARTY"
                      )}
                      name="hienNayLyDoRoiDang"
                      readOnly={isView ? true : formik.values?.dangVien ? false : true}
                      value={formik.values.hienNayLyDoRoiDang}
                      onChange={formik.handleChange}
                    />
                  </>
                )}
              </div>
            </Row>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default PoliticsInformation;
