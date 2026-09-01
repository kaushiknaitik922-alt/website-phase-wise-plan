import type {
  AboutPageView,
  ContactPageView,
  HomePageView,
  ProcessPageView,
  ProductView,
} from '../types/content'
import { site } from './site'

/**
 * Default website content.
 *
 * Written strictly from what the client confirmed: no invented certifications,
 * capacities, prices or specifications. Anything not yet known is left out
 * rather than guessed — see docs/QUESTIONS.md.
 *
 * These values are the fallback the site renders before the CMS is populated,
 * and the exact content the seed script writes into the CMS.
 */

const supplyLine = site.supplyAreas.join(', ')

export const defaultHomePage: HomePageView = {
  hero: {
    kicker: 'Bawana, New Delhi',
    heading: 'Recycled PP Granules, HDPE Sheets & RO Filter Housing Bottles',
    subheading:
      `A B2B plastic manufacturing and recycling unit with ${site.experienceYears}+ years of experience, supplying manufacturers and businesses across North India.`,
    primaryCtaLabel: 'Get a Quote',
    primaryCtaHref: '/contact',
    secondaryCtaLabel: 'View Products',
    secondaryCtaHref: '/products',
  },
  featureCards: [
    {
      icon: 'clock',
      heading: `${site.experienceYears}+ Years Experience`,
      text: 'A long-running plastic manufacturing and recycling unit working with B2B buyers.',
    },
    {
      icon: 'recycle',
      heading: 'In-House Recycling',
      text: 'Industrial PP waste is processed into granules at our own facility in Bawana.',
    },
    {
      icon: 'truck',
      heading: 'B2B Bulk Supply',
      text: 'Bulk quantities supplied to manufacturers, fabricators and commercial buyers.',
    },
  ],
  aboutSnippet: {
    kicker: 'About Us',
    heading: 'A plastic recycling and manufacturing unit built on repeat business',
    body:
      `Shri Lakhdatar Industries works from Sector 5, Bawana, New Delhi. We collect industrial PP waste — trimmings, rejected parts and leftover pieces from factories — and process it into recycled PP granules that manufacturers use as raw material.\n\nAlongside granules we manufacture HDPE sheets and RO filter housing bottles. We supply only to businesses, and most of our work comes from buyers who order with us again.`,
    linkLabel: 'Read More',
  },
  productsSection: {
    kicker: 'Our Products',
    heading: 'Three product lines, supplied in bulk',
    intro:
      'Each line is manufactured and supplied separately. Colours shown are the ones we regularly produce.',
  },
  whyChooseUs: {
    kicker: 'Why Choose Us',
    heading: 'What B2B buyers get from working with us',
    points: [
      {
        icon: 'clock',
        heading: `${site.experienceYears}+ years in the trade`,
        text: 'Long experience with industrial plastic waste and the material it produces.',
      },
      {
        icon: 'recycle',
        heading: 'Recycling done in-house',
        text: 'Waste is sorted, processed and granulated at our own unit, so we know what goes into every batch.',
      },
      {
        icon: 'truck',
        heading: 'Consistent supply',
        text: 'Regular production keeps repeat orders moving for buyers who need material on schedule.',
      },
      {
        icon: 'shield',
        heading: 'Reasonable pricing',
        text: 'Competitive B2B pricing quoted against your quantity and requirement.',
      },
    ],
  },
  processStrip: {
    kicker: 'Our Process',
    heading: 'From factory waste to usable raw material',
    steps: [
      { title: 'Waste collection', text: 'Industrial PP waste collected from factories.' },
      { title: 'Sorting', text: 'Material separated by type and colour.' },
      { title: 'Grinding & washing', text: 'Sorted material is ground and cleaned.' },
      { title: 'Granulation', text: 'Extruded and cut into uniform granules.' },
      { title: 'Quality check', text: 'Batches checked before packing.' },
      { title: 'Dispatch', text: 'Packed and dispatched to the buyer.' },
    ],
    linkLabel: 'See our full process',
  },
  supplyArea: {
    heading: 'Where we supply',
    text: `We supply to ${supplyLine}.`,
  },
  ctaBand: {
    heading: 'Bulk requirement? Call us.',
    text: 'Tell us the product, colour and quantity you need and we will get back to you with a quote.',
    buttonLabel: 'Get a Quote',
    buttonHref: '/contact',
    showPhoneNumbers: true,
  },
}

export const defaultAboutPage: AboutPageView = {
  hero: {
    kicker: 'About Us',
    heading: 'Shri Lakhdatar Industries',
    subheading: `B2B plastic manufacturing and recycling in Bawana, New Delhi — ${site.experienceYears}+ years.`,
  },
  sections: [
    {
      heading: 'Who we are',
      body:
        'Shri Lakhdatar Industries is a plastic manufacturing and recycling business based in Sector 5, Bawana, New Delhi. We work only with businesses — manufacturers, fabricators and commercial buyers — and not with retail customers.',
      imagePosition: 'right',
    },
    {
      heading: 'What we do',
      body:
        'Our core work is recycling industrial PP waste into granules. Factories send us trimmings, rejected parts and leftover pieces; we sort, clean and granulate that material so it can be used again as raw material for plastic products such as files, jute lamination and many other finished goods.\n\nWe also manufacture HDPE sheets, mainly used as fender lining on commercial vehicles and for long-term permanent installations, and RO filter housing bottles for commercial filtration use.',
      imagePosition: 'left',
    },
    {
      heading: `${site.experienceYears}+ years of work`,
      body:
        'Over more than fifteen years we have built our business around repeat B2B buyers. That only happens when material arrives as described and on time, which is what we focus on.',
      imagePosition: 'right',
    },
    {
      heading: 'Where we supply',
      body: `We supply across ${supplyLine}.`,
      imagePosition: 'left',
    },
    {
      heading: 'Why B2B buyers work with us',
      body:
        'Recycling is done at our own unit, so we can speak for the material we sell. Orders are quoted at reasonable, competitive B2B prices against the quantity you need, and both our phone numbers stay active through working hours for anything urgent.',
      imagePosition: 'right',
    },
  ],
  ctaBand: {
    heading: 'Looking for a regular supplier?',
    text: 'Send us your requirement and we will get back to you.',
    buttonLabel: 'Get a Quote',
    buttonHref: '/contact',
    showPhoneNumbers: true,
  },
}

export const defaultProcessPage: ProcessPageView = {
  hero: {
    kicker: 'Our Process',
    heading: 'How industrial waste becomes usable material',
    subheading: 'Collection, sorting, cleaning, granulation and checking — all at our Bawana unit.',
  },
  intro:
    'Recycled PP granules are only as good as the process behind them. This is the sequence every batch goes through before it is dispatched.',
  steps: [
    {
      title: 'Waste collection',
      description:
        'We collect PP waste from factories — trimmings, rejected parts and leftover pieces left over from their production.',
    },
    {
      title: 'Sorting',
      description:
        'Incoming material is separated by plastic type and by colour, because mixed input is what causes inconsistent output.',
    },
    {
      title: 'Grinding & washing',
      description:
        'Sorted material is ground down and washed to remove dust, dirt and other contamination picked up in handling.',
    },
    {
      title: 'Extrusion & granulation',
      description:
        'Clean material is melted, extruded and cut into granules of a consistent size, ready to be used as raw material.',
    },
    {
      title: 'Quality check',
      description:
        'Batches are checked for colour consistency and contamination before they are packed.',
    },
    {
      title: 'Packing & dispatch',
      description: 'Granules are packed and dispatched to the buyer against the confirmed order.',
    },
  ],
  dependability: {
    heading: 'Why recycled material is dependable',
    body:
      'Recycled material gets a bad name when input is mixed and the process is rushed. Sorting the waste properly at the start, washing it before it is granulated and keeping colours separate is what makes a batch behave predictably in a moulding machine.\n\nWe cannot promise that recycled granules will match virgin material in every application. What we can do is tell you honestly what a batch is suited to, and send a sample so you can judge it on your own line.',
  },
  ctaBand: {
    heading: 'Want to see the material first?',
    text: 'Ask us about a sample for your application.',
    buttonLabel: 'Get a Quote',
    buttonHref: '/contact',
    showPhoneNumbers: true,
  },
}

export const defaultContactPage: ContactPageView = {
  hero: {
    kicker: 'Contact',
    heading: 'Talk to us about your requirement',
    subheading: 'Both numbers are active on call and WhatsApp during working hours.',
  },
  intro:
    'Tell us the product, the colour and the quantity you need. We will come back to you with a quote.',
  formHeading: 'Send an enquiry',
  formIntro: 'Fields marked with * are required.',
  directionsNote: '',
  thankYouMessage:
    'Thank you — your enquiry has been received. We will get back to you shortly. For anything urgent, call or WhatsApp us on the numbers above.',
}

export const defaultProducts: ProductView[] = [
  {
    id: 'pp-granules',
    title: 'Recycled PP Granules',
    slug: 'pp-granules',
    category: 'pp-granules',
    shortDescription:
      'Industrial PP waste processed into granules for manufacturers who use PP as raw material.',
    gallery: [],
    overview:
      'Recycled PP granules are our core product. Factories send us their PP waste — trimmings, rejected parts and leftover pieces — and we sort, wash, grind and granulate that material at our own unit in Bawana.\n\nThe result is a granule that plastic product manufacturers use as raw material in place of, or alongside, virgin PP. Colour separation is done at the sorting stage, which is what keeps each colour batch consistent.',
    packingSupply:
      'Supplied in bulk to B2B buyers. Packing, minimum order quantity and dispatch are confirmed at the time of quoting — send us your requirement and we will share the details along with the price.',
    colours: [
      { name: 'Natural', hexCode: '#E8E4DC' },
      { name: 'Blue', hexCode: '#1F4E8C' },
      { name: 'Black', hexCode: '#1A1A1A' },
      { name: 'Green', hexCode: '#2E7D32' },
      { name: 'Light Grey', hexCode: '#C4C8CC' },
      { name: 'Dark Grey', hexCode: '#6B7075' },
      { name: 'Red', hexCode: '#B32424' },
    ],
    specifications: [],
    applications: [
      { application: 'Plastic files and folders' },
      { application: 'Jute lamination' },
      { application: 'Moulded plastic components' },
      { application: 'General finished plastic goods', note: 'Where recycled PP is suitable as input' },
    ],
    buyerTypes: [
      'Plastic product manufacturers',
      'Moulding units using PP as raw material',
      'Lamination and packaging manufacturers',
    ],
    displayOrder: 1,
    isFeatured: true,
  },
  {
    id: 'hdpe-sheets',
    title: 'HDPE Sheets',
    slug: 'hdpe-sheets',
    category: 'hdpe-sheets',
    shortDescription:
      'HDPE sheets used for commercial vehicle fender lining and long-term permanent installations.',
    gallery: [],
    overview:
      'Our HDPE sheets are used most often as fender lining on commercial vehicles, where they sit between the body and the road spray and protect the metal from rust.\n\nThe same sheets are used for long-term permanent installations such as house gates, where they typically stay in service for around two and a half to three and a half years depending on exposure and usage.',
    packingSupply:
      'Supplied in bulk to B2B buyers. Available thickness, sheet size and minimum order are confirmed at the time of quoting — tell us the application and we will advise what fits.',
    colours: [
      { name: 'Blue', hexCode: '#1F4E8C' },
      { name: 'Black', hexCode: '#1A1A1A' },
      { name: 'White', hexCode: '#F2F2F2' },
      { name: 'Green', hexCode: '#2E7D32' },
    ],
    specifications: [],
    applications: [
      { application: 'Commercial vehicle fender lining', note: 'Protects the body from rust' },
      { application: 'Car and vehicle accessory fabrication' },
      { application: 'Long-term permanent installations', note: 'For example house gates' },
    ],
    buyerTypes: [
      'Commercial vehicle and car accessory businesses',
      'Fabricators',
      'Businesses doing long-term installation work',
    ],
    displayOrder: 2,
    isFeatured: true,
  },
  {
    id: 'ro-filter-housing-bottles',
    title: 'RO Filter Housing Bottles',
    slug: 'ro-filter-housing-bottles',
    category: 'ro-filter-housing',
    shortDescription:
      'Commercial filter housing bottles — the RO filter sits inside and filtered water passes through to the RO unit.',
    gallery: [],
    overview:
      'These are commercial RO filter housing bottles. The filter cartridge sits inside the housing; water passes through it and is stored in the RO unit.\n\nThe standard combination we supply is a blue bottle with a black cap. They are used in commercial installations rather than household units.',
    packingSupply:
      'Supplied in bulk to B2B buyers. Sizes, thread and port options and minimum order are confirmed at the time of quoting.',
    colours: [
      { name: 'Blue (bottle)', hexCode: '#1F4E8C' },
      { name: 'Black (cap)', hexCode: '#1A1A1A' },
    ],
    specifications: [],
    applications: [
      { application: 'Commercial RO and filtration systems' },
      { application: 'Institutional water filtration setups' },
    ],
    buyerTypes: [
      'Commercial RO and water filter businesses',
      'Schools and institutions',
      'Industrial factories',
      'Large companies with in-house filtration',
    ],
    displayOrder: 3,
    isFeatured: true,
  },
].map((product) => ({ ...product, heroImage: null }))
