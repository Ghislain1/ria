import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { LazyMotion, domMax } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const handleAnchor = () => {
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        }, 1000)
      }
    }
    handleAnchor()
    window.addEventListener('hashchange', handleAnchor)
    return () => window.removeEventListener('hashchange', handleAnchor)
  }, [])


  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Ria's Cuisine - Exceptional catering for every occasion. Authentic African cuisine and customized menus for weddings, corporate events, and private parties."
        />
        <meta
          name="keywords"
          content="catering services, event catering, African catering, wedding catering, corporate catering, party catering, catering near me, professional catering services, custom event menus"
        />
        <meta property="og:title" content="Ria's Cuisine | Exceptional Catering for Every Occasion" />
        <meta
          property="og:description"
          content="From intimate gatherings to large corporate events, Ria's Cuisine delivers unforgettable culinary experiences."
        />
        <meta property="og:type" content="website" />
        <title>Ria's Cuisine | Exceptional Catering for Every Occasion</title>
      </Helmet>

      <LazyMotion features={domMax}>
        <Outlet />
      </LazyMotion>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          },
        }}
      />
    </>
  )
}

