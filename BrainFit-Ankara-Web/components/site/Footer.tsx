import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'

async function getSettings() {
  try {
    return await prisma.siteSettings.upsert({
      where: { id: 'main' },
      create: { id: 'main', updatedAt: new Date() },
      update: {},
    })
  } catch {
    return null
  }
}

export default async function Footer() {
  const settings = await getSettings()

  return (
    <footer className="bg-[#23231f] text-[#cfcabf] mt-0">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Image src="/images/logo.png" alt="BrainFit Ankara" width={293} height={26} style={{ height: 26, width: 'auto', filter: 'brightness(1.15)', marginBottom: 18 }} />
          <p className="text-sm leading-7 text-[#a8a397] max-w-xs">
            BrainFit Ankara, çocukların öğrenme, dikkat, odaklanma ve bilişsel gelişim süreçlerini bilimsel değerlendirme ve kişiye özel egzersiz programlarıyla destekleyen bütünsel bir zihin gelişim merkezidir.
          </p>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase text-white mb-4">Keşfet</h4>
          <div className="flex flex-col gap-3 text-sm">
            {[['/', 'Anasayfa'], ['/biz-kimiz', 'Biz Kimiz?'], ['/ekibimiz', 'Ekibimiz'], ['/ne-yapiyoruz', 'Ne Yapıyoruz?'], ['/nasil-yapiyoruz', 'Nasıl Yapıyoruz?'], ['/blog', 'Blog']].map(([href, label]) => (
              <Link key={href} href={href} className="text-[#cfcabf] hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase text-white mb-4">Programlar</h4>
          <div className="flex flex-col gap-3 text-sm">
            {[['junior', 'BrainFit Junior'], ['scholar', 'BrainFit Scholar'], ['dehb', 'DEHB'], ['disleksi', 'Disleksi'], ['cog-map', 'Cog-Map Check-Up']].map(([slug, label]) => (
              <Link key={slug} href={slug === 'cog-map' ? '/cog-map' : `/programlar/${slug}`} className="text-[#cfcabf] hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-widest uppercase text-white mb-4">İletişim</h4>
          <div className="flex flex-col gap-3 text-sm text-[#a8a397]">
            {settings?.phone && <span>Telefon: {settings.phone}</span>}
            {settings?.email && <span>E-posta: {settings.email}</span>}
            {settings?.address && <span>{settings.address}</span>}
            {settings?.hours && <span>{settings.hours}</span>}
            {!settings?.phone && !settings?.email && (
              <span className="text-[#686560]">İletişim bilgileri henüz eklenmedi</span>
            )}
            <Link href="/iletisim" className="bf-lift bg-[#51AD32] text-white px-4 py-2.5 rounded-[9px] font-semibold mt-1.5 w-fit text-sm">
              Ön Görüşme Al
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#36352f]">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex justify-between gap-4 flex-wrap text-xs text-[#86826f]">
          <span>© 2026 BrainFit Ankara. Tüm hakları saklıdır.</span>
          <div className="flex gap-5">
            <span>KVKK</span>
            <span>Gizlilik Politikası</span>
            <span>Çerez Politikası</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
