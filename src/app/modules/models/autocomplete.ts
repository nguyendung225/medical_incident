import React from "react";
import { MenuPlacement } from "react-select";


export interface AutoCompleteProps {
  options: any[];
  isClearable?: boolean;
  isYeuCauKham?: boolean;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => string;
  searchFunction?: (searchObject: any) => Promise<any> | null | 0 | undefined;
  searchObject?: any | undefined;
  onChange?: (selectedOption: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  className?: string;
  name?: string;
  id?: string;
  key?: string;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  backspaceRemovesValue?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  minMenuHeight?: number;
  maxMenuHeight?: number;
  placeholder?: string;
  setSelectedVal?: any
  value?: any;
  valueField?: string;
  dependencies?: any[];
  touched?: any;
  errors?: any;
  disabled?: boolean;
  handleClearValue?: any;
  urlData?: string;
  showCode?: boolean;
  displayLable?: string;
  menuPortalTarget?: any;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
  defaultValue?: any;
  menuPlacement?: MenuPlacement | undefined;
  styles?: any;
  isReadOnly?: boolean;
  isSrcoll?: boolean;
  labelSearch?: string;
}

export interface AutoCompletePropsV2 {
  options: any[];
  isClearable?: boolean;
  isYeuCauKham?: boolean;
  getOptionLabel?: (option: any) => string;
  getOptionValue?: (option: any) => string;
  searchFunction?: (searchObject: any) => Promise<any> | null | 0 | undefined;
  searchObject?: any | undefined;
  onChange?: (selectedOption: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  className?: string;
  name: string;
  id?: string;
  key?: string;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  backspaceRemovesValue?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  minMenuHeight?: number;
  maxMenuHeight?: number;
  placeholder?: string;
  setSelectedVal?: any
  value?: any;
  valueField?: string;
  dependencies?: any[];
  touched?: any;
  errors?: any;
  disabled?: boolean;
  handleClearValue?: any;
  urlData?: string;
  showCode?: boolean;
  displayLable?: string;
  menuPortalTarget?: any;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
  defaultValue?: any;
  menuPlacement?: MenuPlacement | undefined;
  styles?: any;
  isReadOnly?: boolean;
  isSrcoll?: boolean;
  labelSearch?: string;
}