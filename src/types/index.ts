export interface Service {
  id: number
  title: string
  description: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: number
  venueLocation: string
  budget: string
  message?: string
}
