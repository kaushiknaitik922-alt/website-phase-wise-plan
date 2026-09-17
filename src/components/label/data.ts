export type Track = {
  title: string
  duration: string
}

export type Release = {
  code: string
  slug: string
  title: string
  artistSlug: string
  artist: string
  format: string
  year: string
  date: string
  about: string
  tracklist: Track[]
}

export type Artist = {
  slug: string
  name: string
  tag: string
  count: string
  bio: string
  accent: 'amber' | 'teal'
}

// Every count, date and cross-reference below stays consistent across the
// deck, the roster, the dates table and the detail pages — same six
// catalogue entries, same five artists, same slugs throughout.
export const RELEASES: Release[] = [
  {
    code: 'GN-001',
    slug: 'low-tide',
    title: 'Low Tide',
    artistSlug: 'marrow',
    artist: 'Marrow',
    format: '12" LP',
    year: '2016',
    date: '14 Mar 2016',
    about:
      'The record that started the label — four musicians in a rented room above a launderette, recorded live to eight-track over a wet February.',
    tracklist: [
      { title: 'Low Tide', duration: '4:12' },
      { title: 'Rope Light', duration: '3:47' },
      { title: 'Coastguard', duration: '5:01' },
      { title: 'Shingle', duration: '3:20' },
      { title: 'Slack Water', duration: '6:44' },
    ],
  },
  {
    code: 'GN-002',
    slug: 'static-bloom',
    title: 'Static Bloom',
    artistSlug: 'faye-odell',
    artist: 'Faye Odell',
    format: '12" LP',
    year: '2018',
    date: '02 Nov 2018',
    about: 'Solo piano recorded direct to tape in a single afternoon, released with the tape hiss left in on purpose.',
    tracklist: [
      { title: 'Static Bloom', duration: '3:58' },
      { title: 'Nightingale Floor', duration: '4:30' },
      { title: 'Draft', duration: '2:51' },
      { title: 'Static Bloom (Reprise)', duration: '2:10' },
    ],
  },
  {
    code: 'GN-003',
    slug: 'interior-weather',
    title: 'Interior Weather',
    artistSlug: 'pale-fauna',
    artist: 'Pale Fauna',
    format: 'Cassette',
    year: '2019',
    date: '21 Jun 2019',
    about: 'Six slowcore sketches made for a cassette-only run, since kept in print because people kept asking.',
    tracklist: [
      { title: 'Barometer', duration: '5:14' },
      { title: 'Interior Weather', duration: '6:02' },
      { title: 'Cold Front', duration: '4:38' },
      { title: 'Pressure', duration: '3:55' },
      { title: 'Clearing', duration: '5:47' },
      { title: 'Aftertone', duration: '4:01' },
    ],
  },
  {
    code: 'GN-004',
    slug: 'night-shift',
    title: 'Night Shift',
    artistSlug: 'cotter-and-vale',
    artist: 'Cotter & Vale',
    format: '12" LP',
    year: '2021',
    date: '09 Sep 2021',
    about: 'A post-folk duo trading verses about warehouse jobs and last trains, tracked over three winter weekends.',
    tracklist: [
      { title: 'Night Shift', duration: '3:33' },
      { title: 'Last Train Out', duration: '4:09' },
      { title: 'Warehouse Light', duration: '3:44' },
      { title: 'Clocking Off', duration: '4:56' },
      { title: 'Overtime', duration: '3:12' },
    ],
  },
  {
    code: 'GN-005',
    slug: 'halflight',
    title: 'Halflight',
    artistSlug: 'marrow',
    artist: 'Marrow',
    format: '7" EP',
    year: '2023',
    date: '17 Jan 2023',
    about: "Marrow's return after five years apart — two songs a side, mixed by the same engineer as Low Tide.",
    tracklist: [
      { title: 'Halflight', duration: '3:29' },
      { title: 'Ember', duration: '3:02' },
    ],
  },
  {
    code: 'GN-006',
    slug: 'roomtone',
    title: 'Roomtone',
    artistSlug: 'ilsa-rook',
    artist: 'Ilsa Rook',
    format: 'Double LP',
    year: '2025',
    date: '05 Oct 2025',
    about: 'A double LP of modern compositions for a nine-piece ensemble, recorded across two nights in an empty hall.',
    tracklist: [
      { title: 'Roomtone I', duration: '7:18' },
      { title: 'Roomtone II', duration: '6:40' },
      { title: 'Roomtone III', duration: '8:05' },
      { title: 'Roomtone IV', duration: '5:52' },
      { title: 'Roomtone V', duration: '9:11' },
      { title: 'Roomtone VI', duration: '6:27' },
    ],
  },
]

export const ARTISTS: Artist[] = [
  {
    slug: 'marrow',
    name: 'Marrow',
    tag: 'Dream pop · Bristol',
    count: '2 releases',
    bio: 'Four-piece who recorded the label’s first record above a launderette and came back seven years later to make its quietest one.',
    accent: 'amber',
  },
  {
    slug: 'faye-odell',
    name: 'Faye Odell',
    tag: 'Solo piano · Lisbon',
    count: '1 release',
    bio: 'Plays everything once, direct to tape, and keeps the version with the mistake in it if it has more feeling than the clean one.',
    accent: 'teal',
  },
  {
    slug: 'pale-fauna',
    name: 'Pale Fauna',
    tag: 'Slowcore · Glasgow',
    count: '1 release',
    bio: 'Started as a cassette-only project and stayed one by choice — six songs about weather, still the only six they’ve released.',
    accent: 'teal',
  },
  {
    slug: 'cotter-and-vale',
    name: 'Cotter & Vale',
    tag: 'Post-folk duo · London',
    count: '1 release',
    bio: 'Write about shift work and last trains. Both still have day jobs; neither has any plans to leave them.',
    accent: 'amber',
  },
  {
    slug: 'ilsa-rook',
    name: 'Ilsa Rook',
    tag: 'Modern composition · Oslo',
    count: '1 release',
    bio: 'Composes for a rotating nine-piece ensemble and records everything live in one room, no overdubs.',
    accent: 'teal',
  },
]
