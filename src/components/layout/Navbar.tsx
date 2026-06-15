import { useState, useEffect } from 'react'
import { m } from 'framer-motion'
import { Menu, X, ChefHat, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/utils/cn'

interface NavbarProps {
  dark: boolean
  onToggleTheme: () => void
}

const langs = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
]

export function Navbar({ dark, onToggleTheme }: NavbarProps) {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const activeSection = useScrollSpy()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  const changeLang = (code: string) => {
    i18n.changeLanguage(code)
    setLangOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-(--color-bg)/95 backdrop-blur-md shadow-sm border-b border-(--color-border)'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <button
          type="button"
          onKeyDown={() => void 0}
          onClick={(e) => { e.preventDefault(); handleClick('#hero') }}
          className="flex items-center gap-2 text-xl font-bold text-(--color-text) hover:text-(--color-primary) transition-colors"
        >
          <ChefHat className="h-7 w-7 text-(--color-primary)" />
          <span>Ria's Cuisine</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const section = link.href.replace('#', '')
            const isActive = activeSection === section
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                className={cn(
                  'relative text-sm font-medium transition-colors', isActive
                  ? 'text-(--color-primary)'
                  : 'text-(--color-text-muted) hover:text-(--color-primary)'
                )}
              >
                {link.label}
                {isActive && (
                  <m.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-(--color-primary)"
                  />
                )}
              </a>
            )
          })}

          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-(--color-text-muted) hover:text-(--color-primary) border border-(--color-border) hover:border-(--color-primary)/30 transition-colors cursor-pointer"
            >
              {i18n.language.toUpperCase()}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <>
                <button className="fixed inset-0 z-10" role='link' onKeyUp={() => void 0} onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 mt-1.5 z-20 bg-(--color-surface) border border-(--color-border) rounded-xl shadow-lg overflow-hidden min-w-30">
                  {langs.map((l) => (
                    <button
                      type="button"
                      key={l.code}
                      onClick={() => changeLang(l.code)}
                      className={`w-full px-4 py-2 text-sm text-left transition-colors cursor-pointer
                        ${i18n.language === l.code
                          ? 'text-(--color-primary) font-semibold bg-(--color-primary)/5'
                          : 'text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-bg-alt)'
                        }`}
                    >
                      {l.label} — {t(`language.${l.code}`)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-(--color-text-muted) border border-(--color-border) cursor-pointer"
            >
              {i18n.language.toUpperCase()}
              <ChevronDown className={`h-3 w-3 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" role='button' onKeyUp={() => void 0} onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 mt-1.5 z-20 bg-(--color-surface) border border-(--color-border) rounded-xl shadow-lg overflow-hidden min-w-30">
                  {langs.map((l) => (
                    <button
                      type="button"
                      key={l.code}
                      onClick={() => changeLang(l.code)}
                      className={`w-full px-4 py-2 text-sm text-left cursor-pointer
                        ${i18n.language === l.code
                          ? 'text-(--color-primary) font-semibold bg-(--color-primary)/5'
                          : 'text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-bg-alt)'
                        }`}
                    >
                      {t(`language.${l.code}`)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => {
              setLangOpen(false)
              setIsOpen((prev) => !prev)
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="relative z-20 p-2 text-(--color-text) cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </nav>

      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bottom-0 z-40 overflow-y-auto shadow-2xl"
          style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="px-5 py-8 flex flex-col gap-3">
            {navLinks.map((link) => {
              const section = link.href.replace('#', '/')
              const isActive = activeSection === section
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-lg font-medium transition-colors',
                    isActive
                      ? 'text-(--color-primary) bg-(--color-primary)/5'
                      : 'text-(--color-text-muted) hover:text-(--color-primary) hover:bg-(--color-bg-alt)'
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

