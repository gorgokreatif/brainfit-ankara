'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Hatalı e-posta veya şifre.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] border border-[#efe9df] shadow-[0_20px_60px_rgba(0,0,0,.08)] p-10 w-full max-w-[400px]">
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="BrainFit Ankara" width={140} height={36} className="mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#23231f]">Admin Paneli</h1>
          <p className="text-sm text-[#9a968c] mt-1">Devam etmek için giriş yapın</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
            E-posta
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32]" />
          </label>
          <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-[#3a3a38]">
            Şifre
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="text-base p-3 border-[1.5px] border-[#e3ded5] rounded-[11px] bg-[#F8F6F2] font-normal outline-none focus:border-[#51AD32]" />
          </label>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button type="submit" disabled={loading} className="bg-[#51AD32] text-white py-3.5 rounded-[11px] font-semibold text-base mt-1 disabled:opacity-60">
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
