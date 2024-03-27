import * as echarts from "echarts";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IStatisticalChart } from "../../statistical/models/IStatisticalChart";
import { resizeObserver } from "../../utils/FunctionUtils";
import { Card } from "antd";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "../../component/button/DropdownButton";

export const StatisticalChart: React.FC<IStatisticalChart> = ({
    options,
    title,
}) => {
    const [chart, setChart] = useState<echarts.ECharts>();
    const chartRef: any = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleExport = async (format: 'svg' | 'png' | 'jpg' | 'jpeg') => {
        if (chart) {
            try {
                let dataURL;
                let fileType;
                chartRef.current.style.backgroundColor = '#fff'

                switch (format) {
                    case 'svg':
                        dataURL = chart.getDataURL({
                            pixelRatio: 2,
                            type: 'svg'
                        });
                        fileType = 'svg';
                        break;
                    case 'jpg':
                        dataURL = chart.getDataURL({
                            pixelRatio: 2,
                            type: 'jpeg'
                        });
                        fileType = 'jpg';
                        break;
                    case 'jpeg':
                        dataURL = chart.getDataURL({
                            pixelRatio: 2,
                            type: 'jpeg'
                        });
                        fileType = 'jpeg';
                        break;
                    case 'png':
                        dataURL = chart.getDataURL({
                            pixelRatio: 2,
                            type: 'png'
                        });
                        fileType = 'png';
                        break;
                    default:
                        return;
                }

                const blob = dataURLtoBlob(dataURL);
                const url = URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `${title}.${fileType}`;

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } catch (error) {
                console.error(`Error exporting ${format.toUpperCase()}:`, error);
            }
        }
    };

    const dataURLtoBlob = (dataURL: string): Blob => {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const byteString = atob(parts[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], { type: contentType });
    };

    useEffect(() => {
        updateDataCharts(options)
    }, [options]);

    const updateDataCharts = (data: any = {}) => {
        if (chart) {
            chart.dispose();
        }

        const newChart = echarts.init(chartRef.current);
        newChart.setOption({ ...data, resizeObserver });
        setChart(newChart);
        if (resizeObserver) resizeObserver.observe(chartRef.current);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            chartRef.current.requestFullscreen();
            chartRef.current.style.backgroundColor = '#fff';

            let data = {
                ...options,
                legend: {
                    ...options.legend,
                    textStyle: {
                        ...options.legend.textStyle,
                        fontSize: 16,
                    }
                },

                ...(options.xAxis?.data?.length > 0 ?
                    {
                        legend: {
                            ...options.legend,
                            textStyle: {
                                ...options.legend.textStyle,
                                fontSize: 16,
                            }
                        },
                        xAxis: {
                            ...options.xAxis,
                            axisLabel: {
                                ...options.xAxis.axisLabel,
                                fontSize: 16,
                            },
                            nameTextStyle: {
                                ...options.xAxis.nameTextStyle,
                                fontSize: 16,
                            }
                        },
                        yAxis: {
                            ...options.yAxis,
                            axisLabel: {
                                ...options.yAxis.axisLabel,
                                fontSize: 16,
                            },
                            nameTextStyle: {
                                ...options.xAxis.nameTextStyle,
                                fontSize: 16,
                            }
                        }
                    } : {})
            }
            updateDataCharts(data)
        } else {
            document.exitFullscreen();
            updateDataCharts(options)
        }
    };

    const handleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            updateDataCharts(options)
        }
    }, [document.fullscreenElement]);

    useEffect(() => {
        document.addEventListener("fullscreenchange", handleFullscreen);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreen);
        };

    }, [document.fullscreenElement]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Card
            title={title}
            className='flex flex-column flex-row-fluid flex-equal flex-grow-1'
            classNames={{
                header: 'spaces p-16 color-title-card',
                body: 'spaces d-flex flex-wrap p-1 height-100',
                title: 'text-cyan fw-800 fs-16',
                actions: 'actions-card',
            }}
            actions={[
                <i className="spaces bi bi-eye fs-16" title="Phóng to biểu đồ" onClick={toggleFullscreen}></i>,
                <Dropdown ref={dropdownRef} show={isOpen} onClick={toggleDropdown} className="dropdown-xuatthongke">
                    <i className="spaces bi bi-download fs-16" title="Tải ảnh biểu đồ"></i>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleExport('jpg')}>{title} jpg</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleExport('png')}>{title} png</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleExport('jpeg')}>{title} jpeg</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>,
            ]}
        >
            <div
                ref={chartRef}
                style={{ width: "100%", height: "400px" }}
            />
        </Card>
    );
};

