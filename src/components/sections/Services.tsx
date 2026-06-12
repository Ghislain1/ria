import { motion } from 'framer-motion'
import {
  Heart,
  Building2,
  Cake,
  Users,
  Globe,
  Sparkles,
  Flame,
  Wheat,
  Apple,
  ChefHat,
  Croissant,
  Citrus,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'

const icons = [Heart, Building2, Cake, Users, Globe, Sparkles]

const foodIcons = [Flame, Wheat, Apple, ChefHat, Croissant, Citrus]

const floatPositions = [
  { top: '10%', left: '5%', delay: 0 },
  { top: '20%', right: '8%', delay: 0.4 },
  { top: '55%', left: '3%', delay: 0.8 },
  { top: '70%', right: '5%', delay: 0.2 },
  { top: '40%', left: '92%', delay: 0.6 },
  { top: '85%', left: '90%', delay: 1.0 },
]

interface ServiceItem {
  title: string
  description: string
}

export function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <SectionWrapper id="services" dark>
      <SectionHeading
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      <div className="relative">
        {foodIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:block pointer-events-none"
            style={{
              top: floatPositions[i].top,
              left: floatPositions[i].left,
              right: floatPositions[i].right,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatPositions[i].delay,
            }}
          >
            <Icon className="h-8 w-8 text-[var(--color-primary)]" />
          </motion.div>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((service, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] 
                  hover:border-[var(--color-primary)]/30 transition-all duration-300
                  hover:shadow-xl hover:shadow-[var(--color-primary)]/5 hover:-translate-y-1"
              >
                <div
                  className="mb-5 w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center
                  group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300"
                >
                  <Icon className="h-7 w-7 text-[var(--color-primary)]" />
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  {service.title}
                </h3>

                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
