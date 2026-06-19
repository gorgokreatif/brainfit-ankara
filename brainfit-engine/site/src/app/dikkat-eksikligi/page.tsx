import { getPageData } from '@/lib/content';
import LandingPage, { generateLandingMetadata } from '@/components/LandingPage';

const bc = [{ name: 'Ana Sayfa', href: '/' }, { name: 'Dikkat Eksikliği & DEHB', href: '/dikkat-eksikligi' }];
const page = getPageData('dehb');

export const metadata = generateLandingMetadata(page);
export default function DikkatEksikligiPage() {
  return <LandingPage page={page} breadcrumbs={bc} />;
}
