import { FC } from "react";
import { useIntl } from "react-intl";
interface Iprops {
  type: string;
  handleClose?: () => void;
  handleSaveEdit?: () => void;
}
const GroupButton: FC<Iprops> = (props) => {
  const { type, handleClose, handleSaveEdit } = props;
  const intl = useIntl();
  return (
    <>
      {type === "btn-back" ? (
        <div className="d-flex align-items-center cursor-pointer" onClick={handleClose}>
          <i className="bi bi-arrow-bar-left fs-2 me-5 text-primary "></i>
          <span className="fs-3 fw-bold text-primary">
            {intl.formatMessage({ id: "AUTH.GENERAL.BACK_BUTTON" })}
          </span>
        </div>
      ) : type === "btn-edit" ? (
        <div className="d-flex  gap-4">
          <button className="btn btn-primary btn-sm btn-sm" onClick={handleSaveEdit}>
            <i className="bi bi-pencil fs-4 me-5 text-light"></i>
            {intl.formatMessage({ id: "BTN.EDIT" })}
          </button>
          <i className={"bi bi-three-dots-vertical toolbar-icon fs-4"}></i>
        </div>
      ) : (
        <div className="d-flex gap-2">
          <button className="btn btn-secondary btn-sm btn-sm" onClick={handleClose} >
            {intl.formatMessage({ id: "BTN.CANCEL" })}
          </button>
          <button className="btn btn-primary btn-sm btn-sm" onClick={handleSaveEdit}>
            {intl.formatMessage({ id: "BTN.SAVE" })}
          </button>
        </div>
      )}
    </>
  );
};
export { GroupButton };
