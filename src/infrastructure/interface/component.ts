export interface IDropdownProps {
  placeholder: string;
  options: any[];
  multiple?: any;
  value: any;
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
  total: number;
  current: number;
  pagination: Function;
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
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Pagination interface
