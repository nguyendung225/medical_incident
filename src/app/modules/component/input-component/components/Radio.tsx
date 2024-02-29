import { ChangeEvent, useEffect, useState } from "react";
import { Col, Form, FormLabel } from "react-bootstrap";

const Radio = ({ ...props }) => {
    let { xl, lg, md, sm, sx } = props
    
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
            className={`py-2 ${props?.className ? props?.className : ""}`}
        >
            <Form.Check
                {...props}
                className={`"customs-form-check__radio" ${props?.className ? props?.className : ""} `}
                type={"radio"}
                label={props?.itemData?.name ?? ""}
                name={props?.itemData?.name ?? ""}
                checked={props?.checked}
                onChange={handleChangeChecked}
            />
        </Col>
    )
};

export default Radio;
