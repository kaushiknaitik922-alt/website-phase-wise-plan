export type Release = {
  code: string
  title: string
  artist: string
  format: string
  year: string
  date: string
}

// Every count and date below stays consistent across the deck, the roster
// and the dates table — same six catalogue entries, same five artists.
export const RELEASES: Release[] = [
  { code: 'GN-001', title: 'Low Tide', artist: 'Marrow', format: '12" LP', year: '2016', date: '14 Mar 2016' },
  {
    code: 'GN-002',
    title: 'Static Bloom',
    artist: 'Faye Odell',
    format: '12" LP',
    year: '2018',
    date: '02 Nov 2018',
  },
  {
    code: 'GN-003',
    title: 'Interior Weather',
    artist: 'Pale Fauna',
    format: 'Cassette',
    year: '2019',
    date: '21 Jun 2019',
  },
  {
    code: 'GN-004',
    title: 'Night Shift',
    artist: 'Cotter & Vale',
    format: '12" LP',
    year: '2021',
    date: '09 Sep 2021',
  },
  { code: 'GN-005', title: 'Halflight', artist: 'Marrow', format: '7" EP', year: '2023', date: '17 Jan 2023' },
  {
    code: 'GN-006',
    title: 'Roomtone',
    artist: 'Ilsa Rook',
    format: 'Double LP',
    year: '2025',
    date: '05 Oct 2025',
  },
]

export type Artist = {
  name: string
  tag: string
  count: string
}

export const ROSTER: Artist[] = [
  { name: 'Marrow', tag: 'Dream pop · Bristol', count: '2 releases' },
  { name: 'Faye Odell', tag: 'Solo piano · Lisbon', count: '1 release' },
  { name: 'Pale Fauna', tag: 'Slowcore · Glasgow', count: '1 release' },
  { name: 'Cotter & Vale', tag: 'Post-folk duo · London', count: '1 release' },
  { name: 'Ilsa Rook', tag: 'Modern composition · Oslo', count: '1 release' },
]
