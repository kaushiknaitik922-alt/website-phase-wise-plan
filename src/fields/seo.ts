import type { Field } from 'payload'

/** Per-page SEO overrides. Everything optional — sensible defaults are used. */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: { description: 'Leave blank to use the page heading and description automatically.' },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      admin: { description: 'Around 60 characters works best in Google results.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: { description: 'Around 155 characters. Plain, factual sentence about the page.' },
    },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
  ],
}
