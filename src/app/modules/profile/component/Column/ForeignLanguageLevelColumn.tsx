import { formatDateTable } from "../../../utils/FunctionUtils";

export const ForeignLanguageLevelColumn = () => {
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
      name: "Ngoại ngữ",
      field: "ngoaiNgu",
      headerStyle: {
        minWidth: "250px"
      },
      render: (row: any) => <span>{row?.ngoaiNgu?.name}</span>
    },
    {
      name: "Trình độ đào tạo",
      field: "trinhDoText",
      headerStyle: {
        minWidth: "250px"
      }
    },
    {
      name: "Văn bằng/ chứng chỉ/chứng nhận được nhận",
      field: "vanBang",
      headerStyle: {
        minWidth: "350px"
      }
    }
  ];
};