/**
 * Единый источник всех текстов и цифр сайта.
 * Правило проекта: ни одна строка контента не хранится в компонентах.
 */

/** Идентификаторы секций — они же порядок точек в прогресс-баре. */
export const SECTION_IDS = ['hero', 'iphone', 'ipad', 'macbook', 'comparison'] as const

export type SectionId = (typeof SECTION_IDS)[number]

export interface NavItem {
  id: SectionId
  label: string
}

export const SITE = {
  /** Название сайта: идёт в <title>, мета-теги и лого. */
  brand: 'Trio',
  /** Полное имя страницы для мета-тегов. */
  title: 'Trio — iPhone 18 Pro, iPad mini, MacBook Pro',
  /** Описание страницы для мета-тегов. */
  description: 'iPhone 18 Pro, iPad mini and MacBook Pro — three devices, one ecosystem.',
  /** Заголовок первого экрана: это продукт, а не название сайта. */
  name: 'iPhone 18 Pro',
  tagline: 'Beyond Intelligence.',
  scrollCta: 'Scroll to discover',
  copyright: '© 2026 Trio. Все права защищены.',
} as const

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Introduction' },
  { id: 'iphone', label: 'iPhone 18 Pro' },
  { id: 'ipad', label: 'iPad mini' },
  { id: 'macbook', label: 'MacBook Pro' },
  { id: 'comparison', label: 'Comparison' },
]

/** Подпись для навигации прогресс-бара. */
export const PROGRESS_LABEL = 'Page sections'

/** Текст, который показывает кастомный курсор над своей секцией. */
export const CURSOR_HINT = 'Scroll to explore'

export interface FeatureBlock {
  title: string
  text: string
}

export interface DeviceChapter {
  id: SectionId
  /** Имя сцены для привязки data-webgl (используется на Этапе 3). */
  webgl: string
  eyebrow: string
  heading: string
  blocks: FeatureBlock[]
}

export const IPHONE_CHAPTER: DeviceChapter = {
  id: 'iphone',
  webgl: 'IPhone',
  eyebrow: 'The Power of AI',
  heading: 'iPhone 18 Pro',
  blocks: [
    {
      title: 'A20 Pro',
      text: 'A20 Pro chip. 2nm. 6-core CPU. 7-core GPU.',
    },
    {
      title: '48MP Pro Fusion',
      text: '48MP Pro Fusion Camera System. Variable Aperture.',
    },
    {
      title: '43 hours',
      text: 'Up to 43 hours video playback.',
    },
  ],
}

export const IPAD_CHAPTER: DeviceChapter = {
  id: 'ipad',
  webgl: 'IPad',
  eyebrow: 'Your Next Computer',
  heading: 'iPad mini. Supercharged by A17 Pro.',
  blocks: [
    {
      title: 'A17 Pro',
      text: '6-core CPU and 6-core GPU.',
    },
    {
      title: 'Liquid Retina',
      text: 'Liquid Retina display.',
    },
    {
      title: 'Apple Pencil Pro',
      text: 'Apple Pencil Pro support.',
    },
  ],
}

export const MACBOOK_CHAPTER: DeviceChapter = {
  id: 'macbook',
  webgl: 'MacBook',
  eyebrow: 'Power. Silence. Elegance.',
  heading: 'MacBook Pro (M1 Pro)',
  blocks: [
    {
      title: 'M1 Pro',
      text: 'Up to 10-core CPU with 8 performance and 2 efficiency cores.',
    },
    {
      title: '16-core GPU',
      text: 'Up to 16-core GPU.',
    },
    {
      title: '200 GB/s',
      text: '200 GB/s memory bandwidth. Wi-Fi 6.',
    },
    {
      title: '32GB',
      text: 'Up to 32GB unified memory.',
    },
  ],
}

/** Лента характеристик для приёма specsParallax (бывший hoursParallax). */
export const SPEC_STRIP: string[] = ['A17 Pro', '6-core CPU', '6-core GPU', 'Liquid Retina', 'Apple Pencil Pro']

/** Бегущая строка для приёма marqueeDots. */
export const MARQUEE_TEXT = 'IPHONE 18 PRO · IPAD MINI · MACBOOK PRO · ONE ECOSYSTEM'

export interface GridItem {
  variant: 'css-shape' | 'svg' | 'placeholder'
  device?: 'iphone' | 'ipad' | 'macbook'
  caption?: string
}

/** Наполнение сетки для приёма gridPictures в главе iPad. Фотографий нет — только фигуры и SVG. */
export const IPAD_GRID: GridItem[] = [
  { variant: 'svg', device: 'ipad' },
  { variant: 'css-shape' },
  { variant: 'placeholder', caption: 'Apple Pencil Pro' },
  { variant: 'placeholder', caption: 'A17 Pro chip' },
  { variant: 'css-shape' },
  { variant: 'svg', device: 'ipad' },
]

export interface GenerationItem {
  name: string
  year: string
}

/**
 * Лента поколений для приёма lineupGenerations (бывший watchesGenerations).
 * В ТЗ конкретных моделей нет — список заполнен реальными поколениями MacBook Pro,
 * при необходимости правьте здесь.
 */
export const MACBOOK_LINEUP: GenerationItem[] = [
  { name: 'MacBook Pro (M1 Pro)', year: '2021' },
  { name: 'MacBook Pro (M2 Pro)', year: '2023' },
  { name: 'MacBook Pro (M3 Pro)', year: '2023' },
  { name: 'MacBook Pro (M4 Pro)', year: '2024' },
  { name: 'MacBook Pro (M5 Pro)', year: '2026' },
]

export interface ComparisonRow {
  label: string
  values: [string, string, string]
}

export const COMPARISON = {
  id: 'comparison' as SectionId,
  webgl: 'Comparison',
  heading: 'Three devices. One ecosystem.',
  specColumnLabel: 'Specification',
  devices: ['iPhone 18 Pro', 'iPad mini', 'MacBook Pro'] as const,
  /** Прочерк означает, что характеристика в ТЗ не задана. */
  rows: [
    { label: 'Chip', values: ['A20 Pro', 'A17 Pro', 'M1 Pro'] },
    { label: 'CPU', values: ['6-core', '6-core', '10-core'] },
    { label: 'GPU', values: ['7-core', '6-core', '16-core'] },
    { label: 'Camera', values: ['48MP Pro Fusion', '—', '—'] },
    { label: 'Display', values: ['—', 'Liquid Retina', 'Liquid Retina XDR'] },
    { label: 'Video playback', values: ['up to 43 hours', '—', '—'] },
    { label: 'Memory bandwidth', values: ['—', '—', '200 GB/s'] },
    { label: 'Wireless', values: ['5G', 'Wi-Fi 6E', 'Wi-Fi 6'] },
    { label: 'Accessory', values: ['—', 'Apple Pencil Pro', '—'] },
  ] as ComparisonRow[],
} as const

export interface ComparisonItem {
  kind: 'iphone' | 'ipad' | 'macbook'
  name: string
}

/** Ряд заглушек устройств в секции сравнения: форма и подпись под ней. */
export const COMPARISON_LINEUP: ComparisonItem[] = [
  { kind: 'iphone', name: 'iPhone 18 Pro' },
  { kind: 'ipad', name: 'iPad mini' },
  { kind: 'macbook', name: 'MacBook Pro' },
]
