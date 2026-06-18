import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match the root and all paths except API, Next internals, static files and
  // the admin panel (RU-only, handled outside next-intl).
  matcher: ['/', '/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
