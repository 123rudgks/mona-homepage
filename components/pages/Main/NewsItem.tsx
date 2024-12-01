import { cn } from '@/lib/utils';
import { ArticleData } from '@/types/globals.types';
import dayjs from 'dayjs';
import Image from 'next/image';

const NewsItem = ({
  id,
  title,
  thumbnail,
  createdDate,
  content,
}: ArticleData) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        'sm-screen:flex-row sm-screen:gap-8 sm-screen:h-[203px] min-h-[302px]',
      )}>
      <div className="w-full h-[184px] shrink-0 sm-screen:w-[363px] sm-screen:h-full relative rounded-3xl overflow-hidden">
        {thumbnail && <Image src={thumbnail} alt={title} fill />}
      </div>
      <div className="flex-1 flex flex-col sm-screen:gap-[14px]">
        <div className={cn('lg-screen:typo-Display3Bold', 'typo-Display1Bold')}>
          {title}
        </div>
        <div
          className={cn(
            'flex-1 sm-screen:typo-TitleMedium typo-BodySmallMedium text-blackAlpha-50 flex flex-col justify-between',
          )}>
          <div className="sm-screen:line-clamp-4 line-clamp-2">
            {extractTextFromHTML(content)}
          </div>
          <div>{dayjs(createdDate).format('YYYY.MM.DD')}</div>
        </div>
      </div>
    </div>
  );
};

function extractTextFromHTML(html: string): string {
  // HTML 문자열을 DOM으로 변환
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // img, video 태그를 제거
  doc.querySelectorAll('img, video').forEach((el) => el.remove());

  // 텍스트만 추출
  return doc.body.textContent?.trim() || ''; // 텍스트가 없으면 빈 문자열 반환
}
export default NewsItem;
