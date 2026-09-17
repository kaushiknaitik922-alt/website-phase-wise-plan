import styles from './label.module.css'
import { Reveal } from './Reveal'
import { RELEASES } from './data'

export function DatesTable() {
  return (
    <section className={styles.dates} id="dates">
      <div className={styles.datesInner}>
        <Reveal className={styles.datesHead}>
          <p className={styles.kicker}>Discography dates</p>
        </Reveal>
        <Reveal>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Release</th>
                <th>Artist</th>
                <th>Format</th>
                <th>Catalogue</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {RELEASES.map((release) => (
                <tr key={release.code}>
                  <td className={styles.first} data-label="Release">
                    {release.title}
                  </td>
                  <td data-label="Artist">{release.artist}</td>
                  <td data-label="Format">{release.format}</td>
                  <td data-label="Catalogue">{release.code}</td>
                  <td data-label="Date">{release.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
