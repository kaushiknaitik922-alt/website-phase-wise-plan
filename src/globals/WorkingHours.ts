import type { GlobalConfig } from 'payload'

import { defaultWorkingHours } from '../config/site'
import { revalidateEverything } from '../hooks/revalidate'

const dayOptions = defaultWorkingHours.map((d) => ({ label: d.label, value: d.day }))

export const WorkingHours: GlobalConfig = {
  slug: 'working-hours',
  label: 'Working Hours',
  admin: {
    group: 'Settings',
    description:
      'Drives both the hours table and the live Open / Closed badge on the contact page (India time).',
  },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: { afterChange: [revalidateEverything] },
  fields: [
    {
      name: 'days',
      type: 'array',
      minRows: 7,
      maxRows: 7,
      labels: { singular: 'Day', plural: 'Days' },
      defaultValue: defaultWorkingHours.map((d) => ({
        day: d.day,
        isClosed: d.isClosed,
        openTime: d.openTime,
        closeTime: d.closeTime,
      })),
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'day',
              type: 'select',
              required: true,
              options: dayOptions,
              admin: { width: '25%' },
            },
            {
              name: 'isClosed',
              type: 'checkbox',
              label: 'Closed',
              defaultValue: false,
              admin: { width: '25%' },
            },
            {
              name: 'openTime',
              type: 'text',
              admin: { width: '25%', description: '24-hour, e.g. 09:00' },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: { width: '25%', description: '24-hour, e.g. 21:00' },
            },
          ],
        },
      ],
    },
    {
      name: 'note',
      type: 'text',
      admin: { description: 'Optional line shown under the table, e.g. holiday timings.' },
    },
  ],
}
