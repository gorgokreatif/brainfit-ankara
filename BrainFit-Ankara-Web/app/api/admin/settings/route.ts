import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    create: { id: 'main', updatedAt: new Date() },
    update: {},
  })
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const data = await req.json()
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    create: { id: 'main', ...data, updatedAt: new Date() },
    update: { ...data, updatedAt: new Date() },
  })
  return NextResponse.json(settings)
}
