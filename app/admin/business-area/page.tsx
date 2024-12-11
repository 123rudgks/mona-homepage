'use client';
import Header from '@/components/Header/Header';
import { checkIsTokenValid } from '@/utils/apis';
import { useEffect } from 'react';

type Props = {};

const Page = (props: Props) => {
  useEffect(() => {
    checkIsTokenValid();
  }, []);
  return (
    <div>
      <Header admin />
    </div>
  );
};

export default Page;
