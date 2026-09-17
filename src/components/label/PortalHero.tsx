'use client'

import { useEffect, useRef } from 'react'

import styles from './label.module.css'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function PortalHero() {
  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const duotoneRef = useRef<HTMLDivElement>(null)
  const panelLeftRef = useRef<HTMLDivElement>(null)
  const panelRightRef = useRef<HTMLDivElement>(null)
  const dotAmberRef = useRef<HTMLDivElement>(null)
  const dotTealRef = useRef<HTMLDivElement>(null)
  const wordLeftRef = useRef<HTMLSpanElement>(null)
  const wordRightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (query.matches) return

    const hero = heroRef.current
    const stage = stageRef.current
    if (!hero || !stage) return

    stage.classList.add(styles.motion)

    let ticking = false

    const update = () => {
      ticking = false
      const rect = hero.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const progress = clamp01(travel > 0 ? -rect.top / travel : 0)
      // The portal itself (panels, image, dots) opens across the first
      // 55% of the hero's scroll range; the wordmark keeps growing and
      // spreading across the whole range, so the title reads as still
      // opening even after the panels have fully cleared the frame.
      const portal = clamp01(progress / 0.55)

      const panelShift = lerp(0, 105, portal)
      if (panelLeftRef.current) panelLeftRef.current.style.transform = `translateX(-${panelShift}%)`
      if (panelRightRef.current) panelRightRef.current.style.transform = `translateX(${panelShift}%)`

      if (imageRef.current) imageRef.current.style.transform = `scale(${lerp(1.12, 1, portal)})`
      if (duotoneRef.current) duotoneRef.current.style.opacity = String(lerp(0, 0.35, portal))

      const dotX = lerp(0, 30, portal)
      const dotY = lerp(0, 18, portal)
      if (dotAmberRef.current) {
        dotAmberRef.current.style.transform = `translate(calc(-50% - ${dotX}vw), calc(-50% - ${dotY}vh))`
      }
      if (dotTealRef.current) {
        dotTealRef.current.style.transform = `translate(calc(-50% + ${dotX}vw), calc(-50% + ${dotY}vh))`
      }

      const scale = lerp(1, 1.55, progress)
      const spread = lerp(0, 52, progress)
      const tracking = lerp(-0.02, -0.065, progress)
      if (wordLeftRef.current) {
        wordLeftRef.current.style.transform = `scale(${scale}) translateX(-${spread}%)`
        wordLeftRef.current.style.letterSpacing = `${tracking}em`
      }
      if (wordRightRef.current) {
        wordRightRef.current.style.transform = `scale(${scale}) translateX(${spread}%)`
        wordRightRef.current.style.letterSpacing = `${tracking}em`
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
    <section ref={heroRef} id="top" className={styles.hero}>
      <div ref={stageRef} className={styles.stage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          className={styles.heroImage}
          src="/label/portrait.jpg"
          alt=""
          loading="eager"
          fetchPriority="high"
        />
        <div ref={duotoneRef} className={styles.duotone} />
        <div className={styles.veil} />
        <div ref={panelLeftRef} className={`${styles.panel} ${styles.panelLeft}`} />
        <div ref={panelRightRef} className={`${styles.panel} ${styles.panelRight}`} />
        <div ref={dotAmberRef} className={`${styles.dot} ${styles.dotAmber}`} />
        <div ref={dotTealRef} className={`${styles.dot} ${styles.dotTeal}`} />
        <h1 className={styles.wordmark}>
          <span ref={wordLeftRef} className={styles.wordLeft}>
            GHOST
          </span>
          <span ref={wordRightRef} className={styles.wordRight}>
            NOTE.
          </span>
        </h1>
        <div className={styles.metaTop}>
          <span>Est. 2016 — independent</span>
          <span>Reel 004</span>
        </div>
        <div className={styles.metaBottom}>
          <span>London — Lisbon</span>
          <span>Scroll to enter</span>
        </div>
      </div>
    </section>
  )
}
