'use client'

import { useEffect, useState } from 'react'

/**
 * False on the server and on first paint, so the no-JS / reduced-motion
 * render is always the finished page. Flips true only once we've confirmed
 * the visitor hasn't asked for reduced motion.
 */
export function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setAllowed(!query.matches)
  }, [])

  return allowed
}
