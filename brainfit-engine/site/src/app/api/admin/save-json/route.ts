import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get('admin_session')?.value;
  const password = process.env.ADMIN_PASSWORD;
  return !!(token && password && token === password);
}

const ALLOWED_FILES = new Set([
  'site.json',
  'team.json',
  'home.json',
  'pages/disleksi.json',
  'pages/dehb.json',
  'pages/dikkat.json',
]);

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  const body = await req.json() as { file?: string; data?: unknown };
  const { file, data } = body;

  if (!file || !ALLOWED_FILES.has(file)) {
    return NextResponse.json({ error: 'Geçersiz dosya.' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src/content', file);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('JSON write error:', e);
    return NextResponse.json({ error: 'Dosya yazılamadı.' }, { status: 500 });
  }
}
