import { Col, Row } from 'react-bootstrap'
import { IStatisticalChart } from '../models/IStatisticalChart'
import { StatisticalChart } from './chart/StatisticalChart'

type IProps = {
  listChart: IStatisticalChart[];
}

export const GridLayout: React.FC<IProps> = ({ listChart }) => {
  return (
    <Row className="grid-layout-wrapper">
      {listChart?.map((chart: IStatisticalChart, index: number) => (
        <Col sm={12} md={6} lg={6} xl={6} xxl={4} className={`mb-6 ${chart.type === "donut" ? "chart-pie" : ""}`} key={index}>
          <StatisticalChart options={chart.options} title={chart?.title} typeId={chart?.id}/>
        </Col>
      ))}
    </Row>
  );
}