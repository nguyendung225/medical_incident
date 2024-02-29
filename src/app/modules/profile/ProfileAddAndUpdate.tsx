/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { GroupButton } from "../component/GroupButton";
import { searchNationality } from "../services";
import { RESPONSE_STATUS_CODE, SEARCH_OBJECT_MAX_SIZE } from "../utils/Constant";
import { AttachmentsInformation } from "./component/AttachmentsInformation";
import { BasicInformation } from "./component/BasicInformation";
import { ContactInformation } from "./component/ContactInformation";
import EmployeeInfo from "./component/EmployeeInfo";
import FamilyInformation from "./component/FamilyInformation";
import { InsuranceInfomation } from "./component/InsuranceInfomation";
import MedicalInformation from "./component/MedicalInformation";
import MilitaryInformation from "./component/MilitaryInformation";
import PoliticsInformation from "./component/PoliticsInformation";
import { SalaryInformation } from "./component/SalaryInformation";
import { TempPapersInformation } from "./component/TempPapersInformation";
import { WorkExperienceInformation } from "./component/WorkExperienceInformation";
import { WorkInformation } from "./component/WorkInformation";
import { WorkingProcessInformation } from "./component/WorkingProcessInformation";
import { REF_TAB, defaultEmployeeProfile, profileSubTabs, profileTabs } from "./const/ProfileConst";
import { EmployeeProfile, ProfileTab } from "./models/ProfileModels";
import { getEmployeeProfileById, handleAddBasicInfo } from "./services/ProfileServices";
import { convertDataUI } from "./utils/FunctionUtils";
import { useWindowSize } from "../../hook/useWindowSize";
import { ContractInformation } from "./component/ContractInformation";
import { TranningInfomation } from "./component/TranningInfomation";
import VaccinationInformation from "./component/VaccinationInformation";
import { hasAuthority, hasRole } from "../utils/FunctionUtils";
import { PERMISSIONS, PERMISSION_ABILITY, ROLE } from "../../Constant";
import { useAuth } from "../auth";
import { getEmployeeIdByUserId } from "./services/DialogServices";
import TitleConferredInfomation from "./component/TitleConferredInfomation";
import FamilyPolicyInfomation from "./component/FamilyPolicyInfomation";

interface IProps {
  handleCloseDialog: () => void;
  idEmployee?: string;
  setIdEmployee: (data: any) => void;
  isView: boolean;
  setIsView: (value: boolean) => void;
  handleToggleIsView: () => void;
}

export const ProfileAddAndUpdate: React.FC<IProps> = ({
  handleCloseDialog,
  idEmployee,
  setIdEmployee,
  isView,
  setIsView,
  handleToggleIsView
}) => {
  const intl = useIntl();
  const windowSize = useWindowSize();
  const MAX_VISIBLE_ITEMS = 8;
  const [employeeProfiles, setEmployeeProfiles] = useState<EmployeeProfile>(defaultEmployeeProfile);
  const [title, setTitle] = useState("PROFILE.ADD");
  const [identify, setIdentify] = useState("");
  const [activeTab, setActiveTab] = useState<string>(REF_TAB.TT_CO_BAN);
  const [dataFromChild, setDataFromChild] = useState({});
  const [listProfileTabs, setListProfileTabs] = useState<ProfileTab[]>(profileTabs.slice(0, 7));
  const [listProfileSubTabs, setListProfileSubTabs] = useState<ProfileTab[]>(profileSubTabs);
  const formikRefBasicInformation = useRef<FormikProps<any>>(null);
  const formikRefContactInformation = useRef<FormikProps<any>>(null);
  const formikRefWorkInformation = useRef<FormikProps<any>>(null);
  const formikRefInsuranceInfomation = useRef<FormikProps<any>>(null);
  const formikRefPoliticsInformation = useRef<FormikProps<any>>(null);
  const formikRefLaborContract = useRef<FormikProps<any>>(null);
  const formikRefSalaryInformation = useRef<FormikProps<any>>(null);
  const formikRefTrainingInfomation = useRef<FormikProps<any>>(null);
  const [activeFormikRef, setActiveFormikRef] = useState<FormikProps<any> | null>();
  const [nationality, setNationality] = useState([]);
  const [nationalityDefault, setNationalityDefault] = useState(null);

  const { currentUser } = useAuth();

  const checkID = async () => {
    let employeeId = currentUser?.id ? currentUser?.id : currentUser?.user?.id;
    const { data } = await getEmployeeIdByUserId(employeeId);
    setIdEmployee(data.data?.id);
  };
  useEffect(() => {
    if (hasRole(ROLE.USER)) {
      checkID();
      setTitle("PROFILE.EDIT");
      handleToggleIsView();
    }
  }, [currentUser]);

  const blockEditContract = !hasAuthority(PERMISSIONS.HOP_DONG, PERMISSION_ABILITY.UPDATE) && hasRole(ROLE.USER);
  const blockEditSalary = !hasAuthority(PERMISSIONS.LUONG, PERMISSION_ABILITY.UPDATE) && hasRole(ROLE.USER);

  useEffect(() => {
    updateDataNationality();
  }, []);

  useEffect(() => {
    const handleTabAllocation = () => {
      const { width } = windowSize;
      switch (true) {
        case width > 1920:
          setListProfileTabs(profileTabs.slice(0, 8));
          setListProfileSubTabs([...profileTabs.slice(8), ...profileSubTabs]);
          break;
        case width <= 1920 && width > 1730:
          setListProfileTabs(profileTabs.slice(0, 7));
          setListProfileSubTabs([...profileTabs.slice(7), ...profileSubTabs]);
          break;
        case width <= 1730 && width > 1450:
          setListProfileTabs(profileTabs.slice(0, 6));
          setListProfileSubTabs([...profileTabs.slice(6), ...profileSubTabs]);
          break;
        case width <= 1450 && width > 1366:
          setListProfileTabs(profileTabs.slice(0, 5));
          setListProfileSubTabs([...profileTabs.slice(5), ...profileSubTabs]);
          break;
        case width <= 1366 && width > 1250:
          setListProfileTabs(profileTabs.slice(0, 4));
          setListProfileSubTabs([...profileTabs.slice(4), ...profileSubTabs]);
          break;
        case width <= 1250 && width > 1090:
          setListProfileTabs(profileTabs.slice(0, 3));
          setListProfileSubTabs([...profileTabs.slice(3), ...profileSubTabs]);
          break;
        default:
          setListProfileTabs(profileTabs.slice(0, 2));
          setListProfileSubTabs([...profileTabs.slice(2), ...profileSubTabs]);
          break;
      }
    };
    handleTabAllocation();
  }, [windowSize]);

  const updateDataNationality = async () => {
    try {
      const { data, status } = await searchNationality(SEARCH_OBJECT_MAX_SIZE);
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS && status === RESPONSE_STATUS_CODE.SUCCESS) {
        setNationality(data?.data?.content);
        let defaultItem = data?.data?.content.find((item: any) => item?.name === "Việt Nam");
        setNationalityDefault(defaultItem);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(intl.formatMessage({ id: "GENERAL.ERROR" }));
    }
  };

  useEffect(() => {
    if (idEmployee) {
      handleGetEmployee(idEmployee);
    }
  }, [idEmployee]);

  const handleGetEmployee = async (id: string) => {
    try {
      let { data } = await getEmployeeProfileById(id);
      setEmployeeProfiles(convertDataUI(data?.data));
      setIdentify(id);
    } catch (err: any) {
      toast.error(err);
    }
  };

  const handleClose = () => {
    handleCloseDialog();
    setEmployeeProfiles(defaultEmployeeProfile);
  };

  const handleUploadAvatar = (url: string) => {
    setEmployeeProfiles({ ...employeeProfiles, photo: url });
    handleAddBasicInfo(employeeProfiles);
  };

  const handleOpenField = (statusField: boolean, condition: string | number, handleSet: any) => {
    if (statusField === false && !condition) {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
    } else {
      handleSet(!statusField);
    }
  };

  const handleChangeSelect = (name: string, value: string) => {
    setEmployeeProfiles({ ...employeeProfiles, [name]: value });
  };

  const handleTabChange = (tabId: string) => {
    if (tabId !== REF_TAB.TT_CO_BAN && !identify) {
      toast.warning(intl.formatMessage({ id: "MESSAGE.BASIC.FIRST" }));
      return;
    }
    setActiveTab(tabId);
    switch (tabId) {
      case REF_TAB.TT_CO_BAN:
        setActiveFormikRef(formikRefBasicInformation.current);
        break;
      case REF_TAB.TT_LIEN_HE:
        setActiveFormikRef(formikRefContactInformation.current);
        break;
      case REF_TAB.TT_CONG_VIEC:
        setActiveFormikRef(formikRefWorkInformation.current);
        break;
      case REF_TAB.TT_CHINH_TRI:
        setActiveFormikRef(formikRefPoliticsInformation.current);
        break;
      case REF_TAB.BAO_HIEM:
        setActiveFormikRef(formikRefInsuranceInfomation.current);
        break;
      case REF_TAB.TT_LUONG:
        setActiveFormikRef(formikRefSalaryInformation.current);
        break;
      case REF_TAB.HOP_DONG_LAO_DONG:
        setActiveFormikRef(formikRefLaborContract.current);
        break;
      case REF_TAB.DAO_TAO_BOI_DUONG:
        setActiveFormikRef(formikRefTrainingInfomation.current);
        break;
      default:
        setActiveFormikRef(null);
        break;
    }
  };

  useEffect(() => {
    setActiveFormikRef(formikRefBasicInformation.current);
  }, []);

  useEffect(() => {
    if (listProfileTabs.length > MAX_VISIBLE_ITEMS) {
      const visibleItems = profileTabs.slice(0, MAX_VISIBLE_ITEMS);
      const remainingItems = profileTabs.slice(MAX_VISIBLE_ITEMS);

      setListProfileTabs(visibleItems);
      setListProfileSubTabs([...remainingItems, ...profileSubTabs]);
    }
  }, [identify, listProfileTabs]);

  const handleSubmit = () => {
    if (activeFormikRef) {
      activeFormikRef.submitForm();
    }
  };

  const handleGetDataFromChildren = (data: {}) => {
    setDataFromChild({ ...dataFromChild, ...data });
  };

  return (
    <>
      <div className="header-container">
        {!isView ? (
          <>
            {" "}
            <span className="fs-1 fw-bold">{intl.formatMessage({ id: title })}</span>
            <div className="actions">
              {!hasRole(ROLE.USER) && (
                <button
                  className="btn btn-outline btn-sm btn-sm button-secondary me-2 "
                  onClick={handleCloseDialog}
                >
                  {intl.formatMessage({ id: "BTN.BACK" })}
                </button>
              )}
              {(!hasRole(ROLE.USER) ||
                (hasRole(ROLE.USER) &&
                  !(activeTab === REF_TAB.TT_LUONG || activeTab === REF_TAB.HOP_DONG_LAO_DONG))) && (
                <button
                  className="btn btn-outline-primary btn-sm btn-sm button-primary"
                  onClick={handleSubmit}
                >
                  {intl.formatMessage({ id: "BTN.SAVE" })}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {!hasRole(ROLE.USER) && (
              <div className="ms-2">
                <GroupButton
                  type="btn-back"
                  handleClose={handleClose}
                ></GroupButton>
              </div>
            )}
            {hasRole(ROLE.USER) && <span className="fs-1 fw-bold">{intl.formatMessage({ id: title })}</span>}
            <div className="me-2">
              {(!hasRole(ROLE.USER) ||
                (hasRole(ROLE.USER) &&
                  !(activeTab === REF_TAB.TT_LUONG || activeTab === REF_TAB.HOP_DONG_LAO_DONG))) && (
                <GroupButton
                  type="btn-edit"
                  handleSaveEdit={() => {
                    handleToggleIsView();
                    setTitle("PROFILE.EDIT");
                  }}
                  handleClose={handleClose}
                />
              )}
            </div>
          </>
        )}
      </div>
      <div className="layout-v2 flex align-items-start">
        <div className="general-user-info flex-column align-items-start align-self-stretch">
          <EmployeeInfo
            isView={isView}
            handleUploadAvatar={handleUploadAvatar}
            employeeProfiles={employeeProfiles}
          />
        </div>
        <div className="tabs-user-info flex-1">
          <ul
            className="nav nav-tabs nav-line-tabs"
            id="profileTabsUl"
            onClick={(e: any) => handleTabChange(e.target.getAttribute("href"))}
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href={REF_TAB.TT_CO_BAN}
              >
                Thông tin cơ bản
              </a>
            </li>
            {listProfileTabs.map((tab, index) => (
              <li
                className="nav-item"
                key={tab.id + index}
              >
                <a
                  className={`nav-link`}
                  data-bs-toggle={identify ? "tab" : ""}
                  href={tab?.ref}
                >
                  {tab.name}
                </a>
              </li>
            ))}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Khác
              </button>
              <ul className="dropdown-menu">
                {listProfileSubTabs.map((tab, index) => (
                  <li
                    key={tab.id + index}
                    className="nav-item"
                  >
                    <a
                      className={`nav-link dropdown-item`}
                      data-bs-toggle={identify ? "tab" : ""}
                      href={tab?.ref}
                    >
                      {tab.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div
            className="tab-content"
            id="myTabContent"
          >
            <div
              className="tab-pane fade show active"
              id="kt_tab_pane_1"
              role="tabpanel"
            >
              <BasicInformation
                identify={identify}
                activeTab={activeTab}
                formikRef={formikRefBasicInformation}
                employeeProfiles={employeeProfiles}
                isView={isView}
                handleOpenField={handleOpenField}
                handleToggleIsView={handleToggleIsView}
                handleGetEmployee={handleGetEmployee}
                handleChangeSelect={handleChangeSelect}
                nationality={nationality}
                nationalityDefault={nationalityDefault}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_2"
              role="tabpanel"
            >
              <ContactInformation
                identify={identify}
                activeTab={activeTab}
                formikRef={formikRefContactInformation}
                employeeProfiles={employeeProfiles}
                isView={isView}
                handleOpenField={handleOpenField}
                handleToggleIsView={handleToggleIsView}
                handleGetEmployee={handleGetEmployee}
                handleChangeSelect={handleChangeSelect}
                nationality={nationality}
                nationalityDefault={nationalityDefault}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_3"
              role="tabpanel"
            >
              <WorkInformation
                activeTab={activeTab}
                handleGetDataFromChildren={handleGetDataFromChildren}
                identify={identify}
                formikRef={formikRefWorkInformation}
                employeeProfiles={employeeProfiles}
                isView={isView}
                handleGetEmployee={handleGetEmployee}
                handleToggleIsView={handleToggleIsView}
                handleChangeSelect={handleChangeSelect}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_4"
              role="tabpanel"
            >
              <TranningInfomation
                isView={isView}
                activeTab={activeTab}
                identify={identify}
                employeeProfiles={employeeProfiles}
                formikRef={formikRefTrainingInfomation}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_5"
              role="tabpanel"
            >
              <SalaryInformation
                activeTab={activeTab}
                isView={blockEditSalary ? blockEditSalary : isView}
                identify={identify}
                employeeProfiles={employeeProfiles}
                handleGetEmployee={handleGetEmployee}
                formikRef={formikRefSalaryInformation}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_6"
              role="tabpanel"
            >
              <ContractInformation
                identify={identify}
                isView={blockEditContract ? blockEditContract : isView}
                formikRef={formikRefLaborContract}
                activeTab={activeTab}
                employeeProfiles={employeeProfiles}
                handleToggleIsView={handleToggleIsView}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_7"
              role="tabpanel"
            >
              <WorkingProcessInformation
                handleGetDataFromChildren={handleGetDataFromChildren}
                identify={identify}
                isView={isView}
                employeeProfiles={employeeProfiles}
                activeTab={activeTab}
                handleToggleIsView={handleToggleIsView}
                handleGetEmployee={handleGetEmployee}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_8"
              role="tabpanel"
            >
              <PoliticsInformation
                activeTab={activeTab}
                identify={identify}
                employeeProfiles={employeeProfiles}
                formikRef={formikRefPoliticsInformation}
                isView={isView}
                handleGetEmployee={handleGetEmployee}
                handleToggleIsView={handleToggleIsView}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_9"
              role="tabpanel"
            >
              <FamilyInformation
                handleGetDataFromChildren={handleGetDataFromChildren}
                employeeProfiles={employeeProfiles}
                identify={identify}
                isView={isView}
                activeTab={activeTab}
                handleToggleIsView={handleToggleIsView}
                handleGetEmployee={handleGetEmployee}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_10"
              role="tabpanel"
            >
              <InsuranceInfomation
                activeTab={activeTab}
                isView={isView}
                formikRef={formikRefInsuranceInfomation}
                identify={identify}
                employeeProfiles={employeeProfiles}
                handleGetEmployee={handleGetEmployee}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_11"
              role="tabpanel"
            >
              <WorkExperienceInformation
                isView={isView}
                handleGetDataFromChildren={handleGetDataFromChildren}
                identify={identify}
                employeeProfiles={employeeProfiles}
                handleGetEmployee={handleGetEmployee}
                activeTab={activeTab}
                handleToggleIsView={handleToggleIsView}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_12"
              role="tabpanel"
            >
              Quy hoạch
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_13"
              role="tabpanel"
            >
              Đánh giá, phân loại
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_14"
              role="tabpanel"
            >
              Phúc lợi
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_15"
              role="tabpanel"
            >
             
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_16"
              role="tabpanel"
            >
              <VaccinationInformation
                isView={isView}
                activeTab={activeTab}
                identify={identify}
                employeeProfiles={employeeProfiles}
              />
            </div>
            <div
              className="tab-pane fade"
              id="kt_tab_pane_17"
              role="tabpanel"
            >
              {/* Y tế */}
              <MedicalInformation
                activeTab={activeTab}
                identify={identify}
                employeeProfiles={employeeProfiles}
                isView={isView}
                handleGetEmployee={handleGetEmployee}
                handleToggleIsView={handleToggleIsView}
                handleChangeSelect={handleChangeSelect}
              />
              {/* Quân sự */}
              <MilitaryInformation
                activeTab={activeTab}
                identify={identify}
                employeeProfiles={employeeProfiles}
                isView={isView}
                handleToggleIsView={handleToggleIsView}
                handleGetEmployee={handleGetEmployee}
                handleChangeSelect={handleChangeSelect}
              />
              {/* Danh Hiệu phong tặng */}
              <TitleConferredInfomation
                activeTab={activeTab}
                identify={identify}
                employeeProfiles={employeeProfiles}
                isView={isView}
              />
              {/* Thông tin gia đình chính sách */}
              <FamilyPolicyInfomation
                activeTab={activeTab}
                identify={identify}
                employeeProfiles={employeeProfiles}
                isView={isView}
              />
              {/* Giấy tờ */}
              <TempPapersInformation
                handleGetDataFromChildren={handleGetDataFromChildren}
                identify={identify}
                isView={isView}
                employeeProfiles={employeeProfiles}
                activeTab={activeTab}
                handleGetEmployee={handleGetEmployee}
              />
              {/* Tài liệu đính kèm */}
              <AttachmentsInformation
                handleGetDataFromChildren={handleGetDataFromChildren}
                identify={identify}
                isView={isView}
                employeeProfiles={employeeProfiles}
                activeTab={activeTab}
                handleGetEmployee={handleGetEmployee}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
