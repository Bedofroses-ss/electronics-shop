import { DeviceSilhouette, type DeviceVariant } from './DeviceSilhouette'

/**
 * Варианты визуального блока, заменяющего фотографии:
 * css-shape — фигура на градиенте, svg — векторный силуэт, placeholder — серая плашка.
 */
export type VisualVariant = 'css-shape' | 'svg' | 'placeholder'

interface VisualBlockProps {
  variant: VisualVariant
  device?: DeviceVariant
  caption?: string
  className?: string
}

export function VisualBlock({ variant, device = 'iphone', caption, className = '' }: VisualBlockProps) {
  if (variant === 'placeholder') {
    return (
      <div className={`placeholder-block p-6 ${className}`} data-visual="placeholder">
        {caption ? <span className="text-sm text-graphite">{caption}</span> : null}
      </div>
    )
  }

  if (variant === 'svg') {
    return (
      <div className={`flex items-center justify-center ${className}`} data-visual="svg">
        <DeviceSilhouette variant={device} className="h-full w-auto text-mist/80" />
      </div>
    )
  }

  return <div className={`rounded-3xl bg-gradient-cool ${className}`} data-visual="css-shape" />
}
