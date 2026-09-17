import styles from './label.module.css'
import { Reveal } from './Reveal'
import { ROSTER } from './data'

export function Roster() {
  return (
    <section className={styles.roster} id="roster">
      <div className={styles.rosterInner}>
        <Reveal className={styles.rosterHead}>
          <p className={styles.kicker}>Roster</p>
        </Reveal>
        {ROSTER.map((artist) => (
          <Reveal key={artist.name} className={styles.rosterRow}>
            <span className={styles.rosterName}>{artist.name}</span>
            <span className={styles.rosterCount}>{artist.count}</span>
            <span className={styles.rosterTag}>{artist.tag}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
