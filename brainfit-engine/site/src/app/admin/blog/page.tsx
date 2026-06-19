import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/content';

export const metadata = { title: 'Blog — Admin' };

export default function AdminBlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Blog</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>{posts.length} yazı</p>
        </div>
        <Link href="/admin/blog/new" style={{ padding: '9px 20px', borderRadius: 8, backgroundColor: '#0ea5e9', color: 'white', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
          + Yeni Yazı
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {posts.map((post) => (
          <div key={post.slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#1e293b', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 2 }}>{post.title}</p>
              <p style={{ fontSize: 12, color: '#64748b' }}>{post.date} · {post.tags.join(', ')}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href={`/blog/${post.slug}`} target="_blank" style={{ padding: '5px 12px', borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', fontSize: 12 }}>
                Görüntüle
              </Link>
              <Link href={`/admin/blog/${post.slug}`} style={{ padding: '5px 12px', borderRadius: 6, backgroundColor: '#0ea5e9', color: 'white', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>
                Düzenle
              </Link>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#64748b', fontSize: 14 }}>
            Henüz yazı yok. &quot;+ Yeni Yazı&quot; butonu ile ekleyin.
          </div>
        )}
      </div>
    </div>
  );
}
