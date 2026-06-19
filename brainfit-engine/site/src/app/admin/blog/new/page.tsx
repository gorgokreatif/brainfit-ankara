import BlogPostEditor from '../BlogPostEditor';

export const metadata = { title: 'Yeni Yazı — Admin' };

export default function NewBlogPostPage() {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Yeni Blog Yazısı</h1>
      <p style={{ fontSize: 13, color: '#64748b', marginBottom: 28 }}>Yazıyı kaydetmek, dosyayı diske yazar. Yayın için git push yapın.</p>
      <BlogPostEditor initial={{ slug: '', title: '', description: '', date: today, cover: '/images/blog-placeholder.jpg', tags: '', content: '' }} isNew />
    </div>
  );
}
