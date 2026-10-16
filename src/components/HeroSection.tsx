import { lazy, Suspense, useState } from 'react'
import { SITE } from '../data/content'

const SceneIPhone = lazy(() =>
  import('../scenes/SceneIPhone').then((m) => ({ default: m.SceneIPhone })),
)

const POSTER = `${import.meta.env.BASE_URL}models/iphone.png`

export function HeroSection() {
  const [isModelReady, setIsModelReady] = useState(false)

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center px-5 pt-[clamp(4.5rem,12vh,8rem)] text-center"
    >
      <div className="relative z-20">
        <h1 className="text-[clamp(3.25rem,8.8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-white">
          {SITE.name}
        </h1>
        <p className="mt-5 text-[clamp(1rem,1.7vw,1.25rem)] text-white/50">
          {SITE.tagline}
        </p>
        <a
          href="#iphone"
          className="mt-12 inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-sm text-white transition-colors hover:border-white/60 hover:bg-white/5"
        >
          {SITE.scrollCta}
        </a>
      </div>

      <div
        className="relative mt-10 h-[min(54vh,560px)] w-full max-w-[760px] flex-1"
        aria-busy={!isModelReady}
      >
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
            isModelReady ? 'opacity-0' : 'opacity-90'
          }`}
        />

        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isModelReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Suspense fallback={null}>
            <SceneIPhone onReady={() => setIsModelReady(true)} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}