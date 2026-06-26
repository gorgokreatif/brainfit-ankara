import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file || !file.name) return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Dosya boyutu 10 MB sınırını aşıyor' }, { status: 400 })

    const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
    const ALLOWED_EXT = /\.(jpe?g|png|webp|gif|svg)$/i
    if (!ALLOWED_MIME.has(file.type) || !ALLOWED_EXT.test(file.name)) {
      return NextResponse.json({ error: 'Yalnızca resim dosyaları yüklenebilir (JPEG, PNG, WebP, GIF, SVG).' }, { status: 400 })
    }

    const blob = await put(file.name, file, { access: 'public', addRandomSuffix: true })

    await prisma.mediaFile.create({
      data: {
        url: blob.url,
        filename: file.name,
        size: file.size,
        mimeType: file.type || 'image/jpeg',
      },
    })

    console.log('[upload] success:', blob.url)
    return NextResponse.json({ url: blob.url })
  } catch (err) {
    console.error('[upload] error:', err)
    return NextResponse.json({ error: 'Yükleme başarısız. Vercel Blob bağlantısını kontrol edin.' }, { status: 500 })
  }
}
