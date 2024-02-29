import { OptionSelect } from "../../models/models";
import { IStatisticalChart } from "../models/IStatisticalChart";

export const yearOptions: OptionSelect[] = [
  {
    id: 1,
    name: "2020"
  },
  {
    id: 2,
    name: "2021"
  },
  {
    id: 3,
    name: "2022"
  },
  {
    id: 4,
    name: "2023"
  },
  {
    id: 5,
    name: "2024"
  },
  {
    id: 6,
    name: "2025"
  }
]

export const TYPE_CHART = {
  DONUT: "donut",
  BAR: "bar",
  LINE: "line"
}

export const CHART_OPTIONS = {
  TK_TINH_HINH_NHAN_SU: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: [
        'Đang làm việc',
        'Thôi việc',
        'Đình chỉ công tác',
        'Nghỉ chế độ',
        'Nghỉ không lương'
      ],
      icon: "circle",
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    color: ["#6200EE", "#28A745", "#DC3545", "#17A2B8", "#FF9C07"],
    series: [
      {
        name: 'Tình hình nhân sự',
        type: 'pie',
        radius: ['25%', '60%'],
        left: '-30%',
        top: '-10%',
        width: "125%",
        height: "125%",
        labelLine: {
          length: 20
        },
        label: {
          formatter: '{c}',
        },
        data: [
          { value: 7, name: 'Đang làm việc' },
          { value: 4, name: 'Thôi việc' },
          { value: 4, name: 'Đình chỉ công tác' },
          { value: 2, name: 'Nghỉ chế độ' },
          { value: 1, name: 'Nghỉ không lương' }
        ]
      }
    ]
  },
  TK_GIOI_TINH: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: [
        'Nam',
        'Nữ',
        'Khác'
      ],
      icon: "circle",
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    color: ["#28A745", "#FF9C07", "#6C757D"],
    series: [
      {
        name: 'Giới tính',
        type: 'pie',
        radius: ['25%', '60%'],
        left: '-30%',
        top: '-10%',
        width: "125%",
        height: "125%",
        labelLine: {
          length: 20
        },
        label: {
          formatter: '{c}',
        },
        data: [
          { value: 984, name: 'Nam' },
          { value: 651, name: 'Nữ' },
          { value: 181, name: 'Khác' }
        ]
      }
    ]
  },
  TK_DO_TUOI: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: [
        '≤30',
        '31-40',
        '41-50',
        '51-60',
        '>60'
      ],
      icon: "circle",
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    color: ["#6200EE", "#28A745", "#DC3545", "#17A2B8", "#FF9C07"],
    series: [
      {
        name: 'Độ tuổi',
        type: 'pie',
        radius: ['25%', '60%'],
        left: '-30%',
        top: '-10%',
        width: "125%",
        height: "125%",
        labelLine: {
          length: 20
        },
        label: {
          formatter: '{c}',
        },
        data: [
          { value: 86, name: '≤30' },
          { value: 36, name: '31-40' },
          { value: 26, name: '41-50' },
          { value: 22, name: '51-60' },
          { value: 10, name: '>60' }
        ]
      }
    ]
  },
  TK_LOAI_CAN_BO: {
    xAxis: {
      data: ["Viên chức", "HĐLĐ", "HĐ NĐ68", "HĐ NĐ111", "Chưa XĐ"]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '25%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
  },
  TK_LOAI_CHUC_VU: {
    xAxis: {
      data: [
        "GĐ bệnh viện",
        "PGĐ bệnh viện",
        "Trưởng phòng",
        "Trưởng khoa",
        "Trưởng đơn nguyên",
        "Điều dưỡng trưởng khoa",
        "Phó trưởng phòng",
        "Phó trưởng khoa",
        "Phó đơn nguyên",
        "Tổ trưởng",
        "Nhân viên",
        "Tổ phó",
        "Phụ trách khoa"
      ]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '60%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180, 111, 145, 177, 144, 180, 111, 145, 177]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
  },
  TK_THAM_NIEN: {
    xAxis: {
      data: [
        "<= 5 năm",
        "6-10 năm",
        "11-15 năm",
        "16-20 năm",
        "21-25 năm",
        "26-30 năm",
        "> 30 năm"
      ]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '35%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180, 111, 145]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  },
  TK_TRINH_DO_CHUYEN_MON: {
    xAxis: {
      data: [
        "Đại học",
        "Cao đẳng",
        "Sơ cấp",
        "Trung cấp",
        "Bác sĩ CK I",
        "Bác sĩ CK II",
        "Thạc sĩ",
        "Tiến sĩ"
      ]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180, 111, 145, 177]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  },
  TK_TRINH_DO_HOC_HAM: {
    xAxis: {
      data: ["Giáo sư", "Phó giáo sư", "Tiến sĩ", "Thạc sĩ", "Khác"]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '25%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  },
  TK_TRINH_DO_NGOAI_NGU: {
    xAxis: {
      data: [
        "A2 (Bậc 2)",
        "B1 (Bậc 3)",
        "B2 (Bậc 4)",
        "Đại học",
        "C1 (Bậc 5)",
        "C2 (Bậc 6)"
      ]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180, 111]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  },
  TK_KQ_DANH_GIA_HANG_NAM: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      data: [
        "Không hoàn thành nhiệm vụ",
        "Hoàn thành tốt nhiệm vụ",
        "Hoàn thành xuất sắc nhiệm vụ",
        "Hoàn thành nhiệm vụ"
      ],
      icon: "circle",
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    color: ["#6C757D", "#17A2B8", "#28A745", "#FF9C07"],
    series: [
      {
        name: 'Kết quả đánh giá hàng năm',
        type: 'pie',
        radius: ['25%', '60%'],
        left: '-30%',
        top: '-10%',
        width: "125%",
        height: "125%",
        labelLine: {
          length: 20
        },
        label: {
          formatter: '{c}',
        },
        data: [
          { value: 86, name: 'Không hoàn thành nhiệm vụ' },
          { value: 36, name: 'Hoàn thành tốt nhiệm vụ' },
          { value: 26, name: 'Hoàn thành xuất sắc nhiệm vụ' },
          { value: 22, name: 'Hoàn thành nhiệm vụ' },
        ]
      }
    ]
  },
  TK_BIEN_DONG_NHAN_SU: {
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      boundaryGap: false,
      data: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
      ]
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      bottom: "0%"
    },
    series: [
      {
        name: 'Chính thức',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          width: 4,
          // color: "#DC3545"
        },
        data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
      },
      {
        name: 'Thử việc',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          width: 4,
          // color: "#28A745"
        },
        data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330]
      },
      {
        name: 'Tập sự',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          width: 4,
          // color: "#FF9C07"
        },
        data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330]
      }
    ]
  },
  TK_NHAN_SU_THEO_PHONG_BAN: {
    xAxis: {
      data: [
        "HĐ dài hạn",
        "HĐ có thời hạn",
        "Hợp đồng tập sự",
        "HĐ theo nghị định 111",
        "HĐ theo nghị định 68"
      ]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '25%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  },
  TK_LOAI_HD_VIEN_CHUC: {
    xAxis: {
      data: [
        "HĐ dài hạn",
        "HĐ có thời hạn",
        "Hợp đồng tập sự",
        "HĐ theo nghị định 111",
        "HĐ theo nghị định 68"
      ]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '25%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  },
  TK_LOAI_HD_LAO_DONG: {
    xAxis: {
      data: [
        "HĐ dài hạn",
        "HĐ có thời hạn",
        "Hợp đồng tập sự",
        "HĐ theo nghị định 111",
        "HĐ theo nghị định 68"
      ]
    },
    yAxis: {},
    color: ["#D56663"],
    series: [
      {
        type: 'bar',
        barWidth: '25%',
        label: {
          show: true,
          color: '#D56663',
          fontWeight: 'bold',
          fontSize: '16px',
          formatter: '{c}',
          position: 'top'
        },
        data: [111, 145, 177, 144, 180]
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  }
};

export const convertChartSeries = (chart: IStatisticalChart, series: any[]) => {
  return {
    ...chart,
    options: {
      ...chart.options,
      series: series
    }
  };
};

export const convertChartItem = (
  chart: IStatisticalChart,
  typeChart: string,
  data: any[]
) => {
  switch (typeChart) {
    case TYPE_CHART.DONUT:
      let seriesDonut = chart.options.series.map((series: any) => ({
        ...series,
        data: [
          ...series.data.map((item: any, index: number) => ({
            ...item,
            value: data[index] ?? 1
          }))
        ]
      }));
      return convertChartSeries(chart, seriesDonut);
    case TYPE_CHART.BAR:
      let seriesBar = chart.options.series.map((series: any) => ({
        ...series,
        data: [
          ...series.data.map((item: any) =>
            Math.floor(Math.random() * (500 - 100 + 1) + 100)
          )
        ]
      }));
      return convertChartSeries(chart, seriesBar);
    case TYPE_CHART.LINE:
      let seriesLine = chart.options.series.map((series: any) => ({
        ...series,
        data: [
          ...series.data.map((item: any) =>
            Math.floor(Math.random() * (500 - 100 + 1) + 100)
          )
        ]
      }));
      return convertChartSeries(chart, seriesLine);
    default:
      return chart;
  }
};

export const STATISTICAL_TYPE = {
  TINH_HINH_NHAN_SU: 0,
  GIOI_TINH: 1,
  DO_TUOI: 2,
  LOAI_CAN_BO: 3,
  LOAI_CHUC_VU: 4,
  THAM_NIEN: 5,
  TRINH_DO_CHUYEN_MON: 6,
  TRINH_DO_HOC_HAM: 7,
  TRINH_DO_NGOAI_NGU: 8,
  KQ_DANH_GIA_HANG_NAM: 9,
  BIEN_DONG_NHAN_SU: 10,
  NHAN_SU_THEO_PHONG_BAN: 11,
  LOAI_HD_VIEN_CHUC: 12,
  LOAI_HD_LAO_DONG: 13
}