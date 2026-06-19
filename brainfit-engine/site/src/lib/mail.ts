import { Resend } from 'resend';

interface LeadData {
  name: string;
  phone: string;
  email: string;
  childAge: string;
  areaScores: Record<string, number>;
  answers: Record<string, number>;
}

function buildHtml(lead: LeadData): string {
  const areaLabels: Record<string, string> = {
    dikkat: 'Dikkat',
    isitsel: 'İşitsel İşlem',
    gorsel: 'Görsel İşlem',
    motor: 'Motor Koordinasyon',
    'sosyal-duygusal': 'Sosyal-Duygusal',
  };
  const maxScores: Record<string, number> = {
    dikkat: 8, isitsel: 4, gorsel: 8, motor: 4, 'sosyal-duygusal': 4,
  };

  const areaRows = Object.entries(lead.areaScores)
    .map(([area, score]) => {
      const max = maxScores[area] ?? 4;
      const pct = Math.round((score / max) * 100);
      const label = pct >= 60 ? 'Gelişime Açık Alan' : pct >= 30 ? 'Takip Edilebilir' : 'Güçlü Alan';
      const color = pct >= 60 ? '#e53e3e' : pct >= 30 ? '#E8893B' : '#1FA8A0';
      return `<tr>
        <td style="padding:6px 12px;font-weight:600;">${areaLabels[area] ?? area}</td>
        <td style="padding:6px 12px;">${score}/${max} (%${pct})</td>
        <td style="padding:6px 12px;color:${color};font-weight:600;">${label}</td>
      </tr>`;
    })
    .join('');

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#16202E;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#1F6FB2">Yeni Değerlendirme Başvurusu</h2>
  <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
    <tr><td style="padding:6px 12px;font-weight:600;width:180px">Ad Soyad</td><td style="padding:6px 12px">${lead.name}</td></tr>
    <tr style="background:#f4f7fb"><td style="padding:6px 12px;font-weight:600">Telefon</td><td style="padding:6px 12px">${lead.phone}</td></tr>
    <tr><td style="padding:6px 12px;font-weight:600">E-posta</td><td style="padding:6px 12px">${lead.email || '—'}</td></tr>
    <tr style="background:#f4f7fb"><td style="padding:6px 12px;font-weight:600">Çocuğun Yaşı</td><td style="padding:6px 12px">${lead.childAge}</td></tr>
  </table>
  <h3 style="color:#0E4C82">5 Alan Profil Özeti</h3>
  <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
    <tr style="background:#0E4C82;color:white">
      <th style="padding:8px 12px;text-align:left">Alan</th>
      <th style="padding:8px 12px;text-align:left">Puan</th>
      <th style="padding:8px 12px;text-align:left">Değerlendirme</th>
    </tr>
    ${areaRows}
  </table>
  <p style="font-size:12px;color:#666">Bu değerlendirme bir tanı aracı değildir. Ailenin gözlemlerine dayalı bir başlangıç profilidir.</p>
</body></html>`;
}

export async function sendLeadMail(lead: LeadData): Promise<{ ok: boolean; error?: string }> {
  const subject = `Yeni Değerlendirme — ${lead.name}`;
  const to = process.env.LEAD_TO_EMAIL ?? process.env.GMAIL_USER ?? 'ankara@brainfit.com.tr';
  const html = buildHtml(lead);

  // 1. Try Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: 'BrainFit Ankara <noreply@brainfitankara.com>',
        to,
        subject,
        html,
      });
      if (error) throw new Error(error.message);
      return { ok: true };
    } catch (e) {
      console.error('Resend error:', e);
    }
  }

  // 2. Nodemailer + Gmail SMTP fallback
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail({ from: process.env.GMAIL_USER, to, subject, html });
      return { ok: true };
    } catch (e) {
      console.error('Nodemailer error:', e);
      return { ok: false, error: 'Mail gönderilemedi.' };
    }
  }

  console.warn('No mail provider configured — lead data logged only:', JSON.stringify(lead));
  return { ok: true }; // Don't block UX if mail is not configured
}
