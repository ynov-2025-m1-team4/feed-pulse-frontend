import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();
  
  const isTokenValid = async (token: string) => {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY!);
      
      await jwtVerify(token, secret);
      return true;
    } catch {
      return false;
    }
  };
console.log("les isTokenValid est ", await isTokenValid(""));


  // Si l'utilisateur est connecté et essaie d'accéder à une route publique
  if (
    token &&
    (await isTokenValid(token)) &&
    PUBLIC_ROUTES.includes(url.pathname)
  ) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!token && !PUBLIC_ROUTES.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && !(await isTokenValid(token))) {
    const response = NextResponse.redirect(new URL("/Dashboard", request.url));
    // Supprimer le cookie 'token'
    response.cookies.set("token", "", {
      maxAge: 0, // expire immédiatement
      path: "/", // correspond au chemin du cookie original
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard/:path*", "/auth/:path*","/profile", "/"],
};
