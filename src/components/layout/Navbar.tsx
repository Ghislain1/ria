import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
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

const PATH_SECTION_MAP: Record<string, string> = {
  '/': 'hero',
  '/services': 'services',
  '/about': 'about',
  '/testimonials': 'testimonials',
  '/contact': 'contact',
}

export function Navbar({ dark, onToggleTheme }: NavbarProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const activeSection = useScrollSpy()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (path: string) => {
    setIsOpen(false)
    navigate(path)
  }

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.testimonials'), path: '/testimonials' },
    { label: t('nav.contact'), path: '/contact' },
  ]

  const currentSection = activeSection || PATH_SECTION_MAP[pathname] || 'hero'

  const menuVariants = {
    hidden: { scale: 0, borderRadius: '50%', opacity: 0 },
    visible: {
      scale: 1,
      borderRadius: '0%',
      opacity: 1,
      transition: { type: 'spring' as const, damping: 24, stiffness: 220, mass: 0.8 },
    },
    exit: {
      scale: 0,
      borderRadius: '50%',
      opacity: 0,
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 + i * 0.05, duration: 0.4, ease: 'easeOut' as const },
    }),
    exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
  }

  const changeLang = (code: string) => {
    i18n.changeLanguage(code)
    setLangOpen(false)
  }

  return (
    <>
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
          onClick={() => handleNav('/')}
          className="flex items-center gap-2 text-xl font-bold text-(--color-text) hover:text-(--color-primary) transition-colors"
        >
          <ChefHat className="h-7 w-7 text-(--color-primary)" />
          <span>Ria's Cuisine</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const section = link.path.replace('/', '') || 'hero'
            const isActive = currentSection === section
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleNav(link.path)}
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
              </button>
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
                <button className="fixed inset-0 z-10" type='button' onKeyUp={() => void 0} onClick={() => setLangOpen(false)} />
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
                <button className="fixed inset-0 z-10" type='button' onKeyUp={() => void 0} onClick={() => setLangOpen(false)} />
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
            className="relative z-[60] p-2 text-(--color-text) cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </nav>
    </header>

      <AnimatePresence>
      {isOpen && (
        <m.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="md:hidden fixed inset-0 z-50 overflow-y-auto bg-(--color-bg)"
          style={{ transformOrigin: 'center center' }}
        >
          <div className="px-5 py-8 flex flex-col gap-3">
            {navLinks.map((link, i) => {
              const section = link.path.replace('/', '') || 'hero'
              const isActive = currentSection === section
              return (
                <m.div key={link.path} variants={itemVariants} custom={i} initial="hidden" animate="visible" exit="exit">
                <button
                  type="button"
                  onClick={() => handleNav(link.path)}
                  className={cn(
                    'block w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors',
                    isActive
                      ? 'text-(--color-primary) bg-(--color-primary)/5'
                      : 'text-(--color-text-muted) hover:text-(--color-primary) hover:bg-(--color-bg-alt)'
                  )}
                >
                  {link.label}
                </button>
                </m.div>
              )
            })}
          </div>
        </m.div>
      )}
      </AnimatePresence>
    </>
  )
}

