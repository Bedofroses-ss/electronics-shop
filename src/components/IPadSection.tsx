import { IPAD_CHAPTER } from '../data/content'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { SceneIPad } from '../scenes/SceneIPad'

const SPEC_STRIP = ['A17 Pro', '6-core CPU', '6-core GPU', 'Liquid Retina', 'Apple Pencil Pro']

export function IPadSection() {
  const chapter = IPAD_CHAPTER

  return (
    <Section id={chapter.id} background="bg-mist">
      <SectionHeading eyebrow={chapter.eyebrow} heading={chapter.heading} light />

      <div className="my-12 h-[32rem] w-full">
        <SceneIPad />
      </div>

      <div className="mx-auto mt-4 max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-black/60 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          Scroll to explore
        </div>
      </div>

      <div
        className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3"
        data-animation="fadeIn"
      >
        {SPEC_STRIP.map((spec) => (
          <span
            key={spec}
            className="rounded-full border border-black/10 bg-white/40 px-5 py-2 text-xs text-black/70 backdrop-blur"
          >
            {spec}
          </span>
        ))}
      </div>

      <div
        className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
        data-animation="fadeIn"
      >
        {chapter.blocks.map((block) => (
          <div
            key={block.title}
            className="rounded-2xl border border-black/10 bg-white/40 p-6 backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-black">{block.title}</h3>
            <p className="mt-2 text-sm text-black/60">{block.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}