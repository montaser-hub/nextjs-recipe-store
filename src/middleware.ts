import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest){
    if(req.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/recipes', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/']
}