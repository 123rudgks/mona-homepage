import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
let defaultLocale = 'ko';
// for 영어 버전 hide
// let locales = [defaultLocale, 'en'];
let locales = [defaultLocale];

function getLocaleWithoutDash(locale: string) {
  return locale.split('-')[0];
}
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    return defaultLocale;
  }
  // 'Accept-Language' 헤더는 여러 언어를 포함할 수 있으며, 각 언어는 우선순위가 있습니다.
  // 예: 'en-US,en;q=0.9,ko;q=0.8'
  const seen = new Set();
  let languages: { locale: string; q: number }[] = [];
  acceptLanguage.split(',').forEach((lang) => {
    const [locale, qValue] = lang.split(';');
    const key = getLocaleWithoutDash(locale);
    if (seen.has(key)) return;
    seen.add(key);
    languages.push({
      locale: key,
      q: qValue ? parseFloat(qValue.split('=')[1]) : 1.0,
    });
  });

  languages.sort((a, b) => b.q - a.q);
  return languages[0].locale;
}
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // request for API
  if (request.url.includes('/api')) {
    return NextResponse.next();
  }
  // request for admin page
  if (request.url.includes('/admin')) {
    return NextResponse.next();
  }
  // 1. 정적 파일 요청 필터링
  if (
    pathname.startsWith('/_next') || // Next.js 내부 파일 요청
    pathname.startsWith('/static') || // 정적 파일 요청
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|otf)$/) // 파일 확장자 필터링
  ) {
    return NextResponse.next(); // Middleware를 건너뜀
  }
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  // for 영어 버전 hide
  // const locale = getLocale(request);
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
