import { cn } from '@/lib/utils';

interface InputProps {
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.Ref<HTMLInputElement>;
  };
  Icon?: React.ReactNode;
}
const Input = ({ error, inputProps = {}, Icon }: InputProps) => {
  return (
    <TextFieldWrapper error={error} Icon={Icon}>
      <input
        {...inputProps}
        ref={inputProps.ref}
        className={cn(
          'w-full h-full outline-none typo-BodyLargeRegular placeholder:text-grayscale-400',
          inputProps?.className,
        )}
      />
    </TextFieldWrapper>
  );
};

export const TextFieldWrapper = ({
  error,
  children,
  Icon,
}: {
  error?: string;
  Icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full">
      <div
        className={cn(
          'py-2 px-3 rounded-[4px] flex gap-[11px] w-full h-full items-center',
          error !== undefined
            ? 'ring-[1px] ring-danger'
            : 'ring-[1px] ring-grayscale-200',
        )}>
        {Icon && Icon}
        {children}
      </div>
      {error && (
        <div className="text-danger typo-BodyCaptionRegular">{error}</div>
      )}
    </div>
  );
};

export default Input;
