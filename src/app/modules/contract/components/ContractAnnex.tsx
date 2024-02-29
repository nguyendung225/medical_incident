import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import { IContractAnnexInfo, IContractInfo } from "../services/models/IContract";
import { AddNewContractAnnex } from "./AddNewContractAnnex";
import { deleteMultipleContractAnnex } from "../services/annexServices";
import { ButtonContainer } from "../../component/ButtonContainer";
import { exportToExcel, formatDateTable, hasAuthority, useCustomIntl } from "../../utils/FunctionUtils";
import { exportHopDongPhuLuc } from "../../utils/ExportExcelServices";
import { INIT_CONTACT_ANNEX_INFO } from "../const/ContractConst";
import TableCustom from "../../component/table-custom/TableCustom";
import { RESPONSE_STATUS_CODE, TYPE } from "../../utils/Constant";
import { toast } from "react-toastify";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../../Constant";

export type IProps = {
  contractAnnex: IContractAnnexInfo[];
  view: boolean;
  getListAnnex: () => Promise<void>;
  contractInfo: IContractInfo;
};

export default function ContractAnnex(props: IProps) {
  const { contractAnnex, view, getListAnnex, contractInfo } = props;
  const intl = useIntl();
  const [shouldOpenAddContractAnnex, setShouldOpenAddContractAnnex] = useState<boolean>(false);
  const [annexInfo, setAnnexInfo] = useState<IContractAnnexInfo>(INIT_CONTACT_ANNEX_INFO);
  const [dataChecked, setDataChecked] = useState<IContractAnnexInfo[]>([]);

  const handleCLoseAddContractAnnex = () => {
    setShouldOpenAddContractAnnex(false);
    setAnnexInfo(INIT_CONTACT_ANNEX_INFO)
  }

  const handleOpenAddContractAnnex = (row: any) => {
    setAnnexInfo(row.original);
    setShouldOpenAddContractAnnex(true);
  };

  const handleDelete = async () => {
    let ids: string[] = [];

    dataChecked.forEach((data: IContractAnnexInfo) => {
      data?.id && ids.push(data?.id)
    })

    const { data } = await deleteMultipleContractAnnex(ids)
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
      name: useCustomIntl("ANNEX.NUMBER"),
      field: "soPhuLuc",
      headerStyle: {
        minWidth: "100px"
      },
    },
    {
      name: useCustomIntl("ANNEX.NAME"),
      field: "tenPhuLuc",
      headerStyle: {
        minWidth: "200px"
      },
      cellStyle: {
        minWidth: "200px",
        textAlign: "left",
      },
    },
    {
      name: useCustomIntl("ANNEX.EFFECTIVEDATE"),
      field: "ngayCoHieuLucPhuLuc",
      headerStyle: {
        minWidth: "170px"
      },
      cellStyle: {
        minWidth: "170px",
        textAlign: "center",
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayCoHieuLucPhuLuc)}</span>
    },
    {
      name: useCustomIntl("ANNEX.SIGNINGDATE"),
      field: "ngayKy",
      headerStyle: {
        minWidth: "100px"
      },
      cellStyle: {
        minWidth: "100px",
        textAlign: "center",
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayKy)}</span>
    },
    {
      name: useCustomIntl("CONTRACT.JOBPOSITION"),
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
      name: useCustomIntl("ANNEX.EFFECTIVEDATECONTRACT"),
      field: "ngayCoHieuLuc",
      headerStyle: {
        minWidth: "170px"
      },
      cellStyle: {
        minWidth: "170px",
        textAlign: "center",
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayCoHieuLuc)}</span>
    },
    {
      name: useCustomIntl("CONTRACT.EXPIRATIONDATE"),
      field: "ngayHetHan",
      headerStyle: {
        minWidth: "120px"
      },
      cellStyle: {
        minWidth: "120px",
        textAlign: "center",
      },
      render: (row: any) => <span>{formatDateTable(row?.ngayHetHan)}</span>
    },
    {
      name: useCustomIntl("CONTRACT.BASESALARY"),
      field: "luongCoBan",
      headerStyle: {
        minWidth: "120px"
      },
      cellStyle: {
        minWidth: "120px",
        textAlign: "right",
      },
    },
    {
      name: useCustomIntl("CONTRACT.INSURANCECONTRIBUTION"),
      field: "luongDongBaoHiem",
      headerStyle: {
        minWidth: "130px"
      },
      cellStyle: {
        minWidth: "130px",
        textAlign: "right",
      },
    },
    {
      name: useCustomIntl("CONTRACT.SALARYRATE"),
      field: "tyLeHuongLuong",
      headerStyle: {
        minWidth: "160px"
      },
      cellStyle: {
        minWidth: "160px",
        textAlign: "right",
      },
    },
    {
      name: useCustomIntl("CONTRACT.ATTACHMENTS"),
      field: "fileId",
      headerStyle: {
        minWidth: "150px"
      },
      cellStyle: {
        minWidth: "150px",
        textAlign: "right",
      },
    },
  ]

  return (
    <>
      <Row className="">
        <Col xs={12} className="header-box profile-title">
          <div className="fs-3 fw-bold">
            {intl.formatMessage({ id: "CONTRACT.ANNEX" })}
          </div>
          <ButtonContainer
            openButtonAdd={hasAuthority(PERMISSIONS.HOP_DONG, PERMISSION_ABILITY.UPDATE)}
            openButtonExport={hasAuthority(PERMISSIONS.HOP_DONG, PERMISSION_ABILITY.VIEW)}
            isView={view}
            handleOpenAddNew={() => {
              setShouldOpenAddContractAnnex(true);
            }}
            handleExportExcel={() => {
              exportToExcel(() => exportHopDongPhuLuc(contractInfo?.id))
            }}
          />
        </Col>
        <Col xs={12}>
          <TableCustom
            id="contractAnnex"
            data={contractAnnex}
            columns={columns}
            updatePageData={getListAnnex}
            type={TYPE.MULTILINE}
            fixedColumnsCount={3}
            noToolbar={true}
            noPagination={true}
            handleDoubleClick={handleOpenAddContractAnnex}
            handleDelete={handleDelete}
            setDataChecked={setDataChecked}
          />
        </Col>
      </Row>
      {shouldOpenAddContractAnnex && (
        <AddNewContractAnnex
          handleCLoseAddContractAnnex={handleCLoseAddContractAnnex}
          getListAnnex={getListAnnex}
          contractInfo={contractInfo}
          annexInfo={annexInfo}
        />
      )}
    </>
  );
}
