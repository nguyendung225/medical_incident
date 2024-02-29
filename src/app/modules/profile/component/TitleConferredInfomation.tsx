import { Form } from "react-bootstrap";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import TextValidator from "../../component/input-field/TextValidator";
import Autocomplete from "../../component/input-field/Autocomplete";
import { INIT_TITLE_CONFERRED, TITLE_CONFERRED } from "../const/ProfileConst";
import * as Yup from "yup";
import { RESPONSE_STATUS_CODE, VARIABLE_STRING } from "../../utils/Constant";
import { updateDanhHieuPhongTang } from "../services/ProfileServices";
import { useEffect } from "react";

interface Iprops {
  identify: string;
  isView: boolean;
  employeeProfiles: any;
  activeTab: string;
}

function TitleConferredInfomation(props: Iprops) {
  const { identify, isView, employeeProfiles, activeTab } = props;
  const { lang } = useMultiLanguage();

  useEffect(() => {
    if (employeeProfiles?.id) {
      formik.setValues({
        danhHieu: employeeProfiles?.danhHieu || null,
        namPhongTang: employeeProfiles?.namPhongTang || null
      });
    }
  }, [employeeProfiles]);

  const handleFormSubmit = async (values: any) => {
    try {
      const { data } = await updateDanhHieuPhongTang(identify, values);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        toast.success(lang("TOAST.EDIT.SUCCESS"));
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const validationSchema = Yup.object().shape({
    namPhongTang: Yup.number()
      .min(1900, lang("VALIDATION.MIN_YEAR"))
      .max(new Date().getFullYear(), lang("VALIDATON.YEAR_CURRENT"))
      .nullable()
  });

  const formik = useFormik({
    initialValues: INIT_TITLE_CONFERRED,
    onSubmit: handleFormSubmit,
    validationSchema
  });

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Form
      className="form-info"
      onSubmit={formik.handleSubmit}
    >
      <div className="block-content">
        <div className="spaces mb-16 flex flex-between">
          <span className="spaces fs-18 text-header-table fw-600">{lang("INPUT.TITLE_CONFERRED")}</span>
          {!isView && (
            <button
              className="spaces button-primary"
              type="submit"
            >
              {lang("BTN.SAVE")}
            </button>
          )}
        </div>
        <div className="content m-0">
          <div className="z-50">
            <Autocomplete
              lable={lang("INPUT.TITLE")}
              name="danhHieu"
              value={formik?.values?.danhHieu || null}
              isReadOnly={isView}
              onChange={(value) => handleChangeSelect(VARIABLE_STRING.DANH_HIEU, value)}
              options={TITLE_CONFERRED}
            />
          </div>
          <div className="z-50">
            <TextValidator
              lable={lang("INPUT.YEAR_OF_CONFERMENT")}
              name="namPhongTang"
              type="number"
              value={formik.values?.namPhongTang}
              readOnly={isView}
              onChange={formik.handleChange}
              touched={formik.touched?.namPhongTang}
              errors={formik.errors?.namPhongTang}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default TitleConferredInfomation;
