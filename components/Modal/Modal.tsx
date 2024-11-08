import { Button } from '@/components/ui/button';

type Props = {
  title?: string;
  desc?: string[];
  buttonText?: string;
  buttonOnClick?: () => void;
};

const Modal = ({ title, desc, buttonText, buttonOnClick }: Props) => {
  return (
    <div className="py-5 px-8 bg-white rounded-3xl">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-2">
          {title && (
            <div className="typo-HeadlineBold text-center">{title}</div>
          )}
          {desc && (
            <div className="typo-BodySmallRegular flex flex-col items-center">
              {desc.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </div>
        {buttonText && (
          <Button
            variant={'primary'}
            size={'lg'}
            className="h-12"
            onClick={buttonOnClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;
