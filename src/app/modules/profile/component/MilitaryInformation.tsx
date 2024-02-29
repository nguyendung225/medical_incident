/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../constant";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import { getAllSimpleValue } from "../../services";
import { VARIABLE_STRING } from "../../utils/Constant";
import { INIT_MILITARY, REF_TAB } from "../const/ProfileConst";
import { addQuanDoi, getQuanDoi } from "../services/ProfileServices";
import { convertDataInfoDto, convertDataUI } from "../utils/FunctionUtils";
import useMultiLanguage from "../../../hook/useMultiLanguage";

const MilitaryInformation = (props: any) => {
  const { lang } = useMultiLanguage();
  const { identify, employeeProfiles, isView, handleToggleIsView, activeTab } = props;

  useEffect(() => {
    if (identify && activeTab === REF_TAB.TT_KHAC) {
      updateMititaryInfo();
    }
  }, [employeeProfiles, activeTab]);

  const updateMititaryInfo = async () => {
    try {
      const { data } = await getQuanDoi(identify);
      if (data?.code === SUCCESS_CODE && data?.data) {
        formik.setValues(convertDataUI(data?.data));
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const dataSubmit = convertDataInfoDto({ ...values, employeeId: identify, quanNhan: true });
      const { data } = await addQuanDoi(identify, dataSubmit);
      if (data?.code === SUCCESS_CODE) {
        let message = values?.id ? lang("TOAST.EDIT.SUCCESS") : lang("TOAST.CREATE.SUCCESS");
        toast.success(message);
        handleToggleIsView();
        updateMititaryInfo();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: INIT_MILITARY,
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
        <div className="spaces mb-16 flex flex-between">
          <span className="spaces fs-18 text-header-table fw-600">{lang("GENERAL.INFO.MILITARY")}</span>
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
            <TextValidator
              type="date"
              lable={lang("INPUT.MILITARY.JOIN.DATE")}
              name="ngayNhapNgu"
              value={formik?.values?.ngayNhapNgu || ""}
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div className="z-50">
            <Autocomplete
              lable={lang("INPUT.MILITARY.ARMY")}
              name="binhChung"
              value={formik?.values?.binhChung || null}
              searchFunction={getAllSimpleValue}
              searchObject={TYPE_CATEGORY.binhChung}
              isReadOnly={isView}
              onChange={(value) => handleChangeSelect(VARIABLE_STRING.BINH_CHUNG, value)}
              options={[]}
              getOptionLabel={(options) => options?.value}
            />
          </div>
          <div>
            <TextValidator
              lable={lang("INPUT.MILITARY.UNIT")}
              name="donViQuanSu"
              value={formik?.values?.donViQuanSu || ""}
              type="text"
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <TextValidator
              type="date"
              lable={lang("INPUT.SOLDIERS.WOUNDED.DATE")}
              name="ngayThamGiaCm"
              value={formik?.values?.ngayThamGiaCm || ""}
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <div className="z-50">
            <Autocomplete
              lable={lang("INPUT.MILITARY.LEVEL")}
              name="capBacQuanSu"
              value={formik?.values?.capBacQuanSu || null}
              searchFunction={getAllSimpleValue}
              searchObject={TYPE_CATEGORY.capBacQuanSu}
              isReadOnly={isView}
              onChange={(value) => handleChangeSelect(VARIABLE_STRING.CAP_BAC_QUAN_SU, value)}
              options={[]}
              getOptionLabel={(options) => options?.value}
            />
          </div>
          <div className="z-50">
            <Autocomplete
              lable={lang("GENERAL.INFO.MILITARY.ROLE")}
              name="chucVuQuanSu"
              value={formik?.values?.chucVuQuanSu || null}
              searchFunction={getAllSimpleValue}
              searchObject={TYPE_CATEGORY.chucVuQuanSu}
              isReadOnly={isView}
              onChange={(value) => handleChangeSelect(VARIABLE_STRING.CHUC_VU_QUAN_SU, value)}
              options={[]}
              getOptionLabel={(options) => options?.value}
            />
          </div>
          <div>
            <TextValidator
              type="date"
              lable={lang("INPUT.MILITARY.OUT.DATE")}
              name="ngayXuatNgu"
              value={formik?.values?.ngayXuatNgu || ""}
              readOnly={isView}
              onChange={formik.handleChange}
            />
          </div>
          <Form.Check
            label={lang("INPUT.SOLDIERS.WOUNDED")}
            name="thuongBenhBinh"
            disabled={isView}
            checked={formik?.values?.thuongBenhBinh || false}
            onChange={handleChangeCheckBox}
          />
          {formik?.values?.thuongBenhBinh && (
            <>
              <div className="z-50">
                <Autocomplete
                  lable={lang("INPUT.SOLDIERS.WOUNDED.RANK")}
                  name="hangThuongBenhBinh"
                  value={formik?.values?.hangThuongBenhBinh || null}
                  searchFunction={getAllSimpleValue}
                  searchObject={TYPE_CATEGORY.hangThuongBenhBinh}
                  isReadOnly={isView}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.HANG_THUONG_BINH, value)}
                  options={[]}
                  getOptionLabel={(options) => options?.value}
                />
              </div>
              <div>
                <TextValidator
                  lable={lang("INPUT.SOLDIERS.WOUNDED.RATE")}
                  name="tyLeSuyGiamLd"
                  value={formik?.values?.tyLeSuyGiamLd}
                  type="number"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
              </div>
              <Form.Check
                label={lang("INPUT.SOLDIERS.WOUNDED.REMIGE")}
                name="huongCheDo"
                disabled={isView}
                checked={formik?.values?.huongCheDo || false}
                onChange={formik.handleChange}
              />
            </>
          )}
        </div>
      </div>
    </Form>
  );
};
export default MilitaryInformation;
