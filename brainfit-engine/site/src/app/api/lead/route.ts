import { NextRequest, NextResponse } from 'next/server';
import { sendLeadMail } from '@/lib/mail';

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 10 * 60 * 1000; // 10 minutes
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

  let body: {
    name?: string;
    phone?: string;
    email?: string;
    childAge?: string;
    areaScores?: Record<string, number>;
    answers?: Record<string, number>;
    website?: string; // honeypot
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
  }

  // Honeypot check
  if (body.website) {
    return NextResponse.json({ ok: true }); // Silently discard bots
  }

  const { name, phone, childAge, areaScores, answers } = body;

  if (!name?.trim() || !phone?.trim() || !childAge?.trim()) {
    return NextResponse.json({ error: 'Lütfen zorunlu alanları doldurun.' }, { status: 422 });
  }

  const result = await sendLeadMail({
    name: name.trim(),
    phone: phone.trim(),
    email: body.email?.trim() ?? '',
    childAge: childAge.trim(),
    areaScores: areaScores ?? {},
    answers: answers ?? {},
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? 'Bir hata oluştu.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
