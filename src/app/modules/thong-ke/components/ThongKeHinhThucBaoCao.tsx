import "../ThongKeSCYK.scss";
import { IHinhThucBaoCao } from '../models/ThongKeModels';
import { IStatisticalChart } from '../../statistical/models/IStatisticalChart';
import { StatisticalChart } from './StatisticalChart';
import { useEffect, useState } from "react";
import { convertToChartData } from "../../utils/FunctionUtils";
import { colorsPieChart } from "../constants/constants";


interface IHinhThucBaoCaoProps {
    hinhThucBaoCao: IHinhThucBaoCao;
}

const ThongKeHinhThucBaoCao = (props: IHinhThucBaoCaoProps) => {
    const { hinhThucBaoCao } = props;
    const [dataChart, setDataChart] = useState<IStatisticalChart>();
    useEffect(() => {
        setDataChart({
            title: "Thống kê hình thức báo cáo",
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
                        data: convertToChartData(hinhThucBaoCao, colorsPieChart),
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
                        }
                    },
                ]
            }
        });
    }, [hinhThucBaoCao]);

    return (
        <StatisticalChart options={dataChart?.options} title={dataChart?.title} />
    );
};

export default ThongKeHinhThucBaoCao;