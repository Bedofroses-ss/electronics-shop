import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import type { SectionId } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useReducedMotion } from '../hooks/useReducedMotion'

// lazy() ждёт модуль с default — поэтому "заворачиваем" named export в default
const SceneIPhone = lazy(() =>
  import('./SceneIPhone').then((m) => ({ default: m.SceneIPhone }))
)
const SceneIPad = lazy(() =>
  import('./SceneIPad').then((m) => ({ default: m.SceneIPad }))
)
const SceneMacBook = lazy(() =>
  import('./SceneMacBook').then((m) => ({ default: m.SceneMacBook }))
)

/**
 * Привязка секций к 3D-сценам — тот самый контракт data-webgl из референса.
 * Секции без записи в таблице остаются без WebGL: секция сравнения
 * показывается CSS-заглушками устройств, без Three.js.
 */
const SECTION_SCENES: Partial<Record<SectionId, LazyExoticComponent<ComponentType>>> = {
  hero: SceneIPhone,
  iphone: SceneIPhone,
  ipad: SceneIPad,
  macbook: SceneMacBook,
}

/**
 * Единственный WebGL-слой страницы. Живёт в #canvas-wrapper отдельно от контента,
 * как в референсе, и переключает сцену по активной секции.
 */
export function CanvasRoot() {
  const reducedMotion = useReducedMotion()
  const activeSection = useActiveSection()
  const Scene = SECTION_SCENES[activeSection]

  if (reducedMotion || !Scene) return null

  // На Этапе 5 сюда встанет ScenePoster как запасной вариант.
  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  )
}
