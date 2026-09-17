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
          <a href="mailto:demos@ghostnote.example" className={styles.btnPrimary}>
            Send a demo
          </a>
          <a href="#top" className={styles.btnGhost}>
            Back to top
          </a>
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
