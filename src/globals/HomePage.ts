import type { GlobalConfig } from 'payload'

import { ctaBandField, heroField, iconCardFields } from '../fields/sections'
import { revalidateGlobal } from '../hooks/revalidate'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: { group: 'Pages' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateGlobal(['/'], ['home-page'])] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Hero', fields: [heroField({ withImage: true, withButtons: true })] },
        {
          label: 'Sections',
          fields: [
            {
              name: 'featureCards',
              type: 'array',
              maxRows: 3,
              labels: { singular: 'Card', plural: 'Cards' },
              admin: { description: 'Three cards sitting just below the hero.', initCollapsed: true },
              fields: iconCardFields,
            },
            {
              name: 'aboutSnippet',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'About Us' },
                { name: 'heading', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'linkLabel', type: 'text', defaultValue: 'Read More' },
              ],
            },
            {
              name: 'productsSection',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Our Products' },
                { name: 'heading', type: 'text', required: true },
                { name: 'intro', type: 'textarea' },
              ],
            },
            {
              name: 'whyChooseUs',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Why Choose Us' },
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'points',
                  type: 'array',
                  maxRows: 6,
                  labels: { singular: 'Point', plural: 'Points' },
                  admin: { initCollapsed: true },
                  fields: iconCardFields,
                },
              ],
            },
            {
              name: 'processStrip',
              type: 'group',
              fields: [
                { name: 'kicker', type: 'text', defaultValue: 'Our Process' },
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'steps',
                  type: 'array',
                  maxRows: 6,
                  labels: { singular: 'Step', plural: 'Step' },
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'text', type: 'textarea' },
                  ],
                },
                { name: 'linkLabel', type: 'text', defaultValue: 'See our full process' },
              ],
            },
            {
              name: 'supplyArea',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Where we supply' },
                { name: 'text', type: 'textarea' },
              ],
            },
          ],
        },
        { label: 'CTA', fields: [ctaBandField] },
      ],
    },
  ],
}
