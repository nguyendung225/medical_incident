import { FC } from "react";
import { useIntl } from "react-intl";
import "./style.scss"
interface Iprops {
  type: string;
  handleClose?: () => void;
  handleSaveEdit?: () => void;
  handleSubmit?:  (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  value?: any;
}
const GroupButton: FC<Iprops> = (props) => {
  const { type, handleClose, handleSaveEdit, handleSubmit, value } = props;
  const intl = useIntl();
  return (
    <div>
      {type === "btn-back" ? (
        <div className="d-flex align-items-center cursor-pointer" onClick={handleClose}>
          <i className="bi bi-arrow-bar-left fs-2 me-2 text-primary "></i>
          <span className="fs-3 fw-bold">
            {intl.formatMessage({ id: "AUTH.GENERAL.BACK_BUTTON" })}
          </span>
        </div>
      ) : type === "btn-edit" ? (
        <div className="d-flex  gap-4">
          <button className="button-primary" onClick={handleSaveEdit}>
            <i className="bi-pencil fs-4 me-4"></i>
            {intl.formatMessage({ id: "BTN.EDIT" })}
          </button>
        </div>
      ) : (
        <div className="d-flex gap-2">
          <button type="submit" className="button-primary" onClick={(e: any) => handleSubmit && handleSubmit(value)}>
            {intl.formatMessage({ id: "BTN.SAVE" })}
          </button>
        </div>
      )}
    </div>
  );
};
export { GroupButton };
