import clsx from "clsx";
import React from "react"
import { Col } from "react-bootstrap";

type IProps = {
  label: string;
  labelClass?: string;
  value: string | number | undefined;
  valueClass?: string;
  className?: string;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  sx?: number;
}

const TextGroup: React.FunctionComponent<IProps> = ({ ...props }) => {
  let { xl, lg, md, sm, sx, label, labelClass, value, valueClass, className } = props;
  return (
    <Col
      xl={xl ? xl : undefined}
      lg={lg ? lg : undefined}
      md={md ? md : undefined}
      sm={sm ? sm : undefined}
      sx={sx ? sx : undefined}
      className={clsx(`
        d-flex pt-2 align-items-center
        ${className ? className : ''}
      `)}
    >
      <p className={clsx(`spaces p-0 m-0 pr-4 color-lable ${labelClass ? labelClass : ''}`)}>{label}:</p>
      <p className={clsx(`spaces p-0 m-0 ${valueClass ? valueClass : ''}`)}>{value}</p>
    </Col>
  )
}

export default TextGroup