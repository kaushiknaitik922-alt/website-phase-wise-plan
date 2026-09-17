import type { Metadata } from 'next'

import { ArtistPortrait } from '@/components/label/ArtistPortrait'
import styles from '@/components/label/label.module.css'
import { PageHero } from '@/components/label/PageHero'
import { Reveal } from '@/components/label/Reveal'

export const metadata: Metadata = { title: 'About — Ghost Note' }

const VALUES = [
  {
    title: 'Physical first',
    body: 'Every release exists on vinyl or tape before it exists anywhere else. Streaming follows, never leads.',
  },
  {
    title: 'One record at a time',
    body: 'No release calendar, no quarterly targets. We put a record out when it is finished and not before.',
  },
  {
    title: 'A note gets read',
    body: 'We do not take unsolicited masters, but every demo with a short note attached gets listened to end to end.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="A shelf, not a feed."
        lede="Ghost Note has been pressing records out of London and Lisbon since 2016 — five artists, six releases, no plans to move faster than that."
      />
      <div className={styles.detailGrid}>
        <Reveal>
          <ArtistPortrait accent="amber" sizes="(min-width: 820px) 300px, 90vw" className={styles.detailImage} />
          <dl className={styles.detailMeta}>
            <dt>Founded</dt>
            <dd>2016</dd>
            <dt>Based</dt>
            <dd>London — Lisbon</dd>
            <dt>Catalogue</dt>
            <dd>6 releases</dd>
          </dl>
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.releasesLede}>
            We started Ghost Note because we kept buying records from labels that had already stopped existing by
            the time the record arrived. The idea was small: press what we would actually want to own, keep the
            catalogue short enough that we can stand behind every record in it, and never put something out just to
            fill a release slot.
          </p>
          <p className={styles.releasesLede}>
            Nine years and six records later, that is still the whole plan. Everything below is what we try to hold
            ourselves to.
          </p>
          <p className={styles.kicker}>What we hold to</p>
          <div className={styles.discList}>
            {VALUES.map((value) => (
              <div key={value.title} className={styles.valueRow}>
                <span className={styles.valueTitle}>{value.title}</span>
                <p className={styles.valueBody}>{value.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  )
}
