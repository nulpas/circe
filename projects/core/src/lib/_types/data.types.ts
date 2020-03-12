/**
 * @description
 * Common data structures:
 */
export type SimpleData = string | number | boolean;
export interface StandardKeyObject {
  [key: string]: Array<SimpleData> | SimpleData;
}
export type Standard2LevelArray = Array<SimpleData | Array<SimpleData>>;

/**
 * @description
 * Interface for use typical key/value object type.
 */
export interface StandardKeyValue {
  key: number | string;
  value: any;
}

/**
 * @description
 * Definitions for string transforms methods.
 */
export type StringTransformMethodStart = 'start';
export type StringTransformMethodCamel = 'camel';
export type StringTransformMethodKebab = 'kebab';
export type StringTransformMethods = StringTransformMethodStart | StringTransformMethodCamel | StringTransformMethodKebab;
export interface StringTransformMethodsConstants {
  START: StringTransformMethodStart;
  CAMEL: StringTransformMethodCamel;
  KEBAB: StringTransformMethodKebab;
}
export const stringTransformMethodsConstants: StringTransformMethodsConstants = {
  START: 'start',
  CAMEL: 'camel',
  KEBAB: 'kebab'
};

/**
 * @description
 * Interfaces for definition of options inputs in several components.
 */
export interface OptionForDropdown {
  value: string | number;
  label?: string;
  color?: string;
  icon?: OptionDropdownIcon;
  iconRight?: OptionDropdownIcon;
}
export interface OptionDropdownIcon {
  class: string;
  iconFontClass?: string;
  color?: string;
}
