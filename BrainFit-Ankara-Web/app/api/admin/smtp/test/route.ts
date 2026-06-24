import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getTransporter } from '@/lib/email'
import { prisma } from '@/lib/db'

export async function POST() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  try {
    const smtp = await prisma.smtpSettings.findUnique({ where: { id: 'main' } })
    const transporter = await getTransporter()
    await transporter.sendMail({
      from: `"${smtp?.fromName}" <${smtp?.user}>`,
      to: smtp?.toEmail,
      subject: 'BrainFit Ankara — Test Maili',
      text: 'SMTP ayarları doğru çalışıyor.',
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
