/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FileUpload from "../../component/FileUpload/FileUpload";
import { FILE_TYPE } from "../../component/FileUpload/constant";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import TableCustom from "../../component/table-custom/TableCustom";
import { TYPE_CATEGORY } from "../../constant";
import {
  CODE_HOP_DONG,
  SUCCESS_CODE,
  contractStatus,
  contractTypeBienChe,
  contractTypeHopDong,
  signinStatus,
  workForms,
  workShifts
} from "../../contract/const/ContractConst";
import { addNewContract, searchNguoiDaiDienKy, updateContract } from "../../contract/services/contractServices";
import { IContractInfo } from "../../contract/services/models/IContract";
import { convertDataContactDto, convertDataUI, switchContractStatus } from "../../contract/utils/FunctionUtils";
import { APIResponse } from "../../models/models";
import { getAllSimpleValue } from "../../services";
import { searchListWorkUnit } from "../../utils/CategoryServices";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE, TYPE, VARIABLE_STRING } from "../../utils/Constant";
import { addMoreYear, convertNumberPrice, convertTextPrice, handleBlurDate } from "../../utils/FunctionUtils";
import { REF_TAB } from "../const/ProfileConst";
import { EmployeeProfile } from "../models/ProfileModels";
import "../profile.scss";
import { getBacLuongByChucDanh, searchPhongBan_DonVi } from "../services/DialogServices";
import { deleteMultipleContract, getContractByEmployee, getContractsByEmployee } from "../services/ProfileServices";
import { convertDataContract } from "../utils/FunctionUtils";
import { ContractColumn } from "./Column/ContractColumn";
import { ContractDialog } from "./Dialog/ContractDialog";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import { checkInvalidDate } from "../../utils/ValidationSchema";

type IProps = {
  isView: boolean;
  identify: string;
  formikRef: any;
  activeTab: string;
  employeeProfiles?: EmployeeProfile;
  handleToggleIsView: () => void;
};

export const ContractInformation: React.FC<IProps> = ({ isView, identify, formikRef, activeTab, employeeProfiles }) => {
  const { lang, intl } = useMultiLanguage();

  const [isHopDongDaiHan, setIsHopDongDaiHan] = useState<boolean>(false);
  const [shouldOpenContractDialog, setShouldOpenContractDialog] = useState<boolean>(false);
  const [contract, setContract] = useState<IContractInfo>({} as IContractInfo);
  const [initContract, setInitContract] = useState<IContractInfo>({} as IContractInfo);
  const [contractList, setContractList] = useState<IContractInfo[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);

  const getContractInfoByEmployee = async () => {
    if (identify) {
      try {
        const { data } = await getContractByEmployee(identify);
        if (data?.code === SUCCESS_CODE) {
          setIsHopDongDaiHan(data?.data?.loaiHopDong?.code === CODE_HOP_DONG.ONE_YEAR)
        }
        return data?.data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!employeeProfiles?.id) return;
    const initContract = {
      employee: employeeProfiles,
      employeeCode: employeeProfiles?.code,
      phongBan: {
        id: employeeProfiles?.phongBanId,
        name: employeeProfiles?.phongBanText
      },
      chucVu: employeeProfiles?.chucVu,
      chucDanh: employeeProfiles?.viTriCongViec,
      loaiCanBo: employeeProfiles?.loaiCanBo,
      tenNguoiLaoDong: employeeProfiles?.name,
      employeeId: employeeProfiles?.id
    };
    setContract(initContract as IContractInfo);
    setInitContract(initContract as IContractInfo);
  }, [employeeProfiles]);

  const validationSchema = Yup.object().shape({
    // employee: Yup.object()
    //     .required(lang("VALIDATION.REQUIRE"))
    //     .nullable(),
    donViKyHopDong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    tenHopDong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    soHopDong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    phongBan: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    chucVu: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    chucDanh: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    // loaiHopDong: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    trangThaiHopDong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    ngayCoHieuLuc: Yup.date()
      .concat(checkInvalidDate(intl))
      .when("ngayHetHan", {
        is: (ngayHetHan: Date | null) => ngayHetHan,
        then: Yup.date()
          .max(
            Yup.ref("ngayHetHan"),
            lang("VALIDATION.MAXDATE") +
            lang("CONTRACT.EXPIRATIONDATE")
          )
          .nullable()
      })
      .nullable(),
    ngayHetHan: Yup.date()
      .concat(checkInvalidDate(intl))
      .when(VARIABLE_STRING.LOAI_HOP_DONG, {
        is: (loaiHopDong: any) =>
          loaiHopDong?.code === CODE_HOP_DONG.VIEN_CHUC_DAI_HAN || loaiHopDong?.code === CODE_HOP_DONG.HOP_DONG_DAI_HAN,
        then: Yup.date().nullable(),
        otherwise: Yup.date()
          // .required(lang("VALIDATION.REQUIRE"))
          .concat(checkInvalidDate(intl))
          .min(Yup.ref(VARIABLE_STRING.NGAY_CO_HIEU_LUC), lang("VALIDATE.EXPIRATION_DATE_AFTER_EFFECTIVE_DATE"))
          .nullable()
      }),
    ngayKyHopDong: Yup.date()
      // .required(lang("VALIDATION.REQUIRE"))
      .concat(checkInvalidDate(intl))
      .when(VARIABLE_STRING.NGAY_CO_HIEU_LUC, (ngayCoHieuLuc, schema) => {
        return schema.test({
          test: (ngayKyHopDong: any) => new Date(ngayKyHopDong) <= new Date(ngayCoHieuLuc),
          message: lang("VALIDATION.SIGN_DAY.EQUAL_OF_LESS")
        });
      })
      .nullable()
  });

  const handleFormSubmit = async (values: IContractInfo) => {
    const { SUCCESS } = RESPONSE_STATUS_CODE;
    try {
      const dataContract = convertDataContactDto(values);
      const res = formik.values?.id
        ? await updateContract(formik.values?.id, dataContract)
        : await addNewContract(dataContract);
      res?.status === SUCCESS && res?.data?.code === SUCCESS
        ? toast.success(formik.values?.id ? lang("TOAST.EDIT.CONTRACT.SUCCESS") : lang("TOAST.ADD.CONTRACT.SUCCESS"))
        : toast.error(`${res?.data?.message}`);
      updateDataContract();
      fetchContract();
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: {} as IContractInfo,
    validationSchema,
    onSubmit: handleFormSubmit
  });

  const handleChangeSelect = (name: string, value: any) => {
    switch (name) {
      case VARIABLE_STRING.LOAI_HOP_DONG:
        const { VIEN_CHUC_DAI_HAN, HOP_DONG_DAI_HAN, ONE_YEAR } = CODE_HOP_DONG;
        switch (value?.code) {
          case VIEN_CHUC_DAI_HAN:
          case HOP_DONG_DAI_HAN:
            formik.setValues({
              ...formik.values,
              [name]: value,
              ngayHetHan: null
            });
            setIsHopDongDaiHan(true);
            break;
          case ONE_YEAR:
            setIsHopDongDaiHan(true);
            formik.setValues({
              ...formik.values,
              [name]: value,
              ngayHetHan: addMoreYear(String(formik.values?.ngayCoHieuLuc), 1)
            });
            break;
          default:
            formik.setFieldValue(VARIABLE_STRING.LOAI_HOP_DONG, value);
            setIsHopDongDaiHan(false);
            break;
        }
        break;
      case VARIABLE_STRING.NGUOI_DAI_DIEN_KY:
        formik.setValues({
          ...formik.values,
          nguoiDaiDienCtyChucDanhId: value?.chucVuId,
          nguoiDaiDienCtyChucDanhText: value?.chucDanh,
          nguoiDaiDienCtyKyId: value?.employeeId,
          nguoiDaiDienCtyKyText: value?.name
        });
        break;
      case VARIABLE_STRING.CHUC_DANH:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.BAC_LUONG_OPTION, null);
        formik.setFieldValue(VARIABLE_STRING.HE_SO_LUONG, undefined);
        break;
      case VARIABLE_STRING.BAC_LUONG_OPTION:
        formik.setFieldValue(name, value);
        formik.setFieldValue(VARIABLE_STRING.HE_SO_LUONG, value?.heSoLuong);
        break;
      default:
        formik.setFieldValue(name, value);
        break;
    }
  };

  const handleChangeNgayCoHieuLuc = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    formik.setValues({
      ...formik.values,
      [name]: value,
      ngayHetHan:
        formik.values?.loaiHopDong?.code === CODE_HOP_DONG.ONE_YEAR ? addMoreYear(value, 1) : formik.values?.ngayHetHan
    });
  };

  const hanldeChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    switch (name) {
      case VARIABLE_STRING.VIEN_CHUC:
        formik.setFieldValue(name, checked);
        formik.setFieldValue(VARIABLE_STRING.HOP_DONG_LAO_DONG, false);
        formik.setFieldValue(VARIABLE_STRING.LOAI_HOP_DONG, null);
        break;
      case VARIABLE_STRING.HOP_DONG_LAO_DONG:
        formik.setFieldValue(name, checked);
        formik.setFieldValue(VARIABLE_STRING.VIEN_CHUC, false);
        formik.setFieldValue(VARIABLE_STRING.LOAI_HOP_DONG, null);
        break;
      default:
        formik.setFieldValue(name, checked);
        break;
    }
  };

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  useEffect(() => {
    if (!identify || activeTab !== REF_TAB.HOP_DONG_LAO_DONG) return;
    fetchContract();
    updateDataContract();
  }, [identify, activeTab, contract]);

  const fetchContract = async () => {
    let values = {
      employee: employeeProfiles,
      employeeCode: employeeProfiles?.code,
      viTriCongViecText: employeeProfiles?.chucVuText,
      loaiCanBo: employeeProfiles?.loaiCanBo,
      tenNguoiLaoDong: employeeProfiles?.name,
      employeeId: employeeProfiles?.id,
      ...formik.values,
      phongBan: employeeProfiles?.phongBan,
      chucVu: employeeProfiles?.chucVu,
      chucDanh: employeeProfiles?.viTriCongViec,
      donViKyHopDong: null,
      soHopDong: "",
      tenHopDong: "",
      trangThaiHopDong: null
    };
    let response = await getContractInfoByEmployee();
    if (response?.id) {
      formik.setValues(convertDataContract({ ...values, ...convertDataContract(response) }));
    } else {
      formik.setValues(values);
    }
  };

  const handleOpenDialog = (
    row: any,
    setShouldOpenDialog: (value: React.SetStateAction<boolean>) => void,
    setData: (value: any) => void
  ): void => {
    let id = row?.id;
    if (employeeProfiles?.code) {
      setShouldOpenDialog(true);
      setData(id ? convertDataUI(row) : row);
    } else {
      toast.warning(lang("MESSAGE.BASIC.FIRST"));
    }
  };

  const handleDeleteItems = async (
    handleDelete: (...params: any) => Promise<AxiosResponse<APIResponse>>,
    handleUpdate: () => Promise<void>,
    ids: string
  ) => {
    try {
      const res = await handleDelete?.(ids);
      if (res?.data?.code === SUCCESS_CODE) {
        toast.success(lang("GENERAL.DELETE_SUCCESS"));
      } else toast.error(`${res?.data?.message}`);
    } catch (err) {
      toast.error(lang("GENERAL.ERROR"));
    }
    await handleUpdate?.();
  };

  const updateDataContract = async () => {
    if (!identify || activeTab !== REF_TAB.HOP_DONG_LAO_DONG) return;
    try {
      let { data } = await getContractsByEmployee(identify);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        setContractList(data?.data);
        setTotalPage(data?.totalPages);
        setTotalElements(data?.totalElements);
        setNumberOfElements(data?.numberOfElements);
      }
    } catch (error) {
      console.error(error);
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const handleCloseContractDialog = (): void => {
    setShouldOpenContractDialog(false);
    updateDataContract();
    setContract(initContract as IContractInfo);
  };

  useEffect(() => {
    switchContractStatus(employeeProfiles?.loaiCanBo, formik);
  }, [employeeProfiles]);

  const handleChangeMoney = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, convertTextPrice(value));
  };

  return (
    <>
      <div className="basic-info-wrapper addNewContract h-full">
        <Form
          onSubmit={formik.handleSubmit}
          className="form-info contract flex-column"
        >
          <>
            <div className="block-content">
              <span className="text-header">{lang("CONTRACT.INFO")}</span>
              <div className="content">
                <Autocomplete
                  isRequired
                  lable={lang("PROFILE.NAME")}
                  options={[]}
                  name="employee"
                  value={formik.values?.employee || null}
                  isReadOnly={true}
                  errors={formik.errors.employee}
                  touched={formik.touched.employee}
                />
                <TextValidator
                  lable={lang("INPUT.CODE_NEW")}
                  name="maNhanVien"
                  value={employeeProfiles?.maNhanVien || ""}
                  type="text"
                  onChange={formik.handleChange}
                  readOnly={true}
                />
                <Autocomplete
                  isRequired
                  lable={lang("INPUT.DEPARTMENTS")}
                  isReadOnly={isView}
                  options={[]}
                  value={formik.values?.phongBan || null}
                  name="phongBan"
                  onChange={(selectedOption) => handleChangeSelect("phongBan", selectedOption)}
                  urlData="data.data"
                  searchFunction={searchPhongBan_DonVi}
                  searchObject={{ id: employeeProfiles?.donViCongTacId }}
                  touched={formik.touched?.phongBan}
                  errors={formik.errors?.phongBan}
                  dependencies={[employeeProfiles?.donViCongTacId]}
                />
                <Autocomplete
                  isRequired
                  lable={lang("GENERAL.EMPLOYEE.POSITION")}
                  name="chucVu"
                  value={formik.values?.chucVu || ""}
                  searchFunction={getAllSimpleValue}
                  searchObject={TYPE_CATEGORY.chucDanh}
                  isReadOnly={isView}
                  onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.CHUC_VU, selectedOption)}
                  errors={formik.errors?.chucVu}
                  touched={formik.touched?.chucVu}
                  options={[]}
                  getOptionLabel={(option) => option?.value}
                />
                {/* <Autocomplete
                  lable={lang("CONTRACT.NEW.TYPE_CCVC")}
                  options={[]}
                  onChange={(value) => {}}
                  name=""
                  value={""}
                  isDisabled={true}
                /> */}
                <Autocomplete
                  lable={lang("GENERAL.EMPLOYEE.TITLE")}
                  name="chucDanh"
                  isRequired
                  value={formik.values?.chucDanh || ""}
                  searchFunction={getAllSimpleValue}
                  searchObject={TYPE_CATEGORY.viTriCongViec}
                  isReadOnly={isView}
                  onChange={(selectedOption) => handleChangeSelect("chucDanh", selectedOption)}
                  options={[]}
                  getOptionLabel={(option) => option?.value}
                  errors={formik.errors?.chucDanh}
                  touched={formik.touched?.chucDanh}
                />
                <Form.Check
                  label={lang("CONTRACT.IS_JOBHOLDER")}
                  checked={formik?.values?.vienChuc}
                  onChange={hanldeChangeCheckBox}
                  name="vienChuc"
                  className="py-2"
                  readOnly={true}
                  type="radio"
                  disabled={true}
                />
                <Form.Check
                  label={lang("CONTARCT.IS_LABOR_CONTRACT")}
                  checked={formik?.values?.hopDongLaoDong}
                  onChange={hanldeChangeCheckBox}
                  name="hopDongLaoDong"
                  className="py-2"
                  readOnly={true}
                  type="radio"
                  disabled={true}
                />
              </div>
            </div>
            <div className="block-content">
              <span className="text-header">{lang("CONTRACT.INFO_DETAIL")}</span>
              <div className="content">
                <Autocomplete
                  isRequired
                  lable={lang("CONTRACT.SIGNINGUNIT")}
                  options={[]}
                  value={formik.values?.donViKyHopDong || null}
                  name="donViKyHopDong"
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.DON_VI_KY_HOP_DONG, value)}
                  searchFunction={searchListWorkUnit}
                  searchObject={SEARCH_OBJECT_MAX_SIZE}
                  touched={formik.touched?.donViKyHopDong}
                  errors={formik.errors?.donViKyHopDong}
                  isReadOnly={isView}
                />
                <TextValidator
                  isRequired
                  lable={lang("CONTRACT.NUMBER")}
                  name="soHopDong"
                  value={formik.values?.soHopDong || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  touched={formik.touched?.soHopDong}
                  errors={formik.errors?.soHopDong}
                />
                <TextValidator
                  isRequired
                  lable={lang("CONTRACT.NAME")}
                  name="tenHopDong"
                  value={formik.values?.tenHopDong || ""}
                  type="text"
                  readOnly={isView}
                  onChange={formik.handleChange}
                  touched={formik.touched?.tenHopDong}
                  errors={formik.errors?.tenHopDong}
                />
                <Autocomplete
                  // isRequired
                  lable={lang("GENERAL.EMPLOYEE.CONTRACT_TYPE")}
                  options={formik.values?.vienChuc ? contractTypeBienChe : contractTypeHopDong}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.LOAI_HOP_DONG, value)}
                  name="loaiHopDong"
                  value={formik.values?.loaiHopDong || null}
                  isReadOnly={isView}
                  touched={formik.touched?.loaiHopDong}
                  errors={formik.errors?.loaiHopDong}
                  dependencies={[formik.values?.vienChuc, formik.values?.hopDongLaoDong]}
                />
                <Autocomplete
                  lable={lang("CONTRACT.WORK_SHIFT")}
                  options={workShifts}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.CA_LAM_VIEC, value)}
                  name="caLamViec"
                  value={formik.values?.caLamViec || null}
                  isReadOnly={isView}
                />
                <TextValidator
                  lable={lang("CONTRACT.EFFECTIVEDATE")}
                  name="ngayCoHieuLuc"
                  value={formik.values?.ngayCoHieuLuc || ""}
                  type="date"
                  // isRequired
                  readOnly={isView}
                  onChange={handleChangeNgayCoHieuLuc}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayCoHieuLuc, "ngayCoHieuLuc")}
                  errors={formik.errors?.ngayCoHieuLuc}
                  touched={formik.touched?.ngayCoHieuLuc}
                />
                <TextValidator
                  lable={lang("CONTRACT.EXPIRATIONDATE")}
                  name="ngayHetHan"
                  value={formik.values?.ngayHetHan || ""}
                  type="date"
                  readOnly={isView || isHopDongDaiHan}
                  // isRequired={!isHopDongDaiHan}
                  onChange={formik.handleChange}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayHetHan, "ngayHetHan")}
                  errors={formik.errors?.ngayHetHan}
                  touched={formik.touched?.ngayHetHan}
                />
                <Autocomplete
                  lable={lang("CONTRACT.SALARY.LEVEL")}
                  name="bacLuongOption"
                  value={formik.values?.bacLuongOption || ""}
                  searchFunction={getBacLuongByChucDanh}
                  searchObject={formik.values?.chucDanh?.id}
                  isReadOnly={isView}
                  sort={(data: any) => data.sort((a: any, b: any) => a.bacLuong - b.bacLuong)}
                  urlData="data.data"
                  onChange={(selectedOption) => handleChangeSelect("bacLuongOption", selectedOption)}
                  options={[]}
                  getOptionLabel={(option) => option?.bacLuong}
                  dependencies={[formik.values?.chucDanh?.id]}
                />
                <TextValidator
                  lable={lang("CONTRACT.SALARY.COEFFICIENT")}
                  name="heSoLuong"
                  value={formik.values?.heSoLuong || ""}
                  type="number"
                  readOnly={true}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("CONTRACT.BASESALARY")}
                  name="luongCoBan"
                  value={convertNumberPrice(formik.values?.luongCoBan) !== "0" ? convertNumberPrice(formik.values?.luongCoBan) : ""}
                  type="text"
                  readOnly={isView}
                  onChange={handleChangeMoney}
                />
                <TextValidator
                  lable={lang("CONTRACT.SALARY_PERCENT")}
                  name="tyLeHuongLuong"
                  value={formik.values?.tyLeHuongLuong || ""}
                  type="number"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
                <TextValidator
                  lable={lang("CONTRACT.INSURANCECONTRIBUTION")}
                  name="luongDongBaoHiem"
                  value={convertNumberPrice(formik.values?.luongDongBaoHiem) !== "0" ? convertNumberPrice(formik.values?.luongDongBaoHiem) : ""}
                  type="text"
                  readOnly={isView}
                  onChange={handleChangeMoney}
                />
                <Autocomplete
                  lable={lang("CONTRACT.STATUS")}
                  isRequired
                  options={contractStatus}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.TRANG_THAI_HOP_DONG, value)}
                  name="trangThaiHopDong"
                  value={formik.values?.trangThaiHopDong || null}
                  isReadOnly={isView}
                  errors={formik.errors?.trangThaiHopDong}
                  touched={formik.touched?.trangThaiHopDong}
                />
                <div>
                  <FileUpload
                    isReadOnly={isView}
                    label="CONTRACT.ATTACHMENTS"
                    setFieldValue={(data: string) => {
                      formik.setFieldValue("file", data);
                    }}
                    fileName={formik.values.file || ""}
                    allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
                  />
                </div>
              </div>
            </div>
            <div className="block-content">
              <span className="text-header">{lang("CONTRACT.SALARY_SIGN")}</span>
              <div className="content">
                <Form.Check
                  label={lang("CONTRACT.PAPER_AUTHORITY")}
                  checked={formik.values?.giayUyQuyen}
                  onChange={hanldeChangeCheckBox}
                  className="custom-form-check"
                  readOnly={isView}
                  name="giayUyQuyen"
                  disabled={isView}
                />
                <Autocomplete
                  lable={lang("CONTRACT.SIGNEDCOMPANYREPRESENTATIVE")}
                  options={workForms}
                  value={formik.values?.nguoiDaiDienCtyKy || null}
                  name="nguoiDaiDienCtyKy"
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.NGUOI_DAI_DIEN_KY, value)}
                  searchFunction={searchNguoiDaiDienKy}
                  searchObject={{}}
                  isReadOnly={isView}
                />
                <TextValidator
                  lable={lang("CONTRACT.REPRESENTATIVETITLE")}
                  name="nguoiDaiDienCtyChucDanh"
                  value={formik.values?.nguoiDaiDienCtyChucDanhText || ""}
                  type="text"
                  readOnly={true}
                />
                <TextValidator
                  lable={lang("ANNEX.SIGNINGDATE")}
                  name="ngayKyHopDong"
                  value={formik.values?.ngayKyHopDong || ""}
                  type="date"
                  // isRequired
                  readOnly={isView}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayKyHopDong, "ngayKyHopDong")}
                  onChange={formik.handleChange}
                  errors={formik.errors?.ngayKyHopDong}
                  touched={formik.touched?.ngayKyHopDong}
                />
                <Autocomplete
                  className="z-index-2"
                  lable={lang("CONTRACT.SIGNINGSTATUS")}
                  options={signinStatus}
                  value={formik.values?.trangThaiKy || null}
                  name="trangThaiKy"
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.TRANG_THAI_KY, value)}
                  isReadOnly={isView}
                />
              </div>
            </div>
          </>
        </Form>
        <div className="form-info">
          <div className="block-content">
            <TableCustom
              id="contract"
              title={lang("INFO.CONTRACT.LIST")}
              data={contractList}
              columns={ContractColumn()}
              updatePageData={updateDataContract}
              handleDelete={(ids: string) => handleDeleteItems(deleteMultipleContract, updateDataContract, ids)}
              isActionTableTab
              dependencies={activeTab}
              buttonAdd={!isView}
              notDelete={isView}
              noToolbar={true}
              justFilter={true}
              type={TYPE.MULTILINE}
              fixedColumnsCount={4}
              totalPages={totalPage}
              totalElements={totalElements}
              numberOfElements={numberOfElements}
              handleOpenDialog={(row) => handleOpenDialog(contract, setShouldOpenContractDialog, setContract)}
              handleDoubleClick={(row) => handleOpenDialog(row, setShouldOpenContractDialog, setContract)}
              noPagination
            />
          </div>
        </div>
        {shouldOpenContractDialog && (
          <ContractDialog
            contractEdit={contract}
            handleCloseContractDialog={handleCloseContractDialog}
            isView={isView}
            shouldOpenContractDialog={shouldOpenContractDialog}
            fetchContractParent={fetchContract}
            employeeInfo={employeeProfiles}
          />
        )}
      </div>
    </>
  );
};
