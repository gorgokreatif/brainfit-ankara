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

export async function sendAppointmentEmails(data: {
  name: string
  email: string
  phone: string
  childAge: string
  preferredDate: string
  preferredTime: string
  note: string
  scores?: Record<string, number | null>
  calendarLink: string
}) {
  const smtp = await prisma.smtpSettings.findUnique({ where: { id: 'main' } })
  if (!smtp?.user || !smtp?.password || !smtp?.toEmail) return

  const transporter = await getTransporter()
  const scoreRows = data.scores
    ? Object.entries(data.scores).map(([k, v]) => `<tr><td style="padding:4px 12px;border:1px solid #eee"><b>${k}</b></td><td style="padding:4px 12px;border:1px solid #eee">${v !== null ? v : '—'}</td></tr>`).join('')
    : ''

  // Admin bildirimi
  await transporter.sendMail({
    from: `"${smtp.fromName}" <${smtp.user}>`,
    to: smtp.toEmail,
    subject: `📅 Yeni Rapor Randevusu — ${data.name} (${data.preferredDate} ${data.preferredTime})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#51AD32;border-bottom:2px solid #51AD32;padding-bottom:8px">Yeni Randevu Talebi</h2>
        <p><b>Ad Soyad:</b> ${data.name}</p>
        <p><b>E-posta:</b> ${data.email}</p>
        <p><b>Telefon:</b> ${data.phone || '—'}</p>
        <p><b>Çocuğun Yaşı:</b> ${data.childAge || '—'}</p>
        <p><b>Tercih Edilen Tarih:</b> ${data.preferredDate}</p>
        <p><b>Tercih Edilen Saat:</b> ${data.preferredTime}</p>
        ${data.note ? `<p><b>Not:</b> ${data.note}</p>` : ''}
        ${scoreRows ? `<h3>Test Sonuçları</h3><table style="border-collapse:collapse;font-size:13px">${scoreRows}</table>` : ''}
        <p style="margin-top:20px"><a href="${data.calendarLink}" style="background:#51AD32;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Google Calendar'a Ekle</a></p>
        <p style="color:#999;font-size:11px;margin-top:16px">BrainFit Ankara — otomatik bildirim</p>
      </div>
    `,
  })

  // Kullanıcı onay maili
  await transporter.sendMail({
    from: `"${smtp.fromName}" <${smtp.user}>`,
    to: data.email,
    subject: `Randevu Talebiniz Alındı — BrainFit Ankara`,
    html: `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#51AD32">Merhaba ${data.name}!</h2>
        <p>Rapor değerlendirme randevu talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.</p>
        <div style="background:#f8f6f2;border-radius:12px;padding:16px;margin:16px 0">
          <p style="margin:4px 0"><b>📅 Tercih Edilen Tarih:</b> ${data.preferredDate}</p>
          <p style="margin:4px 0"><b>🕐 Tercih Edilen Saat:</b> ${data.preferredTime}</p>
        </div>
        <p><a href="${data.calendarLink}" style="background:#51AD32;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Google Takvimine Ekle</a></p>
        <p style="color:#666;font-size:13px;margin-top:20px">Sorularınız için: <a href="mailto:info@brainfitankara.com">info@brainfitankara.com</a></p>
        <p style="color:#999;font-size:11px">BrainFit Ankara — Çankaya, Ankara</p>
      </div>
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
