import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post
  try {
    post = await prisma.blogPost.findUnique({ where: { slug, published: true }, include: { category: true } })
  } catch { notFound() }
  if (!post) notFound()

  return (
    <div className="bf-reveal max-w-[860px] mx-auto px-6 py-[clamp(40px,6vw,72px)]">
      <Link href="/blog" className="text-sm text-[#6c6c68] mb-6 inline-flex items-center gap-1">← Blog'a dön</Link>
      <span className="text-xs font-semibold text-white px-2.5 py-1.5 rounded-full" style={{ background: post.category.color }}>{post.category.name}</span>
      <h1 className="text-[clamp(26px,3.5vw,42px)] font-extrabold tracking-tight leading-[1.1] mt-4">{post.title}</h1>
      {post.publishedAt && <p className="text-sm text-[#9a968c] mt-3">{new Date(post.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
      {post.imageUrl && <Image src={post.imageUrl} alt={post.title} width={860} height={480} className="w-full rounded-[20px] mt-6 aspect-video object-cover" />}
      <div className="prose prose-lg max-w-none mt-8 text-[#3a3a38]" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
      {post.tags && (
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[#efe9df]">
          {post.tags.split(',').filter(Boolean).map(tag => (
            <span key={tag} className="text-xs font-medium text-[#6c6c68] bg-[#F8F6F2] border border-[#efe9df] px-3 py-1.5 rounded-full">{tag.trim()}</span>
          ))}
        </div>
      )}
    </div>
  )
}
