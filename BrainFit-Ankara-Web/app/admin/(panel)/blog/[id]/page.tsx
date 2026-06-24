import BlogEditor from '@/components/admin/BlogEditor'
export default async function DuzenleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <BlogEditor postId={id} />
}
