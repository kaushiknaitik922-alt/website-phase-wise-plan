import type { SVGProps } from 'react'

import type { IconName } from '@/types/content'

type IconKey =
  | IconName
  | 'phone'
  | 'mail'
  | 'pin'
  | 'whatsapp'
  | 'arrow-right'
  | 'chevron-down'
  | 'menu'
  | 'close'
  | 'check'

/** Single-path line icons, drawn on a 24×24 grid. */
const paths: Record<IconKey, string> = {
  factory: 'M3 21h18M4 21V10l5 3V10l5 3V7l5 3v11M8 17h2m4 0h2',
  recycle: 'M7 19H5a2 2 0 0 1-1.7-3l1.8-3M12 3l2.5 4M17 19h2a2 2 0 0 0 1.7-3L15 6.5 12 3 9 8m-2 8 2.5 4M4 13l3-5',
  truck: 'M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  shield: 'M12 3 5 6v5.5c0 4 2.9 7.7 7 9.5 4.1-1.8 7-5.5 7-9.5V6l-7-3Zm-2.5 8.5 2 2 4-4',
  layers: 'm12 3 8 4.5-8 4.5-8-4.5L12 3Zm8 9-8 4.5L4 12m16 4.5L12 21l-8-4.5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3.5 2',
  phone: 'M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L15 13l4 1.5V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4 7.2 2 2 0 0 1 6 5V4Z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  pin: 'M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  whatsapp:
    'M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm4.2 12.1c-.2.6-1.2 1.1-1.7 1.1-.4 0-1 .1-3.1-.9-2.6-1.3-4.2-4-4.3-4.2-.1-.2-1-1.4-1-2.6s.6-1.8.9-2c.2-.3.5-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.1.3.7 1.2 1.5 1.9 1 .9 1.8 1.2 2 1.3.3.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.7-.1 1.3Z',
  'arrow-right': 'M4 12h15m-6-6 6 6-6 6',
  'chevron-down': 'm6 9 6 6 6-6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'm5 13 4 4L19 7',
}

export function Icon({
  name,
  className = 'h-5 w-5',
  ...props
}: { name: IconKey; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  )
}
