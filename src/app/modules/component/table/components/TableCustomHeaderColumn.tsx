import { ReactNode } from "react";
import { CustomColumnInstance } from "../table-custom/tableCustomeModel";
type Props<T extends object> = {
  column: CustomColumnInstance<T>;
};

const TableCustomHeaderColumn = <T extends object>({
  column,
}: Props<T>) => {
  return (
    <>{column.render("Header") as ReactNode}</>
  )
};

export { TableCustomHeaderColumn };
