export interface IDropdownProps {
  label: string;
  placeholder: string;
  options: any[];
  multiple?: any;
}

export interface IDropdownState {
  values: any[];
  focusedValue: number;
  isFocused: boolean;
  isOpen: boolean;
  typed: string;
}

// dropdown interface

export interface IPagination {
  pageSize?: number;
  totalCount: number;
  currentPage: number;
  returnCurrentPage: Function;
}

// Pagination interface
