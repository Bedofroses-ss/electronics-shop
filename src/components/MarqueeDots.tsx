import { MARQUEE_COPIES } from '../lib/animation/constants'

interface MarqueeDotsProps {
  text: string
}

/**
 * Бегущая строка для приёма marqueeDots.
 * Текст дублируется несколько раз — так цикл получается бесшовным,
 * тот же приём использован в референсе.
 */
export function MarqueeDots({ text }: MarqueeDotsProps) {
  return (
    <div className="overflow-hidden" data-animation="marqueeDots">
      <div className="flex w-max" data-marquee-track>
        {Array.from({ length: MARQUEE_COPIES }, (_, index) => (
          <p
            key={`marquee-copy-${index}`}
            className="whitespace-nowrap px-6 text-xs uppercase tracking-widest text-graphite"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  )
}
