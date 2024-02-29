/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import Autocomplete from "../../component/input-field/Autocomplete";
import { heightSelectMutil } from "../../component/input-field/StyleComponent";
import TextValidator from "../../component/input-field/TextValidator";
import TableCustom from "../../component/table-custom/TableCustom";
import { TYPE_CATEGORY } from "../../constant";
import { SUCCESS_CODE } from "../../contract/const/ContractConst";
import { APIResponse } from "../../models/models";
import { searchAllSimpleValue } from "../../services";
import { SEARCH_OBJECT_MAX_SIZE, TYPE, VARIABLE_STRING } from "../../utils/Constant";
import { ACADEMIC_RANK, INIT_TRAINING_LEVEL, REF_TAB, generalEducationLevel } from "../const/ProfileConst";
import { CertificateInfo } from "../models/DialogModels";
import { EmployeeProfile, ITrainingLevel } from "../models/ProfileModels";
import {
  deleteChungChi,
  deleteMultipleEthnicLanguage,
  deleteMultipleForeignLanguage,
  deleteMultipleITQualification,
  deleteMultipleNationalDefense,
  deleteMultiplePoliticalTheory,
  deleteMultipleQualification,
  deleteMultipleSpecializeTraining,
  deleteMultipleStateManagement,
  getAllChungChiById,
  getAllPoliticalTheoryByEmployeeId,
  getEthnicLanguageByEmployee,
  getForeignLanguageLevelByEmployee,
  getITQualificationByEmployee,
  getNationalDefenseByEmployee,
  getQualificationByEmployee,
  getSpecializeTrainingByEmployee,
  getStateManagementByEmployee
} from "../services/DialogServices";
import { CertificateColumn } from "./Column/CertificateColumn";
import { EthnicLanguageColumn } from "./Column/EthnicLanguageColumn";
import { ForeignLanguageLevelColumn } from "./Column/ForeignLanguageLevelColumn";
import { ITQualificationColumn } from "./Column/ITQualificationColumn";
import { NationalDefenseColumn } from "./Column/NationalDefenseColumn";
import { PoliticalTheoryColumn } from "./Column/PoliticalTheoryColumn";
import { QualificationColumn } from "./Column/QualificationColumn";
import { SpecializeTrainingColumn } from "./Column/SpecializeTrainingColumn";
import { StateManagementColumn } from "./Column/StateManagementColumn";
import { CertificateDialog } from "./Dialog/CertificateDialog";
import { EthnicLanguageDialog } from "./Dialog/EthnicLanguageDialog";
import { ForeignLanguageLevelDialog } from "./Dialog/ForeignLanguageLevelDialog";
import { ITQualificationDialog } from "./Dialog/ITQualificationDialog";
import { NationalDefenseDialog } from "./Dialog/NationalDefenseDialog";
import { PoliticalTheoryDialog } from "./Dialog/PoliticalTheoryDialog";
import { QualificationDialog } from "./Dialog/QualificationDialog";
import { SpecializeTrainingDialog } from "./Dialog/SpecializeTrainingDialog";
import { StateManagementDialog } from "./Dialog/StateManagementDialog";
import { getTrainingInfoByEmployee, updateTrainingInfo } from "../services/ProfileServices";
import "../profile.scss";

type IProps = {
  identify: string;
  isView: boolean;
  employeeProfiles: EmployeeProfile;
  activeTab: string;
  formikRef: any;
};

export const TranningInfomation: React.FC<IProps> = ({ identify, isView, employeeProfiles, activeTab, formikRef }) => {
  const { lang } = useMultiLanguage();

  const [shouldOpenCertificateDialog, setShouldOpenCertificateDialog] = useState<boolean>(false);
  const [shouldOpenPoliticalTheoryDialog, setShouldOpenPoliticalTheoryDialog] = useState<boolean>(false);
  const [shouldOpenQualificationDialog, setShouldOpenQualificationDialog] = useState<boolean>(false);
  const [shouldOpenStateManagementDialog, setShouldOpenStateManagementDialog] = useState<boolean>(false);
  const [shouldOpenITQualificationDialog, setShouldOpenITQualificationDialog] = useState<boolean>(false);
  const [shouldOpenForeignLanguageLevelDialog, setShouldOpenForeignLanguageLevelDialog] = useState<boolean>(false);
  const [shouldOpenNationalDefenseDialog, setShouldOpenNationalDefenseDialog] = useState<boolean>(false);
  const [shouldOpenSpecializeTrainingDialog, setShouldOpenSpecializeTrainingDialog] = useState<boolean>(false);
  const [shouldOpenEthnicLanguageDialog, setShouldOpenEthnicLanguageDialog] = useState<boolean>(false);

  const [trainingInfo, setTrainingInfo] = useState<ITrainingLevel>();
  const [certificate, setCertificate] = useState<CertificateInfo>({} as CertificateInfo);
  const [listCertificate, setListCertificate] = useState<CertificateInfo[]>([]);
  const [politicalTheory, setPoliticalTheory] = useState<any>({});
  const [listPoliticalTheory, setListPoliticalTheory] = useState<any[]>([]);
  const [qualification, setQualification] = useState<any>({});
  const [listQualification, setListQualification] = useState<any[]>([]);
  const [stateManagement, setStateManagement] = useState<any>({});
  const [listStateManagement, setListStateManagement] = useState<any[]>([]);
  const [ITQualification, setITQualification] = useState<any>({});
  const [listITQualification, setListITQualification] = useState<any[]>([]);
  const [foreignLanguageLevel, setForeignLanguageLevel] = useState<any>({});
  const [listForeignLanguageLevel, setListForeignLanguageLevel] = useState<any[]>([]);
  const [nationalDefense, setNationalDefense] = useState<any>({});
  const [listNationalDefense, setListNationalDefense] = useState<any[]>([]);
  const [specializeTraining, setSpecializeTraining] = useState<any>({});
  const [listSpecializeTraining, setListSpecializeTraining] = useState<any[]>([]);
  const [ethnicLanguage, setEthnicLanguage] = useState<any>({});
  const [listEthnicLanguage, setListEthnicLanguage] = useState<any[]>([]);
  const [isCheckChuyenNganh, setIsCheckChuyenNganh] = useState<boolean>(false);

  useEffect(() => {
    if (!identify || activeTab !== REF_TAB.DAO_TAO_BOI_DUONG) return;
    updateDataTrainingInfo();
    updateDataQualification();
    updateDataCertificate();
    updateDataPoliticalTheory();
    updateDataStateManagement();
    updateDataITQualification();
    updateDataForeignLanguageLevel();
    updateDataNationalDefense();
    updateDataSpecializeTraining();
    updateDataEthnicLanguage();
  }, [identify, activeTab]);

  const updateDataTrainingInfo = async () => {
    try {
      let { data } = await getTrainingInfoByEmployee(identify);
      if (data?.code === SUCCESS_CODE) {
        setTrainingInfo(data?.data);
        setIsCheckChuyenNganh(data?.data?.chuyenNganhHocHamKhac ? true : false)
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const updateDataQualification = async () => {
    let { data } = await getQualificationByEmployee(identify);
    setListQualification(data?.data);
  };

  const updateDataCertificate = async () => {
    if (identify) {
      let { data } = await getAllChungChiById(identify);
      setListCertificate(data?.data);
    }
  };

  const updateDataPoliticalTheory = async () => {
    if (identify) {
      let { data } = await getAllPoliticalTheoryByEmployeeId(identify);
      setListPoliticalTheory(data?.data?.content);
    }
  };

  const updateDataStateManagement = async () => {
    let { data } = await getStateManagementByEmployee(identify);
    setListStateManagement(data?.data);
  };

  const updateDataITQualification = async () => {
    let { data } = await getITQualificationByEmployee(identify);
    setListITQualification(data?.data);
  };

  const updateDataForeignLanguageLevel = async () => {
    let { data } = await getForeignLanguageLevelByEmployee(identify);
    setListForeignLanguageLevel(data?.data);
  };

  const updateDataNationalDefense = async () => {
    let { data } = await getNationalDefenseByEmployee(identify);
    setListNationalDefense(data?.data);
  };

  const updateDataSpecializeTraining = async () => {
    let { data } = await getSpecializeTrainingByEmployee(identify);
    setListSpecializeTraining(data?.data);
  };

  const updateDataEthnicLanguage = async () => {
    let { data } = await getEthnicLanguageByEmployee(identify);
    setListEthnicLanguage(data?.data);
  };

  const handleOpenDialog = (
    row: any,
    setShouldOpenDialog: (value: React.SetStateAction<boolean>) => void,
    setData: (value: any) => void
  ): void => {
    if (employeeProfiles?.code) {
      setShouldOpenDialog(true);
      setData(row);
    } else {
      toast.warning(lang("MESSAGE.BASIC.FIRST"));
    }
  };

  const handleCloseDialog = (
    updateData: () => Promise<void>,
    setShouldOpenDialog: (value: React.SetStateAction<boolean>) => void,
    setData: (value: any) => void
  ): void => {
    setShouldOpenDialog(false);
    updateData();
    updateDataTrainingInfo();
    setData({});
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
    await updateDataTrainingInfo();
  };

  const validationSchema = Yup.object().shape({
    trinhDoGiaoDucPhoThong: Yup.object().required(lang("VALIDATION.REQUIRE")).nullable(),
    namPhongTang: Yup.number()
      .min(1900, lang("VALIDATION.MIN_YEAR"))
      .max(new Date().getFullYear(), lang("VALIDATON.YEAR_CURRENT"))
      .nullable()
  });

  const handleFormSubmit = async (values: any) => {
    try {
      let dataSubmit = {
        ...values,
        employeeId: identify,
        trinhDoGiaoDucPhoThongId: values.trinhDoGiaoDucPhoThong?.code || "",
        trinhDoGiaoDucPhoThongText: values.trinhDoGiaoDucPhoThong?.name || "",
        chuyenNganhHocHamId: values.chuyenNganhHocHam?.id || "",
        chuyenNganhHocHamText: values.chuyenNganhHocHam?.value || ""
      };
      const { data } = await updateTrainingInfo(identify, dataSubmit);
      if (data?.code === SUCCESS_CODE) {
        toast.success(lang("TOAST.EDIT.SUCCESS"));
        updateDataTrainingInfo();
      } else toast.error(`${data?.message}`);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
  };

  const formik = useFormik({
    initialValues: INIT_TRAINING_LEVEL,
    validationSchema,
    onSubmit: handleFormSubmit
  });

  useEffect(() => {
    if (identify) {
      formik.setValues({
        ...trainingInfo,
        trinhDoGiaoDucPhoThong: trainingInfo?.trinhDoGiaoDucPhoThongId
          ? {
              code: trainingInfo?.trinhDoGiaoDucPhoThongId || "",
              name: trainingInfo?.trinhDoGiaoDucPhoThongText || ""
            }
          : null,
        chuyenNganhHocHam: trainingInfo?.chuyenNganhHocHamId
          ? {
              id: trainingInfo?.chuyenNganhHocHamId || "",
              value: trainingInfo?.chuyenNganhHocHamText || ""
            }
          : null
      });
    }
  }, [identify, trainingInfo]);

  const handleChangeSelect = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (formikRef) {
      formikRef.current = formik;
    }
  }, [formik, formikRef]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, nameObj: string) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    formik.setFieldValue(nameObj, null);
  };

  return (
    <>
      <Form
        className="form-info training-level-info flex-column z-index-2 relative"
        onSubmit={formik.handleSubmit}
      >
        <div className="block-content">
          <span className="text-header">{lang("INPUT.ACADEMIC_TITLE_CONFERRED")}</span>
          <div className="content">
            <div>
              <Autocomplete
                lable={lang("INPUT.ACADEMIC_RANK")}
                name="hocHam"
                value={formik.values?.hocHam || null}
                options={ACADEMIC_RANK}
                isReadOnly={isView}
                onChange={(selectedOption: any) => handleChangeSelect(VARIABLE_STRING.HOC_HAM, selectedOption)}
              />
            </div>
            <div>
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
            <div>
              <Autocomplete
                lable={lang("INPUT.SPECIALIZED")}
                formCheckBox={true}
                value={isCheckChuyenNganh ? formik.values?.chuyenNganhHocHamKhac : formik.values?.chuyenNganhHocHam}
                name={
                  isCheckChuyenNganh ? VARIABLE_STRING.CHUYEN_NGANH_HOC_HAM_KHAC : VARIABLE_STRING.CHUYEN_NGANH_HOC_HAM
                }
                setIsCheckBox={setIsCheckChuyenNganh}
                isCheckBox={isCheckChuyenNganh}
                onChange={(selectedOption) =>
                  isCheckChuyenNganh
                    ? handleChange(selectedOption, VARIABLE_STRING.CHUYEN_NGANH_HOC_HAM)
                    : handleChangeSelect(VARIABLE_STRING.CHUYEN_NGANH_HOC_HAM, selectedOption)
                }
                isReadOnly={isView}
                options={[]}
                searchFunction={searchAllSimpleValue}
                searchObject={{
                  ...SEARCH_OBJECT_MAX_SIZE,
                  type: TYPE_CATEGORY.chuyenNganh
                }}
                getOptionLabel={(option) => option?.value}
              />
            </div>
          </div>
        </div>
        <div className="block-content">
          <span className="text-header">{lang("GENERAL.TRAINING_LEVEL_INFO")}</span>
          <div className="content">
            <div>
              <Autocomplete
                isRequired={true}
                lable={lang("INPUT.TRAINING_LEVEL_INFO.EDUCATION_LEVEL")}
                name="trinhDoGiaoDucPhoThong"
                value={formik.values?.trinhDoGiaoDucPhoThong}
                options={generalEducationLevel}
                isReadOnly={isView}
                onChange={(selectedOption: any) => handleChangeSelect("trinhDoGiaoDucPhoThong", selectedOption)}
                touched={formik.touched?.trinhDoGiaoDucPhoThong}
                errors={formik.errors?.trinhDoGiaoDucPhoThong}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.HIGHEST_LEVEL")}
                name="trinhDoChuyenMonCaoNhat"
                type="text"
                value={formik.values?.trinhDoChuyenMonCaoNhat || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.TRAINING_FORM")}
                name="hinhThucDaoTao"
                type="text"
                value={formik.values?.hinhThucDaoTao || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.SPECIALIZED_TRAINING")}
                name="chuyenNganhDaoTao"
                type="text"
                value={formik.values?.chuyenNganhDaoTao || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.QUALIFICATION.GRADUATE_YEAR")}
                name="namDaoTao"
                type="text"
                value={formik.values?.namDaoTao || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.TRANNING_FACILITY")}
                name="coSoDaoTao"
                type="text"
                value={formik.values?.coSoDaoTao || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.HIGHEST_LANGUAGE_LEVEL")}
                name="trinhDoNgoaiNguCaoNhat"
                type="text"
                value={formik.values?.trinhDoNgoaiNguCaoNhat || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.POLITICAL_THEORY_LEVEL")}
                name="trinhDoLyLuanChinhTri"
                type="text"
                value={formik.values?.trinhDoLyLuanChinhTri || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.HIGHEST_IT_LEVEL")}
                name="trinhDoTinHocCaoNhat"
                type="text"
                value={formik.values?.trinhDoTinHocCaoNhat || ""}
                readOnly={true}
              />
            </div>
            <div>
              <TextValidator
                lable={lang("INPUT.TRAINING_LEVEL_INFO.STATE_MANAGEMENT_LEVEL")}
                name="trinhDoQuanLyNhaNuoc"
                type="text"
                value={formik.values?.trinhDoQuanLyNhaNuoc || ""}
                readOnly={true}
              />
            </div>
            <div className="grid-column-2">
              <Autocomplete
                lable={lang("INPUT.TRAINING_LEVEL_INFO.SOFT_SKILL")}
                closeMenuOnSelect={false}
                name="kyNangMemList"
                value={formik.values?.kyNangMemList || []}
                options={[]}
                isMulti={true}
                searchFunction={searchAllSimpleValue}
                onChange={(selectedOption: any) => handleChangeSelect("kyNangMemList", selectedOption)}
                searchObject={{ ...SEARCH_OBJECT_MAX_SIZE, type: TYPE_CATEGORY.kyNangMem }}
                getOptionLabel={(option) => option?.value}
                getOptionValue={(option) => option?.value}
                styles={heightSelectMutil("auto")}
                isReadOnly={isView ? true : undefined}
              />
            </div>
          </div>
        </div>
      </Form>
      <div className="form-info">
        <div className="block-content">
          <TableCustom
            id="qualification"
            title={lang("INFO.QUALIFICATION.FROM_INTERMEDIATE_LEVEL")}
            isActionTableTab 
            buttonAdd={!isView} 
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listQualification}
            columns={QualificationColumn()}
            updatePageData={() => {}}
            handleDelete={(ids: string) => handleDeleteItems(deleteMultipleQualification, updateDataQualification, ids)}
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            fixedColumnsCount={2}
            dependencies={activeTab}
            handleOpenDialog={(row) => handleOpenDialog(row, setShouldOpenQualificationDialog, setQualification)}
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenQualificationDialog, setQualification) : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="certificate"
            title={lang("INFO.CERTIFICATE")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listCertificate}
            columns={CertificateColumn()}
            updatePageData={updateDataCertificate}
            handleDelete={(ids: string) => handleDeleteItems(deleteChungChi, updateDataCertificate, ids)}
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) => handleOpenDialog(row, setShouldOpenCertificateDialog, setCertificate)}
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenCertificateDialog, setCertificate) : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="politicalTheory"
            title={lang("INFO.POLITICAL_THEORY")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listPoliticalTheory}
            columns={PoliticalTheoryColumn()}
            updatePageData={updateDataPoliticalTheory}
            handleDelete={(ids: string) =>
              handleDeleteItems(deleteMultiplePoliticalTheory, updateDataPoliticalTheory, ids)
            }
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) => handleOpenDialog(row, setShouldOpenPoliticalTheoryDialog, setPoliticalTheory)}
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenPoliticalTheoryDialog, setPoliticalTheory) : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="stateManagement"
            title={lang("INFO.STATE_MANAGEMENT")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listStateManagement}
            columns={StateManagementColumn()}
            updatePageData={() => {}}
            handleDelete={(ids: string) =>
              handleDeleteItems(deleteMultipleStateManagement, updateDataStateManagement, ids)
            }
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) => handleOpenDialog(row, setShouldOpenStateManagementDialog, setStateManagement)}
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenStateManagementDialog, setStateManagement) : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="ITQualification"
            title={lang("INFO.IT_QUALIFICATION")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listITQualification}
            columns={ITQualificationColumn()}
            updatePageData={() => {}}
            handleDelete={(ids: string) =>
              handleDeleteItems(deleteMultipleITQualification, updateDataITQualification, ids)
            }
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) => handleOpenDialog(row, setShouldOpenITQualificationDialog, setITQualification)}
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenITQualificationDialog, setITQualification) : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="foreignLanguageLevel"
            title={lang("INFO.FOREIGN_LANG_LEVEL")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listForeignLanguageLevel}
            columns={ForeignLanguageLevelColumn()}
            updatePageData={() => {}}
            handleDelete={(ids: string) =>
              handleDeleteItems(deleteMultipleForeignLanguage, updateDataForeignLanguageLevel, ids)
            }
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) =>
              handleOpenDialog(row, setShouldOpenForeignLanguageLevelDialog, setForeignLanguageLevel)
            }
            handleDoubleClick={(row) =>
              !isView
                ? handleOpenDialog(row, setShouldOpenForeignLanguageLevelDialog, setForeignLanguageLevel)
                : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="nationalDefense"
            title={lang("INFO.TRAINING.NATIONAL_DEFENSE")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listNationalDefense}
            columns={NationalDefenseColumn()}
            updatePageData={() => {}}
            handleDelete={(ids: string) =>
              handleDeleteItems(deleteMultipleNationalDefense, updateDataNationalDefense, ids)
            }
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) => handleOpenDialog(row, setShouldOpenNationalDefenseDialog, setNationalDefense)}
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenNationalDefenseDialog, setNationalDefense) : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="specializeTraining"
            title={lang("INFO.TRAINING.SPECIALIZE")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listSpecializeTraining}
            columns={SpecializeTrainingColumn()}
            updatePageData={() => {}}
            handleDelete={(ids: string) =>
              handleDeleteItems(deleteMultipleSpecializeTraining, updateDataSpecializeTraining, ids)
            }
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) =>
              handleOpenDialog(row, setShouldOpenSpecializeTrainingDialog, setSpecializeTraining)
            }
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenSpecializeTrainingDialog, setSpecializeTraining) : () => {}
            }
          />
        </div>
        <div className="block-content">
          <TableCustom
            id="ethnicLanguage"
            title={lang("INFO.ETHNIC_LANGUAGE")}
            isActionTableTab
            buttonAdd={!isView}
            buttonExportExcel={true}
            notDelete={isView}
            noToolbar={true}
            data={listEthnicLanguage}
            columns={EthnicLanguageColumn()}
            updatePageData={() => {}}
            handleDelete={(ids: string) =>
              handleDeleteItems(deleteMultipleEthnicLanguage, updateDataEthnicLanguage, ids)
            }
            justFilter={true}
            type={TYPE.MULTILINE}
            noPagination={true}
            handleOpenDialog={(row) => handleOpenDialog(row, setShouldOpenEthnicLanguageDialog, setEthnicLanguage)}
            handleDoubleClick={(row) =>
              !isView ? handleOpenDialog(row, setShouldOpenEthnicLanguageDialog, setEthnicLanguage) : () => {}
            }
          />
        </div>
        {shouldOpenQualificationDialog && (
          <QualificationDialog
            handleCloseQualificationDialog={() =>
              handleCloseDialog(updateDataQualification, setShouldOpenQualificationDialog, setQualification)
            }
            identify={identify}
            isView={isView}
            qualificationEdit={qualification}
            updateData={updateDataQualification}
          />
        )}
        {shouldOpenCertificateDialog && (
          <CertificateDialog
            handleCloseCertificateDialog={() =>
              handleCloseDialog(updateDataCertificate, setShouldOpenCertificateDialog, setCertificate)
            }
            identify={identify}
            isView={isView}
            certificateEdit={certificate}
            updateData={updateDataCertificate}
          />
        )}
        {shouldOpenPoliticalTheoryDialog && (
          <PoliticalTheoryDialog
            handleClosePoliticalTheoryDialog={() =>
              handleCloseDialog(updateDataPoliticalTheory, setShouldOpenPoliticalTheoryDialog, setPoliticalTheory)
            }
            identify={identify}
            isView={isView}
            politicalTheoryEdit={politicalTheory}
            updateData={updateDataPoliticalTheory}
          />
        )}
        {shouldOpenStateManagementDialog && (
          <StateManagementDialog
            handleCloseStateManagementDialog={() =>
              handleCloseDialog(updateDataStateManagement, setShouldOpenStateManagementDialog, setStateManagement)
            }
            identify={identify}
            isView={isView}
            stateManagementEdit={stateManagement}
            updateData={updateDataStateManagement}
          />
        )}
        {shouldOpenITQualificationDialog && (
          <ITQualificationDialog
            handleCloseITQualificationDialog={() =>
              handleCloseDialog(updateDataITQualification, setShouldOpenITQualificationDialog, setITQualification)
            }
            identify={identify}
            isView={isView}
            ITQualificationEdit={ITQualification}
            updateData={updateDataITQualification}
          />
        )}
        {shouldOpenForeignLanguageLevelDialog && (
          <ForeignLanguageLevelDialog
            handleCloseForeignLanguageLevelDialog={() =>
              handleCloseDialog(
                updateDataForeignLanguageLevel,
                setShouldOpenForeignLanguageLevelDialog,
                setForeignLanguageLevel
              )
            }
            identify={identify}
            isView={isView}
            foreignLanguageLevelEdit={foreignLanguageLevel}
            updateData={updateDataForeignLanguageLevel}
          />
        )}
        {shouldOpenNationalDefenseDialog && (
          <NationalDefenseDialog
            handleCloseNationalDefenseDialog={() =>
              handleCloseDialog(updateDataNationalDefense, setShouldOpenNationalDefenseDialog, setNationalDefense)
            }
            identify={identify}
            isView={isView}
            nationalDefenseEdit={nationalDefense}
            updateData={updateDataNationalDefense}
          />
        )}
        {shouldOpenSpecializeTrainingDialog && (
          <SpecializeTrainingDialog
            handleCloseSpecializeTrainingDialog={() =>
              handleCloseDialog(
                updateDataSpecializeTraining,
                setShouldOpenSpecializeTrainingDialog,
                setSpecializeTraining
              )
            }
            identify={identify}
            isView={isView}
            specializeTrainingEdit={specializeTraining}
            updateData={updateDataSpecializeTraining}
          />
        )}
        {shouldOpenEthnicLanguageDialog && (
          <EthnicLanguageDialog
            handleCloseEthnicLanguageDialog={() =>
              handleCloseDialog(updateDataEthnicLanguage, setShouldOpenEthnicLanguageDialog, setEthnicLanguage)
            }
            identify={identify}
            isView={isView}
            ethnicLanguageEdit={ethnicLanguage}
            updateData={updateDataEthnicLanguage}
          />
        )}
      </div>
    </>
  );
};
