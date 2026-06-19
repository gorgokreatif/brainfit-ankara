import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/content';

const BASE = 'https://brainfitankara.com';

const staticRoutes = [
  { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
  { url: `${BASE}/programlar`, priority: 0.9, changeFrequency: 'monthly' as const },
  { url: `${BASE}/zihin-check-up`, priority: 0.9, changeFrequency: 'monthly' as const },
  { url: `${BASE}/degerlendirme`, priority: 0.9, changeFrequency: 'monthly' as const },
  { url: `${BASE}/hakkimizda`, priority: 0.7, changeFrequency: 'monthly' as const },
  { url: `${BASE}/ekibimiz`, priority: 0.6, changeFrequency: 'monthly' as const },
  { url: `${BASE}/iletisim`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${BASE}/disleksi`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${BASE}/dikkat-eksikligi`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${BASE}/dikkat-gelistirme`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${BASE}/blog`, priority: 0.7, changeFrequency: 'weekly' as const },
  { url: `${BASE}/kvkk`, priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
