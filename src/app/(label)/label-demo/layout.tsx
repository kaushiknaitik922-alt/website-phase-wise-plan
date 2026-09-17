import type { ReactNode } from 'react'

import { Close } from '@/components/label/Close'
import { Nav } from '@/components/label/Nav'
import styles from '@/components/label/label.module.css'

export default function LabelDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <Nav />
      {children}
      <Close />
    </div>
  )
}
