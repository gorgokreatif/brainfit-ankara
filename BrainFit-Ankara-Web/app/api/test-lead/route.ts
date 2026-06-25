import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendTestLeadEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const lead = await prisma.testLead.create({
      data: {
        veliAdSoyad:    body.veliAdSoyad ?? '',
        telefon:        body.telefon ?? '',
        email:          body.email ?? '',
        testKiminIcin:  body.testKiminIcin ?? 'Çocuğum',
        cocukAd:        body.cocukAd ?? '',
        cocukYas:       body.cocukYas ? Number(body.cocukYas) : null,
        sehir:          body.sehir ?? '',
        kvkkOnay:       Boolean(body.kvkkOnay),
        veliOnay18Alti: Boolean(body.veliOnay18Alti),
        ageGroup:       body.ageGroup ?? '',
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

    // Contact info update (before showing results)
    if (body.contact === true) {
      await prisma.testLead.update({
        where: { id },
        data: {
          telefon:  body.telefon ?? '',
          email:    body.email ?? '',
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
