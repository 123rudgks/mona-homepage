import { Button } from '@/components/ui/button';

type Props = {
  title?: string;
  desc?: string[];
  buttonText?: string;
  buttonOnClick?: () => void;
  bottom?: React.ReactNode;
};

const Modal = ({ title, desc, buttonText, buttonOnClick, bottom }: Props) => {
  return (
    <div className="p-5 bg-white rounded-3xl w-[310px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-2">
          {title && (
            <div className="typo-HeadlineBold text-center pt-5">{title}</div>
          )}
          {desc && (
            <div className="typo-BodySmallRegular flex flex-col items-center">
              {desc.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </div>
        {!bottom && buttonText && (
          <Button
            variant={'primary'}
            size={'lg'}
            className="h-12"
            onClick={buttonOnClick}>
            {buttonText}
          </Button>
        )}
        {bottom && !buttonText && bottom}
      </div>
    </div>
  );
};

export default Modal;
