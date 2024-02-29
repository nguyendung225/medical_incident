import clsx from "clsx";
import { FC } from "react";
import "../table.scss";
type Props = {
    data: any;
    id?: string;
    action?: boolean;
    className?: string;
    tableProps?: any;
    cellChildIndex?: any;
    hiddenParentData?: boolean;
};

const TableCustomCell: FC<Props> = ({ 
    data, 
    action, 
    className, 
    tableProps, 
    cellChildIndex = 0,
    hiddenParentData = false
}) => {
    const PARENT_ROW = 0;
    return (
        <div
            className={clsx(className, "text-system fs-13px spaces px-4", {
                "action-cell": action,
            })}
        >
            {(tableProps && tableProps?.row?.depth === PARENT_ROW && hiddenParentData) ? "" : data}
        </div>
    );
};

export { TableCustomCell };
