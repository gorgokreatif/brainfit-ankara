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
