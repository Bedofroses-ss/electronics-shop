import type { FeatureBlock } from '../data/content'

interface FeatureListProps {
  blocks: FeatureBlock[]
  /** Светлая секция — карточки перекрашиваются под светлый фон. */
  light?: boolean
}

/** Список характеристик главы. Тексты приходят только из content.ts. */
export function FeatureList({ blocks, light = false }: FeatureListProps) {
  const cardClass = light
    ? 'rounded-3xl border border-ink/10 bg-ink/5 p-6'
    : 'glass glass-card p-6'
  const titleClass = light ? 'text-ink' : 'text-mist'

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {blocks.map((block) => (
        <li key={block.title} className={cardClass} data-animation="fadeIn">
          <h3 className={`mb-2 text-xl font-semibold ${titleClass}`}>{block.title}</h3>
          <p className="text-sm leading-relaxed text-graphite" data-animation="paragraph">
            {block.text}
          </p>
        </li>
      ))}
    </ul>
  )
}
