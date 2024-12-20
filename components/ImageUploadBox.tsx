import UploadThumb from '@/app/images/UploadThumb.png';
import CloseIcon from '@/app/svgs/Close.svg';
import PlusIcon from '@/app/svgs/PlusIcon.svg';
import { useEffect, useId, useState } from 'react';

type Props = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  file: File | null;
  setFile: (file: File | null) => void;
};

const ImageUploadBox = ({ inputProps, file, setFile }: Props) => {
  const { id, type, accept = 'image/*', hidden, ...props } = inputProps || {};
  const [preview, setPreview] = useState<string>();
  const uniqueId = useId();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setPreview(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(undefined);
    }
  }, [file]);
  return (
    <div
      className="w-full h-full rounded-sm hover:bg-grayscale-50 relative"
      style={{
        backgroundImage: preview
          ? `url(${preview})`
          : `url(${UploadThumb.src})`,
        backgroundSize: 'cover',
      }}>
      {preview ? (
        <div
          className="absolute top-0 right-0 p-1 cursor-pointer"
          onClick={() => {
            setFile(null);
          }}>
          <CloseIcon />
        </div>
      ) : (
        <label
          htmlFor={uniqueId}
          className="w-full h-full flex items-center justify-center cursor-pointer">
          <PlusIcon />
        </label>
      )}
      <input {...props} id={uniqueId} type="file" accept={accept} hidden />
    </div>
  );
};

export default ImageUploadBox;
