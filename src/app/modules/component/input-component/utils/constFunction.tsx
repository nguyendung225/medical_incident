import { INPUT_TYPE, LAYOUT, SELECT_TYPE, TYPE } from "./const";
import { iChildren, iConceptDto, iItemData } from "../models/inputModel";

export const checkType = (datatype: string) => {
    if (Object.values(INPUT_TYPE).includes(datatype as string as INPUT_TYPE)) {
        return TYPE.input;
    }

    if (SELECT_TYPE.includes(datatype)) {
        return TYPE.select;
    }

    return datatype;
}

export const checkLayout = (layout: string) => {
    return LAYOUT.horizontal === layout
}

export const listItemChild = (data: any) => {
    let objectData: any = {}
    if (data?.length > 0) {
        data?.forEach((item: any, index: number) => {
            let value: any = {}
            item?.structure?.length > 0 && item?.structure?.map((itemStructure: any, index: number) => {
                let itemObjects = getListItemChild(itemStructure)
                value[itemObjects?.code] = itemObjects
            })
            objectData[item?.code] = value
        });
    }
    return objectData
}

const getListItemChild = (items: any) => {
    let arr: any = []
    let itemObject: iItemData = {
        id: items?.concept?.conceptId,
        name: items?.concept?.name,
        code: items?.concept?.code,
        value: items?.concept?.value,
        dataType: items?.concept?.dataType,
        units: items?.conceptNumeric?.units || null
    }

    if (items?.conceptAnswers?.length > 0) {
        items?.conceptAnswers?.map((item: any, index: number) => {
            let itemObject: iChildren = {
                id: item?.concept?.conceptId,
                name: item?.concept?.name,
                code: item?.concept?.code,
                value: item?.concept?.value,
                dataType: item?.concept?.dataType,
                units: item?.conceptNumeric?.units || null,
                attribute: item?.conceptAttribute || null
            }
            arr.push(itemObject)
        })
    }
    itemObject.children = arr?.length > 0 ? arr : null

    return itemObject;
}

export const convertDto = (data: any) => {
    let listData: any[] = []
    data?.length > 0 && data.map((item: any, index: number) => {
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const itemData = item[key];
                if (itemData?.children?.length > 0) {
                    itemData?.children.forEach((itemChildren: any) => {
                        let itemObject: iConceptDto = {
                            id: itemChildren.id,
                            name: itemChildren?.name,
                            valueComplex: "",
                            valueNumeric: itemChildren.dataType === INPUT_TYPE.NUMBER ? itemData?.value : "",
                            valueText: itemChildren?.value || null,
                        }
                        listData.push(itemObject)
                    });
                } else {
                    let itemObject: iConceptDto = {
                        id: itemData.id,
                        name: itemData?.name,
                        valueComplex: "",
                        valueNumeric: itemData.dataType === INPUT_TYPE.NUMBER ? itemData?.value : "",
                        valueText: itemData?.value || null,
                    }
                    listData.push(itemObject)
                }
            }
        }
    })
    return listData;
}