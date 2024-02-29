export const TOKEN = "TOKEN";

export const REGEX = {
  TEN: /^[^~`!@#$%^&*()+=\-[\]\\';,/{}|\\":<>?\d]+$/,
  AZ_09: /^[a-zA-Z0-9]*$/,
  CHARACTER20: /^.{6,20}$/,
  CHARACTER9or12: /^\d{9}(\d{3})?$/,
  CHARACTER50: /^.{1,50}$/,
  CHARACTER255: /^.{1,255}$/,
  CHECK_PHONE: /^(0|\+84)\d{9,10}$/,
  YEAR: /^.{4,5}$/,
};
export const NUMBER_EXCEPT_THIS_SYMBOLS = ["e", "E", "+", "-", "."];
export const TITLE_TYPE = 2;
export const POSITION_TYPE = 3;
export const STATUS_TYPE = 4;

export const CODE = {
  SUCCESS: 200,
  ISE: 500,
};
export const ERROR_MESSAGE = "Có lỗi xảy ra, vui lòng thử lại!";

export const KEY = {
  ENTER: "Enter",
  SPACE: "Space",
};

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TOTAL_PAGES = 0;
export const DEFAULT_TOTAL_ELEMENTS = 0;
export const MAX_PAGE_SIZE = 99999;

export const SEARCH_OBJECT_MAX_SIZE = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: MAX_PAGE_SIZE,
};

export const SELECTION_MODE = {
  SINGLE: "single",
  MULTI: "multi",
  SINGLE_NO_RADIO_BUTTON: "singleNoRadioButton",
};

export const RESPONSE_MESSAGE = {
  ADD: {
    SUCCESS: "Thêm thành công",
  },
  UPDATE: {
    SUCCESS: "Cập nhật thành công",
  },
  DELETE: {
    SUCCESS: "Xóa thành công",
  },

  ERROR: "Xảy ra lỗi, vui lòng thử lại",
};

export const STATUS_ACTION = {
  VIEW: "VIEW",
  EDIT: "EDIT",
  DELETE: "DELETE",
  IMPORT: "IMPORT",
};

export enum TYPE_INPUT {
  STRING = "string",
  NUMBER = "number",
  OBJECT = "object",
}
