import { MACBOOK_CHAPTER, MACBOOK_LINEUP } from '../data/content'
import { FeatureList } from './FeatureList'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { VisualBlock } from './VisualBlock'

/** Глава MacBook Air: силуэт ноутбука и лента поколений. */
export function MacBookSection() {
  const chapter = MACBOOK_CHAPTER

  return (
    <Section id={chapter.id} webgl={chapter.webgl} background="bg-gradient-warm-soft">
      <SectionHeading eyebrow={chapter.eyebrow} heading={chapter.heading} />

      <div className="mb-16 flex justify-center" data-animation="imageScaleDown">
        <div className="w-full max-w-3xl" data-animation="imageParallax">
          <VisualBlock variant="svg" device="macbook" className="h-64 w-full" />
        </div>
      </div>

      {/* lineupGenerations: лента поколений, бывший приём watchesGenerations */}
      <div className="mb-16" data-animation="lineupGenerations">
        <div className="flex flex-wrap gap-6" data-animation="lineupGenerationsRow">
          {MACBOOK_LINEUP.map((item) => (
            <figure key={item.name} className="w-40">
              <VisualBlock variant="css-shape" className="mb-3 h-24" />
              <figcaption>
                <span className="block text-sm text-mist">{item.name}</span>
                <span className="block text-xs text-graphite">{item.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <FeatureList blocks={chapter.blocks} />
    </Section>
  )
}
