'use client';
import InputCancel from '@/app/svgs/promotion-center/news/InputCancel.svg';
import InputSearchIcon from '@/app/svgs/promotion-center/news/InputSearch.svg';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import { ToastContext } from '@/components/ContextWrapper';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaToastContainer from '@/components/Toast/MonaToastContainer';
import { Button } from '@/components/ui/button';
import FallbackImage from '@/components/ui/FallbackImage';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import dict from '@/dictionaries/promotion-center/news.json';
import useMenu from '@/hooks/useMenu';
import usePagination from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import { ArticleData, Language } from '@/types/globals.types';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang, admin: true });
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const [news, setNews] = useState<ArticleData[]>([]);
  const {
    currentPages,
    updatePaginationMeta,
    paginationMeta,
    disableNext,
    disablePrev,
  } = usePagination({
    take: 5,
  });
  const toastContext = useContext(ToastContext);
  useEffect(() => {
    if (toastContext?.toast) {
      toast(toastContext.toast);
      toastContext.setToast(null);
    }
  }, []);
  const fetchNews = useCallback(
    async ({ page, title }: { page: number; title?: string }) => {
      const res = await fetch(
        `/api/articles/admin?page=${page}${title ? `&title=${title}` : ''}`,
      );
      const data = await res.json();
      return data;
    },
    [],
  );
  const moveToPage = useCallback(
    async (page: number, title?: string) => {
      const data = await fetchNews({ page, title: title });
      setNews(data.data.articles);
      updatePaginationMeta(data.data.meta);
    },
    [updatePaginationMeta, fetchNews],
  );
  useEffect(() => {
    moveToPage(1);
  }, [moveToPage]);
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
              router.push('/admin/promotion-center/news/edit');
            }}>
            글쓰기
          </Button>
        </div>
        <div
          className={cn(
            'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
          )}>
          <ContentBox
            title={currentMenu.text}
            subTitle={
              <InputSearch
                placeholder={dict['제목 검색 placeholder'][lang]}
                value={inputValue}
                setValue={setInputValue}
                className={cn(
                  'mt-2 sm-screen:mt-0 sm-screen:absolute  sm-screen:right-0 sm-screen:bottom-0',
                )}
                onSearch={(search) => {
                  moveToPage(1, search);
                }}
              />
            }
            label={currentMenu.label}>
            <div
              className={cn(
                'grid grid-cols-1 gap-7 mb-[30px]',
                'sm-screen:grid-cols-2 sm-screen:gap-6 sm-screen:mb-9',
                'lg-screen:grid-cols-3 lg-screen:gap-10',
              )}>
              {news.map((article) => (
                <NewsCard
                  key={article.id}
                  img={article.thumbnail}
                  title={article.title}
                  date={article.createdDate}
                  id={article.id}
                />
              ))}
            </div>
            {paginationMeta && paginationMeta.totalPages > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={disablePrev}
                      onClick={() => {
                        moveToPage(paginationMeta.currentPage - 1, inputValue);
                      }}
                    />
                  </PaginationItem>
                  {currentPages.map((page) => (
                    <PaginationItem key={page} className="cursor-pointer">
                      <PaginationLink
                        onClick={() => {
                          moveToPage(page, inputValue);
                        }}
                        isActive={paginationMeta.currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      disabled={disableNext}
                      onClick={() => {
                        moveToPage(paginationMeta.currentPage + 1, inputValue);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </ContentBox>
        </div>
      </ContentSection>
      <MonaToastContainer />
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

const NewsCard = ({
  img,
  title,
  date,
  id,
}: {
  img: string | null;
  title: string;
  date: string;
  id: number;
}) => {
  return (
    <a
      href={`/admin/promotion-center/news/${id}`}
      className={cn('w-full flex flex-col gap-3 cursor-pointer', 'gap-5')}>
      <div className={cn('relative w-full h-[327px]', 'sm-screen:h-[450px]')}>
        <FallbackImage
          src={img ?? ''}
          alt={title}
          fill
          onError={() => {
            console.log('error');
          }}
        />
      </div>
      <div className={cn('flex flex-col gap-2', 'gap-3')}>
        <div
          className={cn(
            'text-grayscale-700 line-clamp-1',
            'typo-HeadlineBold',
            'sm-screen:typo-Display1Bold',
          )}>
          {title}
        </div>
        <div className={cn('text-blackAlpha-70', 'typo-BodyLargeRegular')}>
          {date}
        </div>
      </div>
    </a>
  );
};

const InputSearch = ({
  className,
  value,
  setValue,
  onCancel,
  onSearch,
  ...props
}: React.ComponentProps<'input'> & {
  onCancel?: () => void;
  onSearch?: (search: string) => void;
  setValue?: (value: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  return (
    <div
      className={cn(
        'sm-screen:w-[450px] w-full h-10 p-2 border border-grayscale-200 rounded-[4px] flex',
        focused && props.disabled
          ? 'ring-[3px] ring-grayscale-focused border-grayscale-black'
          : '',
        props.disabled ? 'border-grayscale-200 bg-grayscale-50' : '',
        className,
      )}>
      <input
        className="w-full h-full outline-none typo-BodyLargeRegular placeholder:text-grayscale-400 bg-transparent"
        {...props}
        value={value}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setFilled(!!e.target.value);
          setValue?.(e.target.value);
        }}
      />
      <div className="flex gap-[6px] items-center">
        {filled && !props.disabled && (
          <InputCancel
            className="cursor-pointer"
            onClick={() => {
              onCancel?.();
              setValue?.('');
              onSearch?.('');
              setFilled(false);
            }}
          />
        )}
        <InputSearchIcon
          className={cn(
            'cursor-pointer',
            props.disabled ? '[&>path]:fill-grayscale-300' : '',
          )}
          onClick={() => {
            value && onSearch?.(value.toString());
          }}
        />
      </div>
    </div>
  );
};

export default Page;
