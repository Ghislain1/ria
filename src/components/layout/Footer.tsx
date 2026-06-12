import { ChefHat, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

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
              Exceptional catering for every occasion. Bringing people together
              through unforgettable culinary experiences.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Services', 'About', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)] mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <Phone className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <Mail className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                info@riascuisine.com
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <MapPin className="h-4 w-4 text-[var(--color-primary)] shrink-0" />
                Houston, TX
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
          &copy; {year} Ria's Cuisine. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
