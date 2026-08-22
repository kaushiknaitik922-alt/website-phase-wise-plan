import type { CollectionConfig } from 'payload'

import { coloursField } from '../fields/colours'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { productCategories } from '../config/site'
import { revalidateProduct, revalidateProductAfterDelete } from '../hooks/revalidate'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isFeatured', 'displayOrder'],
    description: 'Every product page on the website is built from these entries.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: 'displayOrder',
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    {
      name: 'category',
      type: 'select',
      required: true,
      index: true,
      options: productCategories.map((c) => ({ label: c.label, value: c.value })),
      admin: { position: 'sidebar' },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Show this product in the home page grid.' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 240,
      admin: { description: 'One or two lines. Used on product cards.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Images' },
              admin: { initCollapsed: true },
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
            {
              name: 'overview',
              type: 'richText',
              admin: { description: 'Main description shown at the top of the product page.' },
            },
            {
              name: 'packingSupply',
              type: 'richText',
              label: 'Packing & supply',
              admin: { description: 'Packing, minimum order quantity and dispatch details.' },
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            coloursField,
            {
              name: 'specifications',
              type: 'array',
              labels: { singular: 'Specification', plural: 'Specifications' },
              admin: {
                initCollapsed: true,
                description: 'Shown as a table. Add only values you can stand behind.',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
            {
              name: 'applications',
              type: 'array',
              labels: { singular: 'Application', plural: 'Applications' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'application', type: 'text', required: true },
                { name: 'note', type: 'text' },
              ],
            },
            {
              name: 'buyerTypes',
              type: 'array',
              label: 'Who buys this',
              labels: { singular: 'Buyer type', plural: 'Buyer types' },
              admin: { initCollapsed: true },
              fields: [{ name: 'buyerType', type: 'text', required: true }],
            },
          ],
        },
        { label: 'SEO', fields: [seoField] },
      ],
    },
  ],
}
