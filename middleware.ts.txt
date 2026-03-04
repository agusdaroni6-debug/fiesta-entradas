import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const auth = request.headers.get('authorization')

    if (!auth) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Panel Privado"' }
      })
    }

    const base64 = auth.split(' ')[1]
    const decoded = Buffer.from(base64, 'base64').toString()
    const [user, pass] = decoded.split(':')

    if (user !== 'admin' || pass !== 'AgusSuperClave2026') {
      return new NextResponse('Access denied', { status: 403 })
    }
  }

  return NextResponse.next()
}