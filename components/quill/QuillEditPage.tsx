import InfoEditUI from '@/components/pages/edit/InfoEditUI';
import Toast from '@/components/Toast/Toast';
import useInfoEdit from '@/hooks/useInfoEdit';
import useMenu from '@/hooks/useMenu';
import { Language } from '@/types/globals.types';
import { infoMeta } from '@/types/info.types';
import { usePathname } from 'next/navigation';

type Props = {
  lang: Language;
};

const QuillEditPage = ({ lang }: Props) => {
  const { MENU, currentCategory, currentMenu } = useMenu({ lang, admin: true });
  const path = usePathname();
  const lastPath = path.split('/').slice(-2)[0];
  const info = infoMeta[lastPath];
  const { value, setValue, content, updateContent } = useInfoEdit({
    infoTag: info.tag,
    infoType: info.type,
    redirectUrl: `/admin/${info.route}/${info.tag}`,
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

export default QuillEditPage;
