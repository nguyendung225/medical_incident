import CollectionReport from "../CollectionReport";

export const NURSING_REPORT_REF_TAB = {
  BC_TDTH: "BC_TDTH",
  BC_NLDD: "BC_NLDD",
  BC_LTT: "BC_LTT",
}

export const DS_TAB_PEPORT = [
  {
    eventKey: NURSING_REPORT_REF_TAB.BC_TDTH,
    title: "Báo cáo thu dung tổng hợp",
    component: <CollectionReport />,
  },
  {
    eventKey: NURSING_REPORT_REF_TAB.BC_NLDD,
    title: "Báo cáo nhân lực điều dưỡng",
    component: <p>1</p>,
  },
  {
    eventKey: NURSING_REPORT_REF_TAB.BC_LTT,
    title: "Báo cáo lượt tiêm truyền",
    component: <p>2</p>,
  },
];

export const dataStaffReport = (data: any) => {
  return [
    {
      loai: "Làm việc",
      bs: 0,
      ddv: data.dieudDuongHienCo || 0,
    },
    {
      loai: "Tổng số",
      bs: 0,
      ddv: data?.dieuDuongTongSo || 0,
    },
    {
      loai: "Lý do vắng",
      bs: 0,
      ddv: data?.dieuDuongVang || 0,
    },
    {
      loai: "Nghỉ ốm",
      bs: 0,
      ddv: data?.dieuDuongNghiOmTongSo || 0,
    },
    {
      loai: "Nghỉ trực",
      bs: 0,
      ddv: data?.dieuDuongNghiTrucTongSo || 0,
    },
    {
      loai: "Công tác",
      bs: 0,
      ddv: data?.dieuDuongCongTacTongSo || 0,
    },
    {
      loai: "Đi học",
      bs: 0,
      ddv: data?.dieuDuongDiHocTongSo || 0,
    },
    {
      loai: "Chờ hưu",
      bs: 0,
      ddv: data?.dieuDuongChoHuuTongSo || 0,
    },
  ]
}
