import Link from 'next/link'

import styles from './label.module.css'

export function Nav() {
  return (
    <header className={styles.nav}>
      <Link href="/label-demo" className={styles.navWordmark}>
        GHOST NOTE<span className={styles.navDot}>.</span>
      </Link>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link className={styles.navLink} href="/label-demo/releases">
              Catalogue
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/label-demo/roster">
              Roster
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/label-demo/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/label-demo#dates">
              Dates
            </Link>
          </li>
        </ul>
      </nav>
      <Link className={styles.navCta} href="/label-demo/contact">
        Contact
      </Link>
    </header>
  )
}
