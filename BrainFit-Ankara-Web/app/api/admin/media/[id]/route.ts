import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  try {
    const { id } = await params
    await prisma.mediaFile.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[media DELETE] error:', err)
    return NextResponse.json({ error: 'Silinemedi.' }, { status: 500 })
  }
}
