import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        status: { not: 'cancelled' },
      },
      select: { preferredDate: true, preferredTime: true },
    })

    const booked = appointments.map(a => `${a.preferredDate}|${a.preferredTime}`)
    return NextResponse.json({ booked })
  } catch {
    return NextResponse.json({ booked: [] })
  }
}
