import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import styles from '@/components/label/label.module.css'
import { Reveal } from '@/components/label/Reveal'
import { RELEASES } from '@/components/label/data'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return RELEASES.map((release) => ({ slug: release.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const release = RELEASES.find((r) => r.slug === slug)
  return { title: release ? `${release.title} — Ghost Note` : 'Ghost Note' }
}

export default async function ReleasePage({ params }: Params) {
  const { slug } = await params
  const release = RELEASES.find((r) => r.slug === slug)
  if (!release) notFound()

  return (
    <>
      <div className={styles.subHero}>
        <Reveal>
          <Link href="/label-demo/releases" className={styles.backLink}>
            ← Full catalogue
          </Link>
          <p className={styles.kicker}>{release.code}</p>
          <h1 className={styles.releasesTitle}>{release.title}</h1>
          <p className={styles.releasesLede}>{release.about}</p>
        </Reveal>
      </div>
      <div className={styles.detailGrid}>
        <Reveal>
          <dl className={styles.detailMeta}>
            <dt>Artist</dt>
            <dd>
              <Link href={`/label-demo/roster/${release.artistSlug}`}>{release.artist}</Link>
            </dd>
            <dt>Format</dt>
            <dd>{release.format}</dd>
            <dt>Catalogue</dt>
            <dd>{release.code}</dd>
            <dt>Released</dt>
            <dd>{release.date}</dd>
          </dl>
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.kicker}>Tracklist</p>
          <ol className={styles.trackList}>
            {release.tracklist.map((track, i) => (
              <li key={track.title} className={styles.trackRow}>
                <span className={styles.trackIndex}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.trackTitle}>{track.title}</span>
                <span className={styles.trackDuration}>{track.duration}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </>
  )
}
