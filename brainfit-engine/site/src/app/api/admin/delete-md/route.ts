import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get('admin_session')?.value;
  const password = process.env.ADMIN_PASSWORD;
  return !!(token && password && token === password);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  const body = await req.json() as { slug?: string };
  const slug = body.slug?.replace(/[^a-z0-9-]/g, '');

  if (!slug) return NextResponse.json({ error: 'slug zorunludur.' }, { status: 400 });

  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 404 });
  }

  try {
    fs.unlinkSync(filePath);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Dosya silinemedi.' }, { status: 500 });
  }
}
