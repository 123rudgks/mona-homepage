export interface HeaderNavMenu {
  darkMode?: boolean;
  menus: { label?: string; text: string[]; path: string[] }[];
}

export interface HeaderMenu {
  category: string;
  categoryPath: string;
  menus: {
    label?: string;
    text: string[];
    path: string[];
  }[];
}
