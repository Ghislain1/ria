import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/Button'
import { submitContactForm } from '@/services/contactService'

export function Contact() {
  const { t } = useTranslation()

  const eventTypes = t('contact.eventTypes.items', { returnObjects: true }) as string[]
  const budgetRanges = t('contact.budgetRanges.items', { returnObjects: true }) as string[]

  const contactSchema = z.object({
    name: z.string().min(2, t('contact.errors.nameMin')),
    email: z.string().email(t('contact.errors.email')),
    phone: z.string().min(7, t('contact.errors.phone')),
    eventType: z.string().min(1, t('contact.errors.eventType')),
    eventDate: z.string().min(1, t('contact.errors.eventDate')),
    guestCount: z.string().min(1, t('contact.errors.guestCount')),
    venueLocation: z.string().min(2, t('contact.errors.venueLocation')),
    budget: z.string().min(1, t('contact.errors.budget')),
    message: z.string().optional(),
  })

  type ContactForm = z.infer<typeof contactSchema>

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
        toast.success(t('contact.success'))
        reset()
      }
    } catch {
      toast.error(t('contact.error'))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-(--color-bg) border border-(--color-border) text-(--color-text) placeholder:text-(--color-text-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/50 focus:border-(--color-primary) transition-all duration-200'

  const labelClass = 'block text-sm font-medium text-(--color-text) mb-1.5'
  const errorClass = 'text-sm text-red-500 mt-1'

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
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
            <label htmlFor="name" className={labelClass}>{t('contact.labels.name')}</label>
            <input
              id="name"
              {...register('name')}
              placeholder={t('contact.placeholders.name')}
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>{t('contact.labels.email')}</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder={t('contact.placeholders.email')}
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>{t('contact.labels.phone')}</label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder={t('contact.placeholders.phone')}
              className={inputClass}
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="eventType" className={labelClass}>{t('contact.labels.eventType')}</label>
            <select id="eventType" {...register('eventType')} className={inputClass}>
              <option value="">{t('contact.eventTypes.placeholder')}</option>
              {eventTypes.map((type: string) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
          </div>

          <div>
            <label htmlFor="eventDate" className={labelClass}>{t('contact.labels.eventDate')}</label>
            <input
              id="eventDate"
              type="date"
              {...register('eventDate')}
              className={inputClass}
            />
            {errors.eventDate && <p className={errorClass}>{errors.eventDate.message}</p>}
          </div>

          <div>
            <label htmlFor="guestCount" className={labelClass}>{t('contact.labels.guestCount')}</label>
            <input
              id="guestCount"
              type="number"
              {...register('guestCount')}
              placeholder={t('contact.placeholders.guestCount')}
              className={inputClass}
            />
            {errors.guestCount && <p className={errorClass}>{errors.guestCount.message}</p>}
          </div>

          <div>
            <label htmlFor="venueLocation" className={labelClass}>{t('contact.labels.venueLocation')}</label>
            <input
              id="venueLocation"
              {...register('venueLocation')}
              placeholder={t('contact.placeholders.venueLocation')}
              className={inputClass}
            />
            {errors.venueLocation && <p className={errorClass}>{errors.venueLocation.message}</p>}
          </div>

          <div>
            <label htmlFor="budget" className={labelClass}>{t('contact.labels.budget')}</label>
            <select id="budget" {...register('budget')} className={inputClass}>
              <option value="">{t('contact.budgetRanges.placeholder')}</option>
              {budgetRanges.map((range: string) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="message" className={labelClass}>{t('contact.labels.message')}</label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            placeholder={t('contact.placeholders.message')}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('contact.sending')}
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                {t('contact.submit')}
              </>
            )}
          </Button>

          <a
            href="https://wa.me/4917662028482"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg w-full sm:w-auto bg-[#25D366] hover:brightness-110"
          >
            <MessageCircle className="h-5 w-5" />
            {t('contact.whatsapp')}
          </a>
        </div>
      </motion.form>
    </SectionWrapper>
  )
}

