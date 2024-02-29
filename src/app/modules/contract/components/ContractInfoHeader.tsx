import { FC } from "react";
import { Row, Col } from "react-bootstrap";
import { useIntl } from "react-intl";

import { IContractInfoDto } from '../services/models/IContract';
import { hasAuthority } from "../../utils/FunctionUtils";
import { PERMISSIONS, PERMISSION_ABILITY } from "../../../Constant";
interface Iprops {
  view: boolean;
  contractInfo: IContractInfoDto;
  handleClose: () => void;
  handleSave: () => void;
}
const ContractInfoHeader: FC<Iprops> = (props) => {
  const { view, contractInfo, handleSave,handleClose } = props;
  const intl = useIntl();
  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="profile-title">
            {view && (
              <>
                <div className="d-flex align-items-center cursor-pointer" onClick={handleClose}>
                  <i className="bi bi-arrow-bar-left fs-2 me-5 text-primary "></i>
                  <span className="fs-3 fw-bold text-primary">
                    {intl.formatMessage({ id: "AUTH.GENERAL.BACK_BUTTON" })}
                  </span>
                </div>
                <div className="d-flex  gap-4">
                  <button className="btn btn-primary btn-sm btn-sm" onClick={handleSave}>
                    <i className="bi bi-pencil fs-4 me-5 text-light"></i>
                    {intl.formatMessage({ id: "BTN.EDIT" })}
                  </button>
                  <i className={"bi bi-three-dots-vertical toolbar-icon fs-4"}></i>
                </div>
              </>
            )}
            {!contractInfo.soHopDong && (
              <>
                {hasAuthority(PERMISSIONS.HOP_DONG, PERMISSION_ABILITY.UPDATE) &&
                  <span className="fs-3 fw-bold">
                    {intl.formatMessage({ id: "CONTRACT.ADD" })}
                    <i className="bi bi-three-dots-vertical"></i>
                  </span>
                }
                <div className="d-flex gap-2">
                  <button className="btn btn-secondary btn-sm btn-sm">
                    {intl.formatMessage({ id: "BTN.CANCEL" })}
                  </button>
                  <button className="btn btn-primary btn-sm btn-sm">
                    {intl.formatMessage({ id: "BTN.SAVE" })}
                  </button>
                </div>
              </>
            )}
            {contractInfo.soHopDong && !view && (
              <>
                <div className="d-flex align-items-center cursor-pointer" onClick={handleSave}>
                  <i className="bi bi-arrow-bar-left fs-2 me-5 text-primary "></i>
                  <span className="fs-3 fw-bold text-primary">
                    {intl.formatMessage({ id: "AUTH.GENERAL.BACK_BUTTON" })}
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-secondary btn-sm btn-sm" onClick={handleSave}>
                    {intl.formatMessage({ id: "BTN.CANCEL" })}
                  </button>
                  <button className="btn btn-primary btn-sm btn-sm">
                    {intl.formatMessage({ id: "BTN.SAVE" })}
                  </button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
export { ContractInfoHeader };
