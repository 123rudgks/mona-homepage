export {};
type Link = {
  webUrl?: string;
  mobileWebUrl?: string;
};
export type KakaoSendDefault = {
  objectType: 'feed';
  content: {
    title: string;
    imageUrl: string;
    link: Link;
    description?: string;
  };
  buttons?: { title: string; link: Link }[];
};
declare global {
  interface Window {
    Kakao: {
      Share: {
        sendDefault: (props: KakaoSendDefault) => any;
      };
      init: (appKey: string) => void;
      isInitialized: () => boolean;
    };
  }
}
