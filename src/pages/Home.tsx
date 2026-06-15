import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { FloatingButtons } from '@/components/ui/FloatingButtons'

const SECTION_MAP: Record<string, string> = {
  '/services': '#services',
  '/about': '#about',
  '/testimonials': '#testimonials',
  '/contact': '#contact',
}

export default function Home() {
  const { pathname } = useLocation()
  const { dark, toggle } = useTheme()

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
      <Footer />
    </>
  )
}
