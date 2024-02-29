import { ChangeEvent, useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { iChildren } from "../models/inputModel";

const RadioText = ({ ...props }) => {
    const [indexItem, setIndexItem] = useState<number>(0);
    const [formDataRadio, setFormDataRadio] = useState(props.itemData?.children ?? []);

    const handleChangeChecked = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setIndexItem(index);
    }

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        if (
            indexItem !== undefined &&
            formDataRadio[indexItem].value !== undefined
        ) {
            let tempValue: any = formDataRadio[indexItem].value;
            formDataRadio[indexItem].value = (value === null ? tempValue : value)
            setFormDataRadio(formDataRadio);
            props?.onChange(event, props.index, formDataRadio[indexItem]);
        }
    }

    useEffect(() => {
        setFormDataRadio(props?.itemData?.children);
    }, [props?.itemData])

    return (
        <Col sm={12} className={`p-4 ${props?.className ? props?.className : ""}`}>
            {formDataRadio?.length > 0 &&
                <>
                    <h3>{props?.itemData?.name}</h3>
                    <div className="d-flex flex-wrap">
                        {
                            formDataRadio?.map((itemRadio: iChildren, index: number) => {
                                return <Form.Check
                                    {...props}
                                    className={`customs-form-check__radio spaces m-5`}
                                    type={"radio"}
                                    id={itemRadio?.name ?? ""}
                                    label={itemRadio?.name ?? ""}
                                    name={props.itemData?.name ?? ""}
                                    checked={indexItem === index}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeChecked(e, index)}
                                />
                            })
                        }
                    </div>
                    <div>
                        <Form.Control
                            className="mt-2"
                            as='textarea'
                            name={indexItem !== undefined ? formDataRadio[indexItem]?.name || "" : ""}
                            value={indexItem !== undefined ? formDataRadio[indexItem]?.value || "" : ""}
                            readOnly={props?.readOnlyText ? props?.readOnlyText : false}
                            disabled={props?.disabledText ? props?.disabledText : indexItem !== undefined ? false : true}
                            onChange={handleChangeInput}
                        />
                    </div>
                </>}
        </Col>
    )
};

export default RadioText;
