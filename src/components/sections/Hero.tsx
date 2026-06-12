import { useCallback, useRef } from 'react'
import {
  motion,
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
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/85 via-[var(--color-bg)]/70 to-[var(--color-bg)]/85" />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/30" />

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-primary)]/10 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-[var(--color-secondary)]/10 blur-3xl"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-sm font-medium text-[var(--color-primary)] mb-8"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
          {t('hero.badge')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-[1.1] mb-6"
        >
          {t('hero.title')}
          <br />
          <motion.span
            className="text-[var(--color-primary)] inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {t('hero.titleHighlight')}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
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
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Button>
          </motion.div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo('#services')}
          >
            {t('hero.ctaServices')}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
        >
          {(t('hero.tags', { returnObjects: true }) as string[]).map(
            (item: string, i: number) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="relative"
              >
                <div
                  className="relative px-5 py-2 rounded-full border bg-[var(--color-bg)]/60 backdrop-blur-sm animate-burn"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] text-glow">
                    {item}
                  </span>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
