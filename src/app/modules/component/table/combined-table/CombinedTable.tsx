// @ts-nocheck
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useExpanded, useRowSelect, useTable } from "react-table";
import { toast } from "react-toastify";
import '../table.scss'
import { useStartExpanded } from "./useStartExpanded";
import { TableCustomCell } from '../../../component/table/components/TableCustomCell';
import { Column } from 'react-table';

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" className="mx-2" ref={resolvedRef} {...rest} />
            </>
        );
    }
);

type Itable = {
    userColumns: any,
    data: any,
    getRowData?: any
    handleRightClick?: any,
    handleDoubleClick?: any,
    selectedTable?: boolean,
    singleSelectTable?: boolean,
    treeTable?: boolean,
    minHeight?: number | string;
    maxHeight?: number | string;
    height?: number | string;
    loading?: boolean
    startExpanded?: boolean
    getRowsSelected?: (row: any) => void;
    className?: string

}

const CombinedTable = (props: Itable) => {
    const { userColumns, data, startExpanded = true, className, selectedTable, maxHeight, minHeight, height, treeTable, singleSelectTable, getRowData, handleRightClick, loading, getRowsSelected, handleDoubleClick } = props
    const [tableData, setTableData] = useState(data);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        toggleAllRowsSelected,
        prepareRow,
        state: { expanded }
    } = useTable(
        {
            columns: userColumns,
            data: tableData,

            initialState: { startExpanded },
            getSubRows: (row) => row?.items,
        },
        useExpanded,
        useRowSelect,
        useStartExpanded,
        (hooks) => {
            //multi-select
            selectedTable && (hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    isSticky: true,
                    actionColumn: true,
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        // <div>
                        //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        // </div>
                        <></>
                    ),
                    Cell: ({ row }) => (
                        <>
                            {
                                !row?.subRows?.length && <div className="d-flex justify-content-center border h-100" onClick={() => {
                                    setSelectedRow((prev) => {
                                        if (!row?.isSelected) {
                                            return [...prev, row]
                                        }

                                        return prev.filter(p => p?.id !== row?.id)
                                    })
                                }}>
                                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                                </div>
                            }
                        </>
                    )
                },
                ...columns
            ]))
            //tree-table
            treeTable && (hooks.visibleColumns.push((columns) => [
                {
                    id: "expander",
                    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                        <span {...getToggleAllRowsExpandedProps()}>
                            <i className={`mx-2 bi ${isAllRowsExpanded ? 'bi-dash' : 'bi-plus'} d-flex justify-content-center text-white fs-3`}></i>
                        </span>

                    ),
                    isSticky: true,
                    actionColumn: true,
                    Cell: ({ row }) =>
                        row.canExpand ? (
                            <div
                                className="d-flex justify-content-center border h-100 align-items-center"
                                {...row.getToggleRowExpandedProps()}
                            >
                                <i className={`mx-2 bi ${row.isExpanded ? 'bi-dash' : 'bi-plus'} text-navy fs-3`}></i>
                            </div>
                        ) : null,
                },
                ...columns
            ]))
            //single-select
            singleSelectTable && (hooks.visibleColumns.push((columns) => [
                {
                    id: "selection_single",
                    isSticky: true,
                    actionColumn: true,
                    Header: ({ getToggleAllRowsSelectedProps, }: any) => <></>,
                    Cell: ({ row, toggleRowSelected }: any) => {
                        return (
                            <div className="d-flex justify-content-center border h-100">
                                <input
                                    className="mx-2"
                                    type="radio"
                                    {...row.getToggleRowSelectedProps()}
                                    // checked={row.id === selectedRow[0]?.id}
                                    onClick={() => {
                                        toggleAllRowsSelected(false)
                                        row.toggleRowSelected()
                                        setSelectedRow([row])
                                    }}

                                />
                            </div>
                        )
                    }
                },
                ...columns,
            ]))

        }
    );
    const ref = useRef()
    const [styles, setStyles] = useState<object>({});
    const [inputValues, setInputValues] = useState({});
    const [selectedRow, setSelectedRow] = useState([]);

    const breakIds = (chuoi) => {
        let mangSo = chuoi.split('.');
        const mangSoDaChuyenDoi = mangSo.map(function (so) {
            return parseInt(so, 10);
        });

        return mangSoDaChuyenDoi;
    }

    const handleInputChange = (row, column, value) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [`${row.id}-${column.id}`]: value || " ",
        }));
    };

    const handleInputBlur = (row, column) => {
        const arrDepth = breakIds(row.id);
        let res;
        arrDepth.forEach((i, index) => {
            if (index === 0) {
                res = tableData[i];
            } else if (res?.items) {
                res = res.items[i];
            }
        });
        res[column.id] = inputValues[`${row.id}-${column.id}`]
        // setTableData(tableData)
        toast.success("Đã cập nhật thông tin")
    }

    useEffect(() => {

        setStyles({
            ...styles,
            minHeight: minHeight,
            maxHeight: maxHeight,
            height: height
        });
    }, [minHeight, maxHeight]);


    useEffect(() => {
        getRowsSelected?.(selectedRow)
    }, [selectedRow, getRowsSelected])


    useEffect(() => {
        setTableData(data)
        setInputValues([])
    }, [data])


    return (
        <div className={`overflow-auto combined-table-container border ${className}`} style={styles}>
            <table {...getTableProps()} style={{ width: "100%" }}>
                <thead className="sticky-header-column">
                    {headerGroups.map((headerGroup) => (
                        <tr ref={ref} {...headerGroup.getHeaderGroupProps()} className="text-start fw-bolder fs-6 text-uppercase gs-0 bg-pri">
                            {headerGroup.headers.map((column, index) => {
                                let pl = 0
                                for (let i = 0; i < index; i++) {
                                    pl = pl + ref?.current?.childNodes[i]?.offsetWidth;
                                }
                                return (
                                    column.isSticky ? <th className={`${column.isSticky ? 'sticky-header-column' : ''}`} style={{ left: `${pl}px` }}  {...column.getHeaderProps()}>{column.render("Header")}</th> : <>{column.render("Header")}</>
                                )
                            }
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>

                    {!loading ? rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} 
                                onClick={() => {
                                    if (singleSelectTable) {
                                        toggleAllRowsSelected(false)
                                        row.toggleRowSelected()
                                        setSelectedRow([row])
                                    }
                                    getRowData?.(row)

                                }}
                                onContextMenu={(e) => {
                                    handleRightClick?.(e, row)
                                }}
                                onDoubleClick={() => {
                                    handleDoubleClick?.(row)
                                }}

                                className="hover-table-row" >
                                {row.cells.map((cell, index) => {
                                    const cellProps = cell.getCellProps();
                                    const isEditable = cell.column.editable;
                                    let pl = 0
                                    for (let i = 0; i < index; i++) {
                                        pl = pl + ref?.current?.childNodes[i].offsetWidth;
                                    }
                                    return (
                                        <td {...cellProps} className={clsx({
                                            'sticky-column': cell.column.isSticky,
                                            'border-bottom': row.id === rows[rows.length - 1].id
                                        }, "p-0")} style={{ left: `${pl}px`, height: 0 }}>
                                            {(isEditable && row?.depth > 0) ? (
                                                <div className="input-group input-group-sm" style={{ display: "flex", alignItems: "center" }}>
                                                    <input
                                                        type="text"
                                                        className='form-control border border-primary spaces m-4'
                                                        value={inputValues[`${row.id}-${cell.column.id}`] || cell.value || ""}
                                                        onChange={(e) => {
                                                            handleInputChange(row, cell.column, e.target.value);
                                                        }}
                                                        onBlur={() => {
                                                            handleInputBlur(row, cell.column);
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <>{cell.render('Cell')}</>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    }) : <tr>
                        <td colSpan={headerGroups[0].headers?.length}>
                            <div className="d-flex text-center w-100 align-items-center justify-content-center">
                                <span class="spinner-border spinner-border-md" aria-hidden="true"></span>
                                <span role="status" className="px-2 fs-6">Loading...</span>
                            </div>
                        </td>
                    </tr>}

                </tbody>
            </table>
        </div>
    );
}

export default CombinedTable;
