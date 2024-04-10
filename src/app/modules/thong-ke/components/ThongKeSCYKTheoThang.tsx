import "../ThongKeSCYK.scss";
import { ILoaiDoiTuongTheoThang } from '../models/ThongKeModels';
import { IStatisticalChart } from '../../statistical/models/IStatisticalChart';
import { StatisticalChart } from './StatisticalChart';
import { CategoryChartSCYKTheoThang } from "../constants/constants";
import { useEffect, useState } from "react";


interface ISCYKTheoThangProps {
    thongKeTheoThang: ILoaiDoiTuongTheoThang[];
}

const ThongKeSCYKTheoThang = (props: ISCYKTheoThangProps) => {
    const { thongKeTheoThang } = props;
    const [dataChart, setDataChart] = useState<IStatisticalChart>();
    useEffect(() => {
        setDataChart({
            title: "Tổng số báo cáo sự cố y khoa theo tháng",
            options: {
                xAxis: {
                    name: '(Tháng)',
                    type: "category",
                    data: thongKeTheoThang.map((item:any) => item.month + '/' + item.year),
                    axisLabel: {
                        fontSize: 13,
                    },
                    nameTextStyle: {
                        fontSize: 14,
                        lineHeight: 22,
                        color: '#17a2b8',
                        fontFamily: 'Roboto, sans-serif',
                    },
                },
                yAxis: {
                    name: '(Số lượng)',
                    type: "value",
                    axisLabel: {
                        fontSize: 13,
                    },
                    nameTextStyle: {
                        fontSize: 14,
                        lineHeight: 22,
                        color: '#17a2b8',
                        fontFamily: 'Roboto, sans-serif',
                    },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                    formatter: (params: any[]) => {
                        return `Tháng: ${params[0].name}<br />
                                ${params.map((item) => `${item.seriesName}: ${item.data.value} | ${item.data.phanTram}%`).join('<br />')}
                                `;
                    },
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif',
                    },
                },
                legend: {
                    data: CategoryChartSCYKTheoThang.map((item) => item.name),
                    bottom: 5,
                    borderColor: '#357af6',
                    borderRadius: 0,
                    borderWidth: 1,
                    padding: [8, 12],
                    textStyle: {
                        lineHeight: 18,
                        fontSize: 13,
                        padding: [5, 0, 0, 0],
                        fontFamily: 'Roboto, sans-serif',
                    },
                },
                series:
                    CategoryChartSCYKTheoThang.map((item) => {
                        const data = thongKeTheoThang.map((thongKe) => ({
                            phanTram: thongKe[item.namePercent as keyof ILoaiDoiTuongTheoThang],
                            value: thongKe[item.value as keyof ILoaiDoiTuongTheoThang]
                        }));
                        return {
                            name: item.name,
                            data: data,
                            type: "line",
                            smooth: true
                        };
                    }),
            },
        });
    }, [thongKeTheoThang]);

    return (
        <StatisticalChart options={dataChart?.options} title={dataChart?.title} />
    );
};

export default ThongKeSCYKTheoThang;