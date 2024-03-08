import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

type TRadioItem = {
    code: string | number;
    name: string;
    other?: boolean;
};

  type TProps = {
    lable?: string;
    name: string;
    className?: string;
    classLable?: string;
    labelClassName?: string;
    value: string | number | null;
    isRequired?: boolean;
    radioItemList: TRadioItem[];
    handleChange: (value: any) => void;
    otherField?: any;
  };

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
                        <Radio className={props?.labelClassName} key={radioItem?.code} value={radioItem?.code}>
                            <div className='d-flex gap-2'> {radioItem?.name}
                                {(props.otherField && radioItem?.code === props?.value) && props?.otherField}</div>
                        </Radio>
                        
                    ))}
                </Radio.Group>
            </>
        </div>
    );
}

export default RadioGroup;