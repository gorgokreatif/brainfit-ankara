'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Category { id: string; name: string; color: string }
interface PostData {
  title: string; slug: string; content: string; excerpt: string;
  imageUrl: string; categoryId: string; tags: string; published: boolean;
}

const empty: PostData = {
  title: '', slug: '', content: '', excerpt: '',
  imageUrl: '', categoryId: '', tags: '', published: false,
}

function slugify(text: string) {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function BlogEditor({ postId }: { postId?: string }) {
  const [data, setData] = useState<PostData>(empty)
  const [cats, setCats] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/categories').then(r => r.json()).then(setCats).catch(() => {})
    if (postId) {
      fetch(`/api/admin/blog/${postId}`).then(r => r.json()).then(d => setData({
        title: d.title, slug: d.slug, content: d.content, excerpt: d.excerpt || '',
        imageUrl: d.imageUrl || '', categoryId: d.categoryId, tags: d.tags || '', published: d.published,
      }))
    }
  }, [postId])

  function setField<K extends keyof PostData>(key: K, value: PostData[K]) {
    setData(d => ({ ...d, [key]: value }))
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const d = await res.json()
    setUploading(false)
    if (d.url) setField('imageUrl', d.url)
  }

  async function save(publish?: boolean) {
    setLoading(true)
    const payload = { ...data, published: publish !== undefined ? publish : data.published }
    const method = postId ? 'PUT' : 'POST'
    const url = postId ? `/api/admin/blog/${postId}` : '/api/admin/blog'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    if (res.ok) router.push('/admin/blog')
  }

  const inputCls = 'p-3 border border-[#e3ddd5] rounded-[10px] text-sm font-normal outline-none focus:border-[#51AD32] bg-white'

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#23231f]">{postId ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}</h1>
        <div className="flex gap-2">
          <button onClick={() => setPreview(v => !v)} className="border border-[#e3ddd5] px-4 py-2 rounded-[9px] text-sm font-medium">
            {preview ? 'Düzenle' : 'Önizle'}
          </button>
          <button onClick={() => save(false)} disabled={loading} className="border border-[#e3ddd5] px-4 py-2 rounded-[9px] text-sm font-medium disabled:opacity-60">Taslak Kaydet</button>
          <button onClick={() => save(true)} disabled={loading} className="bg-[#51AD32] text-white px-4 py-2 rounded-[9px] text-sm font-semibold disabled:opacity-60">
            {loading ? 'Kaydediliyor...' : 'Yayınla'}
          </button>
        </div>
      </div>

      {preview ? (
        <div className="bg-white border border-[#e3ddd5] rounded-[20px] p-8">
          <h2 className="text-3xl font-bold mb-4">{data.title || 'Başlık yok'}</h2>
          {data.imageUrl && <img src={data.imageUrl} alt="" className="w-full rounded-[14px] mb-6 aspect-video object-cover" />}
          <div className="prose max-w-none" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{data.content}</div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#e3ddd5] rounded-[16px] p-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                Başlık
                <input
                  value={data.title}
                  onChange={e => { setField('title', e.target.value); if (!postId) setField('slug', slugify(e.target.value)) }}
                  placeholder="Yazı başlığı..."
                  className={inputCls + ' text-base font-medium'}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                Özet (Arama sonuçlarında görünür)
                <textarea rows={2} value={data.excerpt} onChange={e => setField('excerpt', e.target.value)} placeholder="Kısa bir özet..." className={inputCls + ' resize-none'} />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                İçerik
                <textarea
                  rows={18}
                  value={data.content}
                  onChange={e => setField('content', e.target.value)}
                  placeholder="Yazı içeriğini buraya girin..."
                  className={inputCls + ' resize-none font-mono text-[13px] leading-relaxed'}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white border border-[#e3ddd5] rounded-[16px] p-5 flex flex-col gap-4">
              <h3 className="font-semibold text-sm text-[#23231f]">Yayın Ayarları</h3>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                Kategori
                <select value={data.categoryId} onChange={e => setField('categoryId', e.target.value)} className={inputCls}>
                  <option value="">Kategori seçin...</option>
                  {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                SEO Etiketleri <span className="font-normal text-[#9a968c]">(virgülle ayırın)</span>
                <input value={data.tags} onChange={e => setField('tags', e.target.value)} placeholder="dikkat, dehb, çocuk" className={inputCls} />
              </label>
              <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
                URL Slug
                <input value={data.slug} onChange={e => setField('slug', e.target.value)} className={inputCls + ' font-mono text-xs'} />
              </label>
            </div>

            <div className="bg-white border border-[#e3ddd5] rounded-[16px] p-5 flex flex-col gap-3">
              <h3 className="font-semibold text-sm text-[#23231f]">Kapak Görseli</h3>
              {data.imageUrl && <img src={data.imageUrl} alt="" className="w-full rounded-[10px] aspect-video object-cover" />}
              <input ref={fileRef} type="file" accept="image/*" onChange={uploadImage} className="hidden" />
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="border border-[#e3ddd5] py-2 rounded-[9px] text-sm font-medium text-[#23231f] disabled:opacity-60">
                {uploading ? 'Yükleniyor...' : data.imageUrl ? 'Görseli Değiştir' : 'Görsel Yükle'}
              </button>
              {data.imageUrl && (
                <button onClick={() => setField('imageUrl', '')} className="text-xs text-red-400 hover:text-red-600">Görseli Kaldır</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
