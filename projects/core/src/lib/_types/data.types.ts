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
