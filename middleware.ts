import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Inline verify so middleware stays Edge-compatible (no next/headers)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vintie_secret_key_min_32_chars_long'
);

async function verifyEdgeToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

const PROTECTED = ['/account'];
const ADMIN_ONLY = ['/admin'];
const AUTH_PAGES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('vintie_token')?.value;
  const session = token ? await verifyEdgeToken(token) : null;

  // Redirect already-logged-in users away from auth pages
  if (AUTH_PAGES.some(p => pathname.startsWith(p)) && session) {
    const dest = (session as any).is_admin ? '/admin' : '/';
    return NextResponse.redirect(new URL(dest, request.url));
  }

  // Protect /account
  if (PROTECTED.some(p => pathname.startsWith(p)) && !session) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Protect /admin
  if (ADMIN_ONLY.some(p => pathname.startsWith(p))) {
    if (!session) return NextResponse.redirect(new URL('/login', request.url));
    if (!(session as any).is_admin) return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/login', '/signup'],
};
