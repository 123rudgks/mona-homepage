import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
let defaultLocale = 'ko';
let locales = [defaultLocale, 'en'];

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
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
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
