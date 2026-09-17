import Link from 'next/link'

import styles from './label.module.css'
import { Reveal } from './Reveal'
import { ARTISTS } from './data'

export function Roster() {
  return (
    <section className={styles.roster} id="roster">
      <div className={styles.rosterInner}>
        <Reveal className={styles.rosterHead}>
          <p className={styles.kicker}>Roster</p>
        </Reveal>
        {ARTISTS.map((artist) => (
          <Reveal key={artist.slug} className={styles.rosterRow}>
            <Link href={`/label-demo/roster/${artist.slug}`} className={styles.rosterName}>
              {artist.name}
            </Link>
            <span className={styles.rosterCount}>{artist.count}</span>
            <span className={styles.rosterTag}>{artist.tag}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
