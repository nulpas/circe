import { ElementIdSimple, OptionDropdownIcon } from '@lunaeme/circe-core';

export interface FromDropdownOption {
  id: string | number;
  label?: string;
  color?: string;
  icon?: OptionDropdownIcon;
  iconRight?: OptionDropdownIcon;
}

export interface DropdownConfig {
  width?: number | string;
  position?: DropdownPosition;
  elementReference?: Element;
  elementReferenceTest?: ElementIdSimple;
  autoPrettyLabels?: boolean;
  separators?: Array<number>;
  clickOutsideApply?: boolean;
}

export interface DropdownPosition {
  left?: boolean | number | string;
  right?: boolean | number | string;
  top?: boolean | number | string;
  bottom?: boolean | number | string;
  corrections?: DropdownPositionCorrection;
}
export interface DropdownPositionCorrection {
  horizontal?: number | string;
  vertical?: number | string;
}

export const keysToManageDropdown: Array<string> = ['ArrowDown', 'ArrowUp', 'Escape', 'Tab', 'Enter', ' '];
export const keysToShowDropdown: Array<string> = ['ArrowDown', 'ArrowUp', ' '];
