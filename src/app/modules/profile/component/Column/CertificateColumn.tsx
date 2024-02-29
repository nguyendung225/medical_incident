//@ts-nocheck
import { formatDateTable } from "../../../utils/FunctionUtils";

export const CertificateColumn = () => {
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
      field: "thoiGianHieuLucTuNgay",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.thoiGianHieuLucTuNgay)}</span>
    },
    {
      name: "Đến ngày",
      field: "thoiGianHieuLucDenNgay",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{formatDateTable(row?.thoiGianHieuLucDenNgay)}</span>
    },
    {
      name: "Số chứng chỉ hành nghề",
      field: "soCCHN",
      headerStyle: {
        minWidth: "200px"
      }
    },
    {
      name: "Cơ sở đào tạo",
      field: "coSoDaoTaoText",
      headerStyle: {
        minWidth: "200px"
      },
      render: (row: any) => <span>{row?.coSoDaoTaoKhac ? row?.coSoDaoTaoKhac : row?.coSoDaoTaoText }</span>
    },
    {
      name: "Chuyên ngành đào tạo",
      field: "chuyenNganh",
      headerStyle: {
        minWidth: "250px"
      }
    }
  ];
};
