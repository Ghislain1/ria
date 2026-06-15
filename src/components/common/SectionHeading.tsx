import { m, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
}

export function SectionHeading({
  title,
  subtitle,
  className,
  centered = true,
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-16 max-w-2xl',
        centered && 'mx-auto text-center',
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-text) mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-(--color-text-muted) leading-relaxed">
          {subtitle}
        </p>
      )}
    </m.div>
  )
}

