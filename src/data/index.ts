import type { Service, Testimonial } from '@/types'

export const services: Service[] = [
  {
    id: 1,
    title: 'Wedding Catering',
    description:
      'Elegant menus and full-service catering for weddings. We create memorable dining experiences that complement your special day.',
  },
  {
    id: 2,
    title: 'Corporate Catering',
    description:
      'Professional catering for meetings, conferences, and business events. Impress your clients and colleagues with exceptional cuisine.',
  },
  {
    id: 3,
    title: 'Birthday Celebrations',
    description:
      'Customized menus for birthdays and private parties. Let us make your celebration deliciously unforgettable.',
  },
  {
    id: 4,
    title: 'Family Events',
    description:
      'Food for reunions, anniversaries, and family gatherings. Bringing families together through the joy of great food.',
  },
  {
    id: 5,
    title: 'Community & Cultural Events',
    description:
      'Large-scale catering for festivals and community celebrations. We handle events of any size with professionalism and care.',
  },
  {
    id: 6,
    title: 'Custom Catering',
    description:
      'Personalized catering solutions tailored to any event. Your vision, our culinary expertise — the perfect pairing.',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah & James',
    role: 'Wedding Clients',
    content:
      'Ria\'s Cuisine made our wedding day absolutely perfect. The food was outstanding, and the presentation was elegant. Our guests are still raving about the jollof rice!',
  },
  {
    id: 2,
    name: 'Michael T.',
    role: 'Corporate Client',
    content:
      'We hired Ria\'s Cuisine for our annual conference. Professional, punctual, and the food was exceptional. They handled 300+ guests seamlessly.',
  },
  {
    id: 3,
    name: 'Amara K.',
    role: 'Birthday Organizer',
    content:
      'The customized menu for my son\'s birthday was a hit! The kids loved the food, and the adults appreciated the authentic African flavors. Highly recommend!',
  },
  {
    id: 4,
    name: 'Community Center',
    role: 'Event Coordinator',
    content:
      'For our cultural festival, Ria\'s Cuisine delivered beyond expectations. Their ability to cater to diverse dietary needs while maintaining quality is impressive.',
  },
]

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { label: 'Events Catered', value: 500 },
  { label: 'Happy Clients', value: 98 },
  { label: 'Years Experience', value: 15 },
  { label: 'Menu Options', value: 200 },
]

export const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Family Gathering',
  'Community Event',
  'Festival',
  'Private Party',
  'Other',
]

export const budgetRanges = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $3,000',
  '$3,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
]
