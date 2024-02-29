/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Row } from "react-table";
import { toast } from "react-toastify";
import { ButtonContainer } from "../../component/ButtonContainer";
import { exportCongTac } from "../../utils/ExportExcelServices";
import { exportToExcel, formatDateTable, hasAuthority } from "../../utils/FunctionUtils";
import { INIT_WORKING_PROCESS, REF_TAB } from "../const/ProfileConst";
import { IWorkingProcessInfoOutputDto, IWorkingProcessInfoOutput } from "../models/ProfileModels";
import { deleteQuaTrinhCongTac, getAllQuaTrinhCongTacById } from "../services/DialogServices";
import { WorkProcessDialog } from "./Dialog/WorkProcessDialog";
import TableCustom from "../../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { convertDataWorkingProcessUI } from "../utils/FunctionUtils";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../../Constant";
import useMultiLanguage from "../../../hook/useMultiLanguage";

export const WorkingProcessInformation = (props: any) => {
  const { identify, isView, employeeProfiles, activeTab } = props;
  const [shouldOpenWorkProcessDialog, setShouldOpenWorkProcessDialog] = useState<boolean>(false);
  const [dataChecked, setDataChecked] = useState<IWorkingProcessInfoOutputDto[]>([]);
  const [workProcess, setWorkProcess] = useState<IWorkingProcessInfoOutput>(INIT_WORKING_PROCESS);
  const [listWorkProcess, setListWorkProcess] = useState<IWorkingProcessInfoOutputDto[]>([]);

  const { lang } = useMultiLanguage();

  useEffect(() => {
    if (!(identify && activeTab === REF_TAB.QUA_TRINH_CONG_TAC)) return
    updateDataWorkProcess();
  }, [employeeProfiles, activeTab]);

  const handleOpenWorkProcessDialog = (data: Row<IWorkingProcessInfoOutputDto>): void => {
    setWorkProcess(convertDataWorkingProcessUI(data));
    setShouldOpenWorkProcessDialog(true);
  };

  const handleCloseWorkProcessDialog = (): void => {
    setShouldOpenWorkProcessDialog(false);
    setWorkProcess(INIT_WORKING_PROCESS);
    updateDataWorkProcess();
  };

  const updateDataWorkProcess = async () => {
    if (identify) {
      try {
        const { data } = await getAllQuaTrinhCongTacById(identify);
        setListWorkProcess(data?.data?.content);
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: IWorkingProcessInfoOutputDto) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteQuaTrinhCongTac(ids)
    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      toast.success("Xóa thành công")
      updateDataWorkProcess()
    }
  }

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: lang("INPUT.WORKEXPERIENCE.DATE.START"),
      field: "tuNgay",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        maxWidth: "150px",
      },
      render: (row: any) => <span>{formatDateTable(row?.tuNgay)}</span>
    },
    {
      name: lang("INPUT.WORKEXPERIENCE.DATE.END"),
      field: "denNgay",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        maxWidth: "150px",
      },
      render: (row: any) => <span>{formatDateTable(row?.denNgay)}</span>
    },
    {
      name: lang("GENERAL.CURRENT_ORGANIZATION"),
      field: "donViCongTacText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
      render: (row: any) => <span>{row?.donViCongTacKhac ? row?.donViCongTacKhac : row?.donViCongTacText}</span>
    },
    {
      name: lang("INPUT.WORKPROCESS.DEPARTMENT"),
      field: "phongBanText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
      render: (row: any) => <span>{row?.phongBanKhac ? row?.phongBanKhac : row?.phongBanText}</span>
    },
    {
      name: lang("INPUT.WORKPROCESS.ROLE"),
      field: "viTriCongViecText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: lang("INPUT.WORKPROCESS.JOB_TITLE"),
      field: "chucDanhText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: lang("INPUT.WORKPROCESS.KIEM_NHIEM"),
      field: "kiemNhiem",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: lang("INPUT.WORKPROCESS.LABOR_NATURE"),
      field: "tinhChatLaoDong",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
      render: (row: any) => <span>{row?.tinhChatLaoDong?.name}</span>
    },
    {
      name: lang("INPUT.WORKPROCESS.DECISION_TYPE"),
      field: "loaiThuTucText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    }
  ]

  return (
    <>
      <div className="form-info">
        <div className="block-content">
          <div className="flex-between">
            <ButtonContainer
              openButtonAdd={hasAuthority(PERMISSIONS.EMPLOYEE, PERMISSION_ABILITY.UPDATE)}
              openButtonExport={hasAuthority(PERMISSIONS.EMPLOYEE, PERMISSION_ABILITY.VIEW)}
              isView={isView}
              handleOpenAddNew={() => {
                setShouldOpenWorkProcessDialog(true);
              }}
              handleExportExcel={() => {
                exportToExcel(() => exportCongTac(employeeProfiles.id));
              }}
            />
          </div>
          <TableCustom
            id="listWorkProcess"
            data={listWorkProcess}
            columns={columns}
            updatePageData={updateDataWorkProcess}
            type={TYPE.MULTILINE}
            noToolbar={true}
            noPagination={true}
            handleDoubleClick={handleOpenWorkProcessDialog}
            handleDelete={handleDelete}
            setDataChecked={setDataChecked}
            dependencies={activeTab}
          />
        </div>
      </div>

      {shouldOpenWorkProcessDialog && (
        <WorkProcessDialog
          handleCloseWorkProcessDialog={handleCloseWorkProcessDialog}
          identify={identify}
          isView={isView}
          workProcessEdit={workProcess}
        />
      )}
    </>
  );
};
