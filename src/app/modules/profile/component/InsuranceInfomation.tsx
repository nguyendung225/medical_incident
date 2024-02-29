/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import { getAllProvince } from "../../services";
import { VARIABLE_STRING } from "../../utils/Constant";
import { INIT_WORK, REF_TAB } from "../const/ProfileConst";
import { EmployeeProfile } from "../models/ProfileModels";
import { handleAddWorkInfo } from "../services/ProfileServices";
import { convertDataInfoDto } from "../utils/FunctionUtils";

type IProps = {
  identify: string;
  isView: boolean;
  employeeProfiles: EmployeeProfile;
  handleGetEmployee: (id: string) => Promise<void>;
  formikRef: any;
  activeTab: string;
};

export const InsuranceInfomation: React.FC<IProps> = ({
  identify,
  isView,
  employeeProfiles,
  handleGetEmployee,
  formikRef,
  activeTab
}) => {
  const intl = useIntl();

  const handleFormSubmit = async (values: any) => {
    try {
      const dataInfo = convertDataInfoDto(values);
      let value = {
        ...dataInfo,
        donViCongTacId: employeeProfiles?.donViCongTacId,
        donViCongTacText: employeeProfiles?.donViCongTacText,
        viTriCongViecId: employeeProfiles?.viTriCongViecId,
        viTriCongViecText: employeeProfiles?.viTriCongViecText,
        phongBanId: employeeProfiles?.phongBanId,
        phongBanText: employeeProfiles?.phongBanText
      };
      if (!employeeProfiles?.id) return;
      const { data } = await handleAddWorkInfo(value, employeeProfiles?.id);
      if (data?.code === SUCCESS_CODE) {
        toast.success(intl.formatMessage({ id: "TOAST.EDIT.SUCCESS" }));
        handleGetEmployee(employeeProfiles?.id);
      }
    } catch (err) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  };

  const formik = useFormik({
    initialValues: INIT_WORK,
    onSubmit: handleFormSubmit
  });

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  useEffect(() => {
    if (identify && activeTab === REF_TAB.BAO_HIEM) {
      let values = {
        ...formik.values,
        ngayThamGiaBaoHiem: employeeProfiles?.ngayThamGiaBaoHiem,
        tiLeDongBaoHiem: employeeProfiles?.tiLeDongBaoHiem,
        soSoBhxh: employeeProfiles?.soSoBhxh,
        tinhCapBhxh: employeeProfiles?.tinhCapBhxh,
        maTinhCapBhxh: employeeProfiles?.maTinhCapBhxh,
        soTheBhyt: employeeProfiles?.soTheBhyt,
        noiDkKcb: employeeProfiles?.noiDkKcb,
        maSoNoiDkKcb: employeeProfiles?.maSoNoiDkKcb
      }
      formik.setValues(values);
    }
  }, [employeeProfiles, activeTab]);

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    formik.setFieldValue(name, checked);
  };

  return (
    <Form className="form-info" onSubmit={formik.handleSubmit}>
      <div className="block-content">
        <div className="content w-100">
          <div>
            <TextValidator
              lable={intl.formatMessage({
                id: "GENERAL.ENSURANCE.START_DATE"
              })}
              name="ngayThamGiaBaoHiem"
              type="date"
              value={formik.values?.ngayThamGiaBaoHiem || ""}
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <TextValidator
              lable={intl.formatMessage({
                id: "GENERAL.ENSURANCE.PERCENT"
              })}
              name="tiLeDongBaoHiem"
              value={formik.values?.tiLeDongBaoHiem || ""}
              type="number"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <TextValidator
              lable={intl.formatMessage({ id: "GENERAL.ENSURANCE.NUMBER" })}
              name="soSoBhxh"
              value={formik.values?.soSoBhxh || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Autocomplete
              lable={intl.formatMessage({
                id: "GENERAL.ENSURANCE.ISSUE_PLACE"
              })}
              name="tinhCapBhxh"
              value={formik.values?.tinhCapBhxh || ""}
              searchFunction={getAllProvince}
              searchObject={{}}
              isReadOnly={isView}
              onChange={(selectedOption) =>
                handleChangeSelect(
                  VARIABLE_STRING.TINH_CAP_BHXH,
                  selectedOption
                )
              }
              options={[]}
            />
          </div>

          <div>
            <TextValidator
              lable={intl.formatMessage({ id: "GENERAL.PROVINCE_CODE" })}
              name="maTinhCapBhxh"
              value={formik.values?.maTinhCapBhxh || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <TextValidator
              lable={intl.formatMessage({
                id: "GENERAL.ENSURANCE.HEALTH_NUMBER"
              })}
              name="soTheBhyt"
              value={formik.values?.soTheBhyt || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Autocomplete
              lable={intl.formatMessage({
                id: "GENERAL.EMPLOYEE.KCB_REGISTER_PLACE"
              })}
              name="noiDkKcb"
              value={formik.values?.noiDkKcb || ""}
              searchFunction={getAllProvince}
              searchObject={{}}
              isReadOnly={isView}
              onChange={(selectedOption) =>
                handleChangeSelect(
                  VARIABLE_STRING.NOI_DK_KCB,
                  selectedOption
                )
              }
              options={[]}
            />
          </div>
          <div>
            <TextValidator
              lable={intl.formatMessage({
                id: "GENERAL.EMPLOYEE.KCB_REGISTER_PLACE_CODE"
              })}
              name="maSoNoiDkKcb"
              value={formik.values?.maSoNoiDkKcb || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};