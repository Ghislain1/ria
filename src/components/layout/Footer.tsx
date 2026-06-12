import { ChefHat, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const links = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <footer className="bg-[var(--color-bg-alt)] border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-7 w-7 text-[var(--color-primary)]" />
              <span className="text-xl font-bold text-[var(--color-text)]">
                Ria's Cuisine
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)] mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)] mb-4">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <Phone className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                0049 176 62028482
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <Mail className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                info@riascuisine.com
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <MapPin className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                Streitzeuggasse 1, 50667 Köln
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
          &copy; {year} Ria's Cuisine. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
