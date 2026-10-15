import { useEffect } from 'react'
import Lenis from 'lenis'
import { LENIS } from '../lib/animation/constants'
import { gsap, ScrollTrigger } from '../lib/animation/gsapSetup'
import { setLenis } from '../lib/smoothScroll'

/** gsap.ticker считает в секундах, Lenis ожидает миллисекунды. */
const MILLISECONDS = 1000

/** Инерционный скролл Lenis, синхронизированный с ScrollTrigger. */
export function useLenis(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: LENIS.duration,
      wheelMultiplier: LENIS.wheelMultiplier,
      touchMultiplier: LENIS.touchMultiplier,
    })

    setLenis(lenis)

    const onScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    const tick = (time: number) => {
      lenis.raf(time * MILLISECONDS)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [enabled])
}
