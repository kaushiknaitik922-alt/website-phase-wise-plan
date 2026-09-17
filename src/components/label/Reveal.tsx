'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import styles from './label.module.css'
import { useMotionAllowed } from './useMotion'

/**
 * One-shot entry reveal. Unlike the portal, this never un-reveals once
 * triggered — it fires once and stays visible on scroll back up.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const allowed = useMotionAllowed()
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!allowed) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [allowed])

  const classes = [className, allowed ? styles.reveal : '', inView ? styles.inView : ''].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} style={allowed && delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
