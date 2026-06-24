import { unstable_noStore as noStore } from 'next/cache'
import { prisma } from '@/lib/db'

export async function getPageImages(keys: string[]): Promise<Record<string, string>> {
  noStore()
  try {
    const imgs = await prisma.pageImage.findMany({ where: { key: { in: keys } } })
    return Object.fromEntries(imgs.map(i => [i.key, i.url]))
  } catch {
    return {}
  }
}
