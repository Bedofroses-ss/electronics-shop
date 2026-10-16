import { MACBOOK_CHAPTER } from '../data/content'
import { FeatureList } from './FeatureList'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { SceneMacBook } from '../scenes/SceneMacBook'

export function MacBookSection() {
  const chapter = MACBOOK_CHAPTER
  return (
    <Section id={chapter.id} background="bg-gradient-warm-soft">
      <SectionHeading eyebrow={chapter.eyebrow} heading={chapter.heading} />
      <div className="my-12 h-[28rem] w-full md:h-[32rem]">
        <SceneMacBook />
      </div>
      <FeatureList blocks={chapter.blocks} />
    </Section>
  )
}