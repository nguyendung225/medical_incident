import { formatDateTable } from "../../../utils/FunctionUtils";

export const EthnicLanguageColumn = () => {
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
      name: "Tiếng dân tộc",
      field: "tiengDanToc",
      headerStyle: {
        minWidth: "250px"
      }
    },
    {
      name: "Cơ sở đào tạo",
      field: "coSoDaoTaoText",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.coSoDaoTaoKhac ? row?.coSoDaoTaoKhac : row?.coSoDaoTaoText}</span>
    },
    {
      name: "Văn bằng/Chứng chỉ/Chứng nhận được cấp",
      field: "vanBang",
      headerStyle: {
        minWidth: "350px"
      }
    }
  ];
};