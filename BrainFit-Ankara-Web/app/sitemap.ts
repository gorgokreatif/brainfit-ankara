import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brainfitankara.com'

const staticRoutes = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/biz-kimiz', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/ne-yapiyoruz', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/nasil-yapiyoruz', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/cog-map', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/programlar', priority: 0.9, changeFrequency: 'monthly' as const },
  { url: '/programlar/junior', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/programlar/scholar', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/programlar/dehb', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/programlar/disleksi', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/iletisim', priority: 0.7, changeFrequency: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = []

  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    })

    blogEntries = posts.map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch { /* DB erişimi yoksa statik sayfalara devam et */ }

  return [
    ...staticRoutes.map(r => ({ ...r, url: `${SITE_URL}${r.url}`, lastModified: new Date() })),
    ...blogEntries,
  ]
}
