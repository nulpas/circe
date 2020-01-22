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
