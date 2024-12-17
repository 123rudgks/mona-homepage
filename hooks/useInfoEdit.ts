'use client';
import { ToastContext } from '@/components/ContextWrapper';
import useGetInfos from '@/hooks/useGetInfos';
import { authFetch } from '@/utils/apis';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ToastContent } from 'react-toastify';

type Props = {
  infoTag: string;
  infoType: 'business' | 'product';
  toastContent: ToastContent;
  redirectUrl: string;
};

const useInfoEdit = ({
  infoTag,
  infoType,
  toastContent,
  redirectUrl,
}: Props) => {
  const [value, setValue] = useState('');
  const { content } = useGetInfos({
    infoTag: infoTag,
    infoType: infoType,
  });
  const route = useRouter();
  const toastContext = useContext(ToastContext);
  const updateContent = useCallback(
    async (title: string, content: string) => {
      const formdata = new FormData();
      formdata.append('content', content);
      formdata.append('title', title);
      const res = await authFetch(`/api/infos/${infoType}/${infoTag}`, {
        method: 'PATCH',
        body: formdata,
      });
      if (res) {
        const data = await res.json();

        if (data.code === 200) {
          toastContext?.setToast(toastContent);
          route.push(redirectUrl);
        } else {
          alert('저장에 실패했습니다.');
        }
      }
    },
    [toastContext, route, toastContent, infoTag, infoType, redirectUrl],
  );
  useEffect(() => {
    setValue(content.content);
  }, [content]);
  return {
    value,
    setValue,
    content,
    updateContent,
  };
};

export default useInfoEdit;
