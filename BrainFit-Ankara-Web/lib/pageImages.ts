import { prisma } from '@/lib/db'

export async function getPageImages(keys: string[]): Promise<Record<string, string>> {
  try {
    const imgs = await prisma.pageImage.findMany({ where: { key: { in: keys } } })
    return Object.fromEntries(imgs.filter(i => i.url).map(i => [i.key, i.url]))
  } catch (err) {
    console.error('[getPageImages] DB error:', err)
    return {}
  }
}
