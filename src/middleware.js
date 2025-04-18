import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchRestful } from './services/fetchRestful';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token');
    console.log(token);
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    const user = await fetchRestful({
        endpoint: "user/me",
        method: "GET",
        token: token.value
    });
    console.log(user);
    if (!user.success) {
        cookiesStore.delete('token');
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}