import { getSiteData } from '@/lib/content';
import SiteEditor from './SiteEditor';

export const metadata = { title: 'Site Bilgileri — Admin' };

export default function AdminSitePage() {
  const site = getSiteData();
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Site Bilgileri</h1>
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 28 }}>Kaydet&apos;e bastıktan sonra site.json güncellenecek. Yayın için git push yapın.</p>
      <SiteEditor initial={site} />
    </div>
  );
}
