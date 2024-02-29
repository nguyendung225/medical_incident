import { useContext, useState } from "react";
import { romanize } from "../../../utils/FunctionUtils";
import RowCollapseParent from "./RowCollapseParent";
import TableGroupingContext from "../TableGroupingContext";

interface IProps {
  data: any;
  index: number;
}

function TableBodyCollapse(props: IProps) {
  const { data, index } = props;
  const { columnsConvert, firstLevelDataField, firstLevelTitleField } = useContext(TableGroupingContext);
  const [isCollapse, setIsCollapse] = useState<boolean>(false);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <>
      <tr
        key={index + "body"}
        onClick={handleCollapse}
        className="shadow-sm bg-zinc-100"
      >
        <td
          className="border spaces fw-bold pl-16"
          colSpan={columnsConvert?.length}
        >
          <div className="w-full flex flex-middle">
            <span className={`${isCollapse ? "chervon-rotate-down" : ""} flex transition-linear`}>
              <i className="bi bi-chevron-double-right text-header-table"></i>
            </span>
            <span className="spaces pl-16 text-uppercase">
              {romanize(index + 1) + " " + data?.[firstLevelTitleField]}
            </span>
          </div>
        </td>
      </tr>
      {isCollapse &&
        data?.[firstLevelDataField]?.map((parentItem: any, index: number) => (
          <RowCollapseParent
            data={parentItem}
            keyRow={index}
          />
        ))}
    </>
  );
}

export default TableBodyCollapse;
