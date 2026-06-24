import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'main' },
      create: { id: 'main', updatedAt: new Date() },
      update: {},
    })
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({})
  }
}
