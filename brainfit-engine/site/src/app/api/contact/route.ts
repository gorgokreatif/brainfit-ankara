import { NextRequest, NextResponse } from 'next/server';
import { sendLeadMail } from '@/lib/mail';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 10 * 60 * 1000;
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Çok fazla istek. Lütfen bekleyin.' }, { status: 429 });
  }

  let body: { name?: string; phone?: string; email?: string; message?: string; website?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const { name, phone } = body;
  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Ad ve telefon zorunludur.' }, { status: 422 });
  }

  const result = await sendLeadMail({
    name: name.trim(),
    phone: phone.trim(),
    email: body.email?.trim() ?? '',
    childAge: '—',
    areaScores: {},
    answers: {},
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? 'Bir hata oluştu.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
