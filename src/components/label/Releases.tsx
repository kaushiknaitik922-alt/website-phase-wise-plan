import styles from './label.module.css'
import { Deck } from './Deck'
import { Reveal } from './Reveal'
import { RELEASES } from './data'

export function Releases() {
  return (
    <section className={styles.releases} id="releases">
      <div className={styles.releasesGrid}>
        <Reveal>
          <p className={styles.kicker}>Catalogue</p>
          <h2 className={styles.releasesTitle}>Six records, one shelf.</h2>
          <p className={styles.releasesLede}>
            Everything we&rsquo;ve pressed since 2016 is still in print, still mixed by the same five people, still
            sold as a whole side rather than a single.
          </p>
          <div className={styles.releasesActions}>
            <a href="#roster" className={styles.btnPrimary}>
              View roster
            </a>
            <a href="#dates" className={styles.btnGhost}>
              Release dates
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Deck releases={RELEASES} />
        </Reveal>
      </div>
    </section>
  )
}
