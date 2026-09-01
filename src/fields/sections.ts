import type { Field } from 'payload'

/** Page hero strip: heading + supporting line (+ optional image). */
export const heroField = (options: { withImage?: boolean; withButtons?: boolean } = {}): Field => ({
  name: 'hero',
  type: 'group',
  fields: [
    { name: 'kicker', type: 'text', admin: { description: 'Small line above the heading.' } },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    ...(options.withImage
      ? ([{ name: 'image', type: 'upload', relationTo: 'media' }] as Field[])
      : []),
    ...(options.withButtons
      ? ([
          {
            type: 'row',
            fields: [
              { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Get a Quote', admin: { width: '50%' } },
              { name: 'primaryCtaHref', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
            ],
          },
          {
            type: 'row',
            fields: [
              { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'View Products', admin: { width: '50%' } },
              { name: 'secondaryCtaHref', type: 'text', defaultValue: '/products', admin: { width: '50%' } },
            ],
          },
        ] as Field[])
      : []),
  ],
})

/** Full-width dark band with a single call to action. */
export const ctaBandField: Field = {
  name: 'ctaBand',
  type: 'group',
  label: 'CTA band',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'buttonLabel', type: 'text', defaultValue: 'Get a Quote', admin: { width: '50%' } },
        { name: 'buttonHref', type: 'text', defaultValue: '/contact', admin: { width: '50%' } },
      ],
    },
    {
      name: 'showPhoneNumbers',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show both phone numbers inside the band.' },
    },
  ],
}

/** Small icon + heading + text card, used in several places. */
export const iconCardFields: Field[] = [
  {
    name: 'icon',
    type: 'select',
    defaultValue: 'factory',
    options: [
      { label: 'Factory', value: 'factory' },
      { label: 'Recycle', value: 'recycle' },
      { label: 'Truck', value: 'truck' },
      { label: 'Shield', value: 'shield' },
      { label: 'Layers', value: 'layers' },
      { label: 'Clock', value: 'clock' },
    ],
  },
  { name: 'heading', type: 'text', required: true },
  { name: 'text', type: 'textarea', required: true },
]
