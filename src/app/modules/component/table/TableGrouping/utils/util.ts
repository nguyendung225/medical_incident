import { TYPE } from "../../../../utils/Constant";
import { IColumns } from "../TableGrouping";

export const bringChildToParrent = (arr: IColumns[]): any[] => {
  let result: any[] = [...arr];
  arr.forEach((col) => {
    if (col.child) {
      result = result.concat([bringChildToParrent(col.child)]);
    }
  });

  return result;
};

export const filterChild = (listColumn: IColumns[]): any[] => {
  return listColumn.map((col) => (col.child ? filterChild(col.child) : col));
};

export const caculateTotal = (data: any, firstLevelDataField: string, secondLevelDataField: string) => {
  let objTotal: { [key: string]: any } = {};
  data?.[firstLevelDataField]?.forEach((itemFirst: any) => {
    itemFirst?.[secondLevelDataField].forEach((item: any) => {
      Object.entries(item).forEach(([key, value]) => {
        if (typeof value === TYPE.NUMBER) {
          objTotal[key] = (objTotal[key] || 0) + value;
        }
      });
    });
  });

  return objTotal;
};

export const setIsStickyHeader = (arr: IColumns[], fixedColumnsCount: number = 0): any[] => {
  let result: IColumns[] = [...arr];

  const setIsSticky = (col: IColumns) => {
    col.isSticky = true;
    if (col.child) {
      col.child.forEach((colChild) => {
        colChild.isSticky = true;
        setIsSticky(colChild);
      });
    }
  };

  result.forEach((col, index) => {
    if (index < fixedColumnsCount) {
      col.isSticky = true;
      if (col.child) {
        col.child.forEach((colChild) => {
          colChild.isSticky = true;
          setIsSticky(colChild);
        });
      }
    }
  });

  return result;
};

export const getLeftOffset = (rowHeader: IColumns[][], rowIndex: number, colIndex: number) => {
  if (rowIndex === 0 && colIndex === 0) return 0;
  if (rowIndex === 0) return rowHeader[0][colIndex - 1].rightOffset;
  let parentIndex = rowHeader[rowIndex][colIndex].parentIndex;
  if (colIndex === 0 && parentIndex !== 0 && parentIndex !== undefined)
    return rowHeader[rowIndex - 1][parentIndex - 1].rightOffset;
  if (colIndex === 0 && parentIndex === 0) {
    while (parentIndex === 0) {
      rowIndex--;
      parentIndex = rowHeader[rowIndex][parentIndex].parentIndex;
    }
    if (parentIndex === undefined) return 0;
    else {
      return rowHeader[rowIndex - 1][parentIndex - 1].rightOffset;
    }
  }
  if (rowHeader[rowIndex][colIndex].parentIndex === rowHeader[rowIndex][colIndex - 1].parentIndex)
    return rowHeader[rowIndex][colIndex - 1].rightOffset;
};

export const getTotalColumnsWithSticky = (columns: any[], stickyCount: number = 0) => {
  let totalColumns = 0;

  const countColumns = (column: any) => {
    if (column.child && Array.isArray(column.child)) {
      column.child.forEach((childColumn: any) => countColumns(childColumn));
    } else {
      totalColumns += 1;
    }
  };

  columns.forEach((column) => {
    if (totalColumns < stickyCount) {
      countColumns(column);
    }
  });
  return totalColumns;
};
