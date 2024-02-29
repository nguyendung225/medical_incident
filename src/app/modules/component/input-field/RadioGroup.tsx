import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

type TRadioItem = {
    code: string | number;
    name: string;
}

type TProps = {
    lable?: string;
    name: string;
    className?: string;
    classLable?: string;
    value: string | number;
    isRequired?: boolean;
    radioItemList: TRadioItem[];
    handleChange: (value: any) => void;
}

function RadioGroup(props: TProps) {
    const onChange = (e: RadioChangeEvent) => {
        props.handleChange(e);
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
                <Radio.Group onChange={onChange} value={props?.value} size="large" name={props?.name}>
                    {props.radioItemList.map((radioItem) => (
                        <Radio key={radioItem?.code} value={radioItem?.code}>{radioItem?.name}</Radio>
                    ))}
                </Radio.Group>
            </>
        </div>
    );
}

export default RadioGroup;