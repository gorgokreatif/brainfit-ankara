import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  try {
    const files = await prisma.mediaFile.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(files)
  } catch (err) {
    console.error('[media GET] error:', err)
    return NextResponse.json({ error: 'Medya listesi alınamadı.' }, { status: 500 })
  }
}
