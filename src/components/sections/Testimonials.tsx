import { useState, useCallback, useEffect } from 'react'
import { m } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'

interface TestimonialItem {
  name: string
  role: string
  content: string
}

export function Testimonials() {
  const { t } = useTranslation()
  const testimonials = t('testimonials.items', { returnObjects: true }) as TestimonialItem[]

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
  }, [testimonials.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }, [testimonials.length])

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
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
      />

      <div className="relative max-w-3xl mx-auto">
        <div className="relative min-h-[280px] flex items-center justify-center">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Quote className="h-12 w-12 text-(--color-primary)/20" />
          </div>

          <m.div
            key={current}
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
                  className="h-5 w-5 fill-(--color-primary) text-(--color-primary)"
                />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-(--color-text) leading-relaxed mb-8 italic">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>

            <div>
              <div className="font-bold text-(--color-text)">
                {testimonial.name}
              </div>
              <div className="text-sm text-(--color-text-muted)">
                {testimonial.role}
              </div>
            </div>
          </m.div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 rounded-full bg-(--color-surface) border border-(--color-border)
              text-(--color-text-muted) hover:text-(--color-primary) hover:border-(--color-primary)/30 
              transition-all cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === current
                    ? 'w-8 bg-(--color-primary)'
                    : 'w-2 bg-(--color-border) hover:bg-(--color-text-muted)'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 rounded-full bg-(--color-surface) border border-(--color-border)
              text-(--color-text-muted) hover:text-(--color-primary) hover:border-(--color-primary)/30 
              transition-all cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}

