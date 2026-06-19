import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/content';
import { breadcrumbSchema } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import CtaBlock from '@/components/CtaBlock';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Blog — Zihin Gelişimi, Öğrenme & Ebeveyn Rehberi',
  description: 'BrainFit Ankara blogu: disleksi, dikkat eksikliği, beyin egzersizi ve çocuk gelişimi üzerine bilimsel, güvenilir yazılar.',
  alternates: { canonical: 'https://brainfitankara.com/blog' },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Blog', href: '/blog' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <Section bg="primary-deep" py="sm">
        <Container>
          <div className="max-w-xl py-4">
            <p className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}>
              Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Uzman Kaleminden
            </h1>
            <p className="text-lg font-body" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Zihin gelişimi, öğrenme güçlükleri ve ebeveynlik üzerine bilimsel, okunması kolay yazılar.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="paper">
        <Container>
          {/* Featured post */}
          {posts[0] && (
            <ScrollReveal>
              <Link href={`/blog/${posts[0].slug}`} className="group block rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow mb-12" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto" style={{ minHeight: '280px', backgroundColor: 'var(--primary-deep)' }}>
                    <Image src={posts[0].cover} alt={posts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 50vw"/>
                  </div>
                  <div className="p-8 flex flex-col justify-center bg-white">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {posts[0].tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: 'rgba(31,111,178,0.1)', color: 'var(--primary)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors" style={{ color: 'var(--ink)' }}>
                      {posts[0].title}
                    </h2>
                    <p className="font-body leading-relaxed mb-4" style={{ color: 'rgba(22,32,46,0.65)' }}>{posts[0].description}</p>
                    <p className="text-xs font-body" style={{ color: 'rgba(22,32,46,0.4)' }}>{formatDate(posts[0].date)}</p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Rest of posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 70}>
                <Link href={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white" style={{ border: '1px solid var(--border-subtle)' }}>
                  <div className="relative aspect-video" style={{ backgroundColor: 'var(--primary-deep)' }}>
                    <Image src={post.cover} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: 'rgba(31,111,178,0.1)', color: 'var(--primary)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display font-bold text-base mb-2 group-hover:opacity-75 transition-opacity leading-snug" style={{ color: 'var(--ink)' }}>
                      {post.title}
                    </h2>
                    <p className="text-sm font-body leading-relaxed mb-3 line-clamp-2" style={{ color: 'rgba(22,32,46,0.6)' }}>{post.description}</p>
                    <p className="text-xs font-body" style={{ color: 'rgba(22,32,46,0.4)' }}>{formatDate(post.date)}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBlock
        title="Okudukça merak uyandı mı?"
        body="Ücretsiz değerlendirmemizle çocuğunuzun zihin profilini 2 dakikada görün."
        ctaLabel="Ücretsiz Değerlendirmeye Başla"
        ctaHref="/degerlendirme"
      />
    </>
  );
}
