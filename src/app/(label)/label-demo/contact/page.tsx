import type { Metadata } from 'next'

import styles from '@/components/label/label.module.css'
import { PageHero } from '@/components/label/PageHero'
import { Reveal } from '@/components/label/Reveal'

export const metadata: Metadata = { title: 'Contact — Ghost Note' }

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Send us a demo."
        lede="We are a five-person label, so replies take a while — but every submission gets a real listen, not a form email."
      />
      <div className={styles.contactGrid}>
        <Reveal>
          <div className={styles.contactCard} data-accent="amber">
            <p className={styles.contactCardTitle}>Demos</p>
            <p className={styles.contactCardBody}>
              Two or three finished tracks, no unsolicited masters. A short note about the recording goes further
              than a press kit.
            </p>
            <a href="mailto:demos@ghostnote.example" className={styles.btnGhost}>
              demos@ghostnote.example
            </a>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className={styles.contactCard} data-accent="teal">
            <p className={styles.contactCardTitle}>Everything else</p>
            <p className={styles.contactCardBody}>
              Press, licensing, stockist enquiries, or anything that isn&rsquo;t a demo submission.
            </p>
            <a href="mailto:hello@ghostnote.example" className={styles.btnGhost}>
              hello@ghostnote.example
            </a>
          </div>
        </Reveal>
      </div>
    </>
  )
}
