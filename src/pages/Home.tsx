import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { FloatingButtons } from '@/components/ui/FloatingButtons'
import { CookieSettingsModal } from '@/components/ui/CookieSettingsModal'

const SECTION_MAP: Record<string, string> = {
  '/services': '#services',
  '/about': '#about',
  '/testimonials': '#testimonials',
  '/contact': '#contact',
}

export default function Home() {
  const { pathname } = useLocation()
  const { dark, toggle } = useTheme()
  const [cookieOpen, setCookieOpen] = useState(false)

  const saveConsent = (data: { analytics: boolean; preferences: boolean }) => {
    localStorage.setItem(
      'ria-cookie-consent',
      JSON.stringify({ ...data, essential: true, timestamp: new Date().toISOString() })
    )
  }

  useEffect(() => {
    const hash = SECTION_MAP[pathname]
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          const offset = 80
          const top = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [pathname])

  return (
    <>
      <Navbar dark={dark} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <FloatingButtons />
      <button
        type="button"
        onClick={() => setCookieOpen(true)}
        aria-label="Cookie-Einstellungen"
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-primary) text-white shadow-lg hover:brightness-110 transition-all"
      >
        <Cookie className="h-5 w-5" />
      </button>
      <Footer />

      <CookieSettingsModal
        isOpen={cookieOpen}
        onClose={() => setCookieOpen(false)}
        onAccept={() => saveConsent({ analytics: true, preferences: true })}
        onSave={(s) => saveConsent(s)}
      />
    </>
  )
}
