export interface OptionSelect {
  id: number;
  name: string;
}

export const InitOptionSelect: OptionSelect = {
} as OptionSelect;
export interface OptionReactSelect {
  code?: string | number;
  name?: string;
  value?: string | number;
  bacLuong?: string | number;
  heSoLuong?: string | number;
  id?: string;
  scategoryId?: string | number;
  attributeId?: string | number;
}
export const InitOptionReactSelect: OptionReactSelect = {
} as OptionReactSelect;
export interface APIResponse {
  timestamp: string;
  code: number;
  message: string;
  data: {
    content: [];
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
  };
  total: number;
}

export interface IErrorResponse {
  errorMessage: string;
};
