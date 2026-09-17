'use client'

import { useCallback, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'

import styles from './label.module.css'
import type { Release } from './data'

const THROW_TRANSITION = 'transform .45s cubic-bezier(.2,.7,.3,1), opacity .45s ease'
const SPRING_TRANSITION = 'transform .32s ease'

export function Deck({ releases }: { releases: Release[] }) {
  const [order, setOrder] = useState(() => releases.map((_, i) => i))
  const deckRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; dx: number } | null>(null)

  const settleThrow = useCallback(() => {
    window.setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]])
      const el = topRef.current
      if (el) {
        el.style.transition = 'none'
        el.style.transform = ''
        el.style.opacity = ''
      }
    }, 260)
  }, [])

  const throwTop = useCallback(
    (direction: 1 | -1) => {
      const el = topRef.current
      const width = deckRef.current?.offsetWidth ?? 320
      if (!el) return
      el.style.transition = THROW_TRANSITION
      el.style.transform = `translate(${direction * width * 1.3}px, -36px) rotate(${direction * 22}deg)`
      el.style.opacity = '0'
      settleThrow()
    },
    [settleThrow],
  )

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    el.setPointerCapture(e.pointerId)
    el.style.transition = 'none'
    dragRef.current = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, dx: 0 }
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    drag.dx = dx
    e.currentTarget.style.transform = `translate(${dx}px, ${dy * 0.4}px) rotate(${dx / 18}deg) scale(1.02)`
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const el = e.currentTarget
    const width = deckRef.current?.offsetWidth ?? 320
    const threshold = width * 0.1
    dragRef.current = null

    if (Math.abs(drag.dx) > threshold) {
      const direction = drag.dx > 0 ? 1 : -1
      el.style.transition = THROW_TRANSITION
      el.style.transform = `translate(${direction * width * 1.3}px, -36px) rotate(${direction * 22}deg)`
      el.style.opacity = '0'
      settleThrow()
    } else {
      el.style.transition = SPRING_TRANSITION
      el.style.transform = 'translate(0,0) rotate(0deg) scale(1)'
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      throwTop(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      throwTop(-1)
    }
  }

  return (
    <div className={styles.deckWrap}>
      <div
        ref={deckRef}
        className={styles.deck}
        tabIndex={0}
        role="group"
        aria-label="Release catalogue — drag a sleeve aside, or use the left and right arrow keys"
        onKeyDown={onKeyDown}
      >
        {order.map((releaseIndex, stackPos) => {
          const release = releases[releaseIndex]
          const isTop = stackPos === 0
          const offset = Math.min(stackPos, 4)
          const restStyle: CSSProperties | undefined = isTop
            ? undefined
            : {
                transform: `translate(${offset * 7}px, ${offset * -8}px) rotate(${
                  offset % 2 === 0 ? offset * 1.6 : -offset * 1.6
                }deg) scale(${1 - offset * 0.03})`,
                zIndex: releases.length - stackPos,
              }

          return (
            <div
              key={release.code}
              ref={isTop ? topRef : undefined}
              className={styles.card}
              data-accent={stackPos % 2 === 0 ? 'amber' : 'teal'}
              style={isTop ? { zIndex: releases.length } : restStyle}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
            >
              <div className={styles.cardTop}>
                <span>{release.code}</span>
                <span>{release.year}</span>
              </div>
              <div className={styles.cardTitle}>{release.title}</div>
              <div className={styles.cardMeta}>
                <span>{release.artist}</span>
                <span>{release.format}</span>
              </div>
            </div>
          )
        })}
      </div>
      <p className={styles.hint}>Drag a sleeve aside, or use ← →</p>
      <div className={styles.dots} aria-hidden="true">
        {releases.map((release, i) => (
          <span key={release.code} className={`${styles.dotStep} ${order[0] === i ? styles.dotStepActive : ''}`} />
        ))}
      </div>
    </div>
  )
}
