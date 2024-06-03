import { i18nRouter } from 'next-i18n-router';
import { NextResponse, type NextRequest } from 'next/server';
import { i18nConfig } from './internationalization';

export function middleware(request: NextRequest): NextResponse {
  const response = i18nRouter(request, i18nConfig);
  /**
   * give pathname to lower pages
   * https://github.com/vercel/next.js/issues/46618#issuecomment-1450416633
   */
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
