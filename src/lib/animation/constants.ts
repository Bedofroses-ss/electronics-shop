/**
 * Тайминги, дистанции и easing'и анимаций.
 * Все числовые значения живут здесь — в коде анимаций магических чисел нет.
 */

export const DURATION = {
  fast: 0.5,
  base: 0.9,
  slow: 1.3,
  /** Полный проход бегущей строки. */
  marquee: 24,
} as const

export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  linear: 'none',
} as const

export const DISTANCE = {
  /** Подъём при появлении, px. */
  fade: 32,
  /** Размах параллакса, проценты от высоты элемента. */
  parallax: 6,
  /** Дрейф ленты поколений: мягче основного параллакса. */
  lineupDrift: 3,
  /** Стартовый масштаб для приёма imageScaleDown. */
  scaleFrom: 1.15,
  /** Подъём слов заголовка при появлении, проценты от высоты строки. */
  titleRise: 100,
  /** Стартовый масштаб всплывающего пина. */
  pinScaleFrom: 0.6,
} as const

/** Сдвиг трека бегущей строки: половина ширины при нескольких копиях даёт бесшовный цикл. */
export const MARQUEE_SHIFT_PERCENT = -50

export const STAGGER = {
  word: 0.045,
  grid: 0.07,
  item: 0.05,
} as const

/** Точка старта ScrollTrigger: элемент показался на 80% высоты окна. */
export const SCROLL_START = 'top 80%'

/** Границы для приёмов, привязанных к прогрессу скролла. */
export const SCROLL_SCRUB = {
  start: 'top bottom',
  end: 'bottom top',
} as const

/** Настройки инерционного скролла Lenis. */
export const LENIS = {
  duration: 1.1,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
} as const

/** Медиа-запросы среды. */
export const MEDIA = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  finePointer: '(pointer: fine)',
  mobile: '(max-width: 768px)',
} as const

/** Длительность сглаживания курсора, с. */
export const CURSOR_FOLLOW = 0.35

/** Масштаб, до которого ужимается курсор при скрытии. */
export const CURSOR_HIDE_SCALE = 0.6

/** Бесконечное повторение в GSAP. */
export const INFINITE_REPEAT = -1

/** Количество копий текста в бегущей строке: две пары дают бесшовный цикл. */
export const MARQUEE_COPIES = 4
