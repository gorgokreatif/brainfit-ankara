import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogPosts, getBlogPost } from '@/lib/content';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import CtaBlock from '@/components/CtaBlock';
import ScrollReveal from '@/components/ScrollReveal';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://brainfitankara.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const bcSchema = breadcrumbSchema([
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);
  const artSchema = articleSchema({
    title: post.title,
    description: post.description,
    date: post.date,
    cover: post.cover,
    slug: post.slug,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artSchema) }} />

      {/* Hero */}
      <Section bg="primary-deep" py="sm">
        <Container>
          <div className="max-w-3xl py-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((t) => (
                <Link key={t} href="/blog" className="text-xs px-2.5 py-1 rounded-full font-semibold hover:opacity-80 transition-opacity" style={{ backgroundColor: 'rgba(31,168,160,0.2)', color: 'var(--accent)' }}>
                  {t}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-base font-body" style={{ color: 'rgba(255,255,255,0.65)' }}>
              BrainFit Ankara · {formatDate(post.date)}
            </p>
          </div>
        </Container>
      </Section>

      {/* Cover image */}
      <div className="relative h-64 md:h-96 w-full" style={{ backgroundColor: 'var(--primary-deep)' }}>
        <Image src={post.cover} alt={post.title} fill className="object-cover" priority sizes="100vw"/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, var(--paper))' }}/>
      </div>

      {/* Article body */}
      <Section bg="paper" py="sm">
        <Container narrow>
          <ScrollReveal>
            <article
              className="prose prose-lg prose-headings:font-display prose-headings:text-ink prose-a:text-primary prose-strong:text-ink max-w-none font-body"
              style={{ color: 'var(--ink)', lineHeight: '1.8' }}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </ScrollReveal>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <Link href="/blog" className="inline-flex items-center gap-2 font-body text-sm hover:opacity-75 transition-opacity" style={{ color: 'var(--primary)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Tüm yazılara dön
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBlock
        title="Bu yazı düşündürdü mü?"
        body="Çocuğunuzun zihin profilini 2 dakikalık ücretsiz değerlendirmeyle görün. Tanı değil, yön."
        ctaLabel="Ücretsiz Değerlendirmeye Başla"
        ctaHref="/degerlendirme"
      />
    </>
  );
}
