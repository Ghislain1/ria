import { motion } from 'framer-motion'
import {
  Heart,
  Building2,
  Cake,
  Users,
  Globe,
  Sparkles,
} from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { services } from '@/data'

const icons = [Heart, Building2, Cake, Users, Globe, Sparkles]

export function Services() {
  return (
    <SectionWrapper id="services" dark>
      <SectionHeading
        title="Our Services"
        subtitle="Comprehensive catering solutions tailored to make your event truly memorable."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => {
          const Icon = icons[index]
          return (
            <motion.div
              key={service.id}
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
    </SectionWrapper>
  )
}
