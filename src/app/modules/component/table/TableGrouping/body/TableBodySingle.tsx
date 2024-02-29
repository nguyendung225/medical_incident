import { useEffect, useState } from "react";
import { IColumns } from "../TableGrouping";

interface IProps {
  data: any[];
  columns: IColumns[];
  page: number;
  rowsPerPage: number;
  handleDoubleClick?: (row: any) => void;
  fixedColumnsCount?: number;
  tableId: string;
}

function TableBodySingle(props: IProps) {
  const { data, columns, page, rowsPerPage, handleDoubleClick, fixedColumnsCount, tableId } = props;
  const [stickyColumnCount, setStickyColumnCount] = useState<number>(fixedColumnsCount || 0);

  useEffect(() => {
    if (fixedColumnsCount) {
      setStickyColumnCount(fixedColumnsCount);
    } else setStickyColumnCount(0);

    if (stickyColumnCount) {
      let stickyColumns = document.querySelectorAll(`#${tableId}-cell-sticky`);
      let columnsArray = Array.from(stickyColumns);

      let leftOffset = 0;
      columnsArray.forEach((column: any, index: number) => {
        column.classList.add("sticky", "spaces", "z-index-2");
        column.style.left = leftOffset + "px";

        if ((index + 1 > 0) && (index + 1) % stickyColumnCount === 0) {
          leftOffset = 0;
        } else leftOffset += column.offsetWidth;
      });
    }
  }, [fixedColumnsCount]);

  return (
    <>
      {data?.map((row: any, index: number) => (
        <tr
          key={index + "single"}
          className="border-bottom border"
          onClick={() => handleDoubleClick && handleDoubleClick(row)}
        >
          {columns.map((item, idx) => {
            return (
              <td
                id={idx + 1 <= stickyColumnCount ? `${tableId}-cell-sticky` : ""}
                key={item.field + idx}
                className="td-vertical-center bg-white"
                style={item?.cellStyle}
              >
                {item?.render && page && rowsPerPage
                  ? item?.render(row, index, (page - 1) * rowsPerPage + index + 1, data)
                  : row[item?.field]}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default TableBodySingle;
