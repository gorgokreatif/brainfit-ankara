import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { cache } from 'react'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brainfitankara.com'

type Props = { params: Promise<{ slug: string }> }

// React.cache: generateMetadata ve sayfa aynı istekte tek sorgu atar
const getPost = cache(async (slug: string) => {
  try {
    return await prisma.blogPost.findUnique({
      where: { slug, published: true },
      include: { category: true },
    })
  } catch { return null }
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const desc = post.excerpt || post.content.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').slice(0, 160)
  const tags = post.tags.split(',').map(t => t.trim()).filter(Boolean)

  return {
    title: `${post.title} | BrainFit Ankara`,
    description: desc,
    keywords: tags.join(', '),
    openGraph: {
      title: post.title,
      description: desc,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: ['BrainFit Ankara'],
      tags,
      images: post.imageUrl ? [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: desc,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const [relatedPosts, recentPosts, categories] = await Promise.all([
    prisma.blogPost
      .findMany({
        where: { categoryId: post.categoryId, published: true, slug: { not: slug } },
        include: { category: true },
        take: 3,
        orderBy: { publishedAt: 'desc' },
      })
      .catch(() => []),
    prisma.blogPost
      .findMany({
        where: { published: true, slug: { not: slug } },
        include: { category: true },
        take: 4,
        orderBy: { publishedAt: 'desc' },
      })
      .catch(() => []),
    prisma.blogCategory.findMany().catch(() => []),
  ])

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  // JSON-LD: Article + Breadcrumb (GEO — yapay zeka arama motorları için)
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    ...(post.imageUrl && { image: [post.imageUrl] }),
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Organization', name: 'BrainFit Ankara', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'BrainFit Ankara', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
    keywords: post.tags,
    articleSection: post.category.name,
    inLanguage: 'tr-TR',
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="bf-reveal">
        {/* Breadcrumb */}
        <div className="border-b border-[#efe9df] bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[#9a968c] overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-[#23231f] transition-colors shrink-0">Anasayfa</Link>
              <span className="shrink-0">/</span>
              <Link href="/blog" className="hover:text-[#23231f] transition-colors shrink-0">Blog</Link>
              <span className="shrink-0">/</span>
              <span className="text-[#23231f] font-medium truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Ana grid */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[clamp(32px,5vw,56px)]">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">

            {/* ─── Makale ─── */}
            <article>
              <header className="mb-7">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs font-bold text-white px-2.5 py-1.5 rounded-full" style={{ background: post.category.color }}>
                    {post.category.name}
                  </span>
                  {formattedDate && (
                    <time dateTime={post.publishedAt?.toISOString()} className="text-sm text-[#9a968c]">
                      {formattedDate}
                    </time>
                  )}
                </div>
                <h1 className="text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.1] text-[#23231f]">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-[17px] text-[#6c6c68] leading-relaxed mt-4 max-w-[640px]">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {/* Kapak görseli */}
              {post.imageUrl && (
                <div className="relative w-full aspect-video rounded-[20px] overflow-hidden mb-8 border border-[#e3ded5] shadow-[0_8px_30px_rgba(0,0,0,.07)]">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, calc(100vw - 380px)"
                  />
                </div>
              )}

              {/* İçerik */}
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />

              {/* Etiketler */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[#efe9df]">
                  {post.tags.split(',').filter(Boolean).map((tag: string) => (
                    <span key={tag} className="text-xs font-medium text-[#6c6c68] bg-[#F8F6F2] border border-[#efe9df] px-3 py-1.5 rounded-full">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Alt bar: geri + paylaş */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#efe9df] flex-wrap gap-4">
                <Link href="/blog" className="text-sm font-semibold text-[#6c6c68] hover:text-[#23231f] transition-colors flex items-center gap-1.5">
                  ← Blog&apos;a Dön
                </Link>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title}\n${SITE_URL}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-2 rounded-[10px] hover:bg-[#dcfce7] transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp&apos;ta Paylaş
                </a>
              </div>

              {/* Mobil CTA (sidebar sadece lg'de) */}
              <div className="lg:hidden mt-8 rounded-[18px] p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#51AD32,#61CE70)' }}>
                <span className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
                <p className="text-white font-extrabold text-[17px] leading-snug relative">Çocuğunuz için ücretsiz ön görüşme</p>
                <p className="text-white/80 text-sm mt-1.5 relative">Cog-Map değerlendirmesi hakkında bilgi alın.</p>
                <Link href="/iletisim" className="mt-4 inline-block bg-white text-[#23231f] font-bold text-sm px-5 py-2.5 rounded-[10px] hover:bg-white/95 transition-colors relative">
                  Randevu Talep Et →
                </Link>
              </div>

              {/* İlgili yazılar */}
              {relatedPosts.length > 0 && (
                <section className="mt-14 pt-10 border-t border-[#efe9df]">
                  <h2 className="text-[22px] font-bold text-[#23231f] mb-6">
                    İlgili Yazılar
                    <span className="text-sm font-normal text-[#9a968c] ml-2">— {post.category.name}</span>
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-5">
                    {relatedPosts.map((rp: {
                      id: string; slug: string; title: string; imageUrl: string | null;
                      publishedAt: Date | null; category: { name: string; color: string }
                    }) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="group bg-white border border-[#efe9df] rounded-[18px] overflow-hidden hover:shadow-[0_8px_28px_rgba(0,0,0,.09)] transition-all">
                        {rp.imageUrl ? (
                          <div className="relative aspect-video overflow-hidden">
                            <Image src={rp.imageUrl} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 260px" />
                          </div>
                        ) : (
                          <div className="aspect-video flex items-center justify-center" style={{ background: `${rp.category.color}1a` }}>
                            <span className="w-10 h-10 rounded-[12px]" style={{ background: rp.category.color }} />
                          </div>
                        )}
                        <div className="p-4">
                          <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: rp.category.color }}>{rp.category.name}</span>
                          <h3 className="text-[14px] font-semibold text-[#23231f] mt-2 leading-snug group-hover:text-[#51AD32] transition-colors line-clamp-2">{rp.title}</h3>
                          {rp.publishedAt && (
                            <p className="text-[11px] text-[#9a968c] mt-1.5">
                              {new Date(rp.publishedAt).toLocaleDateString('tr-TR', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* ─── Sidebar (lg+) ─── */}
            <aside className="hidden lg:flex flex-col gap-5 lg:sticky lg:top-24 self-start">
              {/* CTA */}
              <div className="rounded-[20px] p-6 overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#51AD32,#61CE70)' }}>
                <span className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
                <p className="text-white font-extrabold text-[18px] leading-snug relative">Çocuğunuz için ücretsiz ön görüşme</p>
                <p className="text-white/80 text-[13px] mt-2 leading-relaxed relative">Cog-Map değerlendirmesi ve kişiye özel gelişim planı hakkında bilgi alın.</p>
                <Link href="/iletisim" className="mt-4 block bg-white text-[#23231f] text-center font-bold text-sm py-2.5 rounded-[11px] relative hover:bg-white/95 transition-colors">
                  Randevu Talep Et →
                </Link>
              </div>

              {/* Son yazılar */}
              {recentPosts.length > 0 && (
                <div className="bg-white border border-[#efe9df] rounded-[20px] p-5">
                  <h3 className="font-bold text-[#23231f] text-[15px] pb-3 border-b border-[#efe9df] mb-4">Son Yazılar</h3>
                  <div className="flex flex-col gap-4">
                    {recentPosts.map((rp: {
                      id: string; slug: string; title: string; imageUrl: string | null;
                      publishedAt: Date | null; category: { color: string }
                    }) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-3 items-start">
                        {rp.imageUrl ? (
                          <div className="relative w-[68px] h-[50px] rounded-[9px] overflow-hidden flex-shrink-0 border border-[#efe9df]">
                            <Image src={rp.imageUrl} alt="" fill className="object-cover" sizes="68px" />
                          </div>
                        ) : (
                          <div className="w-[68px] h-[50px] rounded-[9px] flex-shrink-0 flex items-center justify-center" style={{ background: `${rp.category.color}1a` }}>
                            <span className="w-5 h-5 rounded-[6px]" style={{ background: rp.category.color }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[#23231f] leading-snug group-hover:text-[#51AD32] transition-colors line-clamp-2">{rp.title}</p>
                          {rp.publishedAt && (
                            <p className="text-[11px] text-[#9a968c] mt-1">
                              {new Date(rp.publishedAt).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Kategoriler */}
              {categories.length > 0 && (
                <div className="bg-white border border-[#efe9df] rounded-[20px] p-5">
                  <h3 className="font-bold text-[#23231f] text-[15px] pb-3 border-b border-[#efe9df] mb-4">Kategoriler</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat: { id: string; name: string; color: string }) => (
                      <Link key={cat.id} href={`/blog?kategori=${cat.id}`} className="text-[12px] font-bold text-white px-3 py-1.5 rounded-full hover:opacity-75 transition-opacity" style={{ background: cat.color }}>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Program linkleri */}
              <div className="bg-[#23231f] rounded-[20px] p-5">
                <h3 className="font-bold text-white text-[14px] mb-4">Programlarımız</h3>
                <nav className="flex flex-col gap-2.5">
                  {[
                    { href: '/cog-map', label: 'Cog-Map Zihin Check-Up' },
                    { href: '/programlar/junior', label: 'BrainFit Junior (4–6 yaş)' },
                    { href: '/programlar/scholar', label: 'BrainFit Scholar (6–18 yaş)' },
                    { href: '/programlar/dehb', label: 'DEHB Programı' },
                    { href: '/programlar/disleksi', label: 'Disleksi Programı' },
                  ].map(l => (
                    <Link key={l.href} href={l.href} className="text-[12.5px] text-[#cfcabf] hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#51AD32] shrink-0" />
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
