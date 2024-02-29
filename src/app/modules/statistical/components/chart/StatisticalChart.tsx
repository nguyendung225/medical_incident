import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";
import { KTSVG } from "../../../../../_metronic/helpers";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { yearOptions } from "../../const/StatisticalConst";
import { IStatisticalChart } from "../../models/IStatisticalChart";
import { useStatisticalContext } from "../../Statistical";
import { OptionSelect } from "../../../models/models";

const DEFAULT_CHART_HEIGHT = "100%";

export const StatisticalChart: React.FC<IStatisticalChart> = ({
  options,
  title,
  height = DEFAULT_CHART_HEIGHT,
  typeId
}) => {
  const { setType, setYear, loading } = useStatisticalContext()

  const [yearOption, setYearOption] = useState<OptionSelect>({ id: 5, name: "2024" });
  const [chart, setChart] = useState<echarts.EChartsType>();

  const chartRef: any = useRef();

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption({ ...options, resizeObserver });
    setChart(chart);
    if (resizeObserver) resizeObserver.observe(chartRef.current);
  }, [options]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    if (loading) {
      chart.showLoading();
      return;
    }

    chart.hideLoading();
  }, [chart, loading]);

  const handleChangYear = (yearOption: OptionSelect) => {
    setYear(yearOption?.name);
    setType(typeId);
    setYearOption(yearOption);
  }

  return (
    <div className="statistical-chart flex-column justify-content-between h-100 chart-item">
      <div className="chart-header flex justify-content-between align-items-center">
        <p className="chart-title m-0">{title}</p>
        <div className="actions flex align-items-center gap-2">
          <Autocomplete
            options={yearOptions}
            value={yearOption}
            name="year"
            onChange={(yearOption) => handleChangYear(yearOption)}
          />
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle action-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <KTSVG
                path={"/media/icons/collapse-menu.svg"}
                className="text-primary m-0"
              />
            </button>
            <ul className="dropdown-menu">
              <li>
                <div className="dropdown-item">Phóng to</div>
              </li>
              <li>
                <div className="dropdown-item">Xuất file ảnh JPG</div>
              </li>
              <li>
                <div className="dropdown-item">Xuất file PDF</div>
              </li>
              <li>
                <div className="dropdown-item">Xuất file Exel</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="echarts-parent position-relative h-100">
        <div
          ref={chartRef}
          style={{
            height: height
          }}
        />
      </div>
    </div>
  );
};

const resizeObserver = new window.ResizeObserver((entries) => {
  entries.map(({ target }) => {
    const instance = echarts.getInstanceByDom(target as HTMLElement);
    if (instance) {
      instance.resize();
    }
    return target;
  });
});
