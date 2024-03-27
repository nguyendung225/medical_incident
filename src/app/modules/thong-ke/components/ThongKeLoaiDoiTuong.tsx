import "../ThongKeSCYK.scss";
import { ILoaiDoiTuong } from '../models/ThongKeModels';
import { IStatisticalChart } from '../../statistical/models/IStatisticalChart';
import { StatisticalChart } from './StatisticalChart';
import { useEffect, useState } from "react";
import { convertToChartData } from "../../utils/FunctionUtils";
import { colorsPieChart } from "../constants/constants";


interface ILoaiDoiTuongProps {
    loaiDoiTuong: ILoaiDoiTuong;
}

const ThongKeLoaiDoiTuong = (props: ILoaiDoiTuongProps) => {
    const { loaiDoiTuong } = props;
    const [dataChart, setDataChart] = useState<IStatisticalChart>();
    useEffect(() => {
        setDataChart({
            title: "Thống kê đối tượng xảy ra SCYK",
            options: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 'bottom',
                    textStyle: {
                        fontFamily: 'Arial, sans-serif',
                    },
                    icon: "circle",
                },

                series: [
                    {
                        type: 'pie',
                        radius: '64%',
                        data: convertToChartData(loaiDoiTuong, colorsPieChart),
                        label: {
                            position: "inside",
                            show: true,
                            formatter: '{d}%'
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        itemStyle: {
                            color: colorsPieChart
                        }
                    },
                ]
            }
        });
    }, [loaiDoiTuong]);

    return (
        <StatisticalChart options={dataChart?.options} title={dataChart?.title} />
    );
};

export default ThongKeLoaiDoiTuong;