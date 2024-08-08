// middleware.ts
import { NextResponse } from 'next/server';
import { auth } from './auth'; 

export async function middleware(req) {
  const session = await auth();

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: '/((?!_next/static|favicon.ico).*)',
};
