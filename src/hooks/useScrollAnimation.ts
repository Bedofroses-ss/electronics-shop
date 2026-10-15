import { useEffect } from 'react'
import { ScrollTrigger } from '../lib/animation/gsapSetup'
import { ANIMATION_REGISTRY, isAnimationName, type AnimationHandle } from '../lib/animation/registry'

const ANIMATION_SELECTOR = '[data-animation]'

/**
 * Единственный проход по разметке: находит все элементы с data-animation
 * и создаёт для каждого его анимацию из реестра.
 */
export function useScrollAnimation(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>(ANIMATION_SELECTOR))
    const handles: AnimationHandle[] = []

    elements.forEach((element) => {
      const name = element.dataset.animation
      if (!isAnimationName(name)) return

      try {
        handles.push(ANIMATION_REGISTRY[name](element))
      } catch (error) {
        // Один сломанный триггер не должен ронять всю страницу.
        console.warn('Не удалось создать анимацию:', name, error)
      }
    })

    ScrollTrigger.refresh()

    return () => {
      handles.forEach((handle) => {
        handle.kill()
      })
    }
  }, [enabled])
}
