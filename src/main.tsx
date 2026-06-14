import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from '@/routes'
import '@/styles/index.css'
import '@/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-(--color-bg)"><div className="animate-spin rounded-full h-12 w-12 border-4 border-(--color-border) border-t-(--color-primary)" /></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
)
