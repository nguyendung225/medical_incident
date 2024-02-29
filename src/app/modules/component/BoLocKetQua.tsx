import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import Autocomplete from "./autocomplete/Autocomplete";

const BoLocKetQua = (props: any) => {
  let {label1, label2} = props
  return (
    <>
      <Form className="flex justify-content-between">
        <div className="flex align-items-center">
          <Form.Check label={label1} name="group1" type={"radio"} className="m-0 customs-form-check__radio" checked/>
        </div>
        <div className="flex align-items-center">
          <Form.Check label={label2} name="group1" type={"radio"} className="m-0 customs-form-check__radio"/>
        </div>
        <div className="flex align-items-center">
          <label className="text-nowrap m-0 me-3">
            Phòng thực hiện
          </label>
          <Autocomplete className="customs-input w-250px" options={[]} name={""}/>
        </div>
        <div className="flex align-items-center">
          <label className="text-nowrap m-0 me-3">
            Từ ngày
          </label>
          <input className="form-control customs-input" type="date"/>
        </div>
        <div className="flex align-items-center">
          <label className="text-nowrap m-0 me-3">
            Đến ngày
          </label>
          <input className="form-control customs-input" type="date"/>
        </div>
        <Button className="btn-navy" size="sm">
          Xem
        </Button>
      </Form>
    </>
  );
};

export { BoLocKetQua };
