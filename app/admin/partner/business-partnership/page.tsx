'use client';
import Trash from '@/app/svgs/admin/Trash.svg';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language, PartnerData } from '@/types/globals.types';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import PlusSmall from '@/app/svgs/admin/PlusSmall.svg';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { authFetch } from '@/utils/apis';


type Props = {};
const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang, admin: true });
  const [isEdit, setIsEdit] = useState(false);
  const [logos, setLogos] = useState<
    Array<PartnerData>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onSave = async () => {
    const savedLogos = logos.filter(logo => !logo.url.includes('blob:'));
    const unSavedLogos = logos.filter(logo => logo.url.includes('blob:'));
    let uploadedLogos: PartnerData[] = [];
    if (unSavedLogos.length > 0) {
      const formData = new FormData();

      // forEach 대신 Promise.all과 map 사용
      await Promise.all(
        unSavedLogos.map(async (logo) => {
          const imgRes = await fetch(logo.url);
          const imgFile = await imgRes.blob();
          formData.append('images', imgFile);
        })
      );

      // 모든 이미지가 formData에 추가된 후 실행
      const res = await authFetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res?.json();
      if (data.code === 200) {
        uploadedLogos = unSavedLogos.map((logo, idx) => {
          const url = data.data[idx];
          return { ...logo, url };
        })
      } else {
        alert('이미지 업로드 실패');
      }
    }
    try {
      savedLogos.push(...uploadedLogos);

      // 모든 이미지 업로드가 완료된 후 savedLogos를 서버에 전송
      const response = await authFetch('/api/partners/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedLogos.map((logo, idx) => ({ seq: idx + 1, url: logo.url }))),
      });

      if (!response?.ok) {
        throw new Error('Failed to save logos');
      }
      const data = await response.json();
      if (data) {
        console.log(data);
      }

      // 성공 처리 (예: 상태 업데이트, 알림 표시 등)
    } catch (error) {
      // 에러 처리
      alert('이미지 업로드 실패');
      console.error('Error during upload:', error);
    }
    setIsEdit(false);
    window.location.reload();
  }
  const handleAddLogo = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일을 로고 배열에 추가하는 로직
      const newLogo = {
        id: Date.now(), // 임시 ID
        url: URL.createObjectURL(file), // 임시 URL 생성
      };
      setLogos(prev => [...prev, { seq: prev.length + 1, partnerType: 'business', ...newLogo }]);
    }
    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  useEffect(() => {
    const getLogos = async () => {
      const res = await fetch(`/api/partners/business`);
      const data = await res?.json();
      if (data) {
        const sortedData: Array<PartnerData> = data.data.sort(
          (a: { seq: number }, b: { seq: number }) => a.seq - b.seq,
        );
        setLogos(sortedData);
      }
    };
    getLogos();
  }, []);
  return (
    <main>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>

      <ContentSection >
        <div
          className={cn('lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end')}>
          {isEdit ? (
            <div className="flex sm-screen:gap-6 gap-3">
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
              />
              <Button
                variant={'outline'}
                size={'lg'}
                theme={'primary'}
                className=" sm-screen:w-[125px] w-[110px]  rounded-full"
              >
                <div className="flex sm-screen:gap-1 gap-0 items-center" onClick={handleAddLogo}>
                  로고 추가
                  <PlusSmall />
                </div>
              </Button>
              <Button
                variant={'primary'}
                size={'lg'}
                theme={'primary'}
                className=" sm-screen:w-[100px] w-[80px]  rounded-full"
                onClick={() => {
                  onSave();
                }}>
                저장
              </Button>
            </div>
          ) : <Button
            variant={'outline'}
            size={'lg'}
            theme={'primary'}
            className="w-[100px] rounded-full"
            onClick={() => {
              setIsEdit(true);
            }}>
            편집
          </Button>}
        </div>

        <div
          className={cn(
            'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
          )}>
          <ContentBox title={currentMenu.text} label={currentMenu.label}>
            <div
              className={cn(
                'flex flex-col',
                'border-t border-grayscale-200 pt-3 gap-9',
                'sm-screen:border-none sm-screen:pt-0 sm-screen:gap-11',
              )}>
              <InvestmentBox label={'기업'}>
                <div
                  className={cn(
                    'grid',
                    'grid-cols-2 gap-6',
                    'sm-screen:grid-cols-3 sm-screen:gap-9 [&>*:not(:nth-child(3n+1))]:sm-screen:border-l [&>*:nth-child(3n+1)]:sm-screen:pl-0',
                  )}>
                  <LogoDnDContainer>
                    {logos.map(logo =>
                      <LogoDnDRow
                        key={logo.id}
                        draggable={isEdit}
                        onDrop={(id) => {
                          const draggedId = Number(id);
                          const targetId = logo.id;
                          setLogos(prevLogos => {
                            const newLogos = [...prevLogos];
                            const draggedIndex = newLogos.findIndex(item => item.id === draggedId);
                            const targetIndex = newLogos.findIndex(item => item.id === targetId);
                            // 위치 교환
                            [newLogos[draggedIndex], newLogos[targetIndex]] =
                              [newLogos[targetIndex], newLogos[draggedIndex]];
                            return newLogos;
                          });
                        }}
                      >
                        <InformationCard
                          id={logo.id}
                          src={logo.url}
                          onDelete={
                            isEdit ? () => {
                              setLogos(prevLogos => prevLogos.filter(item => item.id !== logo.id));
                            } : undefined
                          }
                        />
                      </LogoDnDRow>
                    )}
                  </LogoDnDContainer>

                </div>
              </InvestmentBox>
            </div>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} admin={true} />
      <Footer lang={lang} admin={true} />
    </main>
  );
};

const InvestmentBox = ({
  label,
  count,
  children,
}: {
  label: string;
  count?: number;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={'flex gap-1 typo-HeadlineBold sm-screen:typo-Display1Bold'}>
        <div>{label}</div>
        {count !== undefined && (
          <div className={cn('text-primary')}>{count}</div>
        )}
      </div>
      <div className="bg-grayscale-50 rounded-[44px] border border-grayscale-200 lg-screen:p-11 p-8">
        {children}
      </div>
    </div>
  );
};

const InformationCard = ({
  src,
  id,
  className,
  onDelete,
}: {
  src: string;
  id: number;
  className?: string;
  onDelete?: () => void;
}) => {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragPreviewRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'LOGO_ROW',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  useEffect(() => {
    drag(dragRef)
    dragPreview(dragPreviewRef)
  }, [drag])
  return (
    <div
      ref={dragPreviewRef}

      className={cn(
        'sm-screen:py-3 w-full h-full pl-6 sm-screen:pl-9 ',
        className,
      )}>
      <div className='w-full h-full py-3 bg-white flex justify-center items-center'
        ref={dragRef}
      >
        <div className='relative  lg-screen:w-[258px] w-[200px] aspect-[2/1] '>
          <Image src={src} alt="logo" fill />
          {onDelete && <div
            className="absolute bottom-0 right-0 cursor-pointer  rounded flex items-center justify-center bg-white"
            onClick={() => {
              onDelete();
            }}>
            <Trash />
          </div>}
        </div>
      </div>

    </div>
  );
};

const LogoDnDContainer = (
  { children }: { children: ReactNode }
) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>
}

const LogoDnDRow = (
  { children, onDrop, draggable = false }: { children: ReactNode, onDrop: (draggedId: string) => void, draggable?: boolean }
) => {
  const dragRef = useRef<HTMLDivElement>(null)
  const [collectedProps, drop] = useDrop(() => ({
    accept: "LOGO_ROW",
    canDrop: () => draggable,
    drop: (item: { id: string }, monitor) => {
      onDrop(item.id)
    },
    hover: (item, monitor) => {

    }
  }), [draggable])

  useEffect(() => {
    drop(dragRef)
  }, [drop])
  return <div ref={dragRef}>{children}</div>
}


export default Page;
