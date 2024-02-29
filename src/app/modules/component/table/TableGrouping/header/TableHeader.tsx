import { useEffect, useState } from "react";
import { countArrayDeep, extractElementsByDepth } from "../../../../utils/FunctionUtils";
import { IColumns } from "../TableGrouping";
import { bringChildToParrent, filterChild, getLeftOffset, setIsStickyHeader } from "../utils/util";

interface Iprops {
  columns: IColumns[];
  tableId: string;
  fixedColumnsCount?: number;
}

function TableHeader(props: Iprops) {
  const { columns, tableId, fixedColumnsCount } = props;

  const [rowHeader, setRowHeader] = useState<IColumns[][]>([]);

  useEffect(() => {
    setRowHeader(extractElementsByDepth(bringChildToParrent(setIsStickyHeader(columns, fixedColumnsCount))));
  }, [columns]);

  const calculateColSpan = (column: IColumns) => {
    return column?.child ? filterChild(column.child).flat(Infinity).length : 1;
  };

  const calculateRowSpan = (column: IColumns, level: number) => {
    let maxRowSpan = countArrayDeep(filterChild(columns));
    return column?.child ? 1 : maxRowSpan - level;
  };

  useEffect(() => {
    if (fixedColumnsCount) {
      rowHeader?.forEach((row, index) => {
        row?.forEach((col, idx) => {
          if (col.isSticky) {
            let leftOffset = getLeftOffset(rowHeader, index, idx);
            let stickyColumn: any = document.querySelector(`#${tableId}-th-${index}-${idx}`);
            stickyColumn.classList.add("sticky", "spaces", "z-index-2");
            stickyColumn.style.left = leftOffset + "px";
            col.rightOffset = leftOffset + stickyColumn.offsetWidth;
          }
        });
      });
    }
  }, [fixedColumnsCount, rowHeader]);

  return (
    <thead className="position-sticky top-0 z-index-3">
      {rowHeader?.map((row, index) => {
        return (
          <tr
            className="text-header-table fw-600 fw-bolder text-capitalize-first gs-0 border"
            key={index}
          >
            {row?.map((col, idx) => (
              <th
                id={`${tableId}-th-${index}-${idx}`}
                key={col.field + idx}
                className="p-table text-center bg-header-table"
                style={col.headerStyle}
                rowSpan={calculateRowSpan(col, index)}
                colSpan={calculateColSpan(col)}
              >
                {col.name}
              </th>
            ))}
          </tr>
        );
      })}
    </thead>
  );
}

export default TableHeader;
