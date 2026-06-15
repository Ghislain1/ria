import { useState, useEffect } from 'react'
import { ChefHat, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ImpressumModal } from '@/components/ui/ImpressumModal'
import { DatenschutzModal } from '@/components/ui/DatenschutzModal'
import { CookieSettingsModal } from '@/components/ui/CookieSettingsModal'

export function Footer() {
  const { t } = useTranslation()
  const [impressumOpen, setImpressumOpen] = useState(false)
  const [datenschutzOpen, setDatenschutzOpen] = useState(false)
  const [cookieOpen, setCookieOpen] = useState(false)
  const year = new Date().getFullYear()

  const COOKIE_KEY = 'ria-cookie-consent'

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setCookieOpen(true)
    }
  }, [])

  const saveConsent = (data: { analytics: boolean; preferences: boolean }) => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ ...data, essential: true, timestamp: new Date().toISOString() })
    )
  }

  const links = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <footer className="bg-(--color-bg-alt) border-t border-(--color-border)">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-7 w-7 text-(--color-primary)" />
              <span className="text-xl font-bold text-(--color-text)">
                Ria's Cuisine
              </span>
            </div>
            <p className="text-(--color-text-muted) leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-text) mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-(--color-text-muted) hover:text-(--color-primary) transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-text) mb-4">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-(--color-text-muted)">
                <Phone className="h-4 w-4 text-(--color-primary) shrink-0" />
                0049 176 62028482
              </li>
              <li className="flex items-center gap-3 text-(--color-text-muted)">
                <Mail className="h-4 w-4 text-(--color-primary) shrink-0" />
                info@riascuisine.com
              </li>
              <li className="flex items-center gap-3 text-(--color-text-muted)">
                <MapPin className="h-4 w-4 text-(--color-primary) shrink-0" />
                Streitzeuggasse 1, 50667 Köln
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-(--color-border) text-center text-sm text-(--color-text-muted) space-y-2">
          <p>&copy; {year} Ria's Cuisine. {t('footer.rights')}</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setImpressumOpen(true)}
              className="text-(--color-text-muted) hover:text-(--color-primary) underline underline-offset-2 transition-colors cursor-pointer text-xs"
            >
              {t('impressum.title')}
            </button>
            <span className="text-(--color-border)">|</span>
            <button
              type="button"
              onClick={() => setDatenschutzOpen(true)}
              className="text-(--color-text-muted) hover:text-(--color-primary) underline underline-offset-2 transition-colors cursor-pointer text-xs"
            >
              {t('datenschutz.title')}
            </button>
            <span className="text-(--color-border)">|</span>
            <button
              type="button"
              onClick={() => setCookieOpen(true)}
              className="text-(--color-text-muted) hover:text-(--color-primary) underline underline-offset-2 transition-colors cursor-pointer text-xs"
            >
              {t('cookie.title')}
            </button>
          </div>
        </div>
      </div>

      <ImpressumModal isOpen={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <DatenschutzModal isOpen={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} />
      <CookieSettingsModal
        isOpen={cookieOpen}
        onClose={() => setCookieOpen(false)}
        onAccept={() => saveConsent({ analytics: true, preferences: true })}
        onSave={(s) => saveConsent(s)}
      />
    </footer>
  )
}

