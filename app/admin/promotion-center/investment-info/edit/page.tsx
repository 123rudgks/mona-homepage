'use client';
import PlusSmall from '@/app/svgs/admin/PlusSmall.svg';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import {
  PatentContainer,
  PatentDropRow,
  PatentRow,
} from '@/components/PatentDnD';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { useState } from 'react';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const [patents, setPatents] = useState<
    Array<{
      id: string;
      year: number;
      title: string;
    }>
  >([
    {
      id: 'PATENT_ROW_0',
      year: 2024,
      title:
        '배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를 접목한 진단모델 개발배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를 접목한 진단모델 개발배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를 접목한 진단모델 개발',
    },
    {
      id: 'PATENT_ROW_1',
      year: 2023,
      title:
        '배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를 접목한 진단모델 개발',
    },
    {
      id: 'PATENT_ROW_2',
      year: 2022,
      title:
        '배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를 접목한 진단모델 개발',
    },
    {
      id: 'PATENT_ROW_3',
      year: 2021,
      title:
        '배터리/연료전지 시스템에 적용을 위한 임피던스 모듈 및 AI를 접목한 진단모델 개발',
    },
  ]);

  return (
    <main>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>

      <ContentSection>
        <div
          className={cn(
            'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end',
          )}>
          <div className="flex gap-6">
            <Button
              variant={'outline'}
              size={'lg'}
              theme={'primary'}
              className="w-[125px] rounded-full">
              <div className="flex gap-1 items-center">
                정보 추가
                <PlusSmall />
              </div>
            </Button>
            <Button
              variant={'primary'}
              size={'lg'}
              theme={'primary'}
              className="w-[100px] rounded-full">
              저장
            </Button>
          </div>
        </div>
        <div className={cn('max-w-[1430px] w-full')}>
          <ContentBox
            title={'특허 정보 편집'}
            label={'투자정보'}
            subTitle={'subTitle'}>
            <PatentContainer>
              <div className="flex flex-col gap-3">
                {patents.map((_, idx) => (
                  <PatentDropRow
                    key={_.id}
                    onDrop={(draggedId) => {
                      setPatents((prev) => {
                        let tempPatents = [...prev];
                        const draggedIdx = tempPatents.findIndex(
                          (item) => item.id === draggedId,
                        );
                        const droppedIdx = tempPatents.findIndex(
                          (item) => item.id === _.id,
                        );
                        [tempPatents[draggedIdx], tempPatents[droppedIdx]] = [
                          tempPatents[droppedIdx],
                          tempPatents[draggedIdx],
                        ];
                        return tempPatents;
                      });
                    }}>
                    <PatentRow title={_.title} year={_.year} id={_.id} />
                  </PatentDropRow>
                ))}
              </div>
            </PatentContainer>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

export default Page;
