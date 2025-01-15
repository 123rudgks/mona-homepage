'use client';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { authFetch } from '@/utils/apis';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const router = useRouter();
  const [patents, setPatents] =
    useState<Array<{ seq: number; year: string; content: string }>>();
  useEffect(() => {
    const getPatentsList = async () => {
      const res = await authFetch(`/api/patents`);
      const data = await res?.json();
      if (data) {
        const sortedData = data.data.sort(
          (a: { seq: number }, b: { seq: number }) => a.seq - b.seq,
        );
        setPatents(sortedData);
      }
    };
    getPatentsList();
  }, []);
  return (
    <main>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>

      <ContentSection>
        <div
          className={cn(
            'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end',
          )}>
          <Button
            variant={'outline'}
            size={'lg'}
            theme={'primary'}
            className="w-[100px] rounded-full"
            onClick={() => {
              router.push(`/admin/promotion-center/investment-info/edit`);
            }}>
            편집
          </Button>
        </div>
        <div className={cn('max-w-[1430px] w-full')}>
          <ContentBox title={currentMenu.text} label={'투자정보'}>
            <div className="">
              {patents?.map((_, idx) => (
                <InvestmentRow key={_.seq} year={_.year} content={_.content} />
              ))}
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

const InvestmentRow = ({
  year,
  content,
}: {
  year: string;
  content: string;
}) => {
  return (
    <div className="flex gap-[30px] py-6 border-b border-blackAlpha-10">
      <span className="typo-BodyLargeRegular">{year}</span>
      <span className="typo-BodyLargeBold">{content}</span>
    </div>
  );
};

export default Page;
