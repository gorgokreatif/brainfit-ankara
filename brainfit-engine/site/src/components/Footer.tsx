import Link from 'next/link';
import Image from 'next/image';
import { SiteData } from '@/lib/content';

interface Props { site: SiteData }

const footerNav = [
  {
    heading: 'Programlar',
    links: [
      { label: 'Junior (3–6 yaş)', href: '/programlar#junior' },
      { label: 'Scholar (6–18 yaş)', href: '/programlar#scholar' },
      { label: 'Senior (18+)', href: '/programlar#senior' },
      { label: 'Zihin Check-Up', href: '/zihin-check-up' },
    ],
  },
  {
    heading: 'Konular',
    links: [
      { label: 'Disleksi & Okuma', href: '/disleksi' },
      { label: 'Dikkat Eksikliği', href: '/dikkat-eksikligi' },
      { label: 'Dikkat Geliştirme', href: '/dikkat-gelistirme' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Kurumsal',
    links: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Ekibimiz', href: '/ekibimiz' },
      { label: 'İletişim', href: '/iletisim' },
    ],
  },
];

export default function Footer({ site }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t font-body" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--paper)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo.svg" alt="BrainFit Ankara" width={130} height={34} className="mb-4" />
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(22,32,46,0.65)' }}>
              {site.footer.about}
            </p>
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 text-sm hover:opacity-75 transition-opacity"
                style={{ color: 'var(--primary)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
            )}
          </div>

          {/* Nav cols */}
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm hover:opacity-75 transition-opacity" style={{ color: 'rgba(22,32,46,0.7)' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs" style={{ color: 'rgba(22,32,46,0.45)' }}>
            © {year} BrainFit Ankara. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            {site.footer.legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs hover:opacity-75 transition-opacity" style={{ color: 'rgba(22,32,46,0.45)' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
