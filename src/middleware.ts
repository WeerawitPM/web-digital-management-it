import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request: any) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // If the pathname starts with /protected and the user is not an admin, redirect to the home page
  if (pathname.startsWith('/signin') && (user)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/user') && (!user || user.status == "Not Active")) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/user') && (user?.role != "user")) {
    return NextResponse.redirect(new URL(`/${user?.role}`, request.url))
  }

  if (pathname.startsWith('/manager') && (!user || user.status == "Not Active")) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/manager') && (user?.role != "manager")) {
    return NextResponse.redirect(new URL(`/${user?.role}`, request.url))
  }

  if (pathname.startsWith('/it-manager') && (!user || user.status == "Not Active")) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/it-manager') && (user?.role != "it-manager")) {
    return NextResponse.redirect(new URL(`/${user?.role}`, request.url))
  }

  if (pathname.startsWith('/super-manager') && (!user || user.status == "Not Active")) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/super-manager') && (user?.role != "super-manager")) {
    return NextResponse.redirect(new URL(`/${user?.role}`, request.url))
  }

  if (pathname.startsWith('/admin') && (!user || user.role == "Not Active")) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/admin') && (user?.role != "admin")) {
    return NextResponse.redirect(new URL(`/${user?.role}`, request.url))
  }

  // Continue with the request if the user is an admin or the route is not protected
  return NextResponse.next()
}