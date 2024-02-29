import TextValidator from "../../../component/input-field/TextValidator";
import { formatDateTable } from "../../../utils/FunctionUtils"; 
interface IProps {
  isTransferredIn?: boolean
  isTransferredOut?: boolean
  isReferral?: boolean
  isDoHome?: boolean
  isDied?: boolean
}

export const ColumnStaff = (props: IProps) => {
  let {
    isTransferredIn,
    isTransferredOut,
    isReferral,
    isDoHome,
    isDied
  } = props;

  return [
    {
      name: "STT",
      field: "stt",
      headerStyle: {
        minWidth: "100px"
      },
      render: (row: any, index: number, numericalOrder: number, itemList: any) => (
        <span>{numericalOrder}</span>
      )
    },
    {
      name: "Họ và tên",
      field: "hoTen",
      headerStyle: {
        minWidth: "150px"
      },
    },
    {
      name: "IDBN",
      field: "maBenhNhan",
      headerStyle: {
        minWidth: "150px"
      },
    },
    {
      name: "Năm sinh",
      field: "ngaySinh",
      headerStyle: {
        minWidth: "150px"
      },
      render: (row: any) => row?.ngaySinh ? formatDateTable(row?.ngaySinh) : null
    },
    {
      name: "Chế độ",
      field: "doiTuong",
      headerStyle: {
        minWidth: "150px"
      },
    },
    {
      name: "Ngày vào viện",
      field: "ngayVaoVien",
      headerStyle: {
        minWidth: "150px"
      },
      render: (row:any)=> row?.ngayVaoVien ? formatDateTable(new Date(row?.ngayVaoVien)): null
    },
    {
      name: "Ngày vào khoa",
      field: "ngayVaoKhoa",
      headerStyle: {
        minWidth: "150px"
      },
    },
    {
      name: "chẩn đoán",
      field: "chanDoan",
      headerStyle: {
        minWidth: "150px"
      },
    },

    ...(isTransferredIn) ? [
      {
        name: "Khoa chuyển đến",
        field: "khoaChuyenDen",
        headerStyle: {
          minWidth: "150px"
        },
      },
    ] : [],

    ...(isTransferredOut) ? [
      {
        name: "Ngày chuyển đi",
        field: "ngayRa",
        headerStyle: {
          minWidth: "150px"
        },
        render: (row:any)=> row?.ngayRa ? formatDateTable(new Date(row?.ngayRa)): null
      },
      {
        name: "Khoa chuyển đi",
        field: "chuyenDenKhoa",
        headerStyle: {
          minWidth: "150px"
        },
      },
    ] : [],

    ...(isReferral) ? [
      {
        name: "Ngày chuyển viện",
        field: "ngayChuyenVien",
        headerStyle: {
          minWidth: "150px"
        },
        render: (row:any)=> row?.ngayChuyenVien ? formatDateTable(new Date(row?.ngayChuyenVien)): null
      },
      {
        name: "Chuyển đến viện",
        field: "benhVienChuyenDi",
        headerStyle: {
          minWidth: "150px"
        },
      },
    ] : [],

    ...(isDoHome) ? [
      {
        name: "Ngày xin về",
        field: "ngayXinVe",
        headerStyle: {
          minWidth: "150px"
        },
        render: (row:any)=> row?.ngayXinVe ? formatDateTable(new Date(row?.ngayXinVe)): null
      },
    ] : [],

    ...(isDied) ? [
      {
        name: "Ngày tử vong",
        field: "ngayTuVong",
        headerStyle: {
          minWidth: "150px"
        },
        render: (row:any)=> row?.ngayTuVong ? formatDateTable(new Date(row?.ngayTuVong)): null
      },
    ] : [],

  ];
};