import { SITE } from '../data/content'
import { Section } from './Section'

/** Первая секция: название продукта, слоган и стеклянная пилюля-приглашение. */
export function HeroSection() {
  return (
    <Section id="hero" webgl="Hero" background="bg-transparent">
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1
          className="text-6xl font-semibold tracking-tight text-mist md:text-8xl lg:text-[7rem]"
          data-animation="title"
        >
          {SITE.name}
        </h1>
        <p className="mt-6 text-xl text-graphite md:text-2xl" data-animation="paragraph">
          {SITE.tagline}
        </p>
        <button type="button" className="glass glass-pill mt-12 px-8 py-3 text-sm text-mist" data-animation="fadeIn">
          {SITE.scrollCta}
        </button>
      </div>
    </Section>
  )
}
