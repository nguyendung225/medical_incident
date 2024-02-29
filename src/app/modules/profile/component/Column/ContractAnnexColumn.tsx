import { formatDateTable, useCustomIntl } from "../../../utils/FunctionUtils";

export const ContractAnnexColumn = () => {
  return (
    [
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
  )
}