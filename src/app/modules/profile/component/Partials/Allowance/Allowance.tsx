import { useEffect, useState } from "react";
import { IAllowance } from "../../../../contract/services/models/IAllowance";
import { KTSVG } from "../../../../../../_metronic/helpers";
import { exportToExcel, formatDateTable } from "../../../../utils/FunctionUtils";
import { exportPhuCap } from "../../../../utils/ExportExcelServices";
import TableCustom from "../../../../component/table-custom/TableCustom";
import { getAllowancesByEmployee } from "../../../services/DialogServices";
import { TYPE } from "../../../../utils/Constant";
import { EmployeeAllowanceDialog } from "../../Dialog/EmployeeAllowanceDialog";
import { deleteAllowance } from "../../../../contract/services/allowanceServices";
import { toast } from "react-toastify";
import { INIT_ALLOWANCE, SUCCESS_CODE } from "../../../../contract/const/ContractConst";
import useMultiLanguage from "../../../../../hook/useMultiLanguage";

interface Props {
  isView: boolean;
  identify: any;
  isCallApi: boolean;
  isDisplayBtnAdd?: boolean;
}

function Allowance(props: Props) {
  const { lang } = useMultiLanguage();
  const { isView, identify, isCallApi, isDisplayBtnAdd = true } = props;

  const [openAllowanceDialog, setOpenAllowanceDialog] = useState<boolean>(false);
  const [allowanceInfo, setAllowanceInfo] = useState<IAllowance>({});
  const [listAllowance, setListAllowance] = useState<IAllowance[]>([]);

  useEffect(() => {
    if (!(identify && isCallApi)) return;
    updateDataAllowance();
  }, [identify, isCallApi]);

  const handleOpenAllowanceDialog = (data: any = {}) => {
    setOpenAllowanceDialog(true);
    setAllowanceInfo(data);
  };

  const handleCloseAllowanceDialog = (isAddAndUpdate?: boolean) => {
    setAllowanceInfo({});
    !isAddAndUpdate && setOpenAllowanceDialog(false);
  };

  const updateDataAllowance = async () => {
    if (identify) {
      try {
        let data = await getAllowancesByEmployee(identify || "");
        setListAllowance(data?.data?.data || []);
      } catch (error) {
        toast.error(lang("GENERAL.ERROR"));
      }
    }
  };

  const handleDeleteItems = async (ids: string) => {
    try {
      const res = await deleteAllowance(ids);
      if (res?.data?.code === SUCCESS_CODE) {
        toast.success(lang("GENERAL.DELETE_SUCCESS"));
      } else toast.error(`${res?.data?.message}`);
    } catch (error) {
      toast.error(lang("GENERAL.ERROR"));
    }
    await updateDataAllowance();
  };

  const allowanceColumns = [
    {
      name: lang("TABLE.INDEX"),
      field: "stt",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any, index: number, STT: number) => <span>{STT}</span>
    },
    {
      name: lang("ALLOWANCE.TYPE"),
      field: "tenKhoanPhuCap",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <div>{row?.tenKhoanPhuCap?.name}</div>
    },
    {
      name: lang("INPUT.WORKEXPERIENCE.DATE.START"),
      field: "thoiGianHieuLucBatDau",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <div>{formatDateTable(row?.thoiGianHieuLucBatDau)}</div>
    },
    {
      name: lang("INPUT.WORKEXPERIENCE.DATE.END"),
      field: "thoiGianHieuLucKetThuc",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <div>{formatDateTable(row?.thoiGianHieuLucKetThuc)}</div>
    },
    {
      name: lang("ALOWNCE.BONUS_FORM"),
      field: "hinhThucHuong",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: lang("ALLOWANCE.COEFFICIENT_PERCENT_VALUE"),
      field: "heSoPhanTramHuong",
      headerStyle: {
        minWidth: "250px"
      }
    },
    {
      name: lang("ALLOWANCE.BHXH"),
      field: "phuCapBHXH",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => {
        if (row?.phuCapBHXH) {
          return (
            <KTSVG
              path="/media/icons/check.svg"
              className="svg-icon-1"
            />
          );
        } else {
          return <span></span>
        }
      }
    },
    {
      name: lang("ALLOWANCE.IS_EXTENSION"),
      field: "coGiaHan",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => {
        if (row?.coGiaHan) {
          return (
            <KTSVG
              path="/media/icons/check.svg"
              className="svg-icon-1"
            />
          );
        } else {
          return <span></span>
        }
      }
    }
  ];

  return (
    <div className="block-content">
      <TableCustom
        id="allowance"
        title={lang("GENERAL.ALLOWANCE")}
        isActionTableTab
        buttonAdd={!isView && isDisplayBtnAdd}
        buttonExportExcel={!isView}
        notDelete={isView}
        noToolbar={true}
        data={listAllowance}
        columns={allowanceColumns}
        updatePageData={updateDataAllowance}
        handleDelete={handleDeleteItems}
        justFilter={true}
        type={TYPE.MULTILINE}
        noPagination={true}
        handleOpenDialog={() => handleOpenAllowanceDialog(INIT_ALLOWANCE)}
        handleExportExcel={() => exportToExcel(() => exportPhuCap(String(identify)))}
        handleDoubleClick={handleOpenAllowanceDialog}
      />

      {openAllowanceDialog && (
        <EmployeeAllowanceDialog
          employeeId={identify}
          isView={isView}
          getListAllowance={updateDataAllowance}
          handleCLoseAllowanceDialog={handleCloseAllowanceDialog}
          allowanceInfo={allowanceInfo}
        />
      )}
    </div>
  );
}

export default Allowance;
