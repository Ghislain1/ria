import { useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { X, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DatenschutzModalProps {
  isOpen: boolean
  onClose: () => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: { y: 80, opacity: 0, rotate: -0.5 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring' as const, damping: 22, stiffness: 180, mass: 0.7 },
  },
  exit: {
    y: 60,
    opacity: 0,
    rotate: 0.3,
    transition: { duration: 1, ease: 'easeIn' as const },
  },
}

const offsets = [-20, 24, -16, 28, -12, 18, -22, 20]

const contentVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 30,
    x: offsets[i % offsets.length],
    rotate: i % 2 === 0 ? 0.8 : -0.8,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    transition: {
      delay: 0.12 + i * 0.07,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
}

const sections = [
  'overview',
  'dataCollected',
  'purpose',
  'cookies',
  'rights',
  'contact',
] as const

export function DatenschutzModal({ isOpen, onClose }: DatenschutzModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            key="datenschutz-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <m.div
            key="datenschutz-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg max-h-[85vh] bg-(--color-bg) rounded-2xl shadow-2xl border border-(--color-border) overflow-y-auto">
              <div className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 bg-(--color-bg) border-b border-(--color-border) rounded-t-2xl">
                <Shield className="h-5 w-5 text-(--color-primary)" />
                <h2 className="text-lg font-bold text-(--color-text) flex-1">
                  {t('datenschutz.title')}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-(--color-bg-alt) text-(--color-text-muted) hover:text-(--color-text) transition-colors cursor-pointer"
                  aria-label={t('datenschutz.close')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-6 text-sm text-(--color-text-muted) leading-relaxed">
                {sections.map((key, i) => (
                  <m.div
                    key={key}
                    custom={i}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="font-semibold text-(--color-text) mb-2 text-base">
                      {t(`datenschutz.${key}.heading`)}
                    </h3>
                    {t(`datenschutz.${key}.body`)
                      .split('\n')
                      .map((line, li) => (
                        <p key={li} className={li > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
