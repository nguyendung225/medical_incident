import { ChangeEvent } from "react";
import { Col, Form } from "react-bootstrap";

const Checkbox = ({ ...props }) => {
    let { xl, lg, md, sm, sx } = props;

    const handleChangeChecked = (event: ChangeEvent<HTMLInputElement>) => {
        props?.onChange(event, props.index, props.itemData);
    }

    return (
        <Col
            xl={xl ? xl : null}
            lg={lg ? lg : null}
            md={md ? md : null}
            sm={sm ? sm : null}
            sx={sx ? sx : null}
        >
            <Form.Check
                {...props}
                className={`"customs-form-check" ${props?.className ? props?.className : ""} `}
                type={"checkbox"}
                label={props?.itemData?.name ?? ""}
                name={props?.itemData?.name ?? ""}
                checked={props?.checked}
                onChange={handleChangeChecked}
            />
        </Col>
    )
};

export default Checkbox;
