import type { FeatureBlock } from '../data/content'

interface PinsWidgetProps {
  pins: FeatureBlock[]
}

/** Координаты пинов в процентах от габаритов силуэта устройства. */
const PIN_POSITIONS: Array<{ left: string; top: string }> = [
  { left: '16%', top: '20%' },
  { left: '58%', top: '46%' },
  { left: '26%', top: '74%' },
]

/**
 * Всплывающие пины на силуэте устройства.
 * Приём pinsFade из референса: точки с подписями появляются каскадом.
 */
export function PinsWidget({ pins }: PinsWidgetProps) {
  return (
    <div className="pointer-events-none absolute inset-0" data-animation="pinsFade">
      {pins.map((pin, index) => (
        <div
          key={pin.title}
          className="absolute flex items-center gap-3"
          style={PIN_POSITIONS[index % PIN_POSITIONS.length]}
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
          <p className="glass glass-pill px-3 py-1 text-[11px] uppercase tracking-widest text-mist">
            {pin.title}
          </p>
        </div>
      ))}
    </div>
  )
}
