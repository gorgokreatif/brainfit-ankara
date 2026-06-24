import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export const metadata = { title: 'Blog | BrainFit Ankara' }

async function getData() {
  try {
    const [posts, categories] = await Promise.all([
      prisma.blogPost.findMany({ where: { published: true }, include: { category: true }, orderBy: { publishedAt: 'desc' } }),
      prisma.blogCategory.findMany({ orderBy: { name: 'asc' } }),
    ])
    return { posts, categories }
  } catch {
    return { posts: [], categories: [] }
  }
}

export default async function BlogPage() {
  const { posts, categories } = await getData()

  return (
    <div className="bf-reveal">
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)] pb-[clamp(24px,3vw,36px)]">
        <span className="text-[13px] font-semibold text-[#CE007F] tracking-widest uppercase">Blog</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4">Ebeveynler için zihin gelişimi rehberi.</h1>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map(c => (
              <span key={c.id} className="bf-lift text-[13.5px] font-medium text-[#3a3a38] bg-white border border-[#e3ded5] px-4 py-2 rounded-full">{c.name}</span>
            ))}
          </div>
        )}
      </section>
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(56px,7vw,90px)]">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-[#9a968c]">
            <p className="text-lg">Henüz blog yazısı yayınlanmadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {posts.map(b => (
              <Link key={b.id} href={`/blog/${b.slug}`} className="bf-card bg-white border border-[#efe9df] rounded-[20px] overflow-hidden flex flex-col">
                <div className="relative">
                  {b.imageUrl ? (
                    <Image src={b.imageUrl} alt={b.title} width={400} height={225} className="w-full aspect-[16/9] object-cover" />
                  ) : (
                    <div className="w-full aspect-[16/9] bg-[#ece6db] flex flex-col items-center justify-center gap-2 text-[#a8a08f]">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.4"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  <span className="absolute top-3.5 left-3.5 text-xs font-semibold text-white px-2.5 py-1.5 rounded-full z-10" style={{ background: b.category.color }}>{b.category.name}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[18px] font-bold leading-snug flex-1">{b.title}</h3>
                  {b.excerpt && <p className="text-sm text-[#6c6c68] mt-2 leading-relaxed">{b.excerpt}</p>}
                  <span className="font-semibold text-sm mt-4" style={{ color: b.category.color }}>Devamını oku →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
