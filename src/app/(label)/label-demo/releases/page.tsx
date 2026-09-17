import type { Metadata } from 'next'
import Link from 'next/link'

import styles from '@/components/label/label.module.css'
import { PageHero } from '@/components/label/PageHero'
import { Reveal } from '@/components/label/Reveal'
import { RELEASES } from '@/components/label/data'

export const metadata: Metadata = { title: 'Catalogue — Ghost Note' }

export default function ReleasesPage() {
  return (
    <>
      <PageHero
        kicker="Catalogue"
        title="The full discography."
        lede="Six records since 2016, ordered the way they were pressed. Every one of them is still in print."
      />
      <div className={styles.catalogueGrid}>
        {RELEASES.map((release, i) => (
          <Reveal key={release.code} delay={(i % 3) * 60}>
            <Link
              href={`/label-demo/releases/${release.slug}`}
              className={styles.catalogueCard}
              data-accent={i % 2 === 0 ? 'amber' : 'teal'}
            >
              <div className={styles.cardTop}>
                <span>{release.code}</span>
                <span>{release.year}</span>
              </div>
              <div className={styles.cardTitle}>{release.title}</div>
              <div className={styles.cardMeta}>
                <span>{release.artist}</span>
                <span>{release.format}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  )
}
