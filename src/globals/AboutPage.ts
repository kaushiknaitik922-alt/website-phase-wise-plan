import type { GlobalConfig } from 'payload'

import { ctaBandField, heroField } from '../fields/sections'
import { seoField } from '../fields/seo'
import { revalidateGlobal } from '../hooks/revalidate'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateGlobal(['/about'], ['about-page'])] },
  fields: [
    heroField({ withImage: true }),
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: { initCollapsed: true, description: 'Each section is a heading with text, shown in order.' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
        },
      ],
    },
    ctaBandField,
    seoField,
  ],
}
