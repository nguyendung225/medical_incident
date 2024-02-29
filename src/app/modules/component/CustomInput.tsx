import { ChangeEvent } from 'react';
import { Col, Form, FormControl, FormLabel, Row } from 'react-bootstrap';


interface CustomInputProps {
    data?: any;
    value?: any;
    onChange: (value: any) => void;
    className?: string;
    [key: string]: any; 
}
const attribute = {
    input: "input",
    textarea: "textarea",
    select: "select",
    checkbox: "checkbox",
    radio: "radio"
}

const CustomInput: React.FC<CustomInputProps> = ({ data, value, onChange, className, ...props }) => {

    const handleChangeSelect = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedItem = props?.options?.length > 0 && props?.options.find((option: any) => convertName(props?.valueOption, option) === Number(selectedValue));
        if (selectedItem) {
            onChange(selectedItem);
        } else {
            onChange(selectedValue);
        }
    };

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        onChange(inputValue);
    }

    const convertName = (value: string, item: any) => {
        const array = value.split(".")
        for (let i = 0; i < array.length; i++) {
            item = item?.[array[i]];
        }
        return item
    }

    return (
            <Col sm="6">
                {
                    (props?.type === attribute.input || props?.type === attribute.textarea) &&
                    <Form.Group>
                        <FormLabel>{props?.label}</FormLabel>
                        <Form.Control
                            {...props}
                            className={`${className ? className : ""}`}
                            as={props?.type ? props?.type : attribute.input}
                            rows={props?.type === attribute.textarea ? props?.totalTextRow : 1}
                            value={value ? value : null}
                            onChange={handleChangeInput}
                        />
                    </Form.Group>
                }

                {
                    (props?.type === attribute.checkbox || props?.type === attribute.radio) &&
                    <Form.Check
                        {...props}
                        className={`
                        ${props?.type === attribute.checkbox ? "customs-form-check" : "customs-form-check__radio"}
                        ${className ? className : ""}
                    `}
                        type={props?.type ? props?.type : attribute.checkbox}
                        label={props?.label}
                        name={props?.name}
                        checked={props?.checked}
                        onChange={onChange}
                    />
                }

                {
                    props?.type === attribute.select &&
                    <Form.Group>
                        <FormLabel>{props?.label}</FormLabel>
                        <Form.Select
                            {...props}
                            className={`${className ? className : ""}`}
                            size='sm'
                            value={value ? value : ""}
                            onChange={handleChangeSelect}
                        >
                            <option hidden value={""}>Chọn...</option>
                            {props?.options?.length > 0 && props?.options?.map((item: any, index: number) => {
                                return <option key={index} value={convertName(props?.valueOption, item)}>{convertName(props?.labelOption, item)}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                }
            </Col>
    );
};

export default CustomInput
