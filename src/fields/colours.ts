import type { Field } from 'payload'

/** Colour swatches shown on product cards and product pages. */
export const coloursField: Field = {
  name: 'colours',
  type: 'array',
  label: 'Available colours',
  labels: { singular: 'Colour', plural: 'Colours' },
  admin: {
    description: 'Shown as swatches. Hex code is only for the on-screen swatch, not a colour promise.',
    initCollapsed: true,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'hexCode',
      type: 'text',
      required: true,
      defaultValue: '#CCCCCC',
      validate: (value: unknown) =>
        typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value)
          ? true
          : 'Use a 6-digit hex code, for example #1C3557',
      admin: { description: 'Six-digit hex code, e.g. #1C3557' },
    },
  ],
}
