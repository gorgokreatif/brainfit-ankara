import { notFound } from 'next/navigation';
import { getRawBlogPost } from '@/lib/content';
import BlogPostEditor from '../BlogPostEditor';

export const metadata = { title: 'Yazıyı Düzenle — Admin' };

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const data = getRawBlogPost(params.slug);
  if (!data) notFound();
  const { meta, rawContent } = data;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Yazıyı Düzenle</h1>
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 28 }}>Değişiklikleri kaydettikten sonra git push ile yayınlayın.</p>
      <BlogPostEditor
        initial={{
          slug: meta.slug,
          title: meta.title,
          description: meta.description,
          date: meta.date,
          cover: meta.cover,
          tags: meta.tags.join(', '),
          content: rawContent,
        }}
        isNew={false}
      />
    </div>
  );
}
