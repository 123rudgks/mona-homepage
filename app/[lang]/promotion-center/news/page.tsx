'use client';
import InputCancel from '@/app/svgs/promotion-center/news/InputCancel.svg';
import InputSearchIcon from '@/app/svgs/promotion-center/news/InputSearch.svg';
import BoardSection from '@/components/BoardSection';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MonaBreadCrumb from '@/components/MonaBreadCrumb';
import { MobileTabMenu } from '@/components/TabMenu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const getNews = async () => {
    const res = await fetch('/api/articles?page=1');
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {}, []);
  return (
    <main>
      <BoardSection
        title={currentCategory?.category}
        desc={['RAPID & ACCURATE BATTERY DIAGNOSIS', 'Powered By AI']}
      />
      <ContentSection mobileTabMenuComp={<MobileTabMenu lang={lang} />}>
        <button
          onClick={() => {
            getNews();
          }}>
          test
        </button>
        <div
          className={cn(
            'lg-screen:h-[100px] sm-screen:h-20 h-[60px] flex items-center justify-end',
          )}>
          <MonaBreadCrumb
            items={[
              { href: '/', component: <HomeIcon />, id: 'home' },

              {
                component: currentCategory?.category,
                id: 'category',
              },
            ]}
          />
        </div>
        <div
          className={cn(
            'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
          )}>
          <ContentBox
            title={currentMenu.text}
            subTitle={
              <InputSearch
                placeholder="Search keyword"
                className={cn(
                  'mt-2 sm-screen:mt-0 sm-screen:absolute  sm-screen:right-0 sm-screen:bottom-0',
                )}
              />
            }
            label={currentMenu.label}>
            <div
              className={cn(
                'grid grid-cols-1 gap-7 mb-[30px]',
                'sm-screen:grid-cols-2 sm-screen:gap-6 sm-screen:mb-9',
                'lg-screen:grid-cols-3 lg-screen:gap-10',
              )}>
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />{' '}
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
              <NewsCard
                img="https://picsum.photos/seed/picsum/200/300"
                title="더블디, 신규 매장 오픈 더블디, 신규 매장 오픈 더블디, 신규 매장 오픈"
                date="2022-06-18"
              />
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious></PaginationPrevious>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext></PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} />
      <Footer lang={lang} />
    </main>
  );
};

const NewsCard = ({
  img,
  title,
  date,
}: {
  img: string;
  title: string;
  date: string;
}) => {
  return (
    <div className={cn('w-full flex flex-col gap-3', 'gap-5')}>
      <div className={cn('relative w-full h-[327px]', 'sm-screen:h-[450px]')}>
        <Image src={img} alt={title} fill />
      </div>
      <div className={cn('flex flex-col gap-2', 'gap-3')}>
        <div
          className={cn(
            'text-grayscale-700',
            'typo-HeadlineBold',
            'sm-screen:typo-Display1Bold',
          )}>
          {title}
        </div>
        <div className={cn('text-blackAlpha-70', 'typo-BodyLargeRegular')}>
          {date}
        </div>
      </div>
    </div>
  );
};

const InputSearch = ({
  className,
  onCancel,
  onSearch,
  ...props
}: React.ComponentProps<'input'> & {
  onCancel?: () => void;
  onSearch?: () => void;
}) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  return (
    <div
      className={cn(
        'sm-screen:w-[450px] w-full h-10 p-2 border border-grayscale-200 rounded-[4px] flex',
        focused && props.disabled
          ? 'ring-[3px] ring-[#97979739] border-grayscale-black'
          : '',
        props.disabled ? 'border-grayscale-200 bg-grayscale-50' : '',
        className,
      )}>
      <input
        className="w-full h-full outline-none typo-BodyLargeRegular placeholder:text-grayscale-400 bg-transparent"
        {...props}
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
          props.onChange?.(e);
        }}
      />
      <div className="flex gap-[6px] items-center">
        {filled && !props.disabled && (
          <InputCancel
            className="cursor-pointer"
            onClick={() => {
              onCancel?.();
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
            onSearch?.();
          }}
        />
      </div>
    </div>
  );
};

export default Page;
