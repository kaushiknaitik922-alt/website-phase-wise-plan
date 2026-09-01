import type { CollectionConfig } from 'payload'

/**
 * Form submissions. Created only through the enquiry API (which validates and
 * rate-limits), readable only by signed-in admin users.
 */
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    group: 'Leads',
    useAsTitle: 'name',
    defaultColumns: ['name', 'companyName', 'phone', 'productInterest', 'status', 'submittedAt'],
    description: 'Enquiries received from the website. Update the status as you follow up.',
  },
  access: {
    // Submissions arrive through the server-side API, which uses local access.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  defaultSort: '-submittedAt',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { readOnly: true, width: '50%' } },
        { name: 'companyName', type: 'text', admin: { readOnly: true, width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', required: true, admin: { readOnly: true, width: '50%' } },
        { name: 'email', type: 'email', admin: { readOnly: true, width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'productInterest',
          type: 'relationship',
          relationTo: 'products',
          admin: { readOnly: true, width: '50%' },
        },
        { name: 'quantity', type: 'text', admin: { readOnly: true, width: '50%' } },
      ],
    },
    { name: 'message', type: 'textarea', admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'internalNotes', type: 'textarea', admin: { position: 'sidebar' } },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'contact-page',
      options: [
        { label: 'Contact page', value: 'contact-page' },
        { label: 'Product page', value: 'product-page' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'submittedAt',
      type: 'date',
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
      hooks: {
        beforeChange: [({ value, operation }) => (operation === 'create' ? new Date() : value)],
      },
    },
    {
      name: 'ipHash',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Hashed sender address, kept only for spam control.',
      },
    },
  ],
}
