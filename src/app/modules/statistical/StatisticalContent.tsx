/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { KTSVG } from "../../../_metronic/helpers";
import AppContext from "../../AppContext";
import useMultiLanguage from "../../hook/useMultiLanguage";
import InputSearch from "../component/input-field/InputSearch";
import "./Statistical.scss";
import { GridLayout } from "./components/GridLayout";
import { SplitLayout } from "./components/SplitLayout";
import { ListChart } from "./components/chart/ListChart";
import { convertChartItem } from "./const/StatisticalConst";
import {
  IDataStatisticalResponse,
  IStatisticalChart
} from "./models/IStatisticalChart";
import {
  IStatisticalParams,
  getAllDataStatistical,
  getItemDataStatistical
} from "./services/StatisticalServices";
import { useStatisticalContext } from "./Statistical";
import { RESPONSE_STATUS_CODE } from "../auth/core/_consts";

type Layout = "split" | "grid";

function StatisticalContent() {
  const { lang } = useMultiLanguage();
  const { setPageLoading } = useContext(AppContext);
  const { type, year, setLoading } = useStatisticalContext();

  const [dataChart, setDataChart] = useState<IDataStatisticalResponse>();
  const [listChart, setListChart] = useState<IStatisticalChart[]>([]);

  const getDataChartAll = async () => {
    try {
      setPageLoading(true);
      let { data } = await getAllDataStatistical();
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        setDataChart(data?.data);
        setPageLoading(false);
      } else {
        toast.error(lang("GENERAL.ERROR"));
        setPageLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(lang("GENERAL.ERROR"));
      setPageLoading(false);
    }
  };

  const getDataChartItem = async ({ type, year }: IStatisticalParams) => {
    try {
      setLoading(true);
      let { data } = await getItemDataStatistical({ type, year });
      if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
        let dataChartItem: IDataStatisticalResponse = data?.data;
        const filteredData: any = {};
        for (const [key, value] of Object.entries(dataChartItem)) {
          if (value || value === 0) {
            filteredData[key] = value;
          }
        }
        setDataChart({ ...dataChart, ...filteredData });
        setLoading(false);
      } else {
        toast.error(lang("GENERAL.ERROR"));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(lang("GENERAL.ERROR"));
      setLoading(false);
    }
  };

  const convertListChart = useCallback(
    (dataChart: IDataStatisticalResponse) => {
      if (!dataChart) return [];
      let types = Object.values(ListChart().listChart).map(
        (chart) => chart.type
      );
      let keys = Object.values(ListChart().listChart).map(
        (chart) => chart.keys
      );
      let listChart = ListChart().listChart.map((chart, index) => {
        let data: number[] =
          keys[index]?.map(
            (key) => dataChart[key as keyof IDataStatisticalResponse]
          ) || [];
        let _chart = convertChartItem(chart, String(types[index]), data);
        return _chart;
      });
      return listChart;
    },
    []
  );

  useEffect(() => {
    getDataChartAll();
  }, []);

  useEffect(() => {
    if (!!!(type && year)) return;
    getDataChartItem({ type, year });
  }, [type, year]);

  useEffect(() => {
    if (!dataChart) return;
    setListChart(convertListChart(dataChart));
  }, [dataChart, convertListChart]);

  const [layout, setLayout] = useState<Layout>("grid");
  return (
    <div className="wrapper">
      <div className="flex justify-content-between align-items-center pt-2 pb-4">
        <h2 className="m-0 fw-bold color-primary title text-uppercase">
          {lang("GENERAL.STATISTICAL.INFO")}
        </h2>
        <div className="right flex gap-4">
          <div className="flex gap-4 align-self-end">
            <div className="mr-2 warning-input-search">
              <InputSearch
                className="border-3px"
                value={""}
                placeholder="Nhập vào đây"
                isEnter={true}
                handleSearch={() => {}}
                handleChange={() => {}}
              />
            </div>
            <button className="spaces button-primary" onClick={() => {}}>
              Tìm kiếm
            </button>
          </div>
          <div className="flex align-self-end change-layout">
            <div
              className={`split-icon ${layout === "split" ? "active" : ""}`}
              onClick={() => setLayout("split")}
            >
              <KTSVG
                path="/media/icons/split-layout.svg"
                svgClassName="spaces w-20 h-20 cursor-pointer"
              />
            </div>
            <div
              className={`grid-icon ${
                layout === "grid" ? "active" : "text-red"
              }`}
              onClick={() => setLayout("grid")}
            >
              <KTSVG
                path="/media/icons/menu.svg"
                svgClassName="spaces w-20 h-20 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {layout === "split" ? (
        <SplitLayout listChart={listChart} />
      ) : (
        <GridLayout listChart={listChart} />
      )}
    </div>
  );
}

export default StatisticalContent;
