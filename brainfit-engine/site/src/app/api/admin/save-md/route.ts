import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get('admin_session')?.value;
  const password = process.env.ADMIN_PASSWORD;
  return !!(token && password && token === password);
}

function sanitizeSlug(slug: string): string {
  return slug.replace(/[^a-z0-9-]/g, '').slice(0, 100);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Yetkisiz.' }, { status: 401 });
  }

  const body = await req.json() as {
    slug?: string;
    title?: string;
    description?: string;
    date?: string;
    cover?: string;
    tags?: string;
    content?: string;
  };

  const { title, description, date, cover, tags, content } = body;
  const slug = sanitizeSlug(body.slug ?? '');

  if (!slug || !title || !date) {
    return NextResponse.json({ error: 'slug, title ve date zorunludur.' }, { status: 400 });
  }

  const tagList = (tags ?? '').split(',').map((t: string) => t.trim()).filter(Boolean);

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${(description ?? '').replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `cover: "${cover ?? '/images/blog-placeholder.jpg'}"`,
    `tags: [${tagList.map((t: string) => `"${t}"`).join(', ')}]`,
    '---',
    '',
  ].join('\n');

  const fullContent = frontmatter + (content ?? '');
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.md`);

  try {
    fs.writeFileSync(filePath, fullContent, 'utf8');
    return NextResponse.json({ ok: true, slug });
  } catch (e) {
    console.error('MD write error:', e);
    return NextResponse.json({ error: 'Dosya yazılamadı.' }, { status: 500 });
  }
}
