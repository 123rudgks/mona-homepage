export type Language = 'ko' | 'en';

export interface APIResponse<T> {
  message: string;
  data: T;
  code: number;
}

export interface InfosData {
  title: string;
  content: string;
}

export interface ArticleData {
  id: number;
  title: string;
  createdDate: string;
  content: string;
  thumbnail: string | null;
  reservedDate: string | null;
}
export interface ArticleDetailData {
  title: string;
  content: string;
  createdDate: string;
  thumbnail: string;
  reservedDate: string;
  prevId?: number;
  prevTitle?: string;
  prevCreatedDate?: string;
  nextId?: number;
  nextTitle?: string;
  nextCreatedDate?: string;
}
export interface PaginationMeta {
  totalElements: number;
  currentPage: number;
  totalPages: number;
  size: number;
}

export interface ContactData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  content: string;
}

export interface PartnerData {
  id: number;
  seq: number;
  url: string;
  partnerType: PartnerType;
}

export type PartnerType = 'tech' | 'business';