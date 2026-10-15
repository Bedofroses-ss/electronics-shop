import { DISTANCE, DURATION, EASE, INFINITE_REPEAT, MARQUEE_SHIFT_PERCENT, SCROLL_SCRUB, SCROLL_START, STAGGER } from './constants'
import { gsap } from './gsapSetup'
import { splitWords } from './splitWords'

/**
 * Словарь триггеров: имена совпадают со значениями data-animation в разметке.
 * Имена часовых приёмов из референса переосмыслены под Apple:
 * hoursParallax → specsParallax, watchesGenerations → lineupGenerations.
 */
export type AnimationName =
  | 'title'
  | 'paragraph'
  | 'fadeIn'
  | 'line'
  | 'revealItems'
  | 'rowsFade'
  | 'imageScaleDown'
  | 'imageParallax'
  | 'gridPictures'
  | 'marqueeDots'
  | 'specsParallax'
  | 'lineupGenerations'
  | 'lineupGenerationsRow'
  | 'pinsFade'

export interface AnimationHandle {
  kill: () => void
}

type AnimationFactory = (element: HTMLElement) => AnimationHandle

function handleOf(...tweens: Array<gsap.core.Tween | gsap.core.Timeline>): AnimationHandle {
  return {
    kill: () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill()
        // revert, а не kill: kill оставляет применённым стартовое состояние
        // gsap.from (opacity 0 и сдвиг). В StrictMode эффект выполняется дважды,
        // и повторный from читает испорченное значение как конечное —
        // элемент застревает невидимым навсегда.
        tween.revert()
      })
    },
  }
}

function childrenOf(element: HTMLElement): HTMLElement[] {
  return Array.from(element.children).filter((child): child is HTMLElement => child instanceof HTMLElement)
}

function targetsOf(element: HTMLElement): HTMLElement[] {
  const children = childrenOf(element)
  return children.length > 0 ? children : [element]
}

const APPEAR = { start: SCROLL_START, once: true } as const

const title: AnimationFactory = (element) => {
  const { targets, restore } = splitWords(element)
  const handle = handleOf(
    gsap.from(targets, {
      opacity: 0,
      yPercent: DISTANCE.titleRise,
      duration: DURATION.slow,
      ease: EASE.out,
      stagger: STAGGER.word,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )
  return { kill: () => { handle.kill(); restore() } }
}

const paragraph: AnimationFactory = (element) => {
  const { targets, restore } = splitWords(element)
  const handle = handleOf(
    gsap.from(targets, {
      opacity: 0,
      y: DISTANCE.fade,
      duration: DURATION.base,
      ease: EASE.out,
      stagger: STAGGER.word,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )
  return { kill: () => { handle.kill(); restore() } }
}

const fadeIn: AnimationFactory = (element) =>
  handleOf(
    gsap.from(element, {
      opacity: 0,
      y: DISTANCE.fade,
      duration: DURATION.base,
      ease: EASE.out,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )

const line: AnimationFactory = (element) =>
  handleOf(
    gsap.from(element, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: DURATION.slow,
      ease: EASE.inOut,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )

const revealItems: AnimationFactory = (element) =>
  handleOf(
    gsap.from(targetsOf(element), {
      opacity: 0,
      y: DISTANCE.fade,
      duration: DURATION.base,
      ease: EASE.out,
      stagger: STAGGER.item,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )

/**
 * Строки таблицы. Анимируется только прозрачность:
 * transform на <tr> ломает раскладку таблицы в части браузеров.
 */
const rowsFade: AnimationFactory = (element) =>
  handleOf(
    gsap.from(targetsOf(element), {
      opacity: 0,
      duration: DURATION.base,
      ease: EASE.out,
      stagger: STAGGER.item,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )

const imageScaleDown: AnimationFactory = (element) =>
  handleOf(
    gsap.from(element, {
      scale: DISTANCE.scaleFrom,
      ease: EASE.linear,
      scrollTrigger: { trigger: element, ...SCROLL_SCRUB, scrub: true },
    }),
  )

const imageParallax: AnimationFactory = (element) =>
  handleOf(
    gsap.fromTo(
      element,
      { yPercent: -DISTANCE.parallax },
      {
        yPercent: DISTANCE.parallax,
        ease: EASE.linear,
        scrollTrigger: { trigger: element, ...SCROLL_SCRUB, scrub: true },
      },
    ),
  )

const gridPictures: AnimationFactory = (element) =>
  handleOf(
    gsap.from(targetsOf(element), {
      opacity: 0,
      y: DISTANCE.fade,
      duration: DURATION.base,
      ease: EASE.out,
      stagger: STAGGER.grid,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )

/** Бегущая строка: трек сдвигается на половину ширины и цикл повторяется. */
const marqueeDots: AnimationFactory = (element) => {
  const track = element.querySelector<HTMLElement>('[data-marquee-track]')
  if (!track) return { kill: () => undefined }

  return handleOf(
    gsap.to(track, {
      xPercent: MARQUEE_SHIFT_PERCENT,
      duration: DURATION.marquee,
      ease: EASE.linear,
      repeat: INFINITE_REPEAT,
    }),
  )
}

const specsParallax: AnimationFactory = (element) =>
  handleOf(
    gsap.fromTo(
      element,
      { xPercent: -DISTANCE.parallax },
      {
        xPercent: DISTANCE.parallax,
        ease: EASE.linear,
        scrollTrigger: { trigger: element, ...SCROLL_SCRUB, scrub: true },
      },
    ),
  )

/** Лента поколений целиком: медленный вертикальный сдвиг на фоне скролла. */
const lineupGenerations: AnimationFactory = (element) =>
  handleOf(
    gsap.fromTo(
      element,
      { yPercent: -DISTANCE.lineupDrift },
      {
        yPercent: DISTANCE.lineupDrift,
        ease: EASE.linear,
        scrollTrigger: { trigger: element, ...SCROLL_SCRUB, scrub: true },
      },
    ),
  )

/** Один ряд ленты: каскадное появление карточек. */
const lineupGenerationsRow: AnimationFactory = (element) =>
  handleOf(
    gsap.from(targetsOf(element), {
      opacity: 0,
      y: DISTANCE.fade,
      duration: DURATION.base,
      ease: EASE.out,
      stagger: STAGGER.grid,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )

/** Всплывающие пины на силуэте устройства. */
const pinsFade: AnimationFactory = (element) =>
  handleOf(
    gsap.from(targetsOf(element), {
      opacity: 0,
      scale: DISTANCE.pinScaleFrom,
      duration: DURATION.fast,
      ease: EASE.out,
      stagger: STAGGER.item,
      scrollTrigger: { trigger: element, ...APPEAR },
    }),
  )

export const ANIMATION_REGISTRY: Record<AnimationName, AnimationFactory> = {
  title,
  paragraph,
  fadeIn,
  line,
  revealItems,
  rowsFade,
  imageScaleDown,
  imageParallax,
  gridPictures,
  marqueeDots,
  specsParallax,
  lineupGenerations,
  lineupGenerationsRow,
  pinsFade,
}

export function isAnimationName(value: string | undefined): value is AnimationName {
  return value !== undefined && value in ANIMATION_REGISTRY
}
