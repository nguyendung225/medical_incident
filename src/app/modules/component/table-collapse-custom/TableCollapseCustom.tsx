/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { BaseSyntheticEvent, CSSProperties, ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { TableRow } from "./TableCollapseRow";
import { CustomElementbyTagName } from "./CustomElementbyTagName";
import { KEY, SELECTION_MODE } from "../../utils/Constant";
import { removeDiacritics } from "../../utils/FunctionUtils";

export interface TableProps {
  data: any[];
  columnNameList: columnNamesType[];
  headerClasses?: string;
  bodyClasses?: string;
  name?: string;
  nameParent?: string;
  height?: number;
  scrollable?: boolean;
  nameChildren: string;
  titleComponent?: string;
  setData: (data: any) => void;
  selectData: (data: any) => void;
  selectionMode?: typeof SELECTION_MODE[keyof typeof SELECTION_MODE];
  isSelect?: boolean;
}

export interface columnNamesType {
  name: string;
  field: string;
  sorting?: boolean,
  headerCellProps?: CSSProperties;
  bodyCellProps?: object;
  render?: (data: any, index: number) => any;
}

const CustomTable: FC<TableProps> = (props) => {
  const { data,
    nameChildren,
    nameParent,
    headerClasses,
    bodyClasses,
    columnNameList,
    height,
    scrollable,
    setData,
    selectionMode,
    isSelect
  } = props;

  const [itemList, setItemList] = useState<any[]>([]);
  const [dataList, setDataList] = useState<any[]>([]);
  const [searchObject, setSearchObject] = useState<object>({});
  const [dataTable, setDataTable] = useState<any[]>([]);

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>, item: any, parentIndex: number) => {
    const { checked } = event.target;
    const updatedData = updateCheckedSingle(checked, data, item, parentIndex);
    const updatedItem = updateCheckedSingle(checked, itemList, item, parentIndex);
    
    setAfterDataChecked(updatedData, updatedItem);
  };

  const handleCheckBoxAll = (event: ChangeEvent<HTMLInputElement>, index: any) => {
    const { checked } = event.target;
    const updatedData = updateCheckedAll(data, checked, index);
    const updatedItem = updateCheckedAll(itemList, checked, index);

    setAfterDataChecked(updatedData, updatedItem);
  }

  const updateCheckedAll = (data: any[], isParentChecked: boolean, rowIndex: any) => {
    return data.map((item, index) => {
      return index === rowIndex ? { ...updateChildren(data[index], isParentChecked), isParentChecked } : item;
    })
  }

  const setAfterDataChecked = (updatedData: any, updatedItemList: any) => {
    setData(updatedData);
    setItemList(updatedItemList);
    setDataList(updatedData);

    const checkedItems = getCheckedItems(updatedData);
    props?.selectData(checkedItems)
  }

  const updateCheckedSingle = (isChecked: boolean, data: any[], currentItem: any, parrentIndex: number) => {
    return data.map((row: any, index: number) => {
      if (index === parrentIndex) {
        const updatedDataItem: any[] = (row?.[nameChildren] || []).map((item: any) => ({
          ...item,
          isChecked: currentItem?.id === item?.id ? isChecked : item.isChecked
        }));

        let isParentChecked = updatedDataItem.every((item: any) => item.isChecked);

        return { ...row, [nameChildren]: updatedDataItem, isParentChecked };
      }
      return row;
    })
  }

  // const updateCheckedStatus = (
  //   data: any[],
  //   currentItem: any,
  //   isChecked: boolean
  // ): any[] => {
  //   return data.map((item) => {
  //     if (item?.id === currentItem?.id) {
  //       let items = updateChildren(item, isChecked)
  //       return { ...items, isChecked };
  //     } else if (item?.[nameChildren] && item?.[nameChildren].length > 0) {
  //       return {
  //         ...item,
  //         [nameChildren]: updateCheckedStatus(item?.[nameChildren], currentItem, isChecked),
  //       };
  //     }
  //     return item;
  //   });
  // };

  const updateChildren = (items: any, isChecked: boolean) => {
    if (items?.[nameChildren]?.length > 0) {
      items?.[nameChildren]?.forEach((item: any) => {
        item.isChecked = isChecked
        updateChildren(item, isChecked)
      });
    }
    return items;
  }

  const getCheckedItems = useCallback((data: any[]): any[] => {
    let checkedItems: any[] = [];

    const traverse = (item: any) => {
      if (item.isChecked) {
        checkedItems.push(item);
      }

      if (item?.[nameChildren] && item?.[nameChildren].length > 0) {
        item?.[nameChildren].forEach((child: any) => traverse(child));
      }
    };

    data && data.forEach((item: any) => traverse(item));
    return checkedItems;
  },[nameChildren]);

  useEffect(() => {
    if(selectionMode === SELECTION_MODE.SINGLE){
      setDataTable(dataList);
      const checkedItems = getCheckedItems(dataList);
      props?.selectData(checkedItems[0]);
    }else if(selectionMode === SELECTION_MODE.MULTIPLE){
      setDataTable(itemList);
      const checkedItems = getCheckedItems(itemList);
      props?.selectData(checkedItems);
    }else{
      setDataTable(data);
    }
  },[data, dataList, itemList, selectionMode, getCheckedItems])

  const styles: object = {
    height: height,
    overflowY: scrollable && 'auto',
  }

  const checkSearch = useCallback(() => {
    let check = Object.values(searchObject)?.some((value: any) => value);
    return check
  }, [searchObject])

  useEffect(() => {
    if (!checkSearch()) {
      setItemList(data)
      setDataList(data);
    }
  }, [data, checkSearch]);

  const search = () => {
    if (!checkSearch()) {
      setItemList(data);
      setDataList(data);
      return false;
    }

    const filteredData = data.map((item: any) => {
      if (item?.[nameChildren] && item?.[nameChildren].length > 0) {
        const filteredServices = item?.[nameChildren].filter((service: any) => {
          for (const [key, value] of Object.entries(searchObject)) {
            const lowerCaseString = removeDiacritics(service[key]?.toLowerCase());
            const lowerCaseSearchString = removeDiacritics(value?.toLowerCase().trim());
            if (lowerCaseSearchString && !lowerCaseString?.includes(lowerCaseSearchString)) {
              return false;
            }
          }
          return true;
        });

        const newItem = listItemService(item);
        newItem[nameChildren] = filteredServices;
        return newItem;
      }
      return item;
    });

    setItemList(filteredData);
    setDataList(filteredData);
  };

  const listItemService = (item: any) => {
    const newItem = { ...item };
    if (newItem?.[nameChildren]) {
      newItem[nameChildren] = newItem?.[nameChildren].map((service: any) => listItemService(service));
    }
    return newItem;
  };

  const handleChange = (event: BaseSyntheticEvent) => {
    setSearchObject({ ...searchObject, [event?.target?.name]: event?.target?.value })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    (KEY.ENTER === event.key) && search()
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    !value && search();
  }

  const handleSingleSelect = (row: any, parentIndex: number) => {
    const checked = row.isChecked;
    if(checked){
      setDataList(data);
    }else{
      const updatedData = updateCheckedSingle(true, data, row, parentIndex);
      setDataList(updatedData);
    }
  }

  const toggleRowSelection = (row: any, parentIndex: number) => {
    const checked = row.isChecked;
    const updatedItem = updateCheckedSingle(!checked, itemList, row, parentIndex);
    setItemList(updatedItem);
  }

  return (
    <div
      className="table-responsive customs-collapse-row m-0"
      style={styles}
    >
      <table className="dataTable table w-100 p-0 py-2">
        <thead className={clsx(headerClasses, "position-sticky top-0 z-index-0 border")}>
          <tr className="text-white fw-bolder fs-7 text-uppercase gs-0 bg-header-table text-black">
            <th className="cell-action cell-action position-sticky start-0 bg-header-table"></th>
            {columnNameList?.length > 0 && columnNameList?.map((column: columnNamesType, index: number) =>
              <th
                key={index}
                className={clsx(
                  "text-center",
                  !column?.headerCellProps && "min-w-40px",
                )}
                style={column?.headerCellProps}
              >
                {column.name}
              </th>
            )}
          </tr>
        </thead>
        <tbody className={clsx(bodyClasses)} >
          {/* <tr>
            <td className="cell-action"></td>
            {columnNameList?.length > 0 && columnNameList?.map((column: columnNamesType, index: number) =>
              <td className="spaces px-8" key={index}>
                {
                  column?.sorting && <input
                    className="w-100 customs-input form-control"
                    type="text"
                    name={column?.field}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                  />
                }
              </td>
            )}
          </tr> */}
          {dataTable?.length > 0 ? dataTable?.map((row: any, index: number) => (
            <TableRow
              row={row}
              key={index}
              index={index}
              nameParent={nameParent && nameParent}
              nameChildren={nameChildren}
              columnNameList={columnNameList}
              handleCheckBox={handleCheckBox}
              selectionMode={selectionMode && selectionMode}
              handleSingleSelect={handleSingleSelect}
              toggleRowSelection={toggleRowSelection}
              handleCheckBoxAll={handleCheckBoxAll}
              parentIndex={index}
              isSelect={isSelect}
            />
          )) : <tr><td className="text-center" colSpan={columnNameList?.length + 1}>Không có dữ liệu</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

const TableCollapseCustom: FC<TableProps> = (props) => {
  const { name, titleComponent } = props;
  const titleComponentType = (titleComponent ? titleComponent : "h1") as keyof JSX.IntrinsicElements
  
  return (
    <div>
      {name && <CustomElementbyTagName tagName={titleComponentType} content={name} />}
      <CustomTable {...props} />
    </div>
  );
};

export default TableCollapseCustom;
