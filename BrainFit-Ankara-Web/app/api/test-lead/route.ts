import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { sendTestLeadEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const lead = await prisma.testLead.create({
      data: {
        veliAdSoyad:    String(body.veliAdSoyad ?? '').slice(0, 200),
        telefon:        String(body.telefon ?? '').slice(0, 20),
        email:          String(body.email ?? '').slice(0, 200),
        testKiminIcin:  body.testKiminIcin ?? 'Çocuğum',
        cocukAd:        String(body.cocukAd ?? '').slice(0, 200),
        cocukYas:       body.cocukYas ? Number(body.cocukYas) : null,
        sehir:          String(body.sehir ?? '').slice(0, 100),
        kvkkOnay:       Boolean(body.kvkkOnay),
        veliOnay18Alti: Boolean(body.veliOnay18Alti),
        ageGroup:       String(body.ageGroup ?? '').slice(0, 10),
      },
    })
    return NextResponse.json({ id: lead.id })
  } catch (err) {
    console.error('[test-lead POST]', err)
    return NextResponse.json({ error: 'Kayıt başarısız.' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    const body = await req.json()

    // Admin status toggle — auth required
    if (body.adminToggle === true) {
      const session = await auth()
      if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      await prisma.testLead.update({
        where: { id },
        data: { completed: Boolean(body.completed) },
      })
      return NextResponse.json({ ok: true })
    }

    // Contact info update (before showing results)
    if (body.contact === true) {
      await prisma.testLead.update({
        where: { id },
        data: {
          telefon:  String(body.telefon ?? '').slice(0, 20),
          email:    String(body.email ?? '').slice(0, 200),
          kvkkOnay: Boolean(body.kvkkOnay),
        },
      })
      return NextResponse.json({ ok: true })
    }

    // Score update (after results shown) — send email
    const lead = await prisma.testLead.update({
      where: { id },
      data: {
        scores:      body.scores ?? undefined,
        rawMetrics:  body.rawMetrics ?? undefined,
        completed:   true,
        completedAt: new Date(),
      },
    })

    sendTestLeadEmail(lead).catch(e => console.error('[test-lead email]', e))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[test-lead PATCH]', err)
    return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })
    await prisma.testLead.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[test-lead DELETE]', err)
    return NextResponse.json({ error: 'Silme başarısız.' }, { status: 500 })
  }
}
