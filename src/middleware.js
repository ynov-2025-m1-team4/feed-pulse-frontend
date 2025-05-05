import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl.clone();

  const publicRoutes = ['/auth/login', '/auth/register'];

  if (!token && !publicRoutes.includes(url.pathname)) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.includes(url.pathname)) {
    url.pathname = '/Dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/','/Dashboard', '/Dashboard/:path*', '/auth/login', '/auth/register'],
};
