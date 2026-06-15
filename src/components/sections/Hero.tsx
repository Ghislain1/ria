import { useCallback, useRef } from 'react'
import {
  m,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-5"
    >
      <m.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <m.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-(--color-bg)/85 via-(--color-bg)/70 to-(--color-bg)/85" />

        <div className="absolute inset-0 bg-gradient-to-t from-(--color-bg) via-transparent to-(--color-bg)/30" />

        <m.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-(--color-primary)/10 blur-3xl"
        />

        <m.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-(--color-secondary)/10 blur-3xl"
        />
      </m.div>

      <m.div
        style={{ y: contentY, opacity }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <m.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--color-primary)/10 border border-(--color-primary)/20 text-sm font-medium text-(--color-primary) mb-8"
        >
          <m.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="h-4 w-4" />
          </m.span>
          {t('hero.badge')}
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-(--color-text) leading-[1.1] mb-6"
        >
          {t('hero.title')}
          <br />
          <m.span
            className="text-(--color-primary) inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {t('hero.titleHighlight')}
          </m.span>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-(--color-text-muted) max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <m.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(217, 119, 6, 0.4)',
                '0 0 0 16px rgba(217, 119, 6, 0)',
                '0 0 0 0 rgba(217, 119, 6, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="rounded-full"
          >
            <Button
              size="lg"
              onClick={() => scrollTo('#contact')}
              className="animate-hero-cta"
            >
              {t('hero.ctaQuote')}
              <m.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <ArrowRight className="h-5 w-5" />
              </m.span>
            </Button>
          </m.div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo('#services')}
          >
            {t('hero.ctaServices')}
          </Button>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
        >
          {(t('hero.tags', { returnObjects: true }) as string[]).map(
            (item: string, i: number) => (
              <m.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="relative"
              >
                <div
                  className="relative px-5 py-2 rounded-full border bg-(--color-bg)/60 backdrop-blur-sm animate-burn"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-(--color-primary) text-glow">
                    {item}
                  </span>
                </div>
              </m.div>
            )
          )}
        </m.div>
      </m.div>
    </section>
  )
}

