import type { ReactNode } from 'react'

import styles from './label.module.css'
import { Reveal } from './Reveal'

export function PageHero({ kicker, title, lede }: { kicker: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className={styles.subHero}>
      <Reveal>
        <p className={styles.kicker}>{kicker}</p>
        <h1 className={styles.releasesTitle}>{title}</h1>
        {lede ? <p className={styles.releasesLede}>{lede}</p> : null}
      </Reveal>
    </div>
  )
}
