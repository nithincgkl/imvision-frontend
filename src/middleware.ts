import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/sign-up', '/forgot-password', '/reset-password'];

// Create a custom middleware function that combines next-intl with authentication
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check for auth cookie
  const authToken = request.cookies.get('auth-token')?.value;
  
  // Check if it's a public route (login, signup, etc.)
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));
  
  // If user is authenticated and trying to access login/signup pages,
  // redirect them to the dashboard or home
  if (authToken && isPublicRoute) {
    const redirectURL = new URL('/', request.url);
    return NextResponse.redirect(redirectURL);
  }
  
  // Skip auth check for public routes, static files, API routes
  if (isPublicRoute || 
      pathname.match(/\.(jpg|png|gif|css|js|svg|ico)$/) || 
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/')) {
    return intlMiddleware(request);
  }
  
  // If user is not authenticated and trying to access protected routes,
  // redirect to login
  if (!authToken) {
    const redirectURL = new URL('/login', request.url);
    return NextResponse.redirect(redirectURL);
  }
  
  // Continue with the intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match internationalized pathnames
    '/', 
    '/(sv|en)/:path*',
    
    // Match all pathnames except for static files, api routes, etc.
    '/((?!api|_next|_vercel|.*\\..*).*)',
    
    // Your specific user routes
    '/([\\w-]+)?/users/(.+)'
  ]
};