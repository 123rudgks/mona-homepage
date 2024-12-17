'use client';
import InfoEditUI from '@/components/pages/edit/InfoEditUI';
import Toast from '@/components/Toast/Toast';
import useInfoEdit from '@/hooks/useInfoEdit';
import useMenu from '@/hooks/useMenu';
import { Language } from '@/types/globals.types';

type Props = {};

const Page = ({ params: { lang } }: { params: { lang: Language } }) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang, admin: true });
  const { value, setValue, content, updateContent } = useInfoEdit({
    infoTag: 'module-maintenance',
    infoType: 'business',
    redirectUrl: '/admin/business-area/module-maintenance',
    toastContent: (props) => (
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
    ),
  });

  return (
    <InfoEditUI
      onSave={() => updateContent(content.title, value)}
      title={content.title}
      label={currentMenu.label ?? ''}
      setContent={setValue}
      content={value}
    />
  );
};

export default Page;
