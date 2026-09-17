import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArtistPortrait } from '@/components/label/ArtistPortrait'
import styles from '@/components/label/label.module.css'
import { Reveal } from '@/components/label/Reveal'
import { ARTISTS, RELEASES } from '@/components/label/data'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ARTISTS.map((artist) => ({ slug: artist.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const artist = ARTISTS.find((a) => a.slug === slug)
  return { title: artist ? `${artist.name} — Ghost Note` : 'Ghost Note' }
}

export default async function ArtistPage({ params }: Params) {
  const { slug } = await params
  const artist = ARTISTS.find((a) => a.slug === slug)
  if (!artist) notFound()

  const discography = RELEASES.filter((release) => release.artistSlug === artist.slug)

  return (
    <>
      <div className={styles.subHero}>
        <Reveal>
          <Link href="/label-demo/roster" className={styles.backLink}>
            ← All artists
          </Link>
          <p className={styles.kicker}>Artist</p>
          <h1 className={styles.releasesTitle}>{artist.name}</h1>
          <p className={styles.releasesLede}>{artist.tag}</p>
        </Reveal>
      </div>
      <div className={styles.detailGrid}>
        <Reveal>
          <ArtistPortrait accent={artist.accent} sizes="(min-width: 820px) 300px, 90vw" className={styles.detailImage} />
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.releasesLede}>{artist.bio}</p>
          <p className={styles.kicker} style={{ marginTop: '36px' }}>
            Discography
          </p>
          <div className={styles.discList}>
            {discography.map((release) => (
              <Link key={release.code} href={`/label-demo/releases/${release.slug}`} className={styles.discRow}>
                <span className={styles.discRowTitle}>{release.title}</span>
                <span className={styles.discRowMeta}>
                  {release.code} · {release.format} · {release.year}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  )
}
