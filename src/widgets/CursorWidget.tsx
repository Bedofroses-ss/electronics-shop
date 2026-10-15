import { useRef } from 'react'
import { useCursorFollow } from '../hooks/useCursorFollow'

/**
 * Кастомный курсор: подпись, которая следует за указателем
 * и появляется над элементами с атрибутом data-cursor.
 */
export function CursorWidget() {
  const rootRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useCursorFollow(rootRef, labelRef)

  return (
    <div ref={rootRef} className="pointer-events-none fixed left-0 top-0 z-50 opacity-0" aria-hidden="true">
      <div className="glass glass-pill -translate-x-1/2 -translate-y-1/2 px-5 py-2">
        <span ref={labelRef} className="whitespace-nowrap text-xs uppercase tracking-widest text-mist" />
      </div>
    </div>
  )
}
