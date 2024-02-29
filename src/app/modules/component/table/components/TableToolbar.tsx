import { Col, Row } from "react-bootstrap";
import { ChangeColumnDialog } from "./ChangeColumnDialog";
import { useState } from "react";
import { useIntl } from "react-intl";
import clsx from "clsx";
import React from "react";
interface TableCustomToolbarProps {
  selectedRows: any;
  allColumns: any;
  data?: {};
  handleUnSelectedRows: (selectedRow:any) => void;
  setShouldOpenFilterSearch: React.Dispatch<React.SetStateAction<boolean>>;
  shouldOpenFilterSearch: boolean;
  selectedLabel?: boolean;
}
const TableCustomToolbar = (props: TableCustomToolbarProps) => {
  const intl = useIntl();
  const {
    selectedRows,
    allColumns,
    data,
    handleUnSelectedRows,
    setShouldOpenFilterSearch,
    shouldOpenFilterSearch,
    selectedLabel,
  } = props;
  const [shouldOpenChangeColumnDialog, setShouldOpenChangeColumnDialog] = useState<boolean>(false);
  return (
    <div className="table-toolbar rounded-top p-2">
      <Row>
        <Col xs={10} className="d-flex gap-4 align-items-center">
          {selectedLabel && <>
            <span>
              {intl.formatMessage({ id: "SELECTED" })}: <strong>{selectedRows.length}</strong>
            </span>
            {selectedRows.length > 0 && (
              <>
                <span className="fw-bold text-warning cursor-pointer" onClick={handleUnSelectedRows}>
                  {intl.formatMessage({ id: "UNSELECTED" })}
                </span>
              </>
            )}
          </>}
        </Col>
        <Col xs={2} className="flex-end d-flex gap-4">
          <i
            className={clsx("bi bi-funnel toolbar-icon fs-4", {
              "filter-open": shouldOpenFilterSearch,
            })}
            onClick={() => {
              setShouldOpenFilterSearch((prevState: boolean) => !prevState);
            }}
          ></i>
          <i
            className={clsx("bi bi-gear toolbar-icon fs-4", {
              "filter-open": shouldOpenChangeColumnDialog,
            })}
            onClick={() => {
              setShouldOpenChangeColumnDialog(true);
            }}
          ></i>
        </Col>
      </Row>
      {shouldOpenChangeColumnDialog && (
        <ChangeColumnDialog
          allColumns={allColumns}
          handleClose={() => {
            setShouldOpenChangeColumnDialog(false);
          }}
        />
      )}
    </div>
  );
};

export { TableCustomToolbar };
