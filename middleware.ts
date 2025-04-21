import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a Supabase client with the Request and Response
  const supabase = createMiddlewareClient({ req, res });
  
  try {
    // Try to refresh the session if it exists and is expired
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.expires_at && session.expires_at < Math.floor(Date.now() / 1000)) {
      console.log('Session expired, attempting to refresh...');
      await supabase.auth.refreshSession();
    }
  } catch (error) {
    console.error('Error in middleware:', error);
  }
  
  return res;
}

// Match all routes except static assets and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
