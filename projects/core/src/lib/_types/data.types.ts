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
 * Object definition to get element from dom using BoxModel core service methods.
 */
export type SelectDomElementHashTypeClass = 'class';
export type SelectDomElementHashTypeTag = 'tag';
export type SelectDomElementHashTypeId = 'id';
export type SelectDomElementHashType = SelectDomElementHashTypeClass | SelectDomElementHashTypeTag | SelectDomElementHashTypeId;
export interface SelectDomElementHash {
  type: SelectDomElementHashType;
  name: string;
  shadowElement?: Element;
}

/**
 * @description
 * Interface and variable to define SelectDomElementHash types.
 */
export interface SelectDomElementHashTypeDefinition {
  CLASS: SelectDomElementHashTypeClass;
  TAG: SelectDomElementHashTypeTag;
  ID: SelectDomElementHashTypeId;
}
export const selectDomElementHashTypeDefinitionConstants: SelectDomElementHashTypeDefinition = {
  CLASS: 'class',
  TAG: 'tag',
  ID: 'id'
};

/**
 * @description
 * Interface and variable to define SelectDomElementHash params.
 */
export interface SelectDomElementHashDefinition {
  TYPE: 'type';
  NAME: 'name';
  SHADOW_ELEMENT: 'shadowElement';
}
export const selectDomElementHashDefinitionConstants: SelectDomElementHashDefinition = {
  TYPE: 'type',
  NAME: 'name',
  SHADOW_ELEMENT: 'shadowElement'
};

/**
 * @description
 * Interfaces for definition of options inputs in several components.
 */
export interface OptionForSelect {
  value: string | number;
  label?: string;
  color?: string;
  icon?: OptionDropdownIcon;
}
export interface OptionForMenu {
  key: string | number;
  label?: string;
  color?: string;
  icon?: OptionDropdownIcon;
}
export interface OptionDropdownIcon {
  class: string;
  iconFontClass?: string;
  color?: string;
}
