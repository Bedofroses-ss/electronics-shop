import { NAV_ITEMS, PROGRESS_LABEL } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToSection } from '../lib/smoothScroll'
import { ProgressDot } from './ProgressDot'

/**
 * Прогресс-бар с точками: по одной на секцию.
 * Активная секция приходит из общего хука — тот же источник, что и у 3D-слоя.
 */
export function ProgressWidget() {
  const active = useActiveSection()

  return (
    <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:block" aria-label={PROGRESS_LABEL}>
      <ul className="flex flex-col items-end gap-4">
        {NAV_ITEMS.map((item) => (
          <ProgressDot
            key={item.id}
            label={item.label}
            isActive={item.id === active}
            onSelect={() => scrollToSection(item.id)}
          />
        ))}
      </ul>
    </nav>
  )
}
