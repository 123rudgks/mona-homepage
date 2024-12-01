import { InfosData } from '@/types/globals.types';
import { useEffect, useState } from 'react';

type Props = {
  infoType: 'business' | 'product';
  infoTag: string;
};

const useGetInfos = ({ infoTag, infoType }: Props) => {
  const [content, setContent] = useState<InfosData>({ title: '', content: '' });
  useEffect(() => {
    const getContent = async () => {
      const res = await fetch(`/api/infos/${infoType}/${infoTag}`);
      const data = await res.json();
      setContent({
        title: data.data.title,
        content: data.data.content,
      });
    };
    getContent();
  }, [infoTag, infoType]);

  return { content };
};

export default useGetInfos;
