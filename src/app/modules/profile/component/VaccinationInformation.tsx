import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { exportTiemChung } from "../../utils/ExportExcelServices";
import { exportToExcel, formatDateTable } from "../../utils/FunctionUtils";
import { REF_TAB } from "../const/ProfileConst";
import { InitVaccine, VaccineInfo } from "../models/DialogModels";
import { deleteTiemChung, getAllTiemChungById } from "../services/DialogServices";
import { VaccinationDialog } from "./Dialog/VaccinationDialog";
import useMultiLanguage from "../../../hook/useMultiLanguage";
import TableCustom from "../../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG";
import AppContext from "../../../AppContext";

const VaccinationInformation = (props: any) => {
  const { lang } = useMultiLanguage();
  const { identify, isView, employeeProfiles, activeTab } = props;
  const [shouldOpenVaccinationDialog, setShouldOpenVaccinationDialog] = useState<boolean>(false);
  const [listVaccine, setListVaccine] = useState<VaccineInfo[]>([]);
  const [dataSelect, setDataSelect] = useState<VaccineInfo>(InitVaccine);
  const [dataChecked, setDataChecked] = useState([]);
  const [lastDate, setLastDate] = useState<string | null>(null);
  const { setPageLoading } = useContext(AppContext);

  useEffect(() => {
    if (!listVaccine || !listVaccine.length) return;
    setLastDate(listVaccine[0]?.ngayTiem);
  }, [listVaccine])

  useEffect(() => {
    if (identify && activeTab === REF_TAB.TT_TIEM_CHUNG) {
      updateDataVaccine();
    }
  }, [employeeProfiles, activeTab]);

  const handleOpenVaccinationDialog = (row: any) => {
    setShouldOpenVaccinationDialog(true);
    setDataSelect(row);
  };
  const handleCloseVaccinationDialog = (): void => {
    updateDataVaccine();
    setShouldOpenVaccinationDialog(false);
    setDataSelect(InitVaccine);
  };

  const updateDataVaccine = async () => {
    if (identify) {
      try {
        setPageLoading(true)
        const data = await getAllTiemChungById(identify);
        if (data?.data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
          setListVaccine(data?.data?.data);
          setPageLoading(false);
        }
      } catch (error) {
        toast.error(lang("GENERAL.ERROR"));
      }
    }
  };

  const handleDelete = async (ids: string) => {
    try {
      setPageLoading(true)
      const { status } = await deleteTiemChung(ids);
      if (status === RESPONSE_STATUS_CODE.SUCCESS) {
        toast.success(lang("TOAST.DELETE.SUCCESS"));
        updateDataVaccine()
      }
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const handleExportExcel = () => {
    let ids: string[] = [];

    if (dataChecked?.length > 0) {
      dataChecked.forEach((data: any) => {
        data?.id && ids.push(data?.id);
      });
    }
    exportToExcel(() => exportTiemChung(ids));
  };

  const columns = [
    {
      name: lang("TABLE.INDEX"),
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: lang("INPUT.VACCINATION.DATE"),
      field: "ngayTiem",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayTiem)}</span>
    },
    {
      name: lang("INPUT.VACCINATION.DISEASES"),
      field: "phongBenhText",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("INPUT.VACCINATION.KIND"),
      field: "loaiVacxin",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("INPUT.VACCINATION.COUNT"),
      field: "muiTiem",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.muiTiem?.name}</span>
    },
    {
      name: lang("INPUT.VACCINATION.STATUSAFTER"),
      field: "tinhTrangSkSauTiem",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("INPUT.VACCINATION.NEXTTIME"),
      field: "lanTiemTiepTheo",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.lanTiemTiepTheo)}</span>
    }
  ];

  return (
    <div className="form-info">
      <div className="block-content">
        <div className="block-header flex justify-content-between">
          <span className="text-header">{lang("INPUT.VACCINATION")}</span>
          <div className="table-button-group flex">
            {!isView && (
              <>
                <button
                  className="button-primary flex table-btn me-2"
                  onClick={handleOpenVaccinationDialog}
                >
                  <KTSVG path="/media/icons/add.svg" /> {lang("BTN.ADD")}
                </button>
              </>
            )}
            <button
              className="flex table-btn outline"
              onClick={handleExportExcel}
            >
              <KTSVG path="/media/icons/export-excel.svg" /> {lang("BTN.EXPORT")}
            </button>
          </div>
        </div>
        <TableCustom
          id="listRelative"
          data={listVaccine}
          columns={columns}
          updatePageData={updateDataVaccine}
          type={TYPE.MULTILINE}
          fixedColumnsCount={3}
          noToolbar={true}
          noPagination={true}
          buttonAdd={false}
          notDelete={isView}
          handleDoubleClick={!isView ? handleOpenVaccinationDialog : () => {}}
          // handleOpenDialog={handleOpenVaccinationDialog}
          handleDelete={handleDelete}
          // handleExportExcel={handleExportExcel}
          setDataChecked={setDataChecked}
          dependencies={activeTab}
        />
      </div>
      {shouldOpenVaccinationDialog && (
        <VaccinationDialog
          open={shouldOpenVaccinationDialog}
          handleClose={handleCloseVaccinationDialog}
          identify={identify}
          isView={isView}
          handleReload={updateDataVaccine}
          dataSelect={dataSelect}
          lastDate={lastDate}
        />
      )}
    </div>
  );
};

export default VaccinationInformation;
