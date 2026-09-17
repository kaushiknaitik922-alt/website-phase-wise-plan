import type { Metadata } from 'next'
import Link from 'next/link'

import { ArtistPortrait } from '@/components/label/ArtistPortrait'
import styles from '@/components/label/label.module.css'
import { PageHero } from '@/components/label/PageHero'
import { Reveal } from '@/components/label/Reveal'
import { ARTISTS } from '@/components/label/data'

export const metadata: Metadata = { title: 'Roster — Ghost Note' }

export default function RosterPage() {
  return (
    <>
      <PageHero
        kicker="Roster"
        title="Five acts, one shelf."
        lede="Everyone on the label at the moment — no back catalogue of dropped artists, no roster page padded out with one-off features."
      />
      <div className={styles.rosterGrid}>
        {ARTISTS.map((artist, i) => (
          <Reveal key={artist.slug} delay={i * 60}>
            <Link href={`/label-demo/roster/${artist.slug}`} className={styles.rosterGridCard}>
              <ArtistPortrait accent={artist.accent} sizes="(min-width: 640px) 220px, 45vw" className={styles.rosterGridImage} />
              <span className={styles.rosterGridName}>{artist.name}</span>
              <span className={styles.rosterGridMeta}>
                {artist.tag} · {artist.count}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  )
}
