export interface StandardKeyValueObject {
  key: number | string;
  value: any;
}

export type SelectDomElementObjectType = 'class' | 'tag' | 'id';
export interface SelectDomElementObject {
  type: SelectDomElementObjectType;
  name: string;
}
