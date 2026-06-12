import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MessageCircleMore, ArrowUp } from 'lucide-react'

const ITEMS = [
  { labelKey: 'floatingButtons.phone', icon: Phone, href: 'tel:004917662028482' },
  { labelKey: 'floatingButtons.email', icon: Mail, href: 'mailto:info@riascuisine.com' },
  {
    labelKey: 'floatingButtons.whatsApp',
    icon: MessageCircleMore,
    href: 'https://wa.me/4917662028482',
  },
]

export function FloatingButtons() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {visible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 hover:bg-[var(--color-primary-dark)] hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {visible &&
        ITEMS.map(({ labelKey, href, icon: Icon }) => (
          <a
            key={labelKey}
            href={href}
            title={t(labelKey)}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-all duration-300 hover:bg-[var(--color-primary-dark)] hover:scale-110"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
    </div>
  )
}
