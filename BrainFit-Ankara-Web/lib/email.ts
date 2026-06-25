import nodemailer from 'nodemailer'
import { prisma } from './db'

export async function getTransporter() {
  const smtp = await prisma.smtpSettings.findUnique({ where: { id: 'main' } })
  if (!smtp || !smtp.user || !smtp.password) throw new Error('SMTP ayarları eksik')
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: false,
    auth: { user: smtp.user, pass: smtp.password },
  })
}

export async function sendTestLeadEmail(lead: {
  veliAdSoyad: string
  telefon: string
  email: string
  testKiminIcin: string
  cocukAd: string
  cocukYas: number | null
  ageGroup: string
  scores: unknown
}) {
  const smtp = await prisma.smtpSettings.findUnique({ where: { id: 'main' } })
  if (!smtp?.user || !smtp?.password || !smtp?.toEmail) return

  const transporter = await getTransporter()
  const scores = lead.scores as Record<string, number | null> | null
  const scoreRows = scores
    ? Object.entries(scores).map(([k, v]) => `<tr><td style="padding:4px 8px"><b>${k}</b></td><td style="padding:4px 8px">${v !== null ? v : 'ölçülemedi'}</td></tr>`).join('')
    : '<tr><td colspan="2">Henüz tamamlanmadı</td></tr>'

  await transporter.sendMail({
    from: `"${smtp.fromName}" <${smtp.user}>`,
    to: smtp.toEmail,
    subject: `Yeni Mini Test Sonucu — ${lead.veliAdSoyad}`,
    html: `
      <h2 style="color:#51AD32">BrainFit Ankara — Yeni Mini Test Lead</h2>
      <p><b>Ad Soyad:</b> ${lead.veliAdSoyad}</p>
      <p><b>Telefon:</b> ${lead.telefon}</p>
      <p><b>E-posta:</b> ${lead.email}</p>
      <p><b>Test Kimin İçin:</b> ${lead.testKiminIcin}</p>
      <p><b>Çocuk Adı:</b> ${lead.cocukAd || '—'}</p>
      <p><b>Yaş:</b> ${lead.cocukYas ?? '—'}</p>
      <p><b>Yaş Grubu:</b> ${lead.ageGroup}</p>
      <h3>Sonuçlar</h3>
      <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        ${scoreRows}
      </table>
      <p style="margin-top:16px;color:#666;font-size:12px">Bu e-posta BrainFit Ankara Mini Test sistemi tarafından otomatik gönderilmiştir.</p>
    `,
  })
}

export async function sendContactEmail(data: {
  name: string
  phone: string
  email: string
  childAge: string
  interest: string
  message: string
}) {
  const smtp = await prisma.smtpSettings.findUnique({ where: { id: 'main' } })
  if (!smtp?.user || !smtp?.password || !smtp?.toEmail) return

  const transporter = await getTransporter()
  await transporter.sendMail({
    from: `"${smtp.fromName}" <${smtp.user}>`,
    to: smtp.toEmail,
    subject: `Yeni Ön Görüşme Talebi — ${data.name}`,
    html: `
      <h2>Yeni İletişim Formu</h2>
      <p><b>Ad Soyad:</b> ${data.name}</p>
      <p><b>Telefon:</b> ${data.phone}</p>
      <p><b>E-posta:</b> ${data.email}</p>
      <p><b>Çocuğun Yaşı:</b> ${data.childAge}</p>
      <p><b>İlgilenilen Alan:</b> ${data.interest}</p>
      <p><b>Mesaj:</b><br>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  })
}
