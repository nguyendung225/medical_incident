import { formatDateTable } from "../../../utils/FunctionUtils";

export const StateManagementColumn = () => {
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
      name: "Trình độ quản lý nhà nước",
      field: "trinhDoText",
      headerStyle: {
        minWidth: "250px"
      }
    },
    {
      name: "Tên cơ sở đào tạo",
      field: "coSoDaoTaoText",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => row?.coSoDaoTaoKhac ? row?.coSoDaoTaoKhac : row?.coSoDaoTaoText
    },
    {
      name: "Nước đào tạo",
      field: "nuocDaoTao",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => row?.nuocDaoTaoKhac ? row?.nuocDaoTaoKhac : row?.nuocDaoTaoText
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