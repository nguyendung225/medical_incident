import { CHART_OPTIONS, STATISTICAL_TYPE } from '../../const/StatisticalConst'
import { IStatisticalChart } from '../../models/IStatisticalChart'

export const ListChart = () => {
  const listChart: IStatisticalChart[] = [
    {
      id: STATISTICAL_TYPE.TINH_HINH_NHAN_SU,
      title: "Thống kê tình hình nhân sự",
      options: CHART_OPTIONS.TK_TINH_HINH_NHAN_SU,
      type: "donut",
      height: "100%"
    },
    {
      id: STATISTICAL_TYPE.GIOI_TINH,
      title: "Thống kê theo giới tính",
      keys: ["gioitinhNam", "gioitinhNu", "gioitinhKhac"],
      options: CHART_OPTIONS.TK_GIOI_TINH,
      type: "donut",
      height: "100%"
    },
    {
      id: STATISTICAL_TYPE.DO_TUOI,
      title: "Thống kê theo độ tuổi",
      keys: ["dotuoiDuoi30", "dotuoi3140", "dotuoi4150", "dotuoi5160", "dotuoiTren60"],
      options: CHART_OPTIONS.TK_DO_TUOI,
      type: "donut",
      height: "100%"
    },
    {
      id: STATISTICAL_TYPE.LOAI_CAN_BO,
      title: "Thống kê theo loại cán bộ",
      options: CHART_OPTIONS.TK_LOAI_CAN_BO,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.LOAI_CHUC_VU,
      title: "Thống kê theo loại chức vụ",
      options: CHART_OPTIONS.TK_LOAI_CHUC_VU,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.THAM_NIEN,
      title: "Thống kê theo thâm niên",
      options: CHART_OPTIONS.TK_THAM_NIEN,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.TRINH_DO_CHUYEN_MON,
      title: "Thống kê theo trình độ chuyên môn",
      options: CHART_OPTIONS.TK_TRINH_DO_CHUYEN_MON,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.TRINH_DO_HOC_HAM,
      title: "Thống kê theo trình độ học hàm",
      options: CHART_OPTIONS.TK_TRINH_DO_HOC_HAM,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.TRINH_DO_NGOAI_NGU,
      title: "Thống kê theo trình độ ngoại ngữ",
      options: CHART_OPTIONS.TK_TRINH_DO_NGOAI_NGU,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.KQ_DANH_GIA_HANG_NAM,
      title: "Thống kê theo kết quả đánh giá hàng năm",
      options: CHART_OPTIONS.TK_KQ_DANH_GIA_HANG_NAM,
      type: "donut",
      height: "100%"
    },
    {
      id: STATISTICAL_TYPE.BIEN_DONG_NHAN_SU,
      title: "Biến động nhân sự",
      options: CHART_OPTIONS.TK_BIEN_DONG_NHAN_SU,
      type: "line",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.NHAN_SU_THEO_PHONG_BAN,
      title: "Thống kê nhân sự theo phòng ban",
      options: CHART_OPTIONS.TK_NHAN_SU_THEO_PHONG_BAN,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.LOAI_HD_VIEN_CHUC,
      title: "Thống kê theo loại HĐ viên chức",
      options: CHART_OPTIONS.TK_LOAI_HD_VIEN_CHUC,
      type: "bar",
      height: ""
    },
    {
      id: STATISTICAL_TYPE.LOAI_HD_LAO_DONG,
      title: "Thống kê theo loại HĐ lao động",
      options: CHART_OPTIONS.TK_LOAI_HD_LAO_DONG,
      type: "bar",
      height: ""
    }
  ]
  return (
    {listChart}
  )
}
