import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Ad ve e-posta zorunludur' }, { status: 400 })
    }
    await sendContactEmail(data)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ error: 'Mail gönderilemedi' }, { status: 500 })
  }
}
