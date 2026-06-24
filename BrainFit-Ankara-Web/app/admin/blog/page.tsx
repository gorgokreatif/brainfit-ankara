'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  id: string; title: string; published: boolean; publishedAt: string | null;
  category: { name: string; color: string }; createdAt: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/blog')
    if (res.ok) setPosts(await res.json())
    setLoading(false)
  }

  async function del(id: string) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    load()
  }

  async function togglePublish(post: Post) {
    await fetch(`/api/admin/blog/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#23231f]">Blog Yazıları</h1>
        <Link href="/admin/blog/yeni" className="bg-[#51AD32] text-white px-4 py-2.5 rounded-[10px] font-semibold text-sm">
          + Yeni Yazı
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[#9a968c] py-8 text-center">Yükleniyor...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#e3ddd5] rounded-[16px]">
          <p className="text-[#9a968c] mb-3">Henüz yazı yok.</p>
          <Link href="/admin/blog/yeni" className="text-sm text-[#51AD32] font-semibold">İlk yazıyı oluştur →</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map(p => (
            <div key={p.id} className="bg-white border border-[#e3ddd5] rounded-[14px] p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-white px-2 py-0.5 rounded-full" style={{ background: p.category.color }}>{p.category.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.published ? '✓ Yayında' : 'Taslak'}
                  </span>
                </div>
                <p className="font-semibold text-[#23231f] text-sm truncate">{p.title}</p>
                <p className="text-xs text-[#9a968c] mt-0.5">{new Date(p.createdAt).toLocaleDateString('tr-TR')}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => togglePublish(p)} className={`px-3 py-1.5 text-xs rounded-[8px] border font-medium transition-colors ${p.published ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}>
                  {p.published ? 'Taslağa Al' : 'Yayınla'}
                </button>
                <Link href={`/admin/blog/${p.id}`} className="px-3 py-1.5 text-xs border border-[#e3ddd5] rounded-[8px] text-[#23231f] hover:border-[#51AD32] transition-colors">Düzenle</Link>
                <button onClick={() => del(p.id)} className="px-3 py-1.5 text-xs border border-red-200 rounded-[8px] text-red-500 hover:bg-red-50 transition-colors">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
