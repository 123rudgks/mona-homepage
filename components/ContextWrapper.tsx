'use client';

import { createContext, useState } from 'react';
import { ToastContent } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

export const ToastContext = createContext<{
  toast: ToastContent;
  setToast: (toast: ToastContent) => void;
}>({
  toast: null,
  setToast: () => {},
});
const ContextWrapper = (props: Props) => {
  const [toast, setToast] = useState<ToastContent>(null);
  return (
    <ToastContext.Provider
      value={{
        toast: toast,
        setToast: (toast) => {
          setToast(toast);
        },
      }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ContextWrapper;
