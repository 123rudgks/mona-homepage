import { cn } from '@/lib/utils';
import OgImg from '@/public/images/OgImage.png';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '모나 주식회사',
  description: '전기차 배터리 진단 솔루션',
  openGraph: {
    title: '모나 주식회사',
    description: '전기차 배터리 진단 솔루션',
    images: [
      {
        url: OgImg.src,
        width: 800,
        height: 400,
        alt: '모나 주식회사',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(inter.className, 'relative')}>
        {children}
        <div id="modal-root" className="fixed left-0 top-0 z-40 " />
      </body>
    </html>
  );
}
