import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const images = await prisma.pageImage.findMany()
  return NextResponse.json(images)
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { key, url, altText } = await req.json()
  if (!key) return NextResponse.json({ error: 'key gerekli' }, { status: 400 })
  const img = await prisma.pageImage.upsert({
    where: { key },
    create: { key, url: url || '', altText: altText || '', updatedAt: new Date() },
    update: { url: url || '', altText: altText || '', updatedAt: new Date() },
  })
  revalidatePath('/', 'layout')
  revalidatePath('/programlar', 'layout')
  return NextResponse.json(img)
}
