import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  /** Имя сцены для привязки к WebGL. Подключается на Этапе 3. */
  webgl?: string
  /** Текст кастомного курсора для этой секции. */
  cursor?: string
  /** Классы фона секции. */
  background?: string
  children: ReactNode
}

/**
 * Семантическая обёртка секции.
 * Несёт data-атрибуты, за которые на Этапе 2 будут цепляться анимации.
 */
export function Section({ id, webgl, cursor, background = '', children }: SectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      data-webgl={webgl ?? id}
      data-cursor={cursor}
      className={`relative w-full px-6 py-24 md:px-12 lg:px-20 ${background}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
