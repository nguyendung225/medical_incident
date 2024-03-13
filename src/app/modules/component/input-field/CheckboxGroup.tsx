import React from 'react';
import type { GetProp } from 'antd';
import { Checkbox, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

type TRadioItem = {
    code: string | number;
    name: string;
}

type TProps = {
    lable?: string;
    className?: string;
    classLable?: string;
    classCheckbox?: string;
    value: CheckboxValueType[];
    isRequired?: boolean;
    radioItemList: TRadioItem[];
    handleChange: (value: any) => void;
}

function CheckboxGroup(props: TProps) {
    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        props.handleChange(checkedValues)
    };

    return (
        <div className={props.className}>
            {props?.lable && (
                <span className={`text-lable-input lable mb-1 ${props?.classLable}`}>
                    {props?.lable}
                    {props?.isRequired && <span className="color-red"> *</span>}
                </span>
            )}
            <>
                <Checkbox.Group onChange={onChange} className="w-100" value={props.value}>
                    <Row>
                        {props.radioItemList.map((radioItem) => (
                            <Checkbox className={props?.classCheckbox} value={radioItem?.code}>{radioItem?.name}</Checkbox>
                        ))}
                    </Row>
                </Checkbox.Group>
            </>
        </div>
    );
}

export default CheckboxGroup;