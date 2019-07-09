export interface StandardKeyValueObject {
  key: number | string;
  value: any;
}

export type SelectDomElementObjectType = 'class' | 'tag' | 'id';
export interface SelectDomElementObject {
  type: SelectDomElementObjectType;
  name: string;
  shadowElement?: Element;
}

export const domElementTypeConstants = {
  CLASS: 'class' as SelectDomElementObjectType,
  TAG: 'tag' as SelectDomElementObjectType,
  ID: 'id' as SelectDomElementObjectType
};

export const selectDomElementParams = {
  TYPE: 'type',
  NAME: 'name',
  SHADOW_ELEMENT: 'shadowElement'
};
