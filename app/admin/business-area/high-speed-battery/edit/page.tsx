'use client';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import { ToastContext } from '@/components/ContextWrapper';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import QuillEditor from '@/components/QuillEditor';
import Toast from '@/components/Toast/Toast';
import { Button } from '@/components/ui/button';
import useGetInfos from '@/hooks/useGetInfos';
import useMenu from '@/hooks/useMenu';
import { cn } from '@/lib/utils';
import { Language } from '@/types/globals.types';
import { authFetch } from '@/utils/apis';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang, admin: true });
  const [value, setValue] = useState('');
  const { content } = useGetInfos({
    infoTag: 'high-speed-battery',
    infoType: 'business',
  });
  const route = useRouter();
  const toastContext = useContext(ToastContext);
  const updateContent = useCallback(
    async (title: string, content: string) => {
      const formdata = new FormData();
      formdata.append('content', content);
      formdata.append('title', title);
      const res = await authFetch('/api/infos/business/high-speed-battery', {
        method: 'PATCH',
        body: formdata,
      });
      if (res) {
        const data = await res.json();

        if (data.code === 200) {
          toastContext?.setToast((props) => (
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
          route.push('/admin/business-area/high-speed-battery');
        } else {
          alert('저장에 실패했습니다.');
        }
      }
    },
    [toastContext, route],
  );
  useEffect(() => {
    setValue(content.content);
  }, [content]);
  return (
    <main>
      <div className="border-b border-grayscale-200 w-full sm-screen:pt-[100px] pt-16"></div>
      <ContentSection>
        <div className="w-full h-full max-w-[1144px] mx-auto">
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
                updateContent(content.title, value);
              }}>
              저장
            </Button>
          </div>
          <div
            className={cn(
              'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
            )}>
            <ContentBox title={content.title} label={currentMenu.label}>
              <QuillEditor
                value={value}
                setValue={(str) => {
                  setValue(str);
                }}
              />
            </ContentBox>
          </div>
        </div>
      </ContentSection>

      <Header lang={lang} admin />
      <Footer lang={lang} admin />
    </main>
  );
};

export default Page;
