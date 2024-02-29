/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { exportGiayTo } from "../../utils/ExportExcelServices";
import { exportToExcel, formatDateTable, hasAuthority } from "../../utils/FunctionUtils";
import { INIT_GIAY_TO_DINH_KEM, REF_TAB } from "../const/ProfileConst";
import { IGiayToDinhKemInfo } from "../models/ProfileModels";
import { deleteGiayToDinhKem, getAllGiayToDinhKemById } from "../services/DialogServices";
import TempPapersDialog from "./Dialog/TempPapersDialog";
import TableCustom from "../../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../../Constant";
import useMultiLanguage from "../../../hook/useMultiLanguage";

export const TempPapersInformation = (props: any) => {
  const { identify, isView, employeeProfiles, activeTab } = props;
  const [shouldOpenTempPapers, setShouldOpenTempPapers] = useState<boolean>(false);
  const [tempPapers, setTempPapers] = useState<IGiayToDinhKemInfo>(INIT_GIAY_TO_DINH_KEM);
  const [listTempPapers, setListTempPapers] = useState<IGiayToDinhKemInfo[]>([]);
  const [dataChecked, setDataChecked] = useState<IGiayToDinhKemInfo[]>([]);

  const { lang } = useMultiLanguage();

  useEffect(() => {
    if (!(identify && activeTab === REF_TAB.TT_KHAC)) return
    updateDataTempPapers();
  }, [employeeProfiles, activeTab]);

  const handleOpenTempPapers = (data: IGiayToDinhKemInfo): void => {
    setTempPapers(data);
    setShouldOpenTempPapers(true);
  };

  const handleCloseTempPapers = (): void => {
    setShouldOpenTempPapers(false);
    updateDataTempPapers();
    setTempPapers(INIT_GIAY_TO_DINH_KEM);
  };

  const updateDataTempPapers = async () => {
    if (identify) {
      try {
        const data = await getAllGiayToDinhKemById(identify);
        setListTempPapers(data?.data?.data);
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: IGiayToDinhKemInfo) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteGiayToDinhKem(ids)
    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      toast.success("Xóa thành công")
      updateDataTempPapers()
    }
  }

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: lang("GENERAL.INFO.TEMP.PAPERS.NAME"),
      field: "tenGiayTo",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        maxWidth: "200px",
        textAlign: "left",
      },
      render: (row: any) => <span>{row?.tenGiayTo?.name}</span>
    },
    {
      name: lang("INPUT.DATERANGE"),
      field: "ngayCap",
      headerStyle: {
        minWidth: "100px"
      },
      cellStyle: {
        minWidth: "100px",
        maxWidth: "100px",
        textAlign: "left",
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayCap)}</span>
    },
    {
      name: lang("INPUT.EXPIRATIONDATE"),
      field: "ngayHetHan",
      headerStyle: {
        minWidth: "130px"
      },
      cellStyle: {
        minWidth: "130px",
        maxWidth: "130px",
        textAlign: "left",
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayHetHan)}</span>
    },
    {
      name: lang("INPUT.PLACERANGE"),
      field: "noiCap",
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
      name: lang("ALLOWANCE.NOTE"),
      field: "ghiChu",
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
          <TableCustom
            id="listTempPapers"
            title={lang("GENERAL.INFO.TEMP.PAPERS")}
            isActionTableTab
            data={listTempPapers}
            columns={columns}
            updatePageData={updateDataTempPapers}
            type={TYPE.MULTILINE}
            fixedColumnsCount={2}
            noToolbar={true}
            noPagination={true}
            handleDoubleClick={handleOpenTempPapers}
            handleDelete={handleDelete}
            setDataChecked={setDataChecked}
            dependencies={activeTab}
            buttonAdd={!isView && hasAuthority(PERMISSIONS.EMPLOYEE, PERMISSION_ABILITY.UPDATE)}
            buttonExportExcel={hasAuthority(PERMISSIONS.EMPLOYEE, PERMISSION_ABILITY.VIEW)}
            handleOpenDialog={() => setShouldOpenTempPapers(true)}
            handleExportExcel={() => exportToExcel(() => exportGiayTo(employeeProfiles.id))}
          />
        </div>
        {shouldOpenTempPapers && (
          <TempPapersDialog
            handleCloseTempPapersDialog={handleCloseTempPapers}
            identify={props.identify}
            isView={isView}
            tempPapersEdit={tempPapers}
          />
        )}
      </div>
    </>
  );
};
