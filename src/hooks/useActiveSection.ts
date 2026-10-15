import { useEffect, useState } from 'react'
import { NAV_ITEMS, type SectionId } from '../data/content'
import { ScrollTrigger } from '../lib/animation/gsapSetup'

/** Секция, которая сейчас находится в центре окна. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(NAV_ITEMS[0].id)

  useEffect(() => {
    const triggers = NAV_ITEMS.flatMap(({ id }) => {
      const section = document.getElementById(id)
      if (!section) return []

      return [
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(id)
          },
        }),
      ]
    })

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [])

  return active
}
