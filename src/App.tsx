import { ComparisonSection } from './components/ComparisonSection'
import { HeroSection } from './components/HeroSection'
import { IPadSection } from './components/IPadSection'
import { IPhoneSection } from './components/IPhoneSection'
import { MacBookSection } from './components/MacBookSection'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { CursorWidget } from './widgets/CursorWidget'
import { ProgressWidget } from './widgets/ProgressWidget'

export default function App() {
  const reducedMotion = useReducedMotion()
  const motionEnabled = !reducedMotion

  useLenis(motionEnabled)
  useScrollAnimation(motionEnabled)

  return (
    <div className="relative min-h-screen w-full bg-ink">
      <CursorWidget />
      <ProgressWidget />

      <div className="relative z-10">
        <SiteHeader />
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