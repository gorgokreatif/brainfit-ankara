import { SiteData } from './content';

export function localBusinessSchema(site: SiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://brainfitankara.com/#business',
    name: site.brand,
    description: site.tagline,
    url: 'https://brainfitankara.com',
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'Ankara',
      addressCountry: 'TR',
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    sameAs: [site.social.instagram].filter(Boolean),
  };
}

export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `https://brainfitankara.com${c.href}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  date: string;
  cover: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `https://brainfitankara.com${post.cover}`,
    url: `https://brainfitankara.com/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'BrainFit Ankara',
      url: 'https://brainfitankara.com',
    },
  };
}
