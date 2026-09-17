import Image from 'next/image'

import styles from './label.module.css'

export function ArtistPortrait({
  accent,
  sizes,
  className,
}: {
  accent: 'amber' | 'teal'
  sizes: string
  className?: string
}) {
  return (
    <div className={`${styles.artistPortrait} ${className ?? ''}`} data-accent={accent}>
      <Image src="/label/portrait.jpg" alt="" fill sizes={sizes} />
    </div>
  )
}
