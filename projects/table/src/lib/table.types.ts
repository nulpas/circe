import { StandardKeyValueObject } from '@lunaeme/circe-core';


export interface TableConfig {
  title: string;
  tableData: Array<DataConfig>;
  showHeader?: boolean;
  headerStyle?: string;
  dropdownRow?: DropdownRowConfig;
  selection?: SelectionObject;
}

export interface DataConfig {
  id?: string | number;
  label: string;
  param: string;
  icon?: string;
  type?: 'radio' | 'select' | 'iconAction';
  colorLabel?: boolean;
  colorLabelParam?: string;
  colorLabelMap?: any;
  iconAction?: IconActionObject;
  sourceOptions?: SelectSourceOptions;
  selection?: string;
  rounded?: boolean;
  noOrder?: boolean;
  noHeadLabel?: boolean;
  orderDesc?: boolean;
  showOrderArrow?: boolean;
  widthColumn: number;
  isComplexArray?: IsComplexArrayObject;
}

export interface IsComplexArrayObject {
  complexParam: string;
}

export interface IconActionObject {
  type: IconAction;
  icon: string;
  iconClass?: string;
}
export type IconAction = 'edit' | 'delete';
export interface IconActionEvent {
  type: IconAction;
  element: any;
}

export interface SelectSourceOptions {
  selectKeyIdentification: string;
  param?: string;
  endPoint?: string;
  list?: Array<any>;
  default?: DefaultSelectSourceOptions;
}

export interface DefaultSelectSourceOptions {
  defined?: any;
  param?: string;
}

export interface DropdownRowConfig {
  caption: string;
  param: string;
  content?: Array<DropdownRowContent>;
  exclusionParams?: Array<string>;
}

export interface DropdownRowContent {
  label: string;
  param: string;
  rounded?: boolean;
}

export interface SelectionObject {
  selectAll?: boolean;
  fieldToSelect?: string;
}

export interface WithAddsObject {
  dropdown: number;
  selection: number;
}

export interface ColumnSelectTypeDataObject {
  field: string;
  selections: Array<SelectionTypeDataObject>;
}

export interface SelectionTypeDataObject {
  key: string | number;
  selection: string | object;
  selectionSource: Array<StandardKeyValueObject>;
}
