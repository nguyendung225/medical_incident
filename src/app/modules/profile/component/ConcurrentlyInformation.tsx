/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ButtonContainer } from "../../component/ButtonContainer";
import { exportKiemNhiem } from "../../utils/ExportExcelServices";
import { exportToExcel, formatDateTable, hasAuthority, useCustomIntl } from "../../utils/FunctionUtils";
import { INIT_CONCURENTLY, REF_TAB } from "../const/ProfileConst";
import { IConcurrentlyOutput, IConcurrentlyOutputDto } from "../models/ProfileModels";
import {
  deleteKiemNhiem,
  getAllKiemNhiemById
} from "../services/DialogServices";
import { ConcurrentlyDialog } from "./Dialog/ConcurrentlyDialog";
import TableCustom from "../../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { toast } from "react-toastify";
import { convertDataConcurrentlyUI } from "../utils/FunctionUtils";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../../Constant";

export const ConcurrentlyInformation = (props: any) => {
  const {
    identify,
    isView,
    employeeProfiles,
    activeTab,
  } = props;
  const [shouldOpenConcurrentlyDialog, setShouldOpenConcurrentlyDialog] = useState<boolean>(false);
  const [concurrently, setConcurrently] = useState<IConcurrentlyOutput>(INIT_CONCURENTLY);
  const [listConcurrently, setListConcurrently] = useState<IConcurrentlyOutputDto[]>([]);
  const [dataChecked, setDataChecked] = useState<IConcurrentlyOutputDto[]>([]);

  useEffect(() => {
    if ((identify && activeTab === REF_TAB.QUY_HOACH)) return;
    updateDataConcurrently();
  }, [employeeProfiles , activeTab]);

  const handleOpenConcurrentlyDialog = (data: IConcurrentlyOutputDto): void => {
    setShouldOpenConcurrentlyDialog(true);
    setConcurrently(convertDataConcurrentlyUI(data));
  };
  const handleCloseConcurrentlyDialog = (): void => {
    updateDataConcurrently();
    setShouldOpenConcurrentlyDialog(false);
    setConcurrently(INIT_CONCURENTLY);
  };

  const updateDataConcurrently = async () => {
    if (identify && activeTab === REF_TAB.KIEM_NHIEM) {
      try {
        const data = await getAllKiemNhiemById(identify);
        setListConcurrently(data?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: IConcurrentlyOutputDto) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteKiemNhiem(ids)
    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      toast.success("Xóa thành công")
      updateDataConcurrently()
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
      field: "viTriCongViecText",
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
      field: "donViCongTacText",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        maxWidth: "200px",
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
                setShouldOpenConcurrentlyDialog(true);
              }}
              handleExportExcel={() => {
                exportToExcel(() => exportKiemNhiem(employeeProfiles.id));
              }}
            />
          </div>

          <TableCustom
            id="listConcurrently"
            data={listConcurrently}
            columns={columns}
            updatePageData={updateDataConcurrently}
            type={TYPE.MULTILINE}
            fixedColumnsCount={2}
            noToolbar={true}
            noPagination={true}
            handleDoubleClick={handleOpenConcurrentlyDialog}
            handleDelete={handleDelete}
            setDataChecked={setDataChecked}
            dependencies={activeTab}
          />
        </div>
      </div>
      {shouldOpenConcurrentlyDialog && (
        <ConcurrentlyDialog
          handleCloseConcurrentlyDialog={handleCloseConcurrentlyDialog}
          identify={props.identify}
          isView={isView}
          concurrentlyEdit={concurrently}
        />
      )}
    </>
  );
};
