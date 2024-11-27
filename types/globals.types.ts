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
