import { ChangeEvent, useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { iChildren } from "../models/inputModel";

const CheckboxText = ({ ...props }) => {
    const [indexItem, setIndexItem] = useState<number>(0);
    const [formDataCheckbox, setFormDataCheckbox] = useState(props.itemData?.children ?? []);

    const handleChangeChecked = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setIndexItem(index);
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (
            indexItem !== undefined &&
            formDataCheckbox[indexItem].value !== undefined
        ) {
            let tempValue: any = formDataCheckbox[indexItem].value;
            formDataCheckbox[indexItem].value = (value === null ? tempValue : value)
            setFormDataCheckbox(formDataCheckbox);
            props?.onChange(event, props.index, formDataCheckbox[indexItem]);
        }
    }

    useEffect(() => {
        setFormDataCheckbox(props?.itemData?.children);
        if (props?.disabled) {
            setIndexItem(0);
        }
    }, [props?.itemData])

    return (
        <Col sm={12} className={`p-4 ${props?.className ? props?.className : ""}`}>
            {formDataCheckbox?.length > 0 &&
                <>
                    <h3>{props?.itemData?.name}</h3>
                    <div className="d-flex flex-wrap">
                        {
                            formDataCheckbox?.map((itemCheckbox: iChildren, index: number) => {
                                const isFocused: boolean = indexItem === index;
                                return <Form.Check
                                    {...props}
                                    className={`customs-form-check__radio spaces m-5 ${isFocused ? "fs-5 fw-bold mb-2" : ""}`}
                                    type={"checkbox"}
                                    id={itemCheckbox?.name ?? ""}
                                    label={itemCheckbox?.name ?? ""}
                                    name={props.itemData?.name ?? ""}
                                    checked={(isFocused && !props?.disabled) || formDataCheckbox[index]?.value}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeChecked(e, index)}
                                    disabled={props?.disabled}
                                />
                            })
                        }
                    </div>
                    <div>
                        <Form.Control
                            className="mt-2"
                            as='textarea'
                            name={indexItem !== undefined ? formDataCheckbox[indexItem]?.name || "" : ""}
                            value={indexItem !== undefined ? formDataCheckbox[indexItem]?.value || "" : ""}
                            readOnly={props?.readOnlyText ? props?.readOnlyText : false}
                            disabled={props?.disabledText ? props?.disabledText : indexItem !== undefined ? false : true}
                            onChange={handleChangeInput}
                        />
                    </div>
                </>}
        </Col>
    )
};

export default CheckboxText;
