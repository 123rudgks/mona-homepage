import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '모나 주식회사 관리자',
  description: '모나 관리자 페이지',
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
