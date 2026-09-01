import type { GlobalConfig } from 'payload'

import { revalidateEverything } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Company details used across the whole website — header, footer and contact page.',
  },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateEverything] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            { name: 'companyName', type: 'text', required: true },
            { name: 'tagline', type: 'text' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            {
              name: 'experienceYears',
              type: 'number',
              min: 1,
              admin: { description: 'Shown as "X+ Years Experience".' },
            },
            {
              name: 'establishedYear',
              type: 'number',
              admin: { description: 'Optional. Shown as "Since 20XX" when filled in.' },
            },
            {
              name: 'legalName',
              type: 'text',
              admin: { description: 'Registered firm name, if you want it shown in the footer.' },
            },
            {
              name: 'gstNumber',
              type: 'text',
              admin: { description: 'Optional. Leave blank to keep it off the website.' },
            },
            { name: 'footerAbout', type: 'textarea' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phonePrimary', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'phoneSecondary', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'whatsappPrimary',
                  type: 'text',
                  admin: { width: '50%', description: 'Digits only, without +91.' },
                },
                { name: 'whatsappSecondary', type: 'text', admin: { width: '50%' } },
              ],
            },
            { name: 'email', type: 'email' },
            {
              name: 'addressLines',
              type: 'array',
              labels: { singular: 'Address line', plural: 'Address lines' },
              fields: [{ name: 'line', type: 'text', required: true }],
            },
            {
              name: 'googleMapsEmbedUrl',
              type: 'text',
              label: 'Google Maps embed URL',
              admin: {
                description: 'From Google Maps → Share → Embed a map → copy the src="..." link.',
              },
            },
            {
              name: 'supplyAreas',
              type: 'array',
              labels: { singular: 'Area', plural: 'Areas' },
              fields: [{ name: 'area', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Default SEO',
          fields: [
            {
              name: 'defaultSeo',
              type: 'group',
              label: false,
              fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
