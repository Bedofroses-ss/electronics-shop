import { useEffect, type RefObject } from 'react'
import { CURSOR_FOLLOW, CURSOR_HIDE_SCALE, DURATION, EASE, MEDIA } from '../lib/animation/constants'
import { gsap } from '../lib/animation/gsapSetup'

const CURSOR_ATTR = 'data-cursor'

/**
 * Движение кастомного курсора за указателем и показ подписи
 * над элементами с атрибутом data-cursor.
 * На устройствах без точного указателя обработчики не создаются вовсе.
 */
export function useCursorFollow<T extends HTMLElement, L extends HTMLElement>(
  rootRef: RefObject<T | null>,
  labelRef: RefObject<L | null>,
): void {
  useEffect(() => {
    const root = rootRef.current
    const label = labelRef.current
    if (!root || !label) return
    if (typeof window.matchMedia !== 'function') return
    if (!window.matchMedia(MEDIA.finePointer).matches) return

    const moveX = gsap.quickTo(root, 'x', { duration: CURSOR_FOLLOW, ease: EASE.out })
    const moveY = gsap.quickTo(root, 'y', { duration: CURSOR_FOLLOW, ease: EASE.out })

    const hide = () => {
      gsap.to(root, { opacity: 0, scale: CURSOR_HIDE_SCALE, duration: DURATION.fast, ease: EASE.out })
    }

    const onPointerMove = (event: PointerEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)
    }

    const onPointerOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return

      const text = event.target.closest(`[${CURSOR_ATTR}]`)?.getAttribute(CURSOR_ATTR)
      if (!text) {
        hide()
        return
      }

      label.textContent = text
      gsap.to(root, { opacity: 1, scale: 1, duration: DURATION.fast, ease: EASE.out })
    }

    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerover', onPointerOver)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
    }
  }, [rootRef, labelRef])
}
