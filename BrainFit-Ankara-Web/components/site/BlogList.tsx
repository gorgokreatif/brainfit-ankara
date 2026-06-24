'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Category { id: string; name: string; color: string }
interface Post {
  id: string; title: string; slug: string; excerpt: string
  imageUrl: string | null; category: Category
}

export default function BlogList({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? posts.filter(p => p.category.id === active) : posts

  return (
    <>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActive(null)}
            style={{ borderColor: active === null ? '#C8401C' : '#e3ded5', color: active === null ? '#C8401C' : '#3a3a38', fontWeight: active === null ? 700 : 500 }}
            className="bf-lift text-[13.5px] bg-white border px-4 py-2 rounded-full transition-colors"
          >
            Tümü
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id === active ? null : c.id)}
              style={{
                borderColor: active === c.id ? c.color : '#e3ded5',
                color: active === c.id ? '#fff' : '#3a3a38',
                background: active === c.id ? c.color : '#fff',
                fontWeight: active === c.id ? 700 : 500,
              }}
              className="bf-lift text-[13.5px] border px-4 py-2 rounded-full transition-all"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#9a968c]">
            <p className="text-lg">Bu kategoride yazı bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {filtered.map(b => (
              <Link key={b.id} href={`/blog/${b.slug}`} className="bf-card bg-white border border-[#efe9df] rounded-[20px] overflow-hidden flex flex-col">
                <div className="relative">
                  {b.imageUrl ? (
                    <Image src={b.imageUrl} alt={b.title} width={400} height={225} className="w-full aspect-[16/9] object-cover" />
                  ) : (
                    <div className="w-full aspect-[16/9] bg-[#ece6db] flex flex-col items-center justify-center gap-2 text-[#a8a08f]">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#bcb4a3" strokeWidth="1.4"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  <span className="absolute top-3.5 left-3.5 text-xs font-semibold px-2.5 py-1.5 rounded-full z-10" style={{ background: b.category.color, color: '#fff' }}>{b.category.name}</span>
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
      </div>
    </>
  )
}
