import { KTSVG } from "../../../../../_metronic/helpers";
import { formatDateTable } from "../../../utils/FunctionUtils";

export const SpecializeTrainingColumn = () => {
  return [
    {
      name: "STT",
      field: "stt",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any, index: number, numericalOrder: number) => (
        <span>{numericalOrder}</span>
      )
    },
    {
      name: "Từ ngày",
      field: "daoTaoTuNgay",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.daoTaoTuNgay)}</span>
    },
    {
      name: "Đến ngày",
      field: "daoTaoDenNgay",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.daoTaoDenNgay)}</span>
    },
    {
      name: "Chứng chỉ được cấp/Khóa đào tạo",
      field: "tenKhoaHocChungChi",
      headerStyle: {
        minWidth: "300px"
      }
    },
    {
      name: "Kết quả",
      field: "ketQua",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: "Cấp chứng chỉ",
      field: "capChungChi",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) =>
        row?.capChungChi && (
          <KTSVG path="/media/icons/check.svg" className=" svg-icon-1" />
        )
    },
    {
      name: "Tên văn bằng/Chứng chỉ",
      field: "vanBang",
      headerStyle: {
        minWidth: "250px"
      }
    }
  ];
};