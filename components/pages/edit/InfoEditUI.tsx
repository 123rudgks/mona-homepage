'use client';
import ContentBox from '@/components/ContentBox';
import ContentSection from '@/components/ContentSection';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('@/components/QuillEditor'), {
  ssr: false,
});

type Props = {
  onSave: () => void;
  title: string;
  label: string;
  setContent: (str: string) => void;
  content: string;
};

const InfoEditUI = ({ onSave, content, setContent, label, title }: Props) => {
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
                onSave();
              }}>
              저장
            </Button>
          </div>
          <div
            className={cn(
              'sm-screen:flex lg-screen:flex-row lg-screen:gap-11 sm-screen:flex-col sm-screen:gap-9',
            )}>
            <ContentBox title={title} label={label}>
              <QuillEditor
                value={content}
                setValue={(str) => {
                  setContent(str);
                }}
              />
            </ContentBox>
          </div>
        </div>
      </ContentSection>

      <Header admin />
      <Footer admin />
    </main>
  );
};

export default InfoEditUI;
