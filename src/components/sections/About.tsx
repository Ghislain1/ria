import { motion } from 'framer-motion'
import { ChefHat, Award, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CountUp } from '@/components/common/CountUp'

export function About() {
  const { t } = useTranslation()

  const stats = [
    { label: t('about.stats.events'), value: 500, suffix: '+' },
    { label: t('about.stats.guests'), value: 10000, suffix: '+' },
    { label: t('about.stats.dishes'), value: 50, suffix: '+' },
  ]

  return (
    <SectionWrapper id="about">
      <SectionHeading
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-[var(--color-primary)]/20" />
            <div className="relative p-8 md:p-10 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border)]">
              <ChefHat className="h-10 w-10 text-[var(--color-primary)] mb-6" />
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 text-lg">
                {t('about.paragraph1')}
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
                {t('about.paragraph2')}
              </p>

              <div className="mt-8 flex items-center gap-3 text-[var(--color-text)] font-semibold">
                <Heart className="h-5 w-5 text-[var(--color-primary)]" />
                {t('about.tagline')}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-[var(--color-text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
          <div className="col-span-full p-6 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 text-center">
            <Award className="h-8 w-8 text-[var(--color-primary)] mx-auto mb-2" />
            <p className="text-[var(--color-text)] font-semibold">
              {t('about.award')}
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
