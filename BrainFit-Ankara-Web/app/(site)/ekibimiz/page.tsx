import Image from 'next/image'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'
import { prisma } from '@/lib/db'
import TestPromo from '@/components/site/TestPromo'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Ekibimiz | BrainFit Ankara' }

async function getTeam() {
  noStore()
  try {
    return await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  } catch {
    return []
  }
}

export default async function EkibimizPage() {
  const team = await getTeam()

  return (
    <div className="bf-reveal">
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,40px)]">
        <span className="text-[13px] font-semibold text-[#CE007F] tracking-widest uppercase">Ekibimiz</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4 max-w-[820px]">
          Çocuğunuzun gelişim yolculuğuna eşlik eden uzman ekip.
        </h1>
        <p className="text-[17px] text-[#6c6c68] leading-7 mt-5 max-w-[760px]">
          BrainFit Ankara'da ekip yapısı, değerlendirme, uygulama ve takip süreçlerinin birlikte çalıştığı bütünsel bir model üzerine kuruludur.
        </p>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(56px,7vw,90px)]">
        {team.length === 0 ? (
          <div className="text-center py-20 text-[#9a968c]">
            <p className="text-lg">Ekip üyeleri henüz eklenmedi.</p>
            <p className="text-sm mt-2">Admin panelinden ekip üyelerini ekleyebilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {team.map(m => (
              <div key={m.id} className="bf-card bg-white rounded-[22px] border border-[#efe9df] overflow-hidden flex flex-col">
                <div className="relative">
                  {m.imageUrl ? (
                    <Image src={m.imageUrl} alt={m.name} width={400} height={300} className="w-full aspect-[4/3] object-cover" />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-[#ece6db] flex flex-col items-center justify-center gap-2 text-[#a8a08f]">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.4"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="font-mono text-xs">Fotoğraf</span>
                    </div>
                  )}
                  <span className="absolute top-3.5 left-3.5 w-8 h-8 rounded-[9px] z-10" style={{ background: m.color }} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[13px] font-semibold text-[#9a968c]">{m.name || '[Ad Soyad eklenecek]'}</h3>
                  <p className="text-[18px] font-bold font-[Sora] text-[#23231f] mt-1">{m.role}</p>
                  <div className="flex flex-wrap gap-1.5 my-3.5">
                    {m.tags.split(',').filter(Boolean).map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full border border-[#efe9df] bg-[rgba(0,0,0,.03)]" style={{ color: m.color }}>{tag.trim()}</span>
                    ))}
                  </div>
                  <p className="text-sm text-[#7c7c76] leading-relaxed flex-1">{m.bio}</p>
                  <Link href="/iletisim" className="mt-4 self-start bg-[#F8F6F2] border border-[#e3ded5] text-[#23231f] font-semibold text-[13.5px] px-4 py-2.5 rounded-[10px]">
                    Randevu Al
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <TestPromo />
    </div>
  )
}
