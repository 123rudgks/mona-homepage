import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import { ToastContext } from '@/components/ContextWrapper';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HtmlDiv from '@/components/HtmlDiv';
import TabMenu from '@/components/TabMenu';
import { Button } from '@/components/ui/button';
import useGetInfos from '@/hooks/useGetInfos';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { infoMeta } from '@/types/info.types';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

type Props = {
  lang: Language;
};

const QuillContentPage = ({ lang }: Props) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang });
  const path = usePathname();
  const lastPath = path.split('/').slice(-1)[0];
  const info = infoMeta[lastPath];
  const { content } = useGetInfos({
    infoTag: info.tag,
    infoType: info.type,
  });
  const router = useRouter();
  const toastContext = useContext(ToastContext);
  useEffect(() => {
    if (toastContext?.toast) {
      toast(toastContext.toast);
      toastContext.setToast(null);
    }
  }, []);
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
              router.push(`/admin/${info.route}/${info.tag}/edit`);
            }}>
            편집
          </Button>
        </div>
        <div
          className={cn(
            'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
          )}>
          <div className={cn('sm-screen:static sm-screen:w-auto ')}>
            <TabMenu lang={lang} admin />
          </div>
          <ContentBox title={content.title} label={currentMenu.label}>
            <HtmlDiv html={content.content} />
          </ContentBox>
        </div>
      </ContentSection>
      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

export default QuillContentPage;
