import type { GlobalConfig } from 'payload'

import { ctaBandField, heroField } from '../fields/sections'
import { seoField } from '../fields/seo'
import { revalidateGlobal } from '../hooks/revalidate'

export const ProcessPage: GlobalConfig = {
  slug: 'process-page',
  label: 'Process Page',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateGlobal(['/process'], ['process-page'])] },
  fields: [
    heroField({ withImage: true }),
    { name: 'intro', type: 'textarea' },
    {
      name: 'steps',
      type: 'array',
      labels: { singular: 'Step', plural: 'Steps' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'dependability',
      type: 'group',
      label: 'Why recycled material is dependable',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'richText' },
      ],
    },
    ctaBandField,
    seoField,
  ],
}
