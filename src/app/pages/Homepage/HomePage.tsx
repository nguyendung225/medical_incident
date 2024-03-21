import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import "./homepage.scss";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setSubMenu, useAuth } from "../../modules/auth";
import { hasAuthority } from "../../modules/utils/FunctionUtils";
import { MODULE, PERMISSIONS } from "../../Constant";
import { TYPE } from "../../modules/utils/Constant";
import useMultiLanguage from "../../hook/useMultiLanguage";

interface LinkBtnProps {
  linkTo: string;
  iconPath: string;
  text: string;
  modulePermission: string;
}

const countAuthorities = () => {
  const authorities = [
    hasAuthority(PERMISSIONS.MODULE, MODULE.HO_SO, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.CHAM_CONG, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.TUYEN_DUNG, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.TAI_LIEU, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.DAO_TAO, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.PHONG_HOP, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.CONG_VIEC, TYPE.MODULE),
    hasAuthority(PERMISSIONS.MODULE, MODULE.HE_THONG, TYPE.MODULE)
  ];

  const count = authorities.filter(authority => authority === true).length;
  return count;
}

const LinkButton = (props: LinkBtnProps) => {
  const { linkTo = "", iconPath, text } = props;

  let colSize = 12;
  switch (countAuthorities()) {
    case 8:
      colSize = 3;
      break;
    case 7:
      colSize = 3;
      break;
    case 6:
      colSize = 4;
      break;
    case 5:
      colSize = 3;
      break;
    case 4:
      colSize = 6;
      break;
    case 3:
      colSize = 6;
      break;
    case 2:
      colSize = 6;
      break;
    case 1:
      colSize = 12;
      break;
    default:
      colSize = 12;
      break;
  }

  return (
    <>
      {/* khi có phân quyền sẽ check */}
      {/* {hasAuthority(PERMISSIONS.MODULE, modulePermission, TYPE.MODULE) && ( */}
      <Col xs={12} sm={6} md={colSize} xl={colSize} className="flex flex-center">
        <Link to={linkTo} onClick={() => setSubMenu(linkTo)}>
          <div className="link-button-container">
            <button type="button" className="button-link">
              <div className="cirle-animation cirle-animation-1"></div>
              <div className="cirle-animation cirle-animation-2"></div>
              <KTSVG svgClassName="spaces w-36 h-36" path={toAbsoluteUrl(iconPath)} />
            </button>
            <span className="button-text">{text}</span>
          </div>
        </Link>
      </Col>
      {/* )} */}
    </>
  )
}

export function HomePage() {
  const { lang } = useMultiLanguage();
  const { logout } = useAuth();
  document.title = `${lang('SOFTWARE')}`;

  return (
    <div className="main">
      <div className="header">
        <div className="logo">
          {/* <Image src={toAbsoluteUrl("./media/logos/xHRM.svg")} /> */}
        </div>
        <div className="user">
          <div className="user-info">
            <span>{lang("GENERAL.HELLO")}</span>
            <h5>Nguyễn Xuân Bách</h5>
          </div>
          <div className="user-avatar">
            <img src={toAbsoluteUrl("./media/avatars/300-1.jpg")} alt="avatar" />
          </div>
          <div className="user-logout">
            <button type="button" onClick={logout}>{lang("LOGOUT")}</button>
          </div>
        </div>
      </div>
      <div className="z-100 main-content">
        <div className="body-container">
          <Row>
            <Col xs={12}>
              <h2 className="title-software">{"PHẦN MỀM QUẢN LÝ SCYK"}</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <LinkButton
                linkTo={"/ds-bao-cao-scyk"}
                iconPath="/media/svg/icons/warning-fill.svg"
                text={"Báo cáo SCYK"}
                modulePermission={MODULE.HO_SO}
              />
            </Col>
            <Col xs={4}>
              <LinkButton
                linkTo={"/bien-ban-xac-minh"}
                iconPath="/media/svg/icons/file-earmark-check-fill.svg"
                text={"Biên bản xác minh SCYK"}
                modulePermission={MODULE.HO_SO}
              />
            </Col>
            <Col xs={4}>
              <LinkButton
                linkTo={"/phan-tich-scyk"}
                iconPath="/media/svg/icons/info-square-fill.svg"
                text={"Phân tích SCYK"}
                modulePermission={MODULE.HO_SO}
              />
            </Col>
            <Col xs={4}>
              <LinkButton
                linkTo={"/bien-ban-hop"}
                iconPath="/media/svg/icons/folder-fill.svg"
                text={"Biên bản hop"}
                modulePermission={MODULE.HO_SO}
              />
            </Col>
            <Col xs={4}>
              <LinkButton
                linkTo={"/bien-ban-hop"}
                iconPath="/media/svg/icons/bookmark-fill.svg"
                text={"Báo cáo cục"}
                modulePermission={MODULE.HO_SO}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
