import { formatDateTable } from "../../../utils/FunctionUtils";

export const ColumnCollectionReport = (props: any) => {
  const { handleOpenShowReport, handleOpenReportInput } = props
  return [
    {
      name: "STT",
      field: "stt",
      headerStyle: {
        minWidth: "40px"
      },
      render: (row: any, index: number, numericalOrder: number) => (
        <span>{numericalOrder}</span>
      )
    },
    {
      name: "Thao tác",
      field: "khoaBaoCao",
      headerStyle: {
        minWidth: "270px"
      },
      render: (row: any) => {
        return (
          <div className="flex flex-space-between">
            <button
              className="button-primary btn-action"
              onClick={() => handleOpenShowReport(row)}
            >
              Xem chi tiết
            </button>
            <button
              className="button-primary btn-action"
              onClick={() => handleOpenReportInput(row, true)}
            >
              Sửa
            </button>
            <button className="button-primary btn-action">Gửi báo cáo</button>
            <button
              className="button-primary btn-action"
              onClick={() => handleOpenReportInput(row, true)}
            >
              Xem DSBN
            </button>
          </div>
        )
      }
    },
    {
      name: "Khoa báo cáo",
      field: "departmentName",
      headerStyle: {
        minWidth: "100px"
      },
    },
    {
      name: "Mã khoa phòng",
      field: "departmentCode",
      headerStyle: {
        minWidth: "120px"
      },
    },
    {
      name: "Tổng số ĐD",
      field: "dieuDuongTongSo",
      headerStyle: {
        minWidth: "100px"
      },
    },
    {
      name: "Sô ĐD hiện có",
      field: "dieudDuongHienCo",
      headerStyle: {
        minWidth: "120px"
      },
    },
    {
      name: "Số ĐD vắng",
      field: "soĐDVang",
      headerStyle: {
        minWidth: "100px"
      },
    },
    {
      name: "Họ và tên ĐD trực",
      field: "tenĐDTruc",
      headerStyle: {
        minWidth: "150px"
      },
    },
    {
      name: "Số BN tăng",
      field: "soBNTang",
      headerStyle: {
        minWidth: "100px"
      },
    },
    {
      name: "Số BN giảm",
      field: "soBNGiam",
      headerStyle: {
        minWidth: "100px"
      },
    },
    {
      name: "Thời gian cập nhât",
      field: "modifiedDate",
      headerStyle: {
        minWidth: "150px"
      },
    },
  ];
};