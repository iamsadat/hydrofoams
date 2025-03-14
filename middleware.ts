import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host')?.replace(':3000', '') || '';
  const path = url.pathname;

  // Main domain client redirect
  if (host === 'x.com' || host === 'www.x.com') {
    if (path.startsWith('/clients/')) {
      const clientSlug = path.split('/')[2];
      return NextResponse.redirect(`http://${clientSlug}.x.com:3000`);
    }
  }

  // Subdomain handling
  if (host?.endsWith('.x.com')) {
    const clientSlug = host.replace('.x.com', '');
    const response = NextResponse.next();
    response.headers.set('x-client-slug', clientSlug);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/clients/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};