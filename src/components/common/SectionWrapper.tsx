import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SectionWrapperProps {
  id?: string
  className?: string
  children: ReactNode
  dark?: boolean
}

export function SectionWrapper({
  id,
  className,
  children,
  dark,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-28 px-5',
        dark && 'bg-(--color-bg-alt)',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}

