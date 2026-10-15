import { CURSOR_HINT, IPAD_CHAPTER, IPAD_GRID, MARQUEE_TEXT, SPEC_STRIP } from '../data/content'
import { FeatureList } from './FeatureList'
import { MarqueeDots } from './MarqueeDots'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { VisualBlock } from './VisualBlock'

/** Глава iPad: светлый фон, сетка фигур, бегущая строка и лента характеристик. */
export function IPadSection() {
  const chapter = IPAD_CHAPTER

  return (
    <Section id={chapter.id} webgl={chapter.webgl} cursor={CURSOR_HINT} background="bg-gradient-light-soft">
      <SectionHeading eyebrow={chapter.eyebrow} heading={chapter.heading} light />

      {/* gridPictures: каскадное появление сетки */}
      <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-3" data-animation="gridPictures">
        {IPAD_GRID.map((item, index) => (
          <VisualBlock
            key={item.caption ?? `grid-${index}`}
            variant={item.variant}
            device={item.device}
            caption={item.caption}
            className="h-40"
          />
        ))}
      </div>

      {/* marqueeDots: бегущая строка */}
      <div className="mb-14">
        <MarqueeDots text={MARQUEE_TEXT} />
      </div>

      {/* specsParallax: лента характеристик, бывший приём hoursParallax */}
      <ul className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-5" data-animation="specsParallax">
        {SPEC_STRIP.map((spec) => (
          <li key={spec} className="rounded-2xl border border-ink/10 bg-ink/5 p-4 text-center text-xs text-ink">
            {spec}
          </li>
        ))}
      </ul>

      <FeatureList blocks={chapter.blocks} light />
    </Section>
  )
}
