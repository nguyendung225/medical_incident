import { FC } from "react";
import { Accordion, Table } from "react-bootstrap";
import "../table.scss";

interface Props {
    data: any[];
    columns: any[];
    collapseHeader: string;
    collapseBody: string;
    handleClickRow?: (params: any) => void;
    handleContextMenu?: (e: any, row: any) => void;
    phieuHuy?: string
}

const TableCollapse: FC<Props> = (props) => {
    let { data, columns, handleClickRow, collapseHeader, collapseBody, handleContextMenu, phieuHuy = null } = props;

    const renderFieldValue = (data: any, field: string) => {
        let result = data;
        field.split(".").forEach(fieldItem => {
            result = result?.[fieldItem];
        });
        return result;
    };
    const handleCustomContextMenu = (e: any, row: any) => {
        e.preventDefault();
        handleContextMenu && handleContextMenu(e, row);
    };

    return (
        <div className="table-responsive table-scroll-y table-collapse h-100">
            <Table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
                <thead className="header-sticky">
                    <tr className="text-muted fw-bolder fs-7 text-uppercase gs-0 border bg-pri">
                        {
                            columns?.map((column) => (
                                <th className={`text-uppercase fs-7 fw-bold text-dark cursor-pointer bg-pri text-center p-3 h-29 ${column?.className || ""}`}>
                                    {column?.title}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="text-gray fw-bold bg-white">
                    {data?.map((pItem: any, pIndex: number) => {
                        let headerValue = null;
                        if (collapseHeader.includes('.')) {
                            headerValue = collapseHeader.split('.').reduce((obj, key) => obj?.[key], pItem);
                        } else {
                            headerValue = pItem?.[collapseHeader];
                        }
                        return (
                            <tr>
                                <td colSpan={columns.length} className="p-0">
                                    <Accordion alwaysOpen defaultActiveKey={['0']}>
                                        <Accordion.Item eventKey={pIndex.toString()}>
                                            {headerValue && (
                                                <Accordion.Header>
                                                    <h6 className="m-0 ps-1">{headerValue}</h6>
                                                </Accordion.Header>
                                            )}
                                            <Accordion.Body className="p-0">
                                                <Table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer table-children">
                                                    <tbody>
                                                        {pItem?.[collapseBody] ? (
                                                            pItem[collapseBody].map((item: any, index: number) => (
                                                                <tr
                                                                    key={index}
                                                                    className={handleClickRow ? "clickable-row" : ""}
                                                                    onClick={() => handleClickRow && handleClickRow(item)}
                                                                >
                                                                    {columns?.map((column: any, cIndex: number) => (
                                                                        <td
                                                                            key={cIndex}
                                                                            className={`py-4 spaces h-29 text-system ${column?.className || ""} ${phieuHuy === item?.id ? "text-decoration-line-through" : ""}`}
                                                                            onContextMenu={(e) => handleCustomContextMenu(e, item)}
                                                                        >
                                                                            {column?.render ? column.render() : renderFieldValue(item, column?.field)}
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                {columns?.map((column: any, cIndex: number) => (
                                                                    <td
                                                                        key={cIndex}
                                                                        className={`py-4_5 spaces text-system ${column?.className || ""}`}
                                                                        onContextMenu={(e) => handleCustomContextMenu(e, pItem)}
                                                                    >
                                                                        {column?.render ? column.render() : renderFieldValue(pItem, column?.field)}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </td>
                            </tr>
                        );
                    })}
                    {data?.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="text-center">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export { TableCollapse };
