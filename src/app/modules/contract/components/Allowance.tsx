import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { IAllowance } from "../services/models/IAllowance";
import { deleteAllowance } from "../services/allowanceServices";
import { AddNewAllowanceDialog } from "./AddNewAllowanceDialog";
import { IContractInfo } from "../services/models/IContract";
import { ButtonContainer } from "../../component/ButtonContainer";
import { exportToExcel, hasAuthority, useCustomIntl } from "../../utils/FunctionUtils";
import { exportHopDongPhuCap } from "../../utils/ExportExcelServices";
import { INIT_ALLOWANCE } from "../const/ContractConst";
import { TYPE } from "../../utils/Constant";
import { RESPONSE_STATUS_CODE } from "../../auth/core/_consts";
import { toast } from "react-toastify";
import TableCustom from "../../component/table-custom/TableCustom";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../../Constant";

export type IProps = {
  allowances: IAllowance[];
  view: boolean;
  getListAllowance: () => Promise<void>;
  contractInfo: IContractInfo;
};

export default function Allowance({ allowances, view, getListAllowance, contractInfo }: IProps) {
  const intl = useIntl();
  const [shouldOpenAllowanceDialog, setShouldOpenAllowanceDialog] = useState<boolean>(false);
  const [allowanceInfo, setAllowanceInfo] = useState<IAllowance>(INIT_ALLOWANCE);
  const [dataChecked, setDataChecked] = useState<IAllowance[]>([]);

  const handleCLoseAllowanceDialog = () => {
    setShouldOpenAllowanceDialog(false);
    setAllowanceInfo(INIT_ALLOWANCE);
  };

  const handleOpenAllowanceDialog = (row: any) => {
    setAllowanceInfo(row.original);
    setShouldOpenAllowanceDialog(true);
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: IAllowance) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteAllowance(ids)
    if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
      toast.success("Xóa thành công")
    }
  }

  const columns = [
    {
      name: "STT",
      field: "",
      render: (row: any, index: number, stt: number) => <span>{stt}</span>
    },
    {
      name: useCustomIntl("ALLOWANCE.NAME"),
      field: "tenKhoanPhuCap",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any) => <span className="color-steel-blue fw-600">{row?.tenKhoanPhuCap?.name}</span>
    },
    {
      name: useCustomIntl("ALLOWANCE.VALUE"),
      field: "giaTri",
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
      name: useCustomIntl("ALLOWANCE.PAYROLL"),
      field: "tinhCongHuongLuong",
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
      name: useCustomIntl("ALLOWANCE.NOTE"),
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
      <Row>
        <Col xs={12} className="header-box profile-title">
          <div className="fs-3 fw-bold">
            {intl.formatMessage({
              id: "GENERAL.ALLOWANCE",
            })}
          </div>
          <ButtonContainer
            openButtonAdd={hasAuthority(PERMISSIONS.HOP_DONG, PERMISSION_ABILITY.UPDATE)}
            openButtonExport={hasAuthority(PERMISSIONS.HOP_DONG, PERMISSION_ABILITY.UPDATE)}
            isView={view}
            handleOpenAddNew={() => {
              setShouldOpenAllowanceDialog(true);
            }}
            handleExportExcel={() => {
              exportToExcel(() => exportHopDongPhuCap(contractInfo?.id))
            }}
          />
        </Col>
        <Col xs={12}>
          <TableCustom
            id="allowances"
            data={allowances}
            columns={columns}
            updatePageData={getListAllowance}
            type={TYPE.MULTILINE}
            fixedColumnsCount={2}
            noToolbar={true}
            noPagination={true}
            handleDoubleClick={handleOpenAllowanceDialog}
            handleDelete={handleDelete}
            setDataChecked={setDataChecked}
          />
        </Col>
      </Row>
      {shouldOpenAllowanceDialog && (
        <AddNewAllowanceDialog
          handleCLoseAllowanceDialog={handleCLoseAllowanceDialog}
          allowanceInfo={allowanceInfo}
          getListAllowance={getListAllowance}
          contractInfo={contractInfo}
        />
      )}
    </>
  );
}
