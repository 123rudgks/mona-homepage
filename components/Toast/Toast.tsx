import ToastCheck from '@/app/svgs/toast_check.svg';
import ToastClose from '@/app/svgs/toast_close.svg';
import ToastWarning from '@/app/svgs/toast_warning.svg';

type Props = {
  type: 'success' | 'warning';
  message: string;
  onClose?: () => void;
};

const Toast = ({ type, message, onClose }: Props) => {
  return (
    <div className="w-full h-full bg-grayscale-700 py-3 px-4 rounded-xl">
      <div className="flex gap-3 items-center">
        {type === 'success' ? <ToastCheck /> : <ToastWarning />}
        <div className="flex-1 typo-BodySmallMedium text-white">{message}</div>
        {onClose && (
          <ToastClose
            onClick={() => {
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Toast;
