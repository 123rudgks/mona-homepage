import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';

type Props = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  date: Date;
};

export const DUMMY_NEWS: Array<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  date: Date;
}> = [
  {
    id: 1,
    title: '한국IBM "생성형 AI로 더 복잡해진 IT, 자동화는 필수',
    content:
      '“오늘날 기업들은 다양한 클라우드 환경과 수 많은 애플리케이션을 비즈니스에서 활용하고 있으며, 이 환경은 생성형 AI의 도입으로 더욱 복잡해지고 있다. 생성형 AI가 2028년까지 최대 10억 개의 앱을 만들어낼 것으로 예상되는 상황에서 자동화는 더 이상 선택 사항이 아니다.” 이은주 한국IBM 사장은 13일 서울 여의도 담회...',
    thumbnail: 'https://picsum.photos/200',
    date: new Date('2024-06-30'),
  },
  {
    id: 2,
    title: '개인정보위, ‘해킹 피해’ 개인정보 유출 영세업체 과징금 면제',
    content:
      '사이버 해킹으로 고객 개인정보를 탈취당한 영세업체가 과징금 처분을 면제 받았습니다. 개인정보보호위원회는 어제(12일) 정부서울청사에서 전체 회의를 열어 개인정보보호 법규를 위반한 조립PC업체 조이젠에 대해 과징금 면제 결정을 내렸다고 오늘(13일) 밝혔습니다.',
    thumbnail: 'https://picsum.photos/200',
    date: new Date('2024-05-30'),
  },
  {
    id: 3,
    title:
      '카자흐스탄 광구는 다를까... 내년 상반기 시추 "10년치 전기차용 리튬 확보 가능"',
    content:
      '한국지질자원연구원이 카자흐스탄 정부로부터 리튬 광구 4곳에 대한 단독 탐사권을 약속받았다. 이곳에는 전기차 330만 대에 들어갈 배터리를 생산하는 데 필요한 만큼의 리튬이 묻혀 있다고 추정되는데, 지질연은 이르면 내년 상반기 실제 시추를 통해 경제성을 확인할 계획이다.',
    thumbnail: 'https://picsum.photos/200',
    date: new Date('2024-04-30'),
  },
  {
    id: 4,
    title: '`창작자 권리 지킨다` 문체부, 만화·웹툰 표준계약서 제·개정안 고시',
    content:
      '문화체육관광부는 13일 만화 분야 표준계약서 개정안 6종과 신규 제정안 2종을 고시했다고 밝혔다문체부는 창작자와 제작사, 플랫폼, 학계, 법조계 등 만화·웹툰 생태계의 다양한 관계자들과의 논의를 통해 제·개정안을 마련했으며, 이를 바탕으로 공정거래위원회와의 협의와 행정예고를 진행한 뒤 최종안을 확정했다.',
    thumbnail: 'https://picsum.photos/200',
    date: new Date('2024-03-30'),
  },
];
const NewsItem = ({ id, title, content, thumbnail, date }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        'sm-screen:flex-row sm-screen:gap-8 sm-screen:h-[203px] h-[302px]',
      )}>
      <div className="w-full h-[184px] shrink-0 sm-screen:w-[363px] sm-screen:h-full relative rounded-3xl overflow-hidden">
        <Image src={thumbnail} alt={title} fill />
      </div>
      <div className="flex-1 flex flex-col sm-screen:gap-[14px]">
        <div className={cn('lg-screen:typo-Display3Bold', 'typo-Display1Bold')}>
          {title}
        </div>
        <div
          className={cn(
            'flex-1 sm-screen:typo-TitleMedium typo-BodySmallMedium text-blackAlpha-50 flex flex-col justify-between',
          )}>
          <div>{content}</div>
          <div>{dayjs(date).format('YYYY.MM.DD')}</div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
