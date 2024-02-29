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
