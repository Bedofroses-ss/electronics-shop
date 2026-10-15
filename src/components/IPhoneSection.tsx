import { IPHONE_CHAPTER } from '../data/content'
import { PinsWidget } from '../widgets/PinsWidget'
import { FeatureList } from './FeatureList'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { VisualBlock } from './VisualBlock'

/** Глава iPhone 18 Pro: силуэт устройства, пины и подсвеченные блоки характеристик. */
export function IPhoneSection() {
  const chapter = IPHONE_CHAPTER

  return (
    <Section id={chapter.id} webgl={chapter.webgl} background="bg-gradient-cool-soft">
      <SectionHeading eyebrow={chapter.eyebrow} heading={chapter.heading} />

      <div className="mb-16 grid items-center gap-10 md:grid-cols-2">
        <div className="relative">
          <VisualBlock variant="svg" device="iphone" className="h-80" />
          <PinsWidget pins={chapter.blocks} />
        </div>

        {/* Двухслойная обёртка: внешний слой держит масштаб, внутренний — параллакс.
            Тот же приём, что в референсе: transform'ы не конфликтуют в одном элементе. */}
        <div className="flex flex-col gap-6" data-animation="imageScaleDown">
          <div className="flex flex-col gap-6" data-animation="imageParallax">
            <VisualBlock variant="css-shape" className="h-40" />
            <VisualBlock variant="placeholder" caption="Pro Fusion camera array" className="h-40" />
          </div>
        </div>
      </div>

      <FeatureList blocks={chapter.blocks} />
    </Section>
  )
}
