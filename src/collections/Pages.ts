import type { CollectionConfig } from 'payload'

import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { revalidateCustomPage, revalidateCustomPageAfterDelete } from '../hooks/revalidate'

/**
 * Pages the client can add themselves, without a developer.
 *
 * The fixed pages — home, about, process, contact — are built in code because
 * each has its own layout. Anything else the business wants later (a gallery, a
 * certifications page, a note about a new material) is one of these: a heading,
 * a body, an optional picture.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isPublished', 'updatedAt'],
    description:
      'Extra pages you add yourself. The address becomes shrilakhdatarindustries.in/your-slug.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [revalidateCustomPage],
    afterDelete: [revalidateCustomPageAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Until this is ticked the page is not on the website.',
      },
    },
    {
      name: 'showInFooter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Add a link to this page in the footer, under Quick Links.',
      },
    },
    {
      name: 'kicker',
      type: 'text',
      admin: { description: 'Small label above the heading. Optional.' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: { description: 'One or two lines under the heading. Optional.' },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'body',
      type: 'richText',
      required: true,
      admin: { description: 'The content of the page.' },
    },
    seoField,
  ],
}
