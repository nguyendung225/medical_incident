/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ButtonContainer } from "../../component/ButtonContainer";
import { exportKinhNghiem } from "../../utils/ExportExcelServices";
import { exportToExcel, formatDateTable, hasAuthority, useCustomIntl } from "../../utils/FunctionUtils";
import { INIT_WORK_EXPERIENCE, REF_TAB } from "../const/ProfileConst";
import { IWorkExperienceOutput } from "../models/ProfileModels";
import { deleteKinhNghiem, getAllKinhNghiemById } from "../services/DialogServices";
import { WorkExperienceDialog } from "./Dialog/WorkExperienceDialog";
import TableCustom from "../../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { toast } from "react-toastify";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../../Constant";

export const WorkExperienceInformation = (props: any) => {
  const { identify, isView, employeeProfiles, activeTab } = props;
  const [shouldOpenWorkExperienceDialog, setShouldOpenWorkExperienceDialog] =
    useState<boolean>(false);
  const [workExp, setWorkExp] = useState<IWorkExperienceOutput>(INIT_WORK_EXPERIENCE);
  const [listWorkExp, setListWorkExp] = useState<IWorkExperienceOutput[]>([]);
  const [dataChecked, setDataChecked] = useState<IWorkExperienceOutput[]>([]);

  useEffect(() => {
    if (!(identify && activeTab === REF_TAB.KINH_NGHIEM_LAM_VIEC)) return;
    updateDataWorkExp();
  }, [employeeProfiles, activeTab]);

  const updateDataWorkExp = async () => {
    if (identify) {
      try {
        const data = await getAllKinhNghiemById(identify);
        setListWorkExp(data?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOpenWorkExperienceDialog = (data: IWorkExperienceOutput): void => {
    setShouldOpenWorkExperienceDialog(true);
    setWorkExp(data);
  };

  const handleCloseWorkExperienceDialog = (): void => {
    updateDataWorkExp();
    setShouldOpenWorkExperienceDialog(false);
    setWorkExp(INIT_WORK_EXPERIENCE);
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: IWorkExperienceOutput) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteKinhNghiem(ids)
    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      toast.success("Xóa thành công")
      updateDataWorkExp()
    }
  }

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: useCustomIntl("INPUT.WORKEXPERIENCE.POSITION"),
      field: "viTriCongViec",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        maxWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: useCustomIntl("INPUT.WORKEXPERIENCE.DATE.START"),
      field: "tuNgay",
      headerStyle: {
        minWidth: "100px"
      },
      cellStyle: {
        minWidth: "100px",
        maxWidth: "100px",
        textAlign: "left",
      },
      render: (row: any) => <span>{formatDateTable(row?.tuNgay)}</span>
    },
    {
      name: useCustomIntl("INPUT.WORKEXPERIENCE.DATE.END"),
      field: "denNgay",
      headerStyle: {
        minWidth: "100px"
      },
      cellStyle: {
        minWidth: "100px",
        maxWidth: "100px",
        textAlign: "left",
      },
      render: (row: any) => <span>{formatDateTable(row?.denNgay)}</span>
    },
    {
      name: useCustomIntl("INPUT.WORKEXPERIENCE.PLACE"),
      field: "noiLamViec",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        maxWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: useCustomIntl("INPUT.WORKEXPERIENCE.DESC"),
      field: "moTaCongViec",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        maxWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: useCustomIntl("INPUT.WORKEXPERIENCE.PEOPLE.LEGIT"),
      field: "nguoiDoiChieu",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        maxWidth: "150px",
        textAlign: "left",
      },
    },
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
                setShouldOpenWorkExperienceDialog(true);
              }}
              handleExportExcel={() => {
                exportToExcel(() => exportKinhNghiem(employeeProfiles.id));
              }}
            />
          </div>

          <TableCustom
            id="listWorkExp"
            data={listWorkExp}
            columns={columns}
            updatePageData={updateDataWorkExp}
            type={TYPE.MULTILINE}
            fixedColumnsCount={2}
            noToolbar={true}
            noPagination={true}
            handleDoubleClick={handleOpenWorkExperienceDialog}
            handleDelete={handleDelete}
            setDataChecked={setDataChecked}
            dependencies={activeTab}
          />
        </div>
      </div>
      {shouldOpenWorkExperienceDialog && (
        <WorkExperienceDialog
          handleCloseWorkExperienceDialog={handleCloseWorkExperienceDialog}
          identify={props.identify}
          workExpEdit={workExp}
          isView={isView}
        />
      )}
    </>
  );
};
