import { ChangeEvent } from "react";
import { Col, Form, FormLabel } from "react-bootstrap";

const Textarea = ({ ...props }) => {
    let { xl, lg, md, sm, sx } = props;

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
            className={`py-1 ${props?.className ? props?.className : ""}`}
        >
            <Form.Group>
                <FormLabel className="m-0">{props?.itemData?.name}</FormLabel>
                <Form.Control
                    {...props}
                    as="textarea"
                    rows={2}
                    value={props?.itemData?.value ?? ""}
                    name={props?.itemData?.name ?? ""}
                    onChange={handleChangeInput}
                />
            </Form.Group>
        </Col>
    )
};

export default Textarea;
