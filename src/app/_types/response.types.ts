export interface MenuGroup {
  id: string;
  name: string;
  order: boolean;
  options: Array<MenuOption>;
}

export interface MenuOption {
  id: string;
  name: string;
  location: Array<string>;
  parent?: string;
}

export interface IconSectionsRequest {
  isIconSections: boolean;
  iconSections: Array<IconSection>;
}

export interface IconSection {
  id: string;
  name: string;
}

export interface Icon {
  code: string;
  content: string;
  sections: Array<string>;
}

export interface CheckToken {
  status: boolean;
}

export interface Login {
  token: string;
}

export interface ResponseError {
  value: string;
  msg: string;
  param: string;
  location: string;
  code: number;
}
