import { ComparisonSection } from './components/ComparisonSection'
import { HeroSection } from './components/HeroSection'
import { IPadSection } from './components/IPadSection'
import { IPhoneSection } from './components/IPhoneSection'
import { MacBookSection } from './components/MacBookSection'
import { SiteFooter } from './components/SiteFooter'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { CanvasRoot } from './scenes/CanvasRoot'
import { CursorWidget } from './widgets/CursorWidget'
import { ProgressWidget } from './widgets/ProgressWidget'

/**
 * Корень страницы.
 * Три слоя снизу вверх: фиксированная градиентная подложка, прозрачный WebGL-слой
 * в #canvas-wrapper и контент. Так устроен референс Casquette.
 */
export default function App() {
  const reducedMotion = useReducedMotion()
  const motionEnabled = !reducedMotion

  // Порядок важен: Lenis создаётся раньше, чем ScrollTrigger цепляется к разметке.
  useLenis(motionEnabled)
  useScrollAnimation(motionEnabled)

  return (
    <div className="relative min-h-screen w-full bg-ink">
      <div className="pointer-events-none fixed inset-0 bg-gradient-cool" aria-hidden="true" />

      <div id="canvas-wrapper" className="pointer-events-none fixed inset-0" aria-hidden="true">
        <CanvasRoot />
      </div>

      <CursorWidget />
      <ProgressWidget />

      <div className="relative z-10">
        <main>
          <HeroSection />
          <IPhoneSection />
          <IPadSection />
          <MacBookSection />
          <ComparisonSection />
        </main>

        <SiteFooter />
      </div>
    </div>
  )
}
