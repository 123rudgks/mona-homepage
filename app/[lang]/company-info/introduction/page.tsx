import Header from '@/components/Header/Header';
import { Language } from '@/types/globals.types';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  return (
    <div>
      <Header lang={lang} />
    </div>
  );
};

export default Page;
