import "../ThongKeSCYK.scss";
import { IMucDoTonThuong } from '../models/ThongKeModels';
import { IStatisticalChart } from '../../statistical/models/IStatisticalChart';
import { StatisticalChart } from './StatisticalChart';
import { useEffect, useState } from "react";
import { convertToChartData } from "../../utils/FunctionUtils";
import { colorsPieChart } from "../constants/constants";


interface IMucDoTonThuongProps {
    mucDoTonThuong: IMucDoTonThuong;
}

const ThongKeMucDoTonThuong = (props: IMucDoTonThuongProps) => {
    const { mucDoTonThuong } = props;
    const [dataChart, setDataChart] = useState<IStatisticalChart>();
    useEffect(() => {
        setDataChart({
            title: "Thống kê SCYK theo mức độ tổn thương",
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
                        data: convertToChartData(mucDoTonThuong, colorsPieChart),
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
    }, [mucDoTonThuong]);

    return (
        <StatisticalChart options={dataChart?.options} title={dataChart?.title} />
    );
};

export default ThongKeMucDoTonThuong;