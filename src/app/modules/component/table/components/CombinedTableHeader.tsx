import { PropsWithChildren } from "react";
import { HeaderProps } from "react-table";
import clsx from "clsx";
type Props<T extends object> = {
  className?: string;
  title?: string;
  tableProps: PropsWithChildren<HeaderProps<T>>;
};
const CombinedTableHeader = <T extends object>({ className, title, tableProps }: Props<T>) => {
  return (
    <div
      {...tableProps.column.getHeaderProps()}
      className={clsx("text-dark border-start-0 border border-bottom-0 align-middle p-2", className,)}
    >
      {title}
    </div>
  );
};

export { CombinedTableHeader };
