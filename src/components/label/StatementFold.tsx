'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

import styles from './label.module.css'
import { Reveal } from './Reveal'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function StatementFold() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (query.matches) return

    const section = sectionRef.current
    if (!section) return

    let ticking = false

    const update = () => {
      ticking = false
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 as the section enters the bottom of the viewport, 1 as it leaves the top.
      const progress = clamp01((vh - rect.top) / (vh + rect.height))
      const drift = lerp(-50, 50, progress)
      const rotate = lerp(-12, 8, progress)
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(calc(-50% + ${drift}px)) rotate(${rotate}deg)`
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.fold}>
      <span className={styles.foldIndex} aria-hidden="true">
        01
      </span>
      <div ref={imageRef} className={styles.foldImageWrap}>
        <Image src="/label/portrait.jpg" alt="" fill sizes="380px" className={styles.foldImage} />
      </div>
      <Reveal className={styles.foldInner}>
        <p className={styles.foldLabel}>Field notes</p>
        <p className={styles.statement}>
          We press records for people who still <span className={styles.statementAccent}>listen end to end</span>,
          not for a fifteen-second clip.
        </p>
      </Reveal>
    </section>
  )
}
