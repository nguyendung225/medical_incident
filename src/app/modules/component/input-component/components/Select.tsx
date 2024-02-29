import { ChangeEvent } from "react";
import { Col, Form, FormLabel } from "react-bootstrap";
import { iChildren } from "../models/inputModel";

const Select = ({ ...props }) => {
    let { xl, lg, md, sm, sx } = props;
    
    const handleChangeSelect = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        props?.onChange(event, props.index, props.itemData)
    };

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
                <FormLabel className="m-0">{props?.itemData?.name ?? ""}</FormLabel>
                <Form.Select
                    {...props}
                    size='sm'
                    value={props?.itemData?.value ?? ""}
                    onChange={handleChangeSelect}
                >
                    <option hidden value={""}>Chọn...</option>
                    {props?.itemData?.children?.length > 0 && props?.itemData?.children?.map((item: iChildren, index: number) => {
                        return <option className="py-2" key={index} value={item?.code || item?.id}>{item?.name}</option>
                    })}
                </Form.Select>
            </Form.Group>
        </Col >
    )
};

export default Select;
