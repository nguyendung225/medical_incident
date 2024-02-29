import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "../../../../../../_metronic/helpers";
import { exportToExcel } from "../../../../utils/FunctionUtils";
import { exportKhauTru } from "../../../../utils/ExportExcelServices";
import { EmployeeProfile, IDeduct } from "../../../models/ProfileModels";
import TableCustom from "../../../../component/table-custom/TableCustom";
import { deleteKhauTru, getDeductByEmployee } from "../../../services/DialogServices";
import { TYPE } from "../../../../utils/Constant";
import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../../../../contract/const/ContractConst";
import { DeductDialog } from "../../Dialog/DeductDialog";
import useMultiLanguage from "../../../../../hook/useMultiLanguage";

interface Props {
  isView: boolean;
  employeeProfiles: EmployeeProfile;
  identify: string;
  isCallApi: boolean;
}

function Deduct(props: Props) {
  const { lang } = useMultiLanguage();
  const { isView, employeeProfiles, identify, isCallApi } = props;

  const [deductInfo, setDeductInfo] = useState<IDeduct>({});
  const [openDeductDialog, setOpenDeductDialog] = useState<boolean>(false);
  const [listDeduct, setListDeduct] = useState<IDeduct[]>([]);

  useEffect(() => {
    if (!(identify && isCallApi)) return;
    updateDataDeduct();
  }, [identify, isCallApi]);

  const updateDataDeduct = async () => {
    if (identify) {
      try {
        let data = await getDeductByEmployee(employeeProfiles.id || "");
        setListDeduct(data?.data?.data || []);
      } catch (error) {
        toast.error(lang("GENERAL.ERROR"));
      }
    }
  };

  const handleCLoseDeductDialog = () => {
    setOpenDeductDialog(false);
    setDeductInfo({} as IDeduct);
  };

  const handleOpenDeductDialog = (data: any) => {
    setOpenDeductDialog(true);
    setDeductInfo(data);
  };

  const handleDeleteItems = async (ids: string) => {
    try {
      const res = await deleteKhauTru(ids);
      if (res?.data?.code === SUCCESS_CODE) {
        toast.success(lang("GENERAL.DELETE_SUCCESS"));
      } else toast.error(`${res?.data?.message}`);
    } catch (err) {
      toast.error(lang("GENERAL.ERROR"));
    }
    await updateDataDeduct();
  };

  const deductColumns = [
    {
      name: lang("TABLE.INDEX"),
      field: "stt",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any, index: number, STT: number) => <span>{STT}</span>
    },
    {
      name: lang("ALLOWANCE.NAME"),
      field: "tenKhoanKhauTru",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <div>{row?.tenKhoanKhauTru?.name}</div>
    },
    {
      name: lang("ALLOWANCE.PAYROLL"),
      field: "tinhCongHuongLuong",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px"
      },
      render: (row: any) => {
        if (row?.tinhCongHuongLuong) {
          return (
            <KTSVG
              path="/media/icons/check.svg"
              className=" svg-icon-1"
            />
          );
        } else {
          return (
            <KTSVG
              path="/media/icons/uncheck.svg"
              className=" svg-icon-1"
            />
          );
        }
      }
    },
    {
      name: lang("ALLOWANCE.VALUE"),
      field: "giaTri",
      headerStyle: {
        minWidth: "250px"
      }
    }
  ];

  return (
    <div className="block-content">
      <TableCustom
        title={lang("GENERAL.DEDUCTIONS")}
        isActionTableTab
        data={listDeduct}
        columns={deductColumns}
        updatePageData={updateDataDeduct}
        handleDelete={handleDeleteItems}
        justFilter={true}
        notDelete={true}
        buttonAdd={!isView}
        buttonExportExcel={!isView}
        type={TYPE.MULTILINE}
        noPagination={true}
        handleExportExcel={() => exportToExcel(() => exportKhauTru(String(employeeProfiles?.id)))}
        handleOpenDialog={() => handleOpenDeductDialog({})}
        handleDoubleClick={handleOpenDeductDialog}
      />
      {openDeductDialog && (
        <DeductDialog
          handleCLoseDeductDialog={handleCLoseDeductDialog}
          deductInfo={deductInfo}
          isView={isView}
          profileInfo={employeeProfiles}
          getListDeduct={updateDataDeduct}
        />
      )}
    </div>
  );
}

export default Deduct;
