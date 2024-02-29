import { ChangeEvent } from "react";
import { Col, Form, FormLabel, Row } from "react-bootstrap";
import { checkLayout } from "../utils/constFunction";
import { INPUT_TYPE } from "../utils/const";

const Input = ({ ...props }) => {
    let { xl, lg, md, sm, sx, widthLable, layout } = props;

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        props?.onChange(event, props.index, props.itemData);
    }

    return (
        <Col
            xl={xl ? xl : null}
            lg={lg ? lg : null}
            md={md ? md : null}
            sm={sm ? sm : null}
            sx={sx ? sx : null}
            className={`py-1 px-4 ${props?.className ? props?.className : ""}`}
        >
            <Row>
                <Form.Group className={`
                    ${checkLayout(layout) ? "d-flex align-items-center" : ""}
                    ${props?.className ? props?.className : ""}
                `}>
                    <Col
                        xl={widthLable ? widthLable : null}
                        lg={widthLable ? widthLable : null}
                        md={widthLable ? widthLable : null}
                        sm={widthLable ? widthLable : null}
                        sx={widthLable ? widthLable : null}
                    >
                        <FormLabel className={"m-0"}>
                            <span>{props?.itemData?.name ?? ""} </span>
                            {
                                props?.itemData?.dataType === INPUT_TYPE.NUMBER && <span> ({props?.itemData?.units}): </span>
                            }
                        </FormLabel>
                    </Col>
                    <Col>
                        <Form.Control
                            {...props}
                            type={props?.itemData?.dataType}
                            className={`
                                customs-input w-100  
                                ${props?.itemData?.attribute?.outline ? "outline-none" : ""}
                                ${props?.itemData?.dataType === INPUT_TYPE.NUMBER ? "no-spinners" : ""}
                            `}
                            value={props?.itemData?.value ?? ""}
                            name={props?.itemData?.name ?? ""}
                            onChange={handleChangeInput}
                            readOnly={props?.itemData?.attribute?.readOnly}

                        />
                    </Col>
                </Form.Group>
            </Row>
        </Col>
    )
};

export default Input;
