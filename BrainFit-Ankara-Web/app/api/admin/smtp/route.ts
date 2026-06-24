import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const smtp = await prisma.smtpSettings.upsert({
    where: { id: 'main' },
    create: { id: 'main', updatedAt: new Date() },
    update: {},
  })
  return NextResponse.json({ ...smtp, password: smtp.password ? '••••••••' : '' })
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const data = await req.json()
  const existing = await prisma.smtpSettings.findUnique({ where: { id: 'main' } })
  const password = data.password === '••••••••' ? existing?.password ?? '' : data.password
  const smtp = await prisma.smtpSettings.upsert({
    where: { id: 'main' },
    create: { id: 'main', ...data, password, updatedAt: new Date() },
    update: { ...data, password, updatedAt: new Date() },
  })
  return NextResponse.json({ success: true, id: smtp.id })
}
