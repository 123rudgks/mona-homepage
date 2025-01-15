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
import Toast from '@/components/Toast/Toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { authFetch } from '@/utils/apis';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const [patents, setPatents] = useState<
    Array<{
      id: string;
      year: string;
      title: string;
    }>
  >([]);
  const postPatentsList = useCallback(async () => {
    const body = patents.map((item, idx) => ({
      seq: idx,
      year: item.year,
      content: item.title,
    }));
    const res = await authFetch(`/api/patents`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res?.json();
    if (data?.code === 200) {
      toast(({ toastProps }) => (
        <Toast
          type="success"
          message={'저장되었습니다.'}
          onClose={() => {
            toastProps.onClose &&
              toastProps.onClose({
                id: toastProps.toastId,
              });
          }}
        />
      ));
    }
  }, [patents]);
  useEffect(() => {
    const getPatentsList = async () => {
      const res = await authFetch(`/api/patents`);
      const data = await res?.json();
      if (data) {
        const sortedData = data.data.sort(
          (a: { seq: number }, b: { seq: number }) => a.seq - b.seq,
        );
        setPatents(
          sortedData.map((item: any) => {
            return {
              id: 'PATENT_ROW_' + item.seq,
              year: item.year,
              title: item.content,
            };
          }),
        );
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
          <div className="flex gap-6">
            <Button
              variant={'outline'}
              size={'lg'}
              theme={'primary'}
              className="w-[125px] rounded-full"
              onClick={() => {
                setPatents((prev) => {
                  return [
                    ...prev,
                    {
                      id: 'PATENT_ROW_' + (prev.length + 1),
                      year: new Date().getFullYear().toString(),
                      title: '',
                    },
                  ];
                });
              }}>
              <div className="flex gap-1 items-center">
                정보 추가
                <PlusSmall />
              </div>
            </Button>
            <Button
              variant={'primary'}
              size={'lg'}
              theme={'primary'}
              className="w-[100px] rounded-full"
              onClick={() => {
                postPatentsList();
              }}>
              저장
            </Button>
          </div>
        </div>
        <div className={cn('max-w-[1430px] w-full')}>
          <ContentBox title={'특허 정보 편집'} label={'투자정보'}>
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
                    <PatentRow
                      title={_.title}
                      year={_.year}
                      id={_.id}
                      onDelete={() => {
                        setPatents((prev) => {
                          return prev.filter((item) => item.id !== _.id);
                        });
                      }}
                      onChange={(newRow) => {
                        setPatents((prev) => {
                          return prev.map((item) => {
                            if (item.id === newRow.id) {
                              return newRow;
                            }
                            return item;
                          });
                        });
                      }}
                    />
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
