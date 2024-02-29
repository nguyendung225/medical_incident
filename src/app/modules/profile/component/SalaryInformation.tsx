/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../constant";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import { getAllSimpleValue } from "../../services";
import { VARIABLE_STRING } from "../../utils/Constant";
import { EmployeeProfile } from "../models/ProfileModels";
import { updateBank } from "../services/DialogServices";
import * as Yup from "yup";
import Allowance from "./Partials/Allowance/Allowance";
import Deduct from "./Partials/Deduct/Deduct";
import SalaryDevelopment from "./Partials/SalaryDevelopment/SalaryDevelopment";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { IBank } from "../models/DialogModels";
import { INIT_BANK } from "../const/DialogConstant";
import { REF_TAB } from "../const/ProfileConst";

type IProps = {
  identify: string;
  activeTab: string;
  isView: boolean;
  employeeProfiles: EmployeeProfile;
  handleGetEmployee: (id: string) => Promise<void>;
  formikRef: any;
};

export const SalaryInformation: React.FC<IProps> = (props) => {
  const { formikRef, identify, isView, employeeProfiles, activeTab } = props;
  const { lang } = useMultiLanguage();

  const handleFormSubmit = async (values: IBank) => {
    try {
      const dataSubmit: IBank = {
        ...values,
        nganHangId: values?.nganHang?.id || "",
        nganHangText: String(values?.nganHang?.value || "")
      };
      if (!employeeProfiles?.id) return;
      const data = await updateBank(dataSubmit, employeeProfiles?.id);
      if (data?.data?.code === SUCCESS_CODE) {
        toast.success(lang("TOAST.EDIT.SUCCESS"));
      }
    } catch (err) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const validationSchema = Yup.object().shape({
    tkNganHang: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    nganHang: Yup.object().shape({}).required(lang("VALIDATION.REQUIRE")).nullable()
  });

  const formik = useFormik({
    initialValues: INIT_BANK,
    onSubmit: handleFormSubmit
    // validationSchema: validationSchema,
  });

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (employeeProfiles?.id) {
      formik.setValues({
        ...formik.values,
        chiNhanh: employeeProfiles?.chiNhanh || "",
        nganHang: employeeProfiles?.nganHang || null,
        tkNganHang: employeeProfiles?.tkNganHang || ""
      });
    }
  }, [employeeProfiles]);

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  return (
    <>
      <Form
        className="form-info"
        onSubmit={formik.handleSubmit}
      >
        <div className="block-content">
          <span className="text-header">{lang("SALARY.BANK.INFOMATION")}</span>
          <div className="content">
            <div className="z-50">
              <TextValidator
                // isRequired
                lable={lang("GENERAL.EMPLOYEE.BANK_NUMBER")}
                name="tkNganHang"
                value={formik.values?.tkNganHang || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
                // errors={formik.errors?.tkNganHang}
                // touched={formik.touched?.tkNganHang}
              />
            </div>

            <div className="z-50">
              <Autocomplete
                // isRequired
                lable={lang("INPUT.SALARY.BANK")}
                name="nganHang"
                value={formik.values?.nganHang || null}
                searchFunction={getAllSimpleValue}
                searchObject={TYPE_CATEGORY.nganHang}
                isReadOnly={isView}
                onChange={(value) => handleChangeSelect(VARIABLE_STRING.NGAN_HANG, value)}
                options={[]}
                getOptionLabel={(option) => option?.value}
                // errors={formik.errors?.nganHang}
                // touched={formik.touched?.nganHang}
              />
            </div>

            <div className="z-50">
              <TextValidator
                lable={lang("GENERAL.EMPLOYEE.RANK_BRANCH")}
                name="chiNhanh"
                value={formik.values?.chiNhanh || ""}
                type="text"
                readOnly={isView}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
      </Form>
      <div className="form-info">
        <SalaryDevelopment
          isView={isView}
          identify={identify}
          employeeProfiles={employeeProfiles}
          activeTab={activeTab}
        />
        <Allowance
          isView={isView}
          identify={identify}
          isCallApi={activeTab === REF_TAB.TT_LUONG}
        />
        <Deduct
          isView={isView}
          identify={identify}
          employeeProfiles={employeeProfiles}
          isCallApi={activeTab === REF_TAB.TT_LUONG}
        />
      </div>
    </>
  );
};
