import { DatesTable } from '@/components/label/DatesTable'
import { PortalHero } from '@/components/label/PortalHero'
import { Releases } from '@/components/label/Releases'
import { Roster } from '@/components/label/Roster'
import { StatementFold } from '@/components/label/StatementFold'

export default function LabelDemoPage() {
  return (
    <>
      <PortalHero />
      <StatementFold />
      <Releases />
      <Roster />
      <DatesTable />
    </>
  )
}
