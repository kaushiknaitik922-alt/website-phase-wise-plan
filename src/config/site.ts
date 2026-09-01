/**
 * Company constants and navigation.
 *
 * Everything here is either a hard fact from the client or a structural
 * default. Content that the client can edit lives in the CMS — these values are
 * the fallback used before the CMS has been populated.
 */
export const site = {
  companyName: 'Shri Lakhdatar Industries',
  tagline: 'B2B Plastic Manufacturing & Recycling',
  experienceYears: 15,
  phonePrimary: '8587060393',
  phoneSecondary: '8383044264',
  whatsappPrimary: '8587060393',
  whatsappSecondary: '8383044264',
  email: '',
  addressLines: ['Sector 5, Bawana', 'New Delhi'],
  googleMapsEmbedUrl: '',
  hoursSummary: 'Mon–Fri, Sun · 9 AM–9 PM',
  supplyAreas: [
    'Delhi',
    'Haryana',
    'Rajasthan',
    'Parts of Uttar Pradesh',
    'Other parts of North India',
  ],
  footerAbout:
    'A B2B plastic manufacturing and recycling unit in Bawana, New Delhi, supplying recycled PP granules, HDPE sheets and RO filter housing bottles to manufacturers and businesses across North India.',
} as const

export const productCategories = [
  { slug: 'pp-granules', value: 'pp-granules', label: 'Recycled PP Granules' },
  { slug: 'hdpe-sheets', value: 'hdpe-sheets', label: 'HDPE Sheets' },
  {
    slug: 'ro-filter-housing-bottles',
    value: 'ro-filter-housing',
    label: 'RO Filter Housing Bottles',
  },
] as const

export type ProductCategoryValue = (typeof productCategories)[number]['value']

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: productCategories.map((c) => ({
      label: c.label,
      href: `/products/${c.slug}`,
    })),
  },
  { label: 'Our Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
] as const

/** Default weekly schedule — editable from the CMS once seeded. */
export const defaultWorkingHours = [
  { day: 'monday', label: 'Monday', isClosed: false, openTime: '09:00', closeTime: '21:00' },
  { day: 'tuesday', label: 'Tuesday', isClosed: false, openTime: '09:00', closeTime: '21:00' },
  { day: 'wednesday', label: 'Wednesday', isClosed: false, openTime: '09:00', closeTime: '21:00' },
  { day: 'thursday', label: 'Thursday', isClosed: false, openTime: '09:00', closeTime: '21:00' },
  { day: 'friday', label: 'Friday', isClosed: false, openTime: '09:00', closeTime: '21:00' },
  { day: 'saturday', label: 'Saturday', isClosed: true, openTime: '', closeTime: '' },
  { day: 'sunday', label: 'Sunday', isClosed: false, openTime: '09:00', closeTime: '21:00' },
] as const

export const TIMEZONE = 'Asia/Kolkata'
