import { formatDateTable } from "../../../utils/FunctionUtils";

export const NationalDefenseColumn = () => {
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
      name: "Cơ sở đào tạo",
      field: "coSoDaoTaoText",
      headerStyle: {
        minWidth: "400px"
      },
      render: (row: any) => row?.coSoDaoTaoKhac ? row?.coSoDaoTaoKhac : row?.coSoDaoTaoText
    },
    {
      name: "Văn bằng/ chứng chỉ/chứng nhận",
      field: "vanBang",
      headerStyle: {
        minWidth: "300px"
      }
    }
  ];
};