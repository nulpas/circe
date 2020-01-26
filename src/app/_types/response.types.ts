export interface MenuGroup {
  id: string;
  name: string;
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
