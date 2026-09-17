import styles from '@/components/label/label.module.css'
import { Close } from '@/components/label/Close'
import { DatesTable } from '@/components/label/DatesTable'
import { Nav } from '@/components/label/Nav'
import { PortalHero } from '@/components/label/PortalHero'
import { Releases } from '@/components/label/Releases'
import { Roster } from '@/components/label/Roster'
import { StatementFold } from '@/components/label/StatementFold'

export default function LabelDemoPage() {
  return (
    <div className={styles.page}>
      <Nav />
      <PortalHero />
      <StatementFold />
      <Releases />
      <Roster />
      <DatesTable />
      <Close />
    </div>
  )
}
