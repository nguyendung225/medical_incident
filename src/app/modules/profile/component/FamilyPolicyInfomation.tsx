import { Form } from "react-bootstrap";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import TextValidator from "../../component/input-field/TextValidator";
import Autocomplete from "../../component/input-field/Autocomplete";
import { INIT_FAMILY_POLICY, POLICY, POLICY_CODE } from "../const/ProfileConst";
import * as Yup from "yup";
import { RESPONSE_STATUS_CODE, VARIABLE_STRING } from "../../utils/Constant";
import { getAllSimpleValue } from "../../services";
import { TYPE_CATEGORY } from "../../constant";
import { useEffect, useState } from "react";
import { updateThongTinGiaDinhChinhSach } from "../services/ProfileServices";

interface Iprops {
  identify: string;
  isView: boolean;
  employeeProfiles: any;
  activeTab: string;
}

function FamilyPolicyInfomation(props: Iprops) {
  const { identify, isView, employeeProfiles, activeTab } = props;
  const { lang } = useMultiLanguage();

  const [isThuongBinh, setIsThuongBinh] = useState(false);

  useEffect(() => {
    if (employeeProfiles?.id) {
      formik.setValues({
        chinhSach: employeeProfiles?.chinhSach || null,
        hangThuongBinh: employeeProfiles?.hangThuongBinhId
          ? {
              id: employeeProfiles?.hangThuongBinhId || "",
              value: employeeProfiles?.hangThuongBinhText || ""
            }
          : null,
        hinhThucThuongTat: employeeProfiles?.hinhThucThuongTat || "",
        namThuongTat: employeeProfiles?.namThuongTat || null,
        laThuongBinh: employeeProfiles?.laThuongBinh,
        laGiaDinhChinhSach: employeeProfiles?.laGiaDinhChinhSach,
        laGiaDinhCoCongCachMang: employeeProfiles?.laGiaDinhCoCongCachMang
      });
      setIsThuongBinh(employeeProfiles?.chinhSach?.code === POLICY_CODE.THUONG_BINH);
    }
  }, [employeeProfiles]);

  const handleFormSubmit = async (values: any) => {
    try {
      const dataSubmit = {
        ...values,
        hangThuongBinhId: values?.hangThuongBinh?.id || "",
        hangThuongBinhText: values?.hangThuongBinh?.value || ""
      };
      const { data } = await updateThongTinGiaDinhChinhSach(identify, dataSubmit);
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
    namThuongTat: Yup.number()
      .min(1900, lang("VALIDATION.MIN_YEAR"))
      .max(new Date().getFullYear(), lang("VALIDATON.YEAR_CURRENT"))
      .nullable()
  });

  const formik = useFormik({
    initialValues: INIT_FAMILY_POLICY,
    onSubmit: handleFormSubmit,
    validationSchema
  });

  const handleChangeSelect = (name: string, value: any) => {
    const {
      THUONG_BINH,
      NHU_THUONG_BINH,
      THUONG_BINH_DAC_BIET,
      ANH_HUNG_VU_TRANG,
      ANH_HUNG_LAO_DONG,
      ME_VNAH,
      DICH_BAT_TU_DAY,
      LAO_THANH_CACH_MANG,
      CHAT_DOC_GIA_CAM
    } = POLICY_CODE;

    if (name === VARIABLE_STRING.CHINH_SACH) {
      setIsThuongBinh(value?.code === THUONG_BINH);
      formik.setValues({
        ...formik.values,
        [name]: value,
        laThuongBinh: [THUONG_BINH, NHU_THUONG_BINH, THUONG_BINH_DAC_BIET].includes(value?.code),
        laGiaDinhCoCongCachMang: [
          ANH_HUNG_VU_TRANG,
          ANH_HUNG_LAO_DONG,
          ME_VNAH,
          DICH_BAT_TU_DAY,
          LAO_THANH_CACH_MANG,
          CHAT_DOC_GIA_CAM
        ].includes(value?.code)
      });
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    formik.setFieldValue(name, checked);
  };

  return (
    <Form
      className="form-info relative z-index-2"
      onSubmit={formik.handleSubmit}
    >
      <div className="block-content">
        <div className="spaces mb-16 flex flex-between">
          <span className="spaces fs-18 text-header-table fw-600">{lang("INPUT.FAMILY_POCIFY_TILTE")}</span>
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
          <div>
            <Autocomplete
              lable={lang("INPUT.POCIFY")}
              name="chinhSach"
              value={formik?.values?.chinhSach || null}
              isReadOnly={isView}
              onChange={(value) => handleChangeSelect(VARIABLE_STRING.CHINH_SACH, value)}
              options={POLICY}
            />
          </div>
          <div>
            <Form.Check
              label={lang("INPUT.WOUNDED_SOLIDER")}
              name="laThuongBinh"
              checked={formik.values?.laThuongBinh || false}
              readOnly={isView}
              onChange={handleCheckBoxChange}
              className="checkBox custom-form-check"
              disabled={isView}
            />
          </div>
          <div>
            <Form.Check
              label={lang("INPUT.IS_FAMILY_POCIFY")}
              name="laGiaDinhChinhSach"
              checked={formik.values?.laGiaDinhChinhSach || false}
              readOnly={isView}
              onChange={handleCheckBoxChange}
              className="checkBox custom-form-check"
              disabled={isView}
            />
          </div>
          <div>
            <Form.Check
              label={lang("INPUT.FAMILY_WITH_REVOLUTONERY_MERIT")}
              name="laGiaDinhCoCongCachMang"
              checked={formik.values?.laGiaDinhCoCongCachMang || false}
              readOnly={isView}
              onChange={handleCheckBoxChange}
              className="checkBox custom-form-check"
              disabled={isView}
            />
          </div>
          {isThuongBinh && (
            <>
              <div>
                <Autocomplete
                  lable={lang("INPUT.WOUNDED_RANK")}
                  name="hangThuongBinh"
                  value={formik?.values?.hangThuongBinh || null}
                  isReadOnly={isView}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.HANG_THUONG_BINH2, value)}
                  options={[]}
                  searchFunction={getAllSimpleValue}
                  searchObject={TYPE_CATEGORY.hangThuongBenhBinh}
                  getOptionLabel={(options) => options?.value}
                />
              </div>
              <div>
                <TextValidator
                  lable={lang("INPUT.FORM_OF_INJURY")}
                  name="hinhThucThuongTat"
                  type="text"
                  value={formik.values?.hinhThucThuongTat}
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <TextValidator
                  lable={lang("INPUT.YEAR_OF_INJURY")}
                  name="namThuongTat"
                  type="number"
                  value={formik.values?.namThuongTat}
                  readOnly={isView}
                  onChange={formik.handleChange}
                  touched={formik.touched?.namThuongTat}
                  errors={formik.errors?.namThuongTat}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Form>
  );
}

export default FamilyPolicyInfomation;
