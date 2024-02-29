/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FileUpload from "../../component/FileUpload/FileUpload";
import { FILE_TYPE } from "../../component/FileUpload/constant";
import { GroupButton } from "../../component/GroupButton";
import Autocomplete from "../../component/input-field/Autocomplete";
import TextValidator from "../../component/input-field/TextValidator";
import { TYPE_CATEGORY } from "../../constant";
import EmployeeInfo from "../../profile/component/EmployeeInfo";
import { getBacLuongByChucDanh, searchPhongBan_DonVi } from "../../profile/services/DialogServices";
import { getEmployeeProfileById } from "../../profile/services/ProfileServices";
import { getAllSimpleValue } from "../../services";
import { searchAllEmployee, searchListWorkUnit } from "../../utils/CategoryServices";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE, TYPE, VARIABLE_STRING } from "../../utils/Constant";
import { addMoreYear, convertNumberPrice, convertTextPrice, handleBlurDate } from "../../utils/FunctionUtils";
import { checkInvalidDate } from "../../utils/ValidationSchema";
import {
  CODE_HOP_DONG,
  INIT_CONTACT,
  INIT_CONTACT_ANNEX_INFO,
  SUCCESS_CODE,
  codeStatusContract,
  contractStatus,
  contractTypeBienChe,
  contractTypeHopDong,
  signinStatus,
  workForms,
  workShifts
} from "../const/ContractConst";
import { addNewContract, searchNguoiDaiDienKy, updateContract } from "../services/contractServices";
import { IContractAnnexInfo, IContractInfo } from "../services/models/IContract";
import { convertDataContactDto, filterObject, switchContractStatus } from "../utils/FunctionUtils";
import TableCustom from "../../component/table-custom/TableCustom";
import { ContractAnnexColumn } from "../../profile/component/Column/ContractAnnexColumn";
import { deleteMultipleContractAnnex, getListAnnexByContract } from "../services/annexServices";
import { AddNewContractAnnex } from "./AddNewContractAnnex";
import { AxiosResponse } from "axios";
import { APIResponse } from "../../models/models";
import Allowance from "../../profile/component/Partials/Allowance/Allowance";
import useMultiLanguage from "../../../hook/useMultiLanguage";

interface IProps {
  view: boolean;
  handleOpenUpdateDialog: () => void;
  handleClose: () => void;
  handleCloseUpdateDialog: () => void;
  contractInfo: IContractInfo;
}

const AddNewContract: FC<IProps> = (props) => {
  const { handleClose, view, handleOpenUpdateDialog, contractInfo, handleCloseUpdateDialog } = props;
  const [isHopDongDaiHan, setIsHopDongDaiHan] = useState(false);
  const [shouldOpenAddContractAnnex, setShouldOpenAddContractAnnex] = useState<boolean>(false);
  const [annexInfo, setAnnexInfo] = useState<IContractAnnexInfo>(INIT_CONTACT_ANNEX_INFO);
  const [contractAnnexList, setContractAnnexList] = useState<IContractAnnexInfo[]>([]);

  const { lang, intl } = useMultiLanguage();

  const validationSchema: any = Yup.object().shape({
    employee: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    trangThaiHopDong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    donViKyHopDong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    tenHopDong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    soHopDong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    // loaiHopDong: Yup.object()
    //   .required(lang("VALIDATION.REQUIRE"))
    //   .nullable(),
    ngayCoHieuLuc: Yup.date()
      // .required(lang("VALIDATION.REQUIRE"))
      .concat(checkInvalidDate(intl))
      .nullable(),
    ngayHetHan: Yup.date().when(VARIABLE_STRING.LOAI_HOP_DONG, {
      is: (loaiHopDong: any) =>
        loaiHopDong?.code === CODE_HOP_DONG.VIEN_CHUC_DAI_HAN || loaiHopDong?.code === CODE_HOP_DONG.HOP_DONG_DAI_HAN,
      then: Yup.date().nullable(),
      otherwise: Yup.date()
        // .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
        .concat(checkInvalidDate(intl))
        .min(Yup.ref(VARIABLE_STRING.NGAY_CO_HIEU_LUC), lang("VALIDATE.EXPIRATION_DATE_AFTER_EFFECTIVE_DATE"))
        .nullable()
    }),
    ngayKyHopDong: Yup.date()
      // .required(intl.formatMessage({ id: "VALIDATION.REQUIRE" }))
      .concat(checkInvalidDate(intl))
      // .when(VARIABLE_STRING.NGAY_CO_HIEU_LUC, (ngayCoHieuLuc, schema) => {
      //   return schema.test({
      //     test: (ngayKyHopDong: any) => new Date(ngayKyHopDong) <= new Date(ngayCoHieuLuc),
      //     message: lang("VALIDATION.SIGN_DAY.EQUAL_OF_LESS")
      //   });
      // })
      .nullable(),
    phongBan: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    chucVu: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    chucDanh: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable()
  });

  const handleFormSubmit = async (values: IContractInfo) => {
    const { SUCCESS } = RESPONSE_STATUS_CODE;
    try {
      const dataContract = filterObject(convertDataContactDto(values));
      const res = contractInfo.id
        ? await updateContract(contractInfo.id, dataContract)
        : await addNewContract(dataContract);

      res?.status === SUCCESS && res?.data?.code === SUCCESS
        ? toast.success(contractInfo.id ? lang("TOAST.EDIT.CONTRACT.SUCCESS") : lang("TOAST.ADD.CONTRACT.SUCCESS"))
        : toast.error(`${res?.data?.message}`);
      handleClose();
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  // const conve

  const formik = useFormik({
    initialValues: INIT_CONTACT,
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
              ngayHetHan: ""
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

  useEffect(() => {
    formik.setValues(contractInfo);
    if (contractInfo?.employeeId) {
      getEmployeeInfo(contractInfo.employeeId);
    }
    setIsHopDongDaiHan(contractInfo?.loaiHopDong?.code === CODE_HOP_DONG.ONE_YEAR);
  }, [contractInfo]);

  const getEmployeeInfo = async (id: string) => {
    try {
      const { data } = await getEmployeeProfileById(id);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        formik.setFieldValue(VARIABLE_STRING.EMPLOYEE, data?.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const updateDataContractAnnex = async () => {
    let contractId = contractInfo?.id;
    if (!contractId) return;
    try {
      let { data } = await getListAnnexByContract(contractId);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        setContractAnnexList(data?.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const handleOpenDialog = (
    row: any,
    setShouldOpenDialog: (value: React.SetStateAction<boolean>) => void,
    setData: (value: any) => void
  ): void => {
    setShouldOpenDialog(true);
    setData(row);
  };

  const handleCloseDialog = (
    initData: any,
    setShouldOpenDialog: (value: React.SetStateAction<boolean>) => void,
    setData: (value: any) => void
  ): void => {
    setShouldOpenDialog(false);
    setData(initData);
  };

  const handleChangeEmployee = async (employee: any) => {
    let bacLuong = null;
    if (employee?.bacId) {
      const { data } = employee?.bacId && (await getBacLuongByChucDanh(employee?.viTriCongViecId));
      bacLuong =
        data?.code === RESPONSE_STATUS_CODE.SUCCESS
          ? data?.data?.find((item: any) => item?.id === employee?.bacId)
          : null;
    }

    let values: IContractInfo = {
      ...formik.values,
      employee: employee,
      employeeCode: employee?.maNhanVien,
      employeeId: employee?.id,
      tenNguoiLaoDong: employee?.name,
      heSoLuong: bacLuong?.heSoLuong,
      donViKyHopDong: employee?.donViKyHopDongId
        ? {
          id: employee?.donViKyHopDongId,
          value: employee?.donViKyHopDongText
        }
        : null,
      chucDanh: employee?.viTriCongViecText
        ? {
          id: employee?.viTriCongViecId,
          value: employee?.viTriCongViecText
        }
        : null,
      phongBan: employee?.phongBanText
        ? {
          id: employee?.phongBanId,
          name: employee?.phongBanText
        }
        : null,
      chucVu: employee?.chucVuText
        ? {
          id: employee?.chucVuId,
          value: employee?.chucVuText
        }
        : null,
      bacLuongOption: employee?.bacLuong
        ? {
          bacLuong: employee?.bacLuong,
          heSoLuong: employee?.heSoLuong
        }
        : null
    };
    formik.setValues(values);
    switchContractStatus(employee?.loaiCanBo, formik, values);
  };

  const hanldeChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    switch (name) {
      case VARIABLE_STRING.VIEN_CHUC:
        formik.setFieldValue(name, checked);
        formik.setFieldValue(VARIABLE_STRING.HOP_DONG_LAO_DONG, false);
        break;
      case VARIABLE_STRING.HOP_DONG_LAO_DONG:
        formik.setFieldValue(name, checked);
        formik.setFieldValue(VARIABLE_STRING.VIEN_CHUC, false);
        break;
      default:
        formik.setFieldValue(name, checked);
        break;
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

  const handleChangeMoney = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, convertTextPrice(value));
  };

  return (
    <div className="addNewContract h-full">
      <Row className="contract-header header-box h-full">
        <Col xs={12}>
          <div className="profile-title pb-6">
            <GroupButton
              type="btn-back"
              handleClose={handleClose}
            />
            {view && contractInfo?.id && (
              <GroupButton
                type="btn-edit"
                handleSaveEdit={handleOpenUpdateDialog}
              />
            )}
            {!view && (
              <GroupButton
                type="btn-save"
                handleClose={handleCloseUpdateDialog}
                handleSubmit={formik.handleSubmit}
                value={formik.values}
              />
            )}
          </div>
        </Col>
      </Row>

      <div className="layout-v2 flex align-items-start">
        <div className="general-user-info flex-column align-items-start align-self-stretch">
          <EmployeeInfo
            isView={true}
            employeeProfiles={formik.values?.employee || null}
          />
        </div>
        <div className="flex-1 overflow-auto h-100">
          <div className="main-title bg-primary">
            {contractInfo?.id ? lang("CONTRACT.UPDATE") : lang("CONTRACT.ADD_NEW")}
          </div>
          <div className="form-container add-contract">
            <Form onSubmit={formik.handleSubmit}>
              <div className="sub-title">{lang("CONTRACT.INFO")}</div>
              <div className="grid-cols-5">
                <div className="col-span-1">
                  <Autocomplete
                    isRequired
                    lable={lang("PROFILE.NAME")}
                    options={[]}
                    onChange={(value) => handleChangeEmployee(value)}
                    name="employee"
                    value={formik.values?.employee || null}
                    searchFunction={searchAllEmployee}
                    searchObject={SEARCH_OBJECT_MAX_SIZE}
                    isReadOnly={view}
                    errors={formik.errors.employee}
                    touched={formik.touched.employee}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("INPUT.CODE_NEW")}
                    name="maNhanVien"
                    value={formik.values?.employee?.maNhanVien || ""}
                    type="text"
                    readOnly={true}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-1 z-index-3">
                  <Autocomplete
                    isRequired
                    lable={lang("INPUT.DEPARTMENTS")}
                    isReadOnly={view}
                    options={[]}
                    value={formik.values?.phongBan || null}
                    name="phongBan"
                    onChange={(selectedOption) => handleChangeSelect("phongBan", selectedOption)}
                    urlData="data.data"
                    searchFunction={searchPhongBan_DonVi}
                    searchObject={{
                      id: formik.values?.employee?.donViCongTacId
                    }}
                    touched={formik.touched?.phongBan}
                    errors={formik.errors?.phongBan}
                    dependencies={[formik.values?.employee?.donViCongTacId]}
                  />
                </div>
                <div className="col-span-1">
                  <Autocomplete
                    isRequired
                    lable={lang("GENERAL.EMPLOYEE.POSITION")}
                    name="chucVu"
                    value={formik.values?.chucVu || ""}
                    searchFunction={getAllSimpleValue}
                    searchObject={TYPE_CATEGORY.chucDanh}
                    isReadOnly={view}
                    onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.CHUC_VU, selectedOption)}
                    errors={formik.errors?.chucVu}
                    touched={formik.touched?.chucVu}
                    options={[]}
                    getOptionLabel={(option) => option?.value}
                  />
                </div>
                <div>
                  <Autocomplete
                    lable={lang("GENERAL.EMPLOYEE.TITLE")}
                    name="chucDanh"
                    isRequired
                    value={formik.values?.chucDanh || ""}
                    searchFunction={getAllSimpleValue}
                    searchObject={TYPE_CATEGORY.viTriCongViec}
                    isReadOnly={view}
                    onChange={(selectedOption) => handleChangeSelect("chucDanh", selectedOption)}
                    options={[]}
                    getOptionLabel={(option) => option?.value}
                    errors={formik.errors?.chucDanh}
                    touched={formik.touched?.chucDanh}
                  />
                </div>
                <div className="col-span-1 py-2">
                  <Form.Check
                    label={lang("CONTRACT.IS_JOBHOLDER")}
                    checked={formik?.values?.vienChuc}
                    onChange={hanldeChangeCheckBox}
                    name="vienChuc"
                    readOnly={true}
                    disabled={true}
                    type="radio"
                  />
                </div>
                <div className="col-span-1 py-2">
                  <Form.Check
                    label={lang("CONTARCT.IS_LABOR_CONTRACT")}
                    checked={formik?.values?.hopDongLaoDong}
                    onChange={hanldeChangeCheckBox}
                    name="hopDongLaoDong"
                    readOnly={true}
                    disabled={true}
                    type="radio"
                  />
                </div>
              </div>
              <div className="sub-title">{lang("CONTRACT.INFO_DETAIL")}</div>
              <div className="grid-cols-5">
                <div className="col-span-1">
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
                    isReadOnly={view}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    isRequired
                    lable={lang("CONTRACT.NUMBER")}
                    name="soHopDong"
                    value={formik.values?.soHopDong || ""}
                    type="text"
                    readOnly={view}
                    onChange={formik.handleChange}
                    touched={formik.touched?.soHopDong}
                    errors={formik.errors?.soHopDong}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    isRequired
                    lable={lang("CONTRACT.NAME")}
                    name="tenHopDong"
                    value={formik.values?.tenHopDong || ""}
                    type="text"
                    readOnly={view}
                    onChange={formik.handleChange}
                    touched={formik.touched?.tenHopDong}
                    errors={formik.errors?.tenHopDong}
                  />
                </div>
                <div className="col-span-1">
                  <Autocomplete
                    // isRequired
                    lable={lang("GENERAL.EMPLOYEE.CONTRACT_TYPE")}
                    options={formik.values?.vienChuc ? contractTypeBienChe : contractTypeHopDong}
                    onChange={(value) => handleChangeSelect(VARIABLE_STRING.LOAI_HOP_DONG, value)}
                    name="loaiHopDong"
                    value={formik.values?.loaiHopDong || null}
                    isReadOnly={view}
                    touched={formik.touched?.loaiHopDong}
                    errors={formik.errors?.loaiHopDong}
                    dependencies={[formik.values?.vienChuc, formik.values?.hopDongLaoDong]}
                  />
                </div>
                <div className="col-span-1">
                  <Autocomplete
                    lable={lang("CONTRACT.WORK_SHIFT")}
                    options={workShifts}
                    onChange={(value) => handleChangeSelect(VARIABLE_STRING.CA_LAM_VIEC, value)}
                    name="caLamViec"
                    value={formik.values?.caLamViec || null}
                    isReadOnly={view}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("CONTRACT.EFFECTIVEDATE")}
                    name="ngayCoHieuLuc"
                    value={formik.values?.ngayCoHieuLuc || ""}
                    type="date"
                    // isRequired
                    readOnly={view}
                    onChange={handleChangeNgayCoHieuLuc}
                    onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayCoHieuLuc, "ngayCoHieuLuc")}
                    errors={formik.errors?.ngayCoHieuLuc}
                    touched={formik.touched?.ngayCoHieuLuc}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("CONTRACT.EXPIRATIONDATE")}
                    name="ngayHetHan"
                    value={formik.values?.ngayHetHan || ""}
                    type="date"
                    readOnly={view || isHopDongDaiHan}
                    // isRequired={!isHopDongDaiHan}
                    onChange={formik.handleChange}
                    onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayHetHan, "ngayHetHan")}
                    errors={formik.errors?.ngayHetHan}
                    touched={formik.touched?.ngayHetHan}
                  />
                </div>
                <div className="col-span-1 z-index-2">
                  <Autocomplete
                    lable={lang("CONTRACT.SALARY.LEVEL")}
                    name="bacLuongOption"
                    value={formik.values?.bacLuongOption || ""}
                    searchFunction={getBacLuongByChucDanh}
                    searchObject={formik.values?.chucDanh?.id}
                    isReadOnly={view}
                    sort={(data: any) => data.sort((a: any, b: any) => a.bacLuong - b.bacLuong)}
                    urlData="data.data"
                    onChange={(selectedOption) => handleChangeSelect("bacLuongOption", selectedOption)}
                    options={[]}
                    getOptionLabel={(option) => option?.bacLuong}
                    dependencies={[formik.values?.chucDanh?.id]}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("CONTRACT.SALARY.COEFFICIENT")}
                    name="heSoLuong"
                    value={formik.values?.heSoLuong || ""}
                    type="number"
                    readOnly={true}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("CONTRACT.BASESALARY")}
                    name="luongCoBan"
                    value={convertNumberPrice(formik.values?.luongCoBan || "")}
                    type="text"
                    readOnly={view}
                    onChange={handleChangeMoney}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("CONTRACT.SALARY_PERCENT")}
                    name="tyLeHuongLuong"
                    value={formik.values?.tyLeHuongLuong || ""}
                    type="number"
                    readOnly={view}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("CONTRACT.INSURANCECONTRIBUTION")}
                    name="luongDongBaoHiem"
                    value={convertNumberPrice(formik.values?.luongDongBaoHiem || "")}
                    type="text"
                    readOnly={view}
                    onChange={handleChangeMoney}
                  />
                </div>
                <div className="col-span-1">
                  <Autocomplete
                    isRequired
                    lable={lang("CONTRACT.STATUS")}
                    options={contractStatus}
                    onChange={(value) => handleChangeSelect(VARIABLE_STRING.TRANG_THAI_HOP_DONG, value)}
                    name="trangThaiHopDong"
                    value={formik.values?.trangThaiHopDong || null}
                    isReadOnly={view}
                    errors={formik.errors?.trangThaiHopDong}
                    touched={formik.touched?.trangThaiHopDong}
                  />
                </div>
                <div className="col-span-1">
                  <FileUpload
                    label="CONTRACT.ATTACHMENTS"
                    setFieldValue={(data: string) => {
                      formik.setFieldValue("file", data);
                    }}
                    fileName={formik.values.file || ""}
                    allowFileTypes={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.XLS},${FILE_TYPE.XLSX}`}
                  />
                </div>
              </div>
              <div className="sub-title">{lang("CONTRACT.SALARY_SIGN")}</div>
              <div className="grid-cols-5">
                <div className="col-span-1">
                  <Form.Check
                    label={lang("CONTRACT.PAPER_AUTHORITY")}
                    checked={formik.values?.giayUyQuyen}
                    onChange={hanldeChangeCheckBox}
                    className="custom-form-check"
                    readOnly={view}
                    disabled={view}
                    name="giayUyQuyen"
                  />
                </div>
                <div className="col-span-1 z-index-2">
                  <Autocomplete
                    lable={lang("CONTRACT.SIGNEDCOMPANYREPRESENTATIVE")}
                    options={workForms}
                    value={formik.values?.nguoiDaiDienCtyKy || null}
                    name="nguoiDaiDienCtyKy"
                    onChange={(value) => handleChangeSelect(VARIABLE_STRING.NGUOI_DAI_DIEN_KY, value)}
                    searchFunction={searchNguoiDaiDienKy}
                    searchObject={{}}
                    isReadOnly={view}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("CONTRACT.REPRESENTATIVETITLE")}
                    name="nguoiDaiDienCtyChucDanh"
                    value={formik.values?.nguoiDaiDienCtyChucDanhText || ""}
                    type="text"
                    readOnly={true}
                  />
                </div>
                <div className="col-span-1">
                  <TextValidator
                    lable={lang("ANNEX.SIGNINGDATE")}
                    name="ngayKyHopDong"
                    value={formik.values?.ngayKyHopDong || ""}
                    type="date"
                    // isRequired
                    readOnly={view}
                    onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayKyHopDong, "ngayKyHopDong")}
                    onChange={formik.handleChange}
                    errors={formik.errors?.ngayKyHopDong}
                    touched={formik.touched?.ngayKyHopDong}
                  />
                </div>
                <div className="col-span-1 z-index-2">
                  <Autocomplete
                    lable={lang("CONTRACT.SIGNINGSTATUS")}
                    options={signinStatus}
                    value={formik.values?.trangThaiKy || null}
                    name="trangThaiKy"
                    onChange={(value) => handleChangeSelect(VARIABLE_STRING.TRANG_THAI_KY, value)}
                    isReadOnly={view}
                  />
                </div>
              </div>
            </Form>
            {contractInfo?.id && (
              <>
                <TableCustom
                  id="contractAnnex"
                  title={lang("CONTRACT.ANNEX")}
                  className="pt-4"
                  data={contractAnnexList}
                  columns={ContractAnnexColumn()}
                  handleDelete={(ids: string) =>
                    handleDeleteItems(deleteMultipleContractAnnex, updateDataContractAnnex, ids)
                  }
                  isActionTableTab
                  buttonAdd={!view && formik.values?.trangThaiHopDong?.code !== codeStatusContract.EXPIRE}
                  updatePageData={updateDataContractAnnex}
                  type={TYPE.MULTILINE}
                  fixedColumnsCount={3}
                  noToolbar={true}
                  noPagination={true}
                  handleOpenDialog={(row) => handleOpenDialog(annexInfo, setShouldOpenAddContractAnnex, setAnnexInfo)}
                  handleDoubleClick={
                    !view ? (row: any) => handleOpenDialog(row, setShouldOpenAddContractAnnex, setAnnexInfo) : () => { }
                  }
                />
                <div className="spaces mt-16">
                  <Allowance
                    isView={view}
                    identify={contractInfo?.employeeId}
                    isCallApi={true}
                    isDisplayBtnAdd={formik.values?.trangThaiHopDong?.code !== codeStatusContract.EXPIRE}
                  />
                </div>
              </>
            )}
            {shouldOpenAddContractAnnex && (
              <AddNewContractAnnex
                annexInfo={annexInfo}
                contractInfo={contractInfo}
                getListAnnex={updateDataContractAnnex}
                handleCLoseAddContractAnnex={() =>
                  handleCloseDialog(INIT_CONTACT_ANNEX_INFO, setShouldOpenAddContractAnnex, setAnnexInfo)
                }
                isView={view}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export { AddNewContract };
