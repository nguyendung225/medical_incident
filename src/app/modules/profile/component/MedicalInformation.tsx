/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import { VARIABLE_STRING } from "../../utils/Constant";
import { listBloodType } from "../const/DialogConstant";
import { INIT_MEDICAL, REF_TAB } from "../const/ProfileConst";
import { addMedicalInfo } from "../services/ProfileServices";
import { convertDataInfoDto } from "../utils/FunctionUtils";
import useMultiLanguage from "../../../hook/useMultiLanguage";

const MedicalInformation = (props: any) => {
  const { lang } = useMultiLanguage();
  const { identify, employeeProfiles, isView, handleGetEmployee, handleToggleIsView, activeTab } = props;
  useEffect(() => {
    if (identify && activeTab === REF_TAB.TT_KHAC) {
      formik.setValues(employeeProfiles);
    }
  }, [employeeProfiles, activeTab]);

  const handleFormSubmit = async (values: any) => {
    try {
      const dataSubmit = convertDataInfoDto(values);
      const data = await addMedicalInfo(identify, dataSubmit);
      if (data?.data?.code === SUCCESS_CODE) {
        toast.success(lang("TOAST.EDIT.SUCCESS"));
        handleToggleIsView();
        handleGetEmployee(employeeProfiles?.id);
      } else {
        toast.error(data?.data?.message);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: INIT_MEDICAL,
    onSubmit: handleFormSubmit
  });

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    formik.setFieldValue(name, checked);
  };

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Form
      className="form-info"
      onSubmit={formik.handleSubmit}
    >
      <div className="block-content">
        <div className="spaces mb-16 flex flex-between mt-10">
          <span className="spaces fs-18 text-header-table fw-600">{lang("GENERAL.INFO.MEDICAL")}</span>
          {!isView && (
            <button
              className="spaces button-primary"
              type="submit"
            >
              {lang("BTN.SAVE")}
            </button>
          )}
        </div>
        <div className="content mt-0">
          <div>
            <Autocomplete
              lable={lang("INPUT.MEDICAL.BLOODTYPE")}
              name="nhomMau"
              value={formik?.values?.nhomMau || ""}
              options={listBloodType}
              isReadOnly={isView}
              onChange={(value) => handleChangeSelect(VARIABLE_STRING.NHOM_MAU, value)}
            />
          </div>
          <div>
            <TextValidator
              lable={lang("INPUT.MEDICAL.HEIGHT")}
              name="chieuCao"
              value={formik?.values?.chieuCao || ""}
              type="number"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <TextValidator
              lable={lang("INPUT.MEDICAL.WEIGHT")}
              name="canNang"
              value={formik?.values?.canNang || ""}
              type="number"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <TextValidator
              lable={lang("INPUT.MEDICAL.HEALTHCONDITION")}
              name="tinhTrangSucKhoe"
              value={formik?.values?.tinhTrangSucKhoe || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <TextValidator
              lable={lang("INPUT.MEDICAL.DISEASES")}
              name="benhTat"
              value={formik?.values?.benhTat || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <TextValidator
              lable={lang("INPUT.MEDICAL.NOTE")}
              name="luuY"
              value={formik?.values?.luuY || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <Form.Check
            className="custom-form-check"
            label={lang("INPUT.MEDICAL.DISABILITIES")}
            name="nguoiKhuyetTat"
            disabled={isView}
            checked={formik?.values?.nguoiKhuyetTat}
            onChange={handleChangeCheckBox}
          />
        </div>
      </div>
    </Form>
  );
};

export default MedicalInformation;
