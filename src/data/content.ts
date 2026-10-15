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
  title: 'Trio — iPhone 18 Pro, iPad M4, MacBook Air M5',
  /** Описание страницы для мета-тегов. */
  description: 'iPhone 18 Pro, iPad M4 and MacBook Air M5 — three devices, one ecosystem.',
  /** Заголовок первого экрана: это продукт, а не название сайта. */
  name: 'iPhone 18 Pro',
  tagline: 'Beyond Intelligence.',
  scrollCta: 'Scroll to discover',
  copyright: '© 2026 Apple Inc.',
} as const

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Introduction' },
  { id: 'iphone', label: 'iPhone 18 Pro' },
  { id: 'ipad', label: 'iPad' },
  { id: 'macbook', label: 'MacBook Air' },
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
  heading: 'iPad. Supercharged by M4.',
  blocks: [
    {
      title: 'M4',
      text: '10-core CPU and 10-core GPU.',
    },
    {
      title: 'Ultra Retina XDR',
      text: 'Ultra Retina XDR display.',
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
  heading: 'MacBook Air (M5)',
  blocks: [
    {
      title: '+15% CPU',
      text: 'Up to 15% faster CPU.',
    },
    {
      title: '+30% GPU',
      text: 'Up to 30% faster GPU.',
    },
    {
      title: 'Ray tracing +45%',
      text: 'Ray tracing up to 45% faster.',
    },
    {
      title: '153 GB/s',
      text: '153 GB/s memory bandwidth. Wi-Fi 7.',
    },
  ],
}

/** Лента характеристик для приёма specsParallax (бывший hoursParallax). */
export const SPEC_STRIP: string[] = ['M4', '10-core CPU', '10-core GPU', 'Ultra Retina XDR', 'Apple Pencil Pro']

/** Бегущая строка для приёма marqueeDots. */
export const MARQUEE_TEXT = 'IPHONE 18 PRO · IPAD · MACBOOK AIR · ONE ECOSYSTEM'

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
  { variant: 'placeholder', caption: 'M4 chip' },
  { variant: 'css-shape' },
  { variant: 'svg', device: 'ipad' },
]

export interface GenerationItem {
  name: string
  year: string
}

/**
 * Лента поколений для приёма lineupGenerations (бывший watchesGenerations).
 * В ТЗ конкретных моделей нет — список заполнен реальными поколениями MacBook Air,
 * при необходимости правьте здесь.
 */
export const MACBOOK_LINEUP: GenerationItem[] = [
  { name: 'MacBook Air (M1)', year: '2020' },
  { name: 'MacBook Air (M2)', year: '2022' },
  { name: 'MacBook Air (M3)', year: '2024' },
  { name: 'MacBook Air (M4)', year: '2025' },
  { name: 'MacBook Air (M5)', year: '2026' },
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
  devices: ['iPhone 18 Pro', 'iPad', 'MacBook Air'] as const,
  /** Прочерк означает, что характеристика в ТЗ не задана. */
  rows: [
    { label: 'Chip', values: ['A20 Pro', 'M4', 'M5'] },
    { label: 'CPU', values: ['6-core', '10-core', 'up to +15%'] },
    { label: 'GPU', values: ['7-core', '10-core', 'up to +30%'] },
    { label: 'Camera', values: ['48MP Pro Fusion', '—', '—'] },
    { label: 'Display', values: ['—', 'Ultra Retina XDR', 'Liquid Retina'] },
    { label: 'Video playback', values: ['up to 43 hours', '—', '—'] },
    { label: 'Ray tracing', values: ['—', '—', '+45%'] },
    { label: 'Memory bandwidth', values: ['—', '—', '153 GB/s'] },
    { label: 'Wireless', values: ['5G', 'Wi-Fi 6E', 'Wi-Fi 7'] },
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
  { kind: 'ipad', name: 'iPad' },
  { kind: 'macbook', name: 'MacBook Air' },
]

export interface FooterColumn {
  title: string
  links: string[]
}export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Shop and Learn',
    links: ['iPhone', 'iPad', 'Mac', 'Watch', 'AirPods'],
  },
  {
    title: 'Services',
    links: ['iCloud+', 'Apple Music', 'Apple TV+', 'Apple Pay'],
  },
  {
    title: 'Account',
    links: ['Manage Your Apple Account', 'Apple Store Account', 'iCloud.com'],
  },
  {
    title: 'About Apple',
    links: ['Newsroom', 'Careers', 'Investors', 'Contact Apple'],
  },
]

export const SOCIAL_LINKS: string[] = ['Facebook', 'Instagram', 'YouTube', 'LinkedIn']
