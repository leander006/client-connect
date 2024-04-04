import { NextRequest, NextResponse } from 'next/server';



export async function middleware(req: NextRequest) {

      const path = req.nextUrl.pathname
      const token= req.cookies.get("__Secure-next-auth.session-token")?.value || req.cookies.get("next-auth.session-token")?.value ;
      const isPublic = path == "/login"

      if(isPublic && token){
            return NextResponse.redirect(new URL("/home",req.nextUrl))
      }

      if(!isPublic && !token){
            return NextResponse.redirect(new URL("/login",req.nextUrl))
      }


}

export const config = {
    matcher: ['/', '/login','/home','/invite',"/profile",'/user/:path*']
};



