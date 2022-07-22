export interface IDropdownProps {
  placeholder: string;
  options: any[];
  multiple?: any;
  onChange: FunctionStringCallback;
}
// dropdown props interface

export interface IDropdownState {
  values: any[];
  focusedValue: number;
  isFocused: boolean;
  isOpen: boolean;
  typed: string;
}

// dropdown state interface

export interface IPagination {
  pageSize?: number;
  totalCount: number;
  currentPage: number;
  returnCurrentPage: Function;
}

// Pagination props interface

export interface ISearchBox {
  value: string;
  placeholder?: string;
  onChange: Function;
}

// SearchBox props interface

export interface IButton {
  label: string;
  className?: string;
  onClick: Function;
}

// Pagination interface
