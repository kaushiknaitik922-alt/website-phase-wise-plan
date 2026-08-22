import type { GlobalConfig } from 'payload'

import { heroField } from '../fields/sections'
import { seoField } from '../fields/seo'
import { revalidateGlobal } from '../hooks/revalidate'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateGlobal(['/contact'], ['contact-page'])] },
  fields: [
    heroField(),
    { name: 'intro', type: 'textarea' },
    { name: 'formHeading', type: 'text', defaultValue: 'Send an enquiry' },
    {
      name: 'formIntro',
      type: 'textarea',
      admin: { description: 'Short line above the form.' },
    },
    {
      name: 'directionsNote',
      type: 'textarea',
      admin: { description: 'Landmark or directions note shown under the map.' },
    },
    {
      name: 'thankYouMessage',
      type: 'textarea',
      defaultValue:
        'Thank you — your enquiry has been received. We will get back to you shortly.',
    },
    seoField,
  ],
}
