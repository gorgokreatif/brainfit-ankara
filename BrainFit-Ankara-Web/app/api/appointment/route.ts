import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendAppointmentEmails } from '@/lib/email'

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, '')
  if (digits.length === 12 && digits.startsWith('90')) return `+90${digits.slice(2)}`
  if (digits.length === 11 && digits.startsWith('0')) return `+90${digits.slice(1)}`
  if (digits.length === 10 && digits.startsWith('5')) return `+90${digits}`
  if (raw.startsWith('+') && digits.length === 12 && digits.startsWith('90')) return `+${digits}`
  return raw
}

function buildCalendarLink(date: string, time: string, name: string) {
  const [day, month, year] = date.split('.')
  const [hour, min] = time.split(':')
  const start = `${year}${month}${day}T${hour}${min}00`
  const endHour = String(Number(hour) + 1).padStart(2, '0')
  const end = `${year}${month}${day}T${endHour}${min}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `BrainFit Ankara — Rapor Değerlendirme (${name})`,
    dates: `${start}/${end}`,
    details: 'Mini Test raporu değerlendirme görüşmesi. BrainFit Ankara ekibi sizi arayacak.',
    location: 'Çankaya, Ankara / Telefon',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, childName, childAge, preferredDate, preferredTime, note, scores } = body

    if (!name || !email || !phone || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: 'Ad, e-posta, telefon, tarih ve saat zorunludur.' }, { status: 400 })
    }

    const normalizedPhone = normalizePhone(String(phone))
    const calendarLink = buildCalendarLink(preferredDate, preferredTime, name)

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone: normalizedPhone,
        childName: childName || '',
        childAge: childAge || '',
        preferredDate,
        preferredTime,
        note: note || '',
        scores: scores || null,
        source: body.source || 'result-page',
      },
    })

    await sendAppointmentEmails({ name, email, phone: normalizedPhone, childAge, preferredDate, preferredTime, note, scores, calendarLink }).catch(e => console.error('[appointment email]', e))

    return NextResponse.json({ ok: true, id: appointment.id, calendarLink })
  } catch (err) {
    console.error('[appointment]', err)
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
}
