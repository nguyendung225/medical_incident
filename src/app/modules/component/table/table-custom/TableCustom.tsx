import clsx from "clsx";
import React, {
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState
} from "react";
import { useIntl } from "react-intl";
import { Row, useRowSelect, useTable } from "react-table";
import { Form } from "react-bootstrap";
import { CustomColumn } from "./tableCustomeModel";
import { SELECTION_MODE } from "../../../utils/Constant";
import { KTCardBody } from "../../../../../_metronic/helpers";
import { TableCustomToolbar } from "../components/TableToolbar";
import { TableCustomHeaderColumn } from "../components/TableCustomHeaderColumn";
import "../table.scss";

interface tableProps<T extends object> {
    data: T[];
    columns: ReadonlyArray<CustomColumn<T>>;
    selectionMode?: typeof SELECTION_MODE[keyof typeof SELECTION_MODE];
    hasToolbar?: boolean;
    handleSearchByPage?: () => void;
    handleChangeValueInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpenInfoDialog?: (row: any) => void;
    getSelectedRowsData?: Dispatch<SetStateAction<any>> | any;
    height?: number | string;
    pageIndex?: number;
    pageSize?: number;
    minHeight?: number | string;
    maxHeight?: number | string;
    selectedLabel?: boolean;
    verticalScroll?: boolean;
    handleDoubleClick?: (row: any) => void;
    setShouldOpenFilterSearch?: | React.Dispatch<React.SetStateAction<boolean>> | any;
    shouldOpenFilterSearch?: boolean;
    className?: string;
    rowSelected?: any;
    handleConditionSelectRows?: any;
    isCondition?: boolean
    handleContextMenu?: (e: any, row: any) => void;
}

function TableCustom<T extends object>(props: tableProps<T>) {
    const {
        data,
        columns,
        handleSearchByPage,
        handleChangeValueInput,
        selectionMode,
        hasToolbar,
        getSelectedRowsData,
        height,
        pageIndex,
        pageSize,
        minHeight,
        maxHeight,
        selectedLabel,
        verticalScroll,
        handleDoubleClick,
        setShouldOpenFilterSearch,
        shouldOpenFilterSearch,
        className,
        rowSelected,
        handleConditionSelectRows,
        isCondition,
        handleContextMenu,
    } = props;
    const [selectedRows, setSelectedRows] = useState<Row<T>[]>([]);
    const [selectedRow, setSelectedRow] = useState<Row<T>>()
    const [styles, setStyles] = useState<object>({});
    const intl = useIntl();

    useEffect(() => {
        setStyles({
            ...styles,
            minHeight: minHeight,
            maxHeight: maxHeight,
        });
    }, [minHeight, maxHeight]);

    useEffect(() => {
        if (getSelectedRowsData) {
            getSelectedRowsData(selectedRows?.map((item) => item?.original));
        }
    }, [selectedRows]);



    useEffect(() => {
        handleConditionSelectRows && handleConditionSelectRows(rows, setSelectedRows)
    }, [isCondition]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        allColumns,
        rows,
    } = useTable(
        {
            columns,
            data: data,
        },
        useRowSelect,
        (hooks) => {
            if (selectionMode === SELECTION_MODE.MULTI) {
                hooks.allColumns.push((columns) => [
                    {
                        id: "selection",
                        Header: ({ getToggleAllRowsSelectedProps }: any) => (
                            <th className="border-top d-flex align-items-center justify-content-center spaces h-29">
                                <Form.Check
                                    type="checkbox"
                                    className="spaces p-0 min-w-30px customs-form-check__table"
                                    {...getToggleAllRowsSelectedProps()}
                                    onClick={(e) => {
                                        toggleAllRowsSelected();
                                    }}
                                />
                            </th>
                        ),
                        Cell: ({ row }: any) => (
                            <Form.Check
                                type="checkbox"
                                className="p-0 min-w-30px customs-form-check__table my-0 mt-1"
                                {...row.getToggleRowSelectedProps()}
                            />
                        ),
                    },
                    ...columns,
                ]);
            }
            if (selectionMode === SELECTION_MODE.SINGLE) {
                hooks.allColumns.push((columns) => [
                    {
                        id: "selection",
                        Header: () => (
                            <th className="border-top d-flex align-items-center justify-content-center spaces h-29">
                                <div
                                    className="spaces p-0 min-w-30px customs-form-check__table"
                                />
                            </th>
                        ),
                        Cell: ({ row }: any) => (
                            <Form.Check
                                type="radio"
                                className="p-4 customs-form-check__radio__table my-0 mt-1"
                                {...row.getToggleRowSelectedProps()}
                            />
                        ),
                    },
                    ...columns,
                ]);
            }
        }
    );

    const toggleRowSelection = (row: any) => {
        row.toggleRowSelected();
        const isSelected = row?.isSelected;
        if (!isSelected) {
            setSelectedRows([...selectedRows, row]);
        } else {
            setSelectedRows(
                selectedRows.filter((selectedRow: Row<T>) => selectedRow.id !== row.id)
            );
        }
    };

    const toggleAllRowsSelected = () => {
        const allRowsSelected = rows.every((row: any) => row.isSelected);
        setSelectedRows(allRowsSelected ? [] : rows);
    };
    const handleUnSelectedRows = () => {
        rows.map((row: any) => {
            if (row.isSelected) row.toggleRowSelected();
        });
        setSelectedRows([]);
    };

    const handleSingleSelect = async (selectedRow: any) => {
        if (selectedRow.isSelected) {
            handleUnSelectedRows();
        } else {
            handleUnSelectedRows();
            await selectedRow.toggleRowSelected();
            setSelectedRows([selectedRow]);
            setSelectedRow(selectedRow)
        }
    };
    const handleCustomContextMenu = (e: any, row: any) => {
        e.preventDefault();
        handleContextMenu && handleContextMenu(e, row);
    };
    return (
        <KTCardBody height={height} className={className}>
            {hasToolbar && (
                <TableCustomToolbar
                    selectedLabel={selectedLabel}
                    handleUnSelectedRows={handleUnSelectedRows}
                    selectedRows={selectedRows}
                    allColumns={allColumns}
                    setShouldOpenFilterSearch={setShouldOpenFilterSearch}
                    shouldOpenFilterSearch={shouldOpenFilterSearch || false}
                />
            )}
            <div
                style={{ ...styles, height: height }}
                className={`table-responsive table-scroll h-100
        ${verticalScroll ? "table-scroll-y" : ""} 
        ${className ? className : ""} 
        ${height}`}
            >
                <table
                    id="kt_table_users"
                    className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
                    {...getTableProps()}
                >
                    <thead
                        className={
                            verticalScroll
                                ? "header-sticky z-index-0"
                                : "position-sticky top-0"
                        }
                    >
                        {headerGroups.map((headerGroup) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                className="text-start border fw-bolder fs-8 text-uppercase gs-0 border bg-pri border-y-none "
                            >
                                {headerGroup.headers.map((column) => (
                                    <TableCustomHeaderColumn<T>
                                        key={column.id}
                                        column={column}
                                    />
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody
                        className="text-gray fw-bold bg-white border"
                        {...getTableBodyProps()}
                    >
                        {rows.length > 0 ? (
                            rows.map((row: any, i) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        className={clsx("cursor-pointer", {
                                            "selected-row":
                                                row.isSelected ||
                                                (rowSelected && rowSelected === row?.original?.caseId) || (selectedRow?.id === row?.id),
                                        })}
                                        {...row.getRowProps()}
                                        onClick={() => {
                                            if (selectionMode === SELECTION_MODE.MULTI) {
                                                toggleRowSelection(row);
                                            }
                                            if (selectionMode === SELECTION_MODE.SINGLE) {
                                                handleSingleSelect(row);
                                            }
                                            if (
                                                selectionMode === SELECTION_MODE.SINGLE_NO_RADIO_BUTTON
                                            ) {
                                                handleSingleSelect(row);
                                            }
                                        }}
                                        onDoubleClick={() => {
                                            handleDoubleClick && handleDoubleClick(row);
                                        }}
                                        onContextMenu={(e) => handleCustomContextMenu(e, row)}
                                    >
                                        {row.cells.map((cell: any, index: number) => {
                                            return (
                                                <td className={"align-middle spaces py-4 px-8"} {...cell.getCellProps()}>
                                                    {cell.render("Cell") as ReactNode}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={headerGroups[0].headers?.length} className="text-center py-2">
                                        {intl.formatMessage({ id: "TABLE.DATA.EMPTY" })}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </KTCardBody>
    );
}

export { TableCustom };

