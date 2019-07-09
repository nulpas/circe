import { OptionDropdownIcon } from '@lunaeme/circe-core';

export interface FromDropdownOption {
  id: string | number;
  label?: string;
  color?: string;
  icon?: OptionDropdownIcon;
}

export interface DropdownConfig {
  width?: number | string;
  elementReference?: Element;
  menu?: boolean | DropdownMenuConfig;
}

export interface DropdownMenuConfig {
  left?: boolean | number | string;
  right?: boolean | number | string;
}

export const keysToManageDropdown: Array<string> = ['ArrowDown', 'ArrowUp', 'Escape', 'Tab', 'Enter', ' '];
export const keysToShowDropdown: Array<string> = ['ArrowDown', 'ArrowUp', ' '];
