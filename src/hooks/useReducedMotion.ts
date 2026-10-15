import { useEffect, useState } from 'react'
import { MEDIA } from '../lib/animation/constants'

function readPreference(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia(MEDIA.reducedMotion).matches
}

/** Следит за системной настройкой prefers-reduced-motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(readPreference)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const query = window.matchMedia(MEDIA.reducedMotion)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)

    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
