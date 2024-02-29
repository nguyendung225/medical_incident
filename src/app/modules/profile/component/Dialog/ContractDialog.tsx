/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FileUpload from "../../../component/FileUpload/FileUpload";
import { FILE_TYPE } from "../../../component/FileUpload/constant";
import Autocomplete from "../../../component/input-field/Autocomplete";
import TextValidator from "../../../component/input-field/TextValidator";
import TableCustom from "../../../component/table-custom/TableCustom";
import { TYPE_CATEGORY } from "../../../constant";
import { AddNewContractAnnex } from "../../../contract/components/AddNewContractAnnex";
import {
  CODE_HOP_DONG,
  INIT_CONTACT_ANNEX_INFO,
  SUCCESS_CODE,
  codeStatusContract,
  contractStatus,
  contractTypeBienChe,
  contractTypeHopDong,
  signinStatus,
  workForms,
  workShifts
} from "../../../contract/const/ContractConst";
import { getAllowancesByContract } from "../../../contract/services/allowanceServices";
import { deleteMultipleContractAnnex, getListAnnexByContract } from "../../../contract/services/annexServices";
import { addNewContract, searchNguoiDaiDienKy, updateContract } from "../../../contract/services/contractServices";
import { IAllowance } from "../../../contract/services/models/IAllowance";
import { IContractAnnexInfo, IContractInfo } from "../../../contract/services/models/IContract";
import { convertDataContactDto, switchContractStatus } from "../../../contract/utils/FunctionUtils";
import { getAllSimpleValue } from "../../../services";
import "../../../styles/index.scss";
import { searchListWorkUnit } from "../../../utils/CategoryServices";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE, TYPE, VARIABLE_STRING } from "../../../utils/Constant";
import { addMoreYear, convertNumberPrice, convertTextPrice, handleBlurDate } from "../../../utils/FunctionUtils";
import { checkInvalidDate } from "../../../utils/ValidationSchema";
import { getBacLuongByChucDanh, searchPhongBan_DonVi } from "../../services/DialogServices";
import { getEmployeeProfileById } from "../../services/ProfileServices";
import { filterObject } from "../../utils/FunctionUtils";
import { ContractAnnexColumn } from "../Column/ContractAnnexColumn";
import { AxiosResponse } from "axios";
import { APIResponse } from "../../../models/models";
import Allowance from "../Partials/Allowance/Allowance";
import useMultiLanguage from "../../../../hook/useMultiLanguage";
import { CODE_HDLD } from "../../const/DialogConstant";
import { EmployeeProfile } from "../../models/ProfileModels";
import AppContext from "../../../../AppContext";

interface Props {
  shouldOpenContractDialog: boolean;
  handleCloseContractDialog: () => void;
  isView: boolean;
  contractEdit: IContractInfo;
  fetchContractParent: any;
  employeeInfo: any;
}
export const ContractDialog = (props: Props) => {
  const { lang, intl } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);

  const {
    shouldOpenContractDialog,
    handleCloseContractDialog,
    contractEdit,
    isView,
    fetchContractParent,
    employeeInfo
  } = props;

  const [isHopDongDaiHan, setIsHopDongDaiHan] = useState(false);
  const [shouldOpenAddContractAnnex, setShouldOpenAddContractAnnex] = useState<boolean>(false);
  const [annexInfo, setAnnexInfo] = useState<IContractAnnexInfo>(INIT_CONTACT_ANNEX_INFO);
  const [contractAnnexList, setContractAnnexList] = useState<IContractAnnexInfo[]>([]);
  const [allowanceList, setAllowanceList] = useState<IAllowance[]>([]);

  const validationSchema: any = Yup.object().shape({
    employee: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    trangThaiHopDong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    donViKyHopDong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    tenHopDong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    soHopDong: Yup.string().required(lang("VALIDATION.REQUIRE")).nullable(),
    phongBan: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    chucVu: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    chucDanh: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
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
        // .required(lang("VALIDATION.REQUIRE"))
        .concat(checkInvalidDate(intl))
        .min(Yup.ref(VARIABLE_STRING.NGAY_CO_HIEU_LUC), lang("VALIDATE.EXPIRATION_DATE_AFTER_EFFECTIVE_DATE"))
        .nullable()
    }),
    ngayKyHopDong: Yup.date()
      // .required(lang("VALIDATION.REQUIRE"))
      .concat(checkInvalidDate(intl))
      // .when(VARIABLE_STRING.NGAY_CO_HIEU_LUC, (ngayCoHieuLuc, schema) => {
      //   return schema.test({
      //     test: (ngayKyHopDong: any) => new Date(ngayKyHopDong) <= new Date(ngayCoHieuLuc),
      //     message: lang("VALIDATION.SIGN_DAY.EQUAL_OF_LESS")
      //   });
      // })
      .nullable()
  });

  useEffect(() => {
    formik.setValues({
      ...contractEdit,
      ...(!contractEdit?.id && {
        donViKyHopDong: null,
        soHopDong: "",
        tenHopDong: "",
        trangThaiHopDong: null
      })
    });
    if (contractEdit?.employeeId) {
      getEmployeeInfo(contractEdit.employeeId);
    }
  }, [contractEdit]);

  const getEmployeeInfo = async (id: string) => {
    try {
      const { data } = await getEmployeeProfileById(id);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        formik.setFieldValue(VARIABLE_STRING.EMPLOYEE, data?.data);
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const handleSubmit = async (values: IContractInfo) => {
    const { SUCCESS } = RESPONSE_STATUS_CODE;
    try {
      setPageLoading(true);
      const dataContract = filterObject(convertDataContactDto(values));
      const res = contractEdit.id
        ? await updateContract(contractEdit.id, dataContract)
        : await addNewContract(dataContract);

      res?.status === SUCCESS && res?.data?.code === SUCCESS
        ? toast.success(contractEdit.id ? lang("TOAST.EDIT.CONTRACT.SUCCESS") : lang("TOAST.ADD.CONTRACT.SUCCESS"))
        : toast.error(`${res?.data?.message}`);
      handleCloseContractDialog();
      fetchContractParent();
      setPageLoading(false);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: contractEdit,
    validationSchema,
    onSubmit: handleSubmit
  });

  useEffect(() => {
    if (!contractEdit?.id) return;
    formik.setFieldValue(VARIABLE_STRING.LOAI_HOP_DONG, contractEdit?.loaiHopDong);
    setIsHopDongDaiHan(contractEdit?.loaiHopDong?.code === CODE_HOP_DONG.ONE_YEAR)
  }, [contractEdit]);

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

  const updateDataContractAnnex = async () => {
    let contractId = contractEdit?.id;
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

  const updateDataAllowance = async () => {
    let contractId = contractEdit?.id;
    if (!contractId) return;
    try {
      let { data } = await getAllowancesByContract(contractId);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        setAllowanceList(data?.data);
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

  useEffect(() => {
    switchContractStatus(employeeInfo?.loaiCanBo, formik);
  }, [employeeInfo]);

  const handleChangeMoney = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, convertTextPrice(value));
  };

  return (
    <>
      <Modal
        show={shouldOpenContractDialog}
        size="xl"
        centered
        aria-labelledby="example-custom-modal-styling-title"
        onHide={handleCloseContractDialog}
      >
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title
              id="example-custom-modal-styling-title"
              className="heading-5"
            >
              {lang("INFO.CONTRACT")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-8 py-2 contract-dialog-content">
            <div className="text-header py-2">{lang("CONTRACT.INFO")}</div>
            <div className="grid-cols-5">
              <div className="col-span-1">
                <Autocomplete
                  isRequired
                  lable={lang("PROFILE.NAME")}
                  options={[]}
                  name="employee"
                  value={formik.values?.employee || null}
                  isReadOnly={true}
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
              <div className="col-span-1">
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
                  isReadOnly={isView}
                  onChange={(selectedOption) => handleChangeSelect(VARIABLE_STRING.CHUC_VU, selectedOption)}
                  errors={formik.errors?.chucVu}
                  touched={formik.touched?.chucVu}
                  options={[]}
                  getOptionLabel={(option) => option?.value}
                />
              </div>
              <div className="">
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
            <div className="text-header py-2">{lang("CONTRACT.INFO_DETAIL")}</div>
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
                  isReadOnly={isView}
                />
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-1">
                <Autocomplete
                  lable={lang("CONTRACT.WORK_SHIFT")}
                  options={workShifts}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.CA_LAM_VIEC, value)}
                  name="caLamViec"
                  value={formik.values?.caLamViec || null}
                  isReadOnly={isView}
                />
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-1">
                <TextValidator
                  lable={lang("CONTRACT.SALARY.COEFFICIENT")}
                  name="heSoLuong"
                  value={formik.values?.heSoLuong || ""}
                  type="number"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1">
                <TextValidator
                  lable={lang("CONTRACT.BASESALARY")}
                  name="luongCoBan"
                  value={convertNumberPrice(formik.values?.luongCoBan || "")}
                  type="text"
                  readOnly={isView}
                  onChange={handleChangeMoney}
                />
              </div>
              <div className="col-span-1">
                <TextValidator
                  lable={lang("CONTRACT.SALARY_PERCENT")}
                  name="tyLeHuongLuong"
                  value={formik.values?.tyLeHuongLuong || ""}
                  type="number"
                  readOnly={isView}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-1">
                <TextValidator
                  lable={lang("CONTRACT.INSURANCECONTRIBUTION")}
                  name="luongDongBaoHiem"
                  value={convertNumberPrice(formik.values?.luongDongBaoHiem || "")}
                  type="text"
                  readOnly={isView}
                  onChange={handleChangeMoney}
                />
              </div>
              <div className="col-span-1">
                <Autocomplete
                  lable={lang("CONTRACT.STATUS")}
                  options={contractStatus}
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.TRANG_THAI_HOP_DONG, value)}
                  menuPlacement="bottom"
                  isRequired
                  name="trangThaiHopDong"
                  value={formik.values?.trangThaiHopDong || null}
                  isReadOnly={isView}
                  errors={formik.errors?.trangThaiHopDong}
                  touched={formik.touched?.trangThaiHopDong}
                />
              </div>
              <div className="col-span-1">
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
            <div className="text-header py-2">{lang("CONTRACT.SALARY_SIGN")}</div>
            <div className="grid-cols-5 pb-4">
              <div className="col-span-1">
                <Form.Check
                  label={lang("CONTRACT.PAPER_AUTHORITY")}
                  checked={formik.values?.giayUyQuyen}
                  onChange={hanldeChangeCheckBox}
                  className="custom-form-check"
                  readOnly={isView}
                  name="giayUyQuyen"
                />
              </div>
              <div className="col-span-1">
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
                  readOnly={isView}
                  onBlur={() => handleBlurDate(formik.setFieldValue, formik.values?.ngayKyHopDong, "ngayKyHopDong")}
                  onChange={formik.handleChange}
                  errors={formik.errors?.ngayKyHopDong}
                  touched={formik.touched?.ngayKyHopDong}
                />
              </div>
              <div className="col-span-1">
                <Autocomplete
                  lable={lang("CONTRACT.SIGNINGSTATUS")}
                  options={signinStatus}
                  value={formik.values?.trangThaiKy || null}
                  name="trangThaiKy"
                  onChange={(value) => handleChangeSelect(VARIABLE_STRING.TRANG_THAI_KY, value)}
                  isReadOnly={isView}
                />
              </div>
            </div>
            {contractEdit?.id && (
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
                  buttonAdd={!isView && formik.values?.trangThaiHopDong?.code !== codeStatusContract.EXPIRE}
                  updatePageData={updateDataContractAnnex}
                  type={TYPE.MULTILINE}
                  fixedColumnsCount={3}
                  noToolbar={true}
                  noPagination={true}
                  notDelete={true}
                  handleOpenDialog={(row) => handleOpenDialog(annexInfo, setShouldOpenAddContractAnnex, setAnnexInfo)}
                  handleDoubleClick={(row: any) => handleOpenDialog(row, setShouldOpenAddContractAnnex, setAnnexInfo)}
                />
                <div className="spaces mt-16">
                  <Allowance
                    isView={isView}
                    isDisplayBtnAdd={formik.values?.trangThaiHopDong?.code !== codeStatusContract.EXPIRE}
                    identify={contractEdit?.employeeId}
                    isCallApi={true}
                  />
                </div>
              </>
            )}
          </Modal.Body>

          <Modal.Footer className="flex-center">
            <Button
              variant="outline-secondary"
              className="button-secondary btn-sm"
              onClick={() => handleCloseContractDialog()}
            >
              {lang("BTN.CANCEL")}
            </Button>
            {!isView && (
              <Button
                variant="primary"
                className="button-primary btn-sm"
                type="submit"
              >
                {lang("BTN.SAVE")}
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
      {shouldOpenAddContractAnnex && (
        <AddNewContractAnnex
          isView={isView}
          annexInfo={annexInfo}
          contractInfo={contractEdit}
          getListAnnex={updateDataContractAnnex}
          handleCLoseAddContractAnnex={() =>
            handleCloseDialog(INIT_CONTACT_ANNEX_INFO, setShouldOpenAddContractAnnex, setAnnexInfo)
          }
        />
      )}
    </>
  );
};
