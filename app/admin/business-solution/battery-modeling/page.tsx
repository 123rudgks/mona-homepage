'use client';
import QuillContentPage from '@/components/quill/QuillContentPage';
import { Language } from '@/types/globals.types';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  return QuillContentPage({ lang });
};

export default Page;
