'use client';
import QuillEditPage from '@/components/quill/QuillEditPage';
import { Language } from '@/types/globals.types';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  return <QuillEditPage lang={lang} />;
};

export default Page;
