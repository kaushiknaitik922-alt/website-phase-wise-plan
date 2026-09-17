import styles from './label.module.css'

export function Nav() {
  return (
    <header className={styles.nav}>
      <a href="#top" className={styles.navWordmark}>
        GHOST NOTE<span className={styles.navDot}>.</span>
      </a>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <a className={styles.navLink} href="#releases">
              Catalogue
            </a>
          </li>
          <li>
            <a className={styles.navLink} href="#roster">
              Roster
            </a>
          </li>
          <li>
            <a className={styles.navLink} href="#dates">
              Dates
            </a>
          </li>
        </ul>
      </nav>
      <a className={styles.navCta} href="#dates">
        Listen
      </a>
    </header>
  )
}
