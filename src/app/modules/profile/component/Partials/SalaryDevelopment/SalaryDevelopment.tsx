import { useEffect, useState } from "react";
import useMultiLanguage from "../../../../../hook/useMultiLanguage";
import TableCustom from "../../../../component/table-custom/TableCustom";
import { SUCCESS_CODE } from "../../../../contract/const/ContractConst";
import { TYPE } from "../../../../utils/Constant";
import { exportLichSuLuong } from "../../../../utils/ExportExcelServices";
import { exportToExcel, formatDateTable } from "../../../../utils/FunctionUtils";
import { REF_TAB } from "../../../const/ProfileConst";
import { EmployeeProfile } from "../../../models/ProfileModels";
import { getAllLichSuLuongById } from "../../../services/DialogServices";
import SalaryDevelopmentDialog from "../../Dialog/SalaryDevelopmentDialog";

interface Props {
  isView: boolean;
  employeeProfiles: EmployeeProfile;
  identify: string;
  activeTab: string;
}

function SalaryDevelopment(props: Props) {
  const { lang } = useMultiLanguage();

  const { isView, employeeProfiles, identify, activeTab } = props;
  const [listData, setListData] = useState([]);
  const [shouldOpenCreateDialog, setShouldOpenCreateDialog] = useState<boolean>(false);
  const [salaryInfo, setSalaryInfo] = useState({});

  useEffect(() => {
    if (identify && activeTab === REF_TAB.TT_LUONG) {
      updateDataSalaryDevelop();
    }
  }, [identify, activeTab]);

  const updateDataSalaryDevelop = async () => {
    if(identify) {
      try {
        const { data, status } = await getAllLichSuLuongById(String(employeeProfiles.id));
        if (status === SUCCESS_CODE && data?.code === SUCCESS_CODE) {
          setListData(data?.data || []);
        }
      } catch (error) {
        // toast.error(lang("GENERAL.ERROR"));
      }
    }
  };

  const handleCloseCreateDialog = () => {
    setShouldOpenCreateDialog(false);
    setSalaryInfo({});
  };

  const handleOpenCreateDialog = (data: any) => {
    setShouldOpenCreateDialog(true);
    setSalaryInfo(data);
  };

  const columns = [
    {
      name: lang("TABLE.INDEX"),
      field: "stt",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any, index: number, STT: number) => <span>{STT}</span>
    },
    {
      name: lang("INPUT.SALARY.DATE.ENNABLE"),
      field: "ngayHieuLuc",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => (
        <span>
          <span>{formatDateTable(row?.ngayHuongLuongTuNgay)}</span>
          {row?.ngayHuongLuongDenNgay ? <span> {" - " + formatDateTable(row?.ngayHuongLuongDenNgay)}</span> : ""}
        </span>
      )
    },
    {
      name: lang("INPUT.SALARY.KIND"),
      field: "loaiLuong",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.loaiLuong?.name}</span>
    },
    {
      name: lang("INPUT.JOB_POSITION"),
      field: "chucVuText",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("GENERAL.EMPLOYEE.TITLE"),
      field: "chucDanhText",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("GENERAL.EMPLOYEE.RANK_SALARY"),
      field: "bacLuong",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("ALLOWANCE.COEFFICIENT"),
      field: "heSoBacLuong",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("INPUT.SALARY.AGREEMENTS"),
      field: "luongThoaThuan",
      headerStyle: {
        minWidth: "200px"
      }
    }
  ];
  return (
    <div className="block-content">
      <TableCustom
        title={lang("SALARY.DEVELOPMENT")}
        isActionTableTab
        data={listData}
        columns={columns}
        updatePageData={updateDataSalaryDevelop}
        justFilter={true}
        type={TYPE.MULTILINE}
        buttonExportExcel={!isView}
        notDelete={true}
        noPagination={true}
        buttonAdd={!isView}
        handleDoubleClick={handleOpenCreateDialog}
        handleOpenDialog={(row) => handleOpenCreateDialog({})}
        handleExportExcel={() => exportToExcel(() => exportLichSuLuong(String(employeeProfiles?.id)))}
      />
      {shouldOpenCreateDialog && (
        <SalaryDevelopmentDialog
          isView={isView}
          salaryInfo={salaryInfo}
          handleClose={handleCloseCreateDialog}
          show={shouldOpenCreateDialog}
          employeeProfiles={employeeProfiles}
          updateParrentTable={updateDataSalaryDevelop}
        />
      )}
    </div>
  );
}

export default SalaryDevelopment;
