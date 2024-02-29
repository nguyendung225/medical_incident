import { Col, Row } from "react-bootstrap";
import { IStatisticalChart } from "../models/IStatisticalChart";
import { StatisticalChart } from "./chart/StatisticalChart";

type IProps = {
  listChart: IStatisticalChart[];
}

export const SplitLayout: React.FC<IProps> = ({ listChart }) => {
  return (
    <Row className="split-layout-wrapper">
      <Col xs={4} className="chart-tabs">
        <ul className="nav nav-tabs nav-pills border-0 flex-row flex-md-column me-4">
          {listChart?.map((chart: IStatisticalChart, index: number) => (
            <li className="nav-item me-0" key={index}>
              <a
                className={`nav-link ${index === 0 ? "active" : ""}`}
                data-bs-toggle="tab"
                href={`#kt_vtab_pane_${index + 1}`}
              >
                {chart?.title}
              </a>
            </li>
          ))}
        </ul>
      </Col>
      <Col xs={8} className="charts">
        <div className="tab-content h-100" id="myTabContent">
          {listChart?.map((chart: IStatisticalChart, index: number) => (
            <div
              className={`tab-pane fade h-100 ${
                chart.type === "donut" ? "chart-pie" : ""
              } ${index === 0 ? "active show" : ""}`}
              id={`kt_vtab_pane_${index + 1}`}
              role="tabpanel"
              key={index}
            >
              <StatisticalChart options={chart.options} title={chart?.title} typeId={chart?.id}/>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};
