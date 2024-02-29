import React, { useEffect, useState } from "react";
import { componentMapping } from "./utils/const";
import { checkType } from "./utils/constFunction";
import "./style.scss";
import { iInputComponent, iItemData } from "./models/inputModel";

const InputComponent = ({ ...props }) => {
    const [listInput, setListInput] = useState<iInputComponent[]>([])
    useEffect(() => {
        let arr: iInputComponent[] = [];
        for (const key in props?.data) {
            if (props?.data.hasOwnProperty(key)) {
                const item = props?.data[key];
                const component = componentMapping.get(checkType(item?.dataType));
                if (component) {
                    let value = {
                        ...component,
                        itemData: item,
                    }
                    arr.push(value);
                }
            }
        }
        setListInput(arr)
    }, [props?.data])
    return (
        <>
            {listInput.map((item: iInputComponent, index: string | number | null | undefined) => {
                return (
                    React.cloneElement(item?.component as React.ReactElement, { ...props, ...item, key: index })
                )
            })}
        </>
    )
};

export default InputComponent;
