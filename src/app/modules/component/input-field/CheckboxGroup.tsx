import { useEffect, useState } from 'react';
import type { GetProp } from 'antd';
import { Checkbox, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

type TCheckBoxItem = {
    name: string;
    code: string | number;
    checked?: boolean;
}

type TProps = {
    title?: string;
    lable?: string;
    className?: string;
    classLable?: string;
    classCheckbox?: string;
    classCheckboxGroup?: string;
    value: CheckboxValueType[];
    isRequired?: boolean;
    checkboxItemList: TCheckBoxItem[];
    handleChange: (value: any) => void;
}

function CheckboxGroup(props: TProps) {
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(props.value || []);
    const [checkAll, setCheckAll] = useState<boolean>(false);

    useEffect(() => {
        setCheckAll(props.checkboxItemList.length === checkedList.length);
        props.handleChange(checkedList);
    }, [checkedList])
    
    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setCheckedList(checkedValues);
    };

    const onCheckAllChange = (e: { target: { checked: any; }; }) => {
        setCheckedList(e.target.checked ? props.checkboxItemList.map(item => item.code) : []);
    };

    return (
        <div className={props.className}>
            {props?.lable && (
                <span className={`text-lable-input lable mb-1 ${props?.classLable}`}>
                    {props?.lable}
                    {props?.isRequired && <span className="color-red"> *</span>}
                </span>
            )}
            {props?.title && (
                <Checkbox
                    onChange={onCheckAllChange}
                    checked={checkAll}
                >
                    {props.title}
                </Checkbox>
            )}
            <Checkbox.Group onChange={onChange} className="w-100" value={props.value}>
                <Row className={`${props?.classCheckboxGroup}`}>
                    {props.checkboxItemList.map((checkboxItemList) => (
                        <Checkbox className={props?.classCheckbox} value={checkboxItemList?.code}>{checkboxItemList?.name}</Checkbox>
                    ))}
                </Row>
            </Checkbox.Group>
        </div>
    );
}

export default CheckboxGroup;