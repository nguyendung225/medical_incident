import { formatDateTable, useCustomIntl } from "../../../utils/FunctionUtils";

export const ContractColumn = () => {
  return (
    [
      {
        name: "STT",
        field: "",
        render: (row: any, index: number, stt: number) => <span>{stt}</span>
      },
      {
        name: useCustomIntl("CONTRACT.NUMBER"),
        field: "soHopDong",
        headerStyle: {
          minWidth: "120px"
        },
        cellStyle: {
          textAlign: "left" 
        }
      },
      {
        name: useCustomIntl("INPUT.CODE_NEW"),
        field: "employeeCode",
        headerStyle: {
          minWidth: "150px"
        },
        cellStyle: {
          textAlign: "left"
        },
        render: (row: any) => <span className="color-steel-blue fw-600">{row?.employeeCode}</span>
      },
      {
        name: useCustomIntl("CONTRACT.WORKERFULLNAME"),
        field: "tenNguoiLaoDong",
        headerStyle: {
          minWidth: "150px"
        },
        cellStyle: {
          minWidth: "150px",
          textAlign: "left"
        }
      },
      {
        name: useCustomIntl("CONTRACT.SIGNINGDATE"),
        field: "ngayKyHopDong",
        headerStyle: {
          minWidth: "100px"
        },
        render: (row: any) => <span>{formatDateTable(row?.ngayKyHopDong)}</span>
      },
      {
        name: useCustomIntl("PROFILE.ROLE"),
        field: "chucVuText",
        headerStyle: {
          minWidth: "200px"
        },
        cellStyle: {
          minWidth: "200px",
          textAlign: "left"
        }
      },
      {
        name: useCustomIntl("INPUT.SALARY.ROLE"),
        field: "chucDanhText",
        headerStyle: {
          minWidth: "250px"
        },
        cellStyle: {
          minWidth: "250px",
          textAlign: "left"
        }
      },
      {
        name: useCustomIntl("INPUT.DEPARTMENTS"),
        field: "phongBanText",
        headerStyle: {
          minWidth: "200px"
        },
        cellStyle: {
          minWidth: "200px",
          textAlign: "left"
        }
      },
      {
        name: useCustomIntl("CONTRACT.TYPE"),
        field: "loaiHopDong",
        headerStyle: {
          minWidth: "150px"
        },
        cellStyle: {
          minWidth: "150px",
          textAlign: "left"
        },
        render: (row: any) => <span>{row?.loaiHopDong?.name || ""}</span>
      },
      {
        name: useCustomIntl("CONTRACT.SIGNINGSTATUS"),
        field: "trangThaiKy",
        headerStyle: {
          minWidth: "150px"
        },
        cellStyle: {
          minWidth: "150px",
          textAlign: "left"
        },
        render: (row: any) => <span>{row?.trangThaiKy?.name || ""}</span>
      },
      {
        name: useCustomIntl("CONTRACT.STATUS"),
        field: "trangThaiHopDong",
        headerStyle: {
          minWidth: "150px"
        },
        cellStyle: {
          minWidth: "150px",
          textAlign: "left"
        },
        render: (row: any) => <span>{row?.trangThaiHopDong?.name}</span>
      }
    ]
  )
}