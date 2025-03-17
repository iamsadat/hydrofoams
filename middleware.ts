import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host')?.replace(':3000', '') || ''; // Remove port for local testing
  const path = url.pathname;

  // If request is from the main domain (x.com or www.x.com)
  if (host === 'x.com' || host === 'www.x.com') {
    if (path.startsWith('/clients/')) {
      const clientSlug = path.split('/')[2]; // Extract client name
      return NextResponse.redirect(`http://${clientSlug}.x.com:3000`);
    }
  }

  // If the request is from a subdomain (client.x.com)
  if (host.endsWith('.x.com')) {
    const clientSlug = host.split('.')[0]; // Extract subdomain as clientSlug

    // Rewrite the request to the internal route `/clients/[clientSlug]`
    url.pathname = `/clients/${clientSlug}`;

    const response = NextResponse.rewrite(url);
    // response.headers.set('x-client-slug', clientSlug); // Attach subdomain info in headers if needed
    return response;
  }

  return NextResponse.next(); // Allow normal processing for other routes
}

export const config = {
  matcher: [
    '/clients/:path*', // Match client paths
    '/((?!_next/static|_next/image|favicon.ico).*)', // Ignore static assets
  ],
};
