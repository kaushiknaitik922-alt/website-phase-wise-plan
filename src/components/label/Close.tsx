import Link from 'next/link'

import styles from './label.module.css'
import { Reveal } from './Reveal'

export function Close() {
  return (
    <section className={styles.close}>
      <div className={styles.closeRow}>
        <Reveal>
          <h2 className={styles.closeHeadline}>Send us a demo. We still listen to every one.</h2>
          <p className={styles.closeFine}>No unsolicited masters — a rough mix is fine.</p>
        </Reveal>
        <Reveal className={styles.closeActions} delay={100}>
          <Link href="/label-demo/contact" className={styles.btnPrimary}>
            Send a demo
          </Link>
          <Link href="/label-demo" className={styles.btnGhost}>
            Back home
          </Link>
        </Reveal>
      </div>
      <div className={styles.footerStrip}>
        <span>&copy; {new Date().getFullYear()} Ghost Note Recordings</span>
        <span>Design concept — not a real label</span>
      </div>
      <div className={styles.closeWordmarkWrap}>
        <p className={styles.closeWordmark} aria-hidden="true">
          GHOST NOTE.
        </p>
      </div>
    </section>
  )
}
