import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// Client-side direct upload: tarayıcı token alır, doğrudan Blob'a yükler (sunucu araya girmez)
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await auth()
        if (!session) throw new Error('Yetkisiz')
        return {
          allowedContentTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
          maximumSizeInBytes: 10 * 1024 * 1024,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[upload] completed:', blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Yükleme hatası'
    console.error('[upload] error:', err)
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
