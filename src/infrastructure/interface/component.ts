export interface IDropdownProps {
  label: string;
  placeholder: string;
  options: any[];
  multiple?: any;
}

interface IDropdownState {
  values: any[];
  focusedValue: number;
  isFocused: boolean;
  isOpen: boolean;
  typed: string;
}

// dropdown interface
