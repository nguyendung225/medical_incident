import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { STATUS_ACTION } from "../../utils/Constant";
type Props = {
  handleSelectAction: Function;
  isDelete?: boolean;
  isView?: boolean;
  isEdit?: boolean;
  isImport?: boolean;
  data: any;
};

export default function ActionTable({ handleSelectAction, data, isDelete, isView, isEdit, isImport }: Props) {
  return (
    <div className="d-flex justify-content-center gap-4">
      {isView && (
        <OverlayTrigger overlay={<Tooltip className="tooltip">Xem chi tiết</Tooltip>}>
          <i
            onClick={() => handleSelectAction(data, STATUS_ACTION.VIEW)}
            className="bi bi-eye-fill text-primary"
          ></i>
        </OverlayTrigger>
      )}

      {isDelete && (
        <OverlayTrigger overlay={<Tooltip className="tooltip">Xóa</Tooltip>}>
          <i
            onClick={() => handleSelectAction(data, STATUS_ACTION.DELETE)}
            className="bi bi-trash3-fill text-danger"
          ></i>
        </OverlayTrigger>
      )}

      {isImport && (
        <OverlayTrigger overlay={<Tooltip className="tooltip">Nhập</Tooltip>}>
          <i
            onClick={() => handleSelectAction(data, STATUS_ACTION.IMPORT)}
            className="bi bi-box-arrow-in-right text-navy"
          ></i>
        </OverlayTrigger>
      )}

      {isEdit && (
        <OverlayTrigger overlay={<Tooltip className="tooltip">Sửa</Tooltip>}>
          <i
            onClick={() => handleSelectAction(data, STATUS_ACTION.EDIT)}
            className="bi bi-pencil-square text-navy"
          ></i>
        </OverlayTrigger>
      )}
    </div>
  );
}
