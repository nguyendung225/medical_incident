import { formatDateTable } from "../../../utils/FunctionUtils";

export const QualificationColumn = () => {
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
      field: "tuNgay",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.tuNgay)}</span>
    },
    {
      name: "Đến ngày",
      field: "denNgay",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.denNgay)}</span>
    },
    {
      name: "Cơ sở đào tạo",
      field: "coSoDaoTaoText",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.coSoDaoTaoKhac ? row?.coSoDaoTaoKhac : row?.coSoDaoTaoText }</span>
    },
    {
      name: "Ngành đào tạo",
      field: "nganhDaoTaoText",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.nganhDaoTaoKhac ? row?.nganhDaoTaoKhac : row?.nganhDaoTaoText }</span>
    },
    {
      name: "Hình thức đào tạo",
      field: "hinhThucDaoTao",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.hinhThucDaoTao?.name}</span>
    },
    {
      name: "Tốt nghiệp loại",
      field: "xepLoai",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.xepLoai?.name}</span>
    }
  ];
};
