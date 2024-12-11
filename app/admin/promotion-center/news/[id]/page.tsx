'use client';
import ChevronLeft from '@/app/svgs/main/ChevronLeft.svg';
import BoardSection from '@/components/BoardSection';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HtmlDiv from '@/components/HtmlDiv';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import { MobileTabMenu } from '@/components/TabMenu';
import MonaToastContainer from '@/components/Toast/MonaToastContainer';
import Toast from '@/components/Toast/Toast';
import { Button } from '@/components/ui/button';
import { ClipboardShareButton } from '@/components/ui/ShareButton';
import dict from '@/dictionaries/promotion-center/news-detail.json';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { ArticleDetailData, Language } from '@/types/globals.types';
import dayjs from 'dayjs';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

const Page = ({
  params: { lang, id },
}: {
  params: { lang: Language; id: string };
}) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const [articleDetail, setArticleDetail] = useState<ArticleDetailData>();
  const router = useRouter();

  const getArticleDetail = useCallback(async () => {
    const res = await fetch(`/api/articles/${id}`);
    const data = await res.json();
    setArticleDetail(data.data);
  }, []);

  useEffect(() => {
    getArticleDetail();
  }, [getArticleDetail]);

  return (
    <main>
      <BoardSection
        title={currentCategory?.category}
        desc={['RAPID & ACCURATE BATTERY DIAGNOSIS', 'Powered By AI']}
      />
      <ContentSection mobileTabMenuComp={<MobileTabMenu lang={lang} />}>
        <div
          className={cn(
            'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end',
          )}>
          <MonaBreadCrumb
            items={[
              { href: '/', component: <HomeIcon />, id: 'home' },

              {
                href: '/promotion-center/news',
                component: currentCategory?.category,
                id: 'category',
              },
              {
                component: 'News',
                id: 'news',
              },
            ]}
          />
        </div>
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
                  'text-blackAlpha-70 typo-TitleMedium sm-screen:h-12 sm-screen:flex sm-screen:items-center',
                )}>
                {dayjs(articleDetail?.createdDate).format('YYYY-MM-DD')}
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

            <span className="absolute bottom-0 right-1/2 translate-x-1/2 sm-screen:right-0 sm-screen:top-[70px] sm-screen:bottom-auto sm-screen:translate-x-0  flex gap-4">
              {/* 클라이언트한테 계정 받아야함. 현재 디자인에선 hidden */}
              {/* <KakaoShareButton
                kakaoConfig={{
                  objectType: 'feed',
                  content: {
                    title: articleDetail?.title || '',
                    description: truncateString(
                      extractTextFromHTML(articleDetail?.content || ''),
                    ),
                    imageUrl: articleDetail?.thumbnail || '',
                    link: {
                      mobileWebUrl: window.location.href,
                      webUrl: window.location.href,
                    },
                  },
                }}
              /> */}
              <ClipboardShareButton
                ButtonProps={{
                  onClick: (e) => {
                    navigator.clipboard
                      .writeText(window.location.href)
                      .then(() => {
                        toast(({ toastProps }) => (
                          <Toast
                            type="success"
                            message={dict['복사 되었습니다'][lang]}
                            onClose={() => {
                              toastProps.onClose &&
                                toastProps.onClose({
                                  id: toastProps.toastId,
                                });
                            }}
                          />
                        ));
                      });
                  },
                }}
              />
            </span>
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
            {dict['목록 보기'][lang]}
          </Button>
        </div>
      </ContentSection>
      <MonaToastContainer />
      <Header lang={lang} />
      <Footer lang={lang} />
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
