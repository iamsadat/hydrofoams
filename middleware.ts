import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host')?.replace(':3000', '') || ''; // Remove port for local testing
  const path = url.pathname;

  // If request is from the main domain (x.com or www.x.com)
  if (host === 'fdkhan.com' || host === 'www.fdkhan.com') {
    if (path.startsWith('/search/')) {
      const clientSlug = path.split('/')[2]; // Extract client name
      return NextResponse.redirect(`http://${clientSlug}.fdkhan.com:3000`);
    }
  }

  // If the request is from a subdomain (client.x.com)
  if (host.endsWith('.fdkhan.com')) {
    const clientSlug = host.split('.')[0]; // Extract client name

    // Rewrite `/product/{handle}` paths to include the subdomain
    if (path.startsWith('/product/')) {
      url.pathname = `/search/${clientSlug}${path}`;
      return NextResponse.rewrite(url);
    }

    // Default rewrite for subdomains
    url.pathname = `/search/${clientSlug}${path}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next(); // Allow normal processing for other routes
}

export const config = {
  matcher: [
    '/search/:path*', // Match client paths
    '/((?!_next/static|_next/image|favicon.ico).*)', // Ignore static assets
  ],
};
