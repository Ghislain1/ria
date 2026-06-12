import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { testimonials } from '@/data'

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  const testimonial = testimonials[current]

  return (
    <SectionWrapper id="testimonials" dark>
      <SectionHeading
        title="What Our Clients Say"
        subtitle="Hear from the clients who trust us to make their events extraordinary."
      />

      <div className="relative max-w-3xl mx-auto">
        <div className="relative min-h-[280px] flex items-center justify-center">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Quote className="h-12 w-12 text-[var(--color-primary)]/20" />
          </div>

          <motion.div
            key={testimonial.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-center px-4"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[var(--color-primary)] text-[var(--color-primary)]"
                />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-[var(--color-text)] leading-relaxed mb-8 italic">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>

            <div>
              <div className="font-bold text-[var(--color-text)]">
                {testimonial.name}
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">
                {testimonial.role}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]
              text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 
              transition-all cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === current
                    ? 'w-8 bg-[var(--color-primary)]'
                    : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]
              text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30 
              transition-all cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}
