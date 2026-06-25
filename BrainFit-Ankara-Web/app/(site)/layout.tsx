import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import BrainFactPopup from '@/components/site/BrainFactPopup'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BrainFactPopup />
    </div>
  )
}
