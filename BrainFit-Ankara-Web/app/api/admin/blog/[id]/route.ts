import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id }, include: { category: true } })
  if (!post) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { id } = await params
  const data = await req.json()
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published
        ? (await prisma.blogPost.findUnique({ where: { id } }))?.publishedAt ?? new Date()
        : null,
    },
    include: { category: true },
  })
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  return NextResponse.json(post)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { id } = await params
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/blog')
  return NextResponse.json({ success: true })
}
