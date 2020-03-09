export type ElementHashTypeClass = 'class';
export type ElementHashTypeTag = 'tag';
export type ElementHashTypeId = 'id';
export type ElementHashType = ElementHashTypeClass | ElementHashTypeTag | ElementHashTypeId;

export interface ElementHash {
  name: string;
  type: ElementHashType;
}
export interface ElementQuery {
  query: string;
}
export type ElementDefinition = string | ElementHash | ElementQuery | Element;
export interface ElementHashComplex extends ElementHash {
  shadowElement?: ElementDefinition;
}
export interface ElementQueryComplex extends ElementQuery {
  shadowElement?: ElementDefinition;
}
export type ElementDefinitionComplex = string | ElementHashComplex | ElementQueryComplex | Element;

// ###### CONSTANTS ######
interface ElementHashTypeDefinition {
  CLASS: ElementHashTypeClass;
  TAG: ElementHashTypeTag;
  ID: ElementHashTypeId;
}
export const elementHashTypeDefinitionConstants: ElementHashTypeDefinition = {
  CLASS: 'class',
  TAG: 'tag',
  ID: 'id'
};

interface ElementFields {
  NAME: 'name';
  TYPE: 'type';
  QUERY: 'query';
  SHADOW_ELEMENT: 'shadowElement';
}
export const elementFieldsConstants: ElementFields = {
  NAME: 'name',
  TYPE: 'type',
  QUERY: 'query',
  SHADOW_ELEMENT: 'shadowElement'
};
