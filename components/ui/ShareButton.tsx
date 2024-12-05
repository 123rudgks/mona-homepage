'use client';
import ClipIcon from '@/app/svgs/promotion-center/news/Icon_clip.svg';
import KakaoIcon from '@/app/svgs/promotion-center/news/Icon_kakao.svg';
import { Button, ButtonProps } from '@/components/ui/button';
import { KakaoSendDefault } from '@/global';
import Script from 'next/script';
import { useEffect, useState } from 'react';

type Props = {
  ButtonProps?: ButtonProps;
};

export const KakaoShareButton = ({
  ButtonProps = {},
  kakaoConfig,
}: Props & {
  kakaoConfig: KakaoSendDefault;
}) => {
  const { onClick, ...rest } = ButtonProps;
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  // Kakao SDK 초기화
  useEffect(() => {
    if (kakaoLoaded) {
      window.Kakao.init('2b96b33f07a000d8392c3311729d0f1a');
    }
  }, [kakaoLoaded]);
  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
        integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
        crossOrigin="anonymous"
        onLoad={() => {
          setKakaoLoaded(true);
        }}
        onError={(e) => {
          console.log('kakao_script_load_error: ', e);
        }}
      />
      <Button
        variant={'outline'}
        theme={'gray'}
        className="rounded-full aspect-square w-12 kakaotalk-sharing-btn"
        onClick={(e) => {
          if (kakaoLoaded) {
            window.Kakao.Share.sendDefault(kakaoConfig);
          }
          onClick && onClick(e);
        }}
        {...rest}>
        <KakaoIcon />
      </Button>
    </>
  );
};
export const ClipboardShareButton = ({ ButtonProps = {} }: Props) => {
  const { onClick, ...rest } = ButtonProps;
  return (
    <Button
      variant={'outline'}
      theme={'gray'}
      className="rounded-full aspect-square w-12"
      onClick={(e) => {
        onClick && onClick(e);
      }}
      {...rest}>
      <ClipIcon />
    </Button>
  );
};
