import { unstable_noStore as noStore } from 'next/cache'
import { prisma } from '@/lib/db'
import BlogList from '@/components/site/BlogList'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Blog | BrainFit Ankara' }

async function getData() {
  noStore()
  try {
    const [posts, categories] = await Promise.all([
      prisma.blogPost.findMany({ where: { published: true }, include: { category: true }, orderBy: { publishedAt: 'desc' } }),
      prisma.blogCategory.findMany({ orderBy: { name: 'asc' } }),
    ])
    return { posts, categories }
  } catch {
    return { posts: [], categories: [] }
  }
}

export default async function BlogPage() {
  const { posts, categories } = await getData()

  return (
    <div className="bf-reveal">
      <section className="max-w-[1280px] mx-auto px-6 py-[clamp(40px,6vw,72px)] pb-0">
        <span className="text-[13px] font-semibold text-[#CE007F] tracking-widest uppercase">Blog</span>
        <h1 className="text-[clamp(30px,4.2vw,50px)] font-extrabold tracking-tight leading-[1.1] mt-4">
          Ebeveynler için zihin gelişimi rehberi.
        </h1>
      </section>
      <section className="max-w-[1280px] mx-auto px-6 pb-[clamp(56px,7vw,90px)]">
        <BlogList posts={posts} categories={categories} />
      </section>
    </div>
  )
}
