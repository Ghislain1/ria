import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/Button'
import { eventTypes, budgetRanges } from '@/data'
import { submitContactForm } from '@/services/contactService'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z.string().min(1, 'Please select an event date'),
  guestCount: z.string().min(1, 'Please enter the number of guests'),
  venueLocation: z.string().min(2, 'Please enter a venue location'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().optional(),
})

type ContactForm = z.infer<typeof contactSchema>

export function Contact() {
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true)
    try {
      const payload = { ...data, guestCount: Number(data.guestCount) }
      const result = await submitContactForm(payload)
      if (result.success) {
        toast.success(result.message)
        reset()
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200'

  const labelClass = 'block text-sm font-medium text-[var(--color-text)] mb-1.5'
  const errorClass = 'text-sm text-red-500 mt-1'

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        title="Get in Touch"
        subtitle="Ready to make your event unforgettable? Tell us about your event and we'll create the perfect menu."
      />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="name" className={labelClass}>Full Name *</label>
            <input
              id="name"
              {...register('name')}
              placeholder="Your name"
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email Address *</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number *</label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="(555) 123-4567"
              className={inputClass}
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="eventType" className={labelClass}>Event Type *</label>
            <select id="eventType" {...register('eventType')} className={inputClass}>
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
          </div>

          <div>
            <label htmlFor="eventDate" className={labelClass}>Event Date *</label>
            <input
              id="eventDate"
              type="date"
              {...register('eventDate')}
              className={inputClass}
            />
            {errors.eventDate && <p className={errorClass}>{errors.eventDate.message}</p>}
          </div>

          <div>
            <label htmlFor="guestCount" className={labelClass}>Number of Guests *</label>
            <input
              id="guestCount"
              type="number"
              {...register('guestCount')}
              placeholder="e.g. 100"
              className={inputClass}
            />
            {errors.guestCount && <p className={errorClass}>{errors.guestCount.message}</p>}
          </div>

          <div>
            <label htmlFor="venueLocation" className={labelClass}>Venue Location *</label>
            <input
              id="venueLocation"
              {...register('venueLocation')}
              placeholder="City or venue name"
              className={inputClass}
            />
            {errors.venueLocation && <p className={errorClass}>{errors.venueLocation.message}</p>}
          </div>

          <div>
            <label htmlFor="budget" className={labelClass}>Budget Range *</label>
            <select id="budget" {...register('budget')} className={inputClass}>
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className={labelClass}>Special Requests</label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            placeholder="Dietary restrictions, preferred cuisine, or any special requests..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full md:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Inquiry
            </>
          )}
        </Button>
      </motion.form>
    </SectionWrapper>
  )
}
