import { localStorageItem } from "../../utils/LocalStorage";

const RESPONSE_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
}

const KEY_LOCALSTORAGE = {
  AUTH: "auth",
  ACCESS_TOKEN_DECODE: "access-token-decode",
  TOKEN_EXPIRATION: "token-expiration",
  DEPARTMENT: "department",
  ROOM: "room",
  AUTH_LOCAL_STORAGE_KEY :'kt-auth-react-v',
  LIST_SUB_MENU: 'listSubMenu',
  LIST_CHUC_VU: 'listChucVu',
  LIST_CHUC_DANH: 'listChucDanh',
  LIST_PHONG_BAN: 'listPhongBan',
  LIST_BENH_NHAN: 'listBenhNhan',
  LIST_NHAN_VIEN: 'listNhanVien',
}

const AUTHORIZE_REQUEST = `${process.env.REACT_APP_SSO_AUTHORIZE_ENDPOINT}?response_type=${process.env.REACT_APP_SSO_RESPONSE_TYPE}&scope=${process.env.REACT_APP_SSO_SCOPE}&client_id=${process.env.REACT_APP_SSO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URI}`;

export { RESPONSE_STATUS_CODE, KEY_LOCALSTORAGE, AUTHORIZE_REQUEST }
