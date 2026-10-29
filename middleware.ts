import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { 
  getAllowedLanguagesForState, 
  FALLBACK_LANGUAGES,
  LANGUAGE_TO_PRIMARY_STATE
} from './src/utils/regionLanguageMap';

export default function middleware(request: NextRequest) {
  // 1. Extract Indian state/UT ISO 3166-2 code: allows ?state=XX query param, ?lang=XX query param for instant testing,
  // else reads Vercel Edge Geolocation header
  const queryRegion = request.nextUrl.searchParams.get('state') || request.nextUrl.searchParams.get('region');
  const queryLang = request.nextUrl.searchParams.get('lang')?.toLowerCase();
  const inferredFromLang = queryLang ? LANGUAGE_TO_PRIMARY_STATE[queryLang] : '';
  const region = (queryRegion ?? (inferredFromLang || request.geo?.region || request.headers.get('x-vercel-ip-country-region') || '')).toUpperCase();

  // 2. Resolve strict allowed languages for this specific Indian state
  const allowedLocales = getAllowedLanguagesForState(region);

  // 3. Delegate routing to next-intl scoped to allowed regional languages
  const handleI18nRouting = createMiddleware({
    locales: allowedLocales as unknown as string[],
    defaultLocale: allowedLocales[0], // 'en'
    localePrefix: 'always'
  });

  const response = handleI18nRouting(request);

  // 4. Propagate detected region to client (cookie) and server components (header)
  response.cookies.set('detected-region', region, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax'
  });
  response.headers.set('x-user-region', region);

  return response;
}

export const config = {
  // Match internationalized pathnames, skipping internal Next.js assets & API routes
  matcher: [
    '/',
    '/(en|hi|te|as|kok|gu|kn|ml|mr|mni|or|pa|ne|ta|bn|ur)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
