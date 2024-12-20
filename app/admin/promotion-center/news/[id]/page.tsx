'use client';
import MoreIcon from '@/app/svgs/admin/MoreIcon.svg';
import ChevronLeft from '@/app/svgs/main/ChevronLeft.svg';
import ContentSection from '@/components/ContentSection';
import { ToastContext } from '@/components/ContextWrapper';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HtmlDiv from '@/components/HtmlDiv';
import MonaToastContainer from '@/components/Toast/MonaToastContainer';
import Toast from '@/components/Toast/Toast';
import { Button } from '@/components/ui/button';
import dict from '@/dictionaries/promotion-center/news-detail.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { ArticleDetailData, Language } from '@/types/globals.types';
import { authFetch } from '@/utils/apis';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

const Page = ({
  params: { lang, id },
}: {
  params: { lang: Language; id: string };
}) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang, admin: true });
  const [articleDetail, setArticleDetail] = useState<ArticleDetailData>();
  const router = useRouter();
  const toastContext = useContext(ToastContext);
  useEffect(() => {
    if (toastContext?.toast) {
      toast(toastContext.toast);
      toastContext.setToast(null);
    }
  }, []);

  const deleteArticle = useCallback(async () => {
    const res = await authFetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });
    const data = await res?.json();
    if (data.code === 200) {
      toastContext?.setToast((props) => (
        <Toast
          type="success"
          message={'삭제되었습니다.'}
          onClose={() => {
            props.toastProps.onClose &&
              props.toastProps.onClose({
                id: props.toastProps.toastId,
              });
          }}
        />
      ));
      router.push(`/admin/promotion-center/news`);
    }
  }, [id]);
  const getArticleDetail = useCallback(async () => {
    const res = await fetch(`/api/articles/${id}`);
    const data = await res.json();
    setArticleDetail(data.data);
  }, [id]);

  useEffect(() => {
    getArticleDetail();
  }, [getArticleDetail]);

  return (
    <main>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>

      <ContentSection>
        <div
          className={cn(
            'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end gap-2',
          )}></div>
        <div className={cn('sm-screen:px-11', 'px-6')}>
          <div
            className={cn(
              'relative  flex flex-col max-w-[1140px] mx-auto mb-[60px]',
            )}>
            <div
              className={cn(
                'flex flex-col gap-[10px] border-b border-grayscale-100 pb-5 ',
                'sm-screen:gap-6 sm-screen:pb-6',
              )}>
              <div
                className={cn(
                  'typo-Display1Bold',
                  'sm-screen:typo-Display4Bold',
                )}>
                {articleDetail?.title}
              </div>
              <div
                className={cn(
                  'text-blackAlpha-70 typo-TitleMedium sm-screen:h-12 flex items-center justify-between',
                )}>
                {articleDetail?.reservedDate ? (
                  <div className="flex gap-2">
                    {dayjs(articleDetail?.reservedDate).format(
                      'YYYY-MM-DD HH:mm',
                    )}
                    <span className="typo-TitleMedium text-primary">
                      예약 발행
                    </span>
                  </div>
                ) : (
                  dayjs(articleDetail?.createdDate).format('YYYY-MM-DD')
                )}

                <span className="  gap-2 hidden sm-screen:flex">
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    theme={'gray'}
                    className="px-5 py-3 rounded-full"
                    onClick={() => {
                      router.push(`/admin/promotion-center/news/edit?id=${id}`);
                    }}>
                    수정
                  </Button>
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    theme={'danger'}
                    className="px-5 py-3 rounded-full"
                    onClick={() => {
                      deleteArticle();
                    }}>
                    삭제
                  </Button>
                </span>
                <span className="sm-screen:hidden inline relative">
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    theme={'gray'}
                    className="rounded-full w-10 h-10 p-0 peer">
                    <MoreIcon />
                  </Button>
                  <div className="absolute mt-2 shadow-lg bg-white right-0  flex-col z-10 peer-focus:visible hover:visible invisible flex ">
                    <div
                      className="p-2 w-[92px] typo-BodyLargeRegular hover:bg-grayscale-50 flex items-center cursor-pointer"
                      onClick={() => {
                        router.push(
                          `/admin/promotion-center/news/edit?id=${id}`,
                        );
                      }}>
                      수정
                    </div>
                    <div className="p-2 w-[92px] typo-BodyLargeRegular text-danger hover:bg-grayscale-50 flex items-center cursor-pointer">
                      삭제
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <div className={cn(' pt-5 pb-[108px]', 'sm-screen:pt-6')}>
              {articleDetail?.thumbnail && (
                <div className="w-full relative h-[528px]">
                  <Image src={articleDetail?.thumbnail} alt="thumbnail" fill />
                </div>
              )}
            </div>
            {articleDetail?.content && (
              <HtmlDiv html={articleDetail?.content} />
            )}
          </div>
        </div>
        <div className="border-t border-b divide-y">
          <PostingList
            direction="prev"
            lang={lang}
            id={articleDetail?.prevId}
            title={articleDetail?.prevTitle}
            disabled={
              articleDetail?.prevTitle === null ||
              articleDetail?.prevTitle === undefined
            }
            date={articleDetail?.prevCreatedDate}
          />
          <PostingList
            direction="next"
            lang={lang}
            id={articleDetail?.nextId}
            title={articleDetail?.nextTitle}
            disabled={
              articleDetail?.nextTitle === null ||
              articleDetail?.nextTitle === undefined
            }
            date={articleDetail?.nextCreatedDate}
          />
        </div>
        <div className="text-center mt-[50px]">
          <Button
            variant={'outline'}
            theme={'gray'}
            className="w-[268px] h-12 rounded-full"
            onClick={() => {
              router.push('/promotion-center/news');
            }}>
            {lang ? dict['목록 보기'][lang] : '목록 보기'}
          </Button>
        </div>
      </ContentSection>
      <MonaToastContainer />
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

const PostingList = ({
  direction,
  disabled,
  lang,
  title,
  date,
  id,
}: {
  direction: 'prev' | 'next';
  disabled?: boolean;
  lang: Language;
  title?: string;
  date?: string;
  id?: number;
}) => {
  return (
    <Link
      href={`/promotion-center/news/${id}`}
      onClick={(e) => {
        disabled && e.preventDefault();
      }}
      className={cn(
        'flex gap-[13px] items-center p-6  ',
        disabled
          ? 'text-grayscale-400 cursor-default'
          : 'hover:bg-grayscale-50',
      )}>
      <div className="flex gap-[2px]">
        <div
          className={cn(
            'w-5 h-5',
            direction === 'next' ? '-rotate-90' : 'rotate-90',
          )}>
          <ChevronLeft
            className={cn(
              disabled
                ? '[&>path]:fill-grayscale-400'
                : '[&>path]:fill-grayscale-black',
            )}
          />
        </div>
        <span className={cn('typo-BodyLargeMedium')}>
          {direction === 'next' ? dict['다음글'][lang] : dict['이전글'][lang]}
        </span>
      </div>
      <div className="w-[2px] h-[15px] bg-grayscale-200" />
      <div className="typo-BodyLargeRegular flex-1">
        {title
          ? title
          : direction === 'next'
          ? dict['다음글이 없습니다.'][lang]
          : dict['이전글이 없습니다.'][lang]}
      </div>
      {date && (
        <div className="typo-BodySmallRegular text-blackAlpha-50 hidden sm-screen:block">
          {dayjs(date).format('YYYY-MM-DD')}
        </div>
      )}
    </Link>
  );
};

function truncateString(str: string) {
  // 문자열이 50글자를 초과하는지 확인
  if (str.length > 50) {
    // 50글자까지 자르고 '...' 추가
    return str.slice(0, 50) + '...';
  }
  // 50글자 이하라면 그대로 반환
  return str;
}
export default Page;
