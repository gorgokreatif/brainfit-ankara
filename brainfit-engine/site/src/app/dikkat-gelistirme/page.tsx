import { getPageData } from '@/lib/content';
import LandingPage, { generateLandingMetadata } from '@/components/LandingPage';

const bc = [{ name: 'Ana Sayfa', href: '/' }, { name: 'Dikkat Geliştirme', href: '/dikkat-gelistirme' }];
const page = getPageData('dikkat');

export const metadata = generateLandingMetadata(page);
export default function DikkatGelistirmePage() {
  return <LandingPage page={page} breadcrumbs={bc} />;
}
