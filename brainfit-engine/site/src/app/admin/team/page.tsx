import { getTeamData } from '@/lib/content';
import TeamEditor from './TeamEditor';

export const metadata = { title: 'Ekip — Admin' };

export default function AdminTeamPage() {
  const { members } = getTeamData();
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Ekibimiz</h1>
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 28 }}>Ekip üyelerini yönetin. Görselleri önce <code style={{ backgroundColor: '#1e293b', padding: '1px 5px', borderRadius: 4 }}>public/images/</code> klasörüne koyun.</p>
      <TeamEditor initial={members} />
    </div>
  );
}
