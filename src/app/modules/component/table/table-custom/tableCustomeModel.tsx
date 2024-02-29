import { Column, ColumnInstance } from "react-table";
export type CustomColumn<T extends object> = Column<T> & {
    typeSorting?: string;
    sorting?: boolean;
    name?:string;
};

export type CustomColumnInstance<T extends object> = ColumnInstance<T> & {
    typeSorting?: string;
    sorting?: boolean;
    name?:string;
    headerProps?: {className: string}
};