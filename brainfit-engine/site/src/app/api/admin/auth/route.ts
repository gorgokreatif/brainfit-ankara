import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.json() as { password?: string; action?: string };

  if (body.action === 'logout') {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
    return res;
  }

  const { password } = body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD env değişkeni ayarlanmamış.' }, { status: 503 });
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json({ error: 'Hatalı şifre.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', adminPassword, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
