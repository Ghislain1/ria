import { useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ImpressumModalProps {
  isOpen: boolean
  onClose: () => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 28, stiffness: 260, mass: 0.8 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring' as const, damping: 50, stiffness: 300, mass: 0.9 },
  },
}

const contentVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 1, ease: 'easeOut' as const },
  }),
}

export function ImpressumModal({ isOpen, onClose }: ImpressumModalProps) {
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
            key="impressum-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <m.div
            key="impressum-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-(--color-bg) shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-(--color-bg) border-b border-(--color-border)">
              <h2 className="text-lg font-bold text-(--color-text)">
                {t('impressum.title')}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-(--color-bg-alt) text-(--color-text-muted) hover:text-(--color-text) transition-colors cursor-pointer"
                aria-label={t('impressum.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6 text-sm text-(--color-text-muted) leading-relaxed">
              {(['section1', 'section2', 'section3', 'section4', 'section5', 'section6'] as const).map(
                (key, i) => (
                  <m.div
                    key={key}
                    custom={i}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="font-semibold text-(--color-text) mb-2 text-base">
                      {t(`impressum.${key}.heading`)}
                    </h3>
                    {t(`impressum.${key}.body`)
                      .split('\n')
                      .map((line, li) => (
                        <p key={li} className={li > 0 ? 'mt-2' : ''}>
                          {line}
                        </p>
                      ))}
                  </m.div>
                )
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
