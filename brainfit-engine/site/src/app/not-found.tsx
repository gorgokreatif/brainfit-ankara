import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı',
  description: 'Aradığınız sayfa bulunamadı.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center" style={{ backgroundColor: 'var(--paper)' }}>
      <Container narrow className="py-24 text-center">
        <p className="text-8xl font-display font-extrabold mb-4" style={{ color: 'var(--primary)' }}>404</p>
        <h1 className="text-3xl font-display font-bold mb-4" style={{ color: 'var(--ink)' }}>
          Sayfa bulunamadı
        </h1>
        <p className="font-body mb-10" style={{ color: 'rgba(22,32,46,0.6)' }}>
          Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/" size="lg">Ana Sayfaya Dön</Button>
          <Button href="/degerlendirme" variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
            Ücretsiz Değerlendirme
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[
            { label: 'Programlar', href: '/programlar' },
            { label: 'Blog', href: '/blog' },
            { label: 'İletişim', href: '/iletisim' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-body hover:underline" style={{ color: 'var(--primary)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
