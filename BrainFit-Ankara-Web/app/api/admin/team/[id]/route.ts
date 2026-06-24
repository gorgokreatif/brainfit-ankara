import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { id } = await params
  const data = await req.json()
  const member = await prisma.teamMember.update({ where: { id }, data })
  revalidatePath('/ekibimiz')
  return NextResponse.json(member)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { id } = await params
  await prisma.teamMember.delete({ where: { id } })
  revalidatePath('/ekibimiz')
  return NextResponse.json({ success: true })
}
