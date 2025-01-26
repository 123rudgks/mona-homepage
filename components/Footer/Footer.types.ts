import { HeaderMenu } from '@/components/Header/Header.types';

export interface FooterNavMenu {
  darkMode?: boolean;
  title?: string;
  menu?: { label?: string; text: string[]; path: string[] }[];
  headerMenu?: HeaderMenu;
}
