import { getPageData } from '@/lib/content';
import LandingPage, { generateLandingMetadata } from '@/components/LandingPage';
import { breadcrumbSchema } from '@/lib/seo';

const bc = [{ name: 'Ana Sayfa', href: '/' }, { name: 'Disleksi & Okuma Güçlüğü', href: '/disleksi' }];
const page = getPageData('disleksi');

export const metadata = generateLandingMetadata(page);
export default function DisleksiPage() {
  return <LandingPage page={page} breadcrumbs={bc} />;
}
