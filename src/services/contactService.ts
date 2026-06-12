import type { ContactFormData } from '@/types'

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log('Contact form submitted:', data)
  return {
    success: true,
    message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
  }
}
