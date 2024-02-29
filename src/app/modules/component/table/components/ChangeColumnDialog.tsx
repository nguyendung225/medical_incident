import { Modal, Button } from "react-bootstrap";
import { ColumnInstance } from "react-table";
import { useIntl } from "react-intl";
interface Iprops {
  handleClose: () => void;
  allColumns: ColumnInstance[];
}
const ChangeColumnDialog = (props: Iprops) => {
  const { handleClose, allColumns } = props;
  const hideableColumns = allColumns.filter(
    (column: ColumnInstance) => !(column.id === "selection")
  );
  const handleSetDefaultColumn = () => {
    hideableColumns.map((column: ColumnInstance) => {
      if (!column.isVisible) column.toggleHidden();
    });
  };
  const intl = useIntl();

  return (
    <>
      <Modal show={true} onHide={handleClose} centered size={"sm"}>
        <Modal.Header closeButton className='header-modal'>
          <Modal.Title className="text-pri ">Tùy chỉnh cột</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {hideableColumns.map((column: ColumnInstance) => (
            <div key={column.id} onClick={() => {}}>
              <label>
                <input
                  type="checkbox"
                  className="check-box-row"
                  {...column.getToggleHiddenProps()}
                />{" "}
                {intl.formatMessage({ id: column.id })}
              </label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            type="submit"
            className="btn-navy"
            onClick={handleSetDefaultColumn}
          >
            {intl.formatMessage({ id: "BTN.DEFAULT" })}
          </Button>
          <Button
            className="btn-navy-outlined min-w-80px"
            onClick={handleClose}
          >
            {intl.formatMessage({ id: "BTN.SAVE" })}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ChangeColumnDialog };
