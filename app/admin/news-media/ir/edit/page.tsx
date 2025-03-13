'use client';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import { ToastContext } from '@/components/ContextWrapper';
import DatePicker from '@/components/DatePicker';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ImageUploadBox from '@/components/ImageUploadBox';
import Input from '@/components/Input';
import ModalBackground from '@/components/Modal/ModalBackground';
import ModalPortal from '@/components/Modal/ModalPortal';
import TimeField from '@/components/TimeField';
import Toast from '@/components/Toast/Toast';
import { Button } from '@/components/ui/button';
import HamburgerMenu from '@/components/ui/hamburger_menu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { authFetch } from '@/utils/apis';
import { urlToFile } from '@/utils/helpers';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
const QuillEditor = dynamic(() => import('@/components/quill/QuillEditor'), {
  ssr: false,
});
interface DateAndTime {
  date?: string;
  time?: string;
}
type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  return (
    <main>
      <Suspense>
        <EditPageContent />
      </Suspense>
      ;
      <Header admin />
      <Footer admin />
    </main>
  );
};

const EditPageContent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [reserveDate, setReserveDate] = useState<DateAndTime>({});
  const [reserveModal, setReserveModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const toastContext = useContext(ToastContext);
  const reservedDateStr = useMemo(() => {
    if (!reserveDate.date || !reserveDate.time) return '';
    return dayjs(`${reserveDate.date} ${reserveDate.time}`).format(
      'YYYY.MM.DD HH:mm',
    );
  }, [reserveDate]);

  const id = useMemo(() => {
    return searchParams.get('id');
  }, [searchParams]);

  const postArticle = useCallback(
    async (_reservedDateStr?: string) => {
      let _id = id;
      const url = _id ? `/api/posts/${_id}` : '/api/posts';
      const method = _id ? 'PATCH' : 'POST';
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      file && formData.append('thumbnail', file);
      _reservedDateStr && formData.append('reservedDate', _reservedDateStr);
      const res = await authFetch(url, {
        method: method,
        body: formData,
      });
      if (res) {
        const data = await res.json();
        if (data.code === 200) {
          _id = data.data.id;
          toastContext.setToast((props) => (
            <Toast
              type="success"
              message={'내용이 저장되었어요'}
              onClose={() => {
                props.toastProps.onClose &&
                  props.toastProps.onClose({
                    id: props.toastProps.toastId,
                  });
              }}
            />
          ));
          router.push(`/admin/news-media/ir/${_id}`);
        } else {
          alert('실패했습니다.');
        }
      }
    },
    [title, content, file, id, toastContext, router],
  );
  const getDetail = useCallback(async (id: string) => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    const title = data.data.title;
    const content = data.data.content;
    const reservedDate = data.data.reservedDate;
    const file = data.data.thumbnail
      ? await urlToFile(data.data.thumbnail, title)
      : null;
    title && setTitle(title);
    content && setContent(content);
    reservedDate &&
      setReserveDate({
        date: dayjs(reservedDate).format('YYYY-MM-DD'),
        time: dayjs(reservedDate).format('HH:mm'),
      });
    file && setFile(file);
  }, []);
  useEffect(() => {
    // 편집 모드
    if (id) {
      getDetail(id);
    }
    // 글 작성 모드
    else {
    }
  }, [id, getDetail]);
  return (
    <>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>
      <ContentSection>
        <div className="w-full h-full max-w-[1144px] mx-auto">
          <div
            className={cn(
              'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end gap-4',
            )}>
            {reservedDateStr && dayjs(reservedDateStr).isAfter(dayjs()) && (
              <span className="flex gap-2">
                <span className="typo-BodyLargeRegular text-blackAlpha-70">
                  {reservedDateStr}
                </span>
                <span className="typo-BodyLargeMedium text-primary">
                  예약발행
                </span>
              </span>
            )}
            <div className="flex items-center justify-end gap-2">
              {(!id ||
                dayjs(reservedDateStr).isAfter(dayjs())) && (
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    theme={'primary'}
                    className="w-[100px] rounded-full"
                    onClick={() => {
                      setReserveModal(true);
                    }}>
                    예약 발행
                  </Button>
                )}
              <Button
                variant={'primary'}
                size={'lg'}
                theme={'primary'}
                className="w-[100px] rounded-full"
                onClick={() => {
                  postArticle();
                }}>
                {id ? '수정하기' : '발행하기'}
              </Button>
            </div>
          </div>
          <div
            className={cn(
              'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
            )}>
            <ContentBox title={'IR 글쓰기'}>
              <div className="h-[74px]">
                <Input
                  inputProps={{
                    className: '!typo-Display2Regular',
                    placeholder: '제목 입력',
                    value: title,
                    onChange: (e) => {
                      setTitle(e.target.value);
                    },
                  }}
                />
              </div>
              <QuillEditor
                value={content}
                setValue={(str) => {
                  setContent(str);
                }}
              />
              <div className="flex flex-col gap-1 mt-[50px]">
                <span className="typo-TitleMedium text-navy-700">썸네일</span>
                <span className="typo-BodyLargeRegular text-grayscale-700">
                  이미지 권장 사이즈는 670*670(px)입니다.
                </span>
                <div className="w-[200px] h-[200px]">
                  <ImageUploadBox
                    file={file}
                    setFile={setFile}
                    inputProps={{
                      multiple: false,
                      onChange: (e) => {
                        if (e.target.files) {
                          setFile(e.target.files[0]);
                        }
                      },
                    }}
                  />
                </div>
              </div>
            </ContentBox>
          </div>
        </div>
      </ContentSection>
      {reserveModal && (
        <ModalPortal>
          <ModalBackground>
            <div className=" bg-white rounded-3xl max-w-[480px] w-full h-[672px] flex flex-col">
              <div className="h-16 typo-HeadlineBold flex justify-between items-center py-5 px-8 border-b border-grayscale-200">
                예약 발행
                <HamburgerMenu
                  className="md-screen:flex"
                  isOpen
                  setIsOpen={() => {
                    setReserveModal(false);
                    setReserveDate({});
                  }}
                />
              </div>
              <div className=" py-5 px-8 flex-1">
                <div className="flex flex-col gap-2">
                  <span className="typo-BodySmallMedium text-navy-700">
                    예약 일시
                  </span>
                  <div className="flex gap-2">
                    <DatePicker
                      _dateStr={reserveDate?.date ?? ''}
                      _setDateStr={(_value) => {
                        setReserveDate({ ...reserveDate, date: _value });
                      }}
                    />
                    <TimeField
                      _timeStr={reserveDate.time ?? ''}
                      _setTimeStr={(_value) => {
                        setReserveDate({ ...reserveDate, time: _value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="h-[84px] bg-grayscale-50 px-8 pt-4 pb-5 flex justify-end">
                <Button
                  variant={'primary'}
                  size={'lg'}
                  theme={'primary'}
                  disabled={!reserveDate.date || !reserveDate.time}
                  className="py-3 px-5  w-[120px] rounded-full"
                  onClick={() => {
                    postArticle(reservedDateStr);
                  }}>
                  예약 발행
                </Button>
              </div>
            </div>
          </ModalBackground>
        </ModalPortal>
      )}
    </>
  );
};
export default Page;
