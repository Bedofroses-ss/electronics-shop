/**
 * Векторные силуэты устройств.
 * Растровых изображений в проекте нет — правило ТЗ, поэтому форма рисуется кодом.
 */

export type DeviceVariant = 'iphone' | 'ipad' | 'macbook'

interface DeviceSilhouetteProps {
  variant: DeviceVariant
  className?: string
}

const VIEW_BOX: Record<DeviceVariant, string> = {
  iphone: '0 0 120 240',
  ipad: '0 0 200 280',
  macbook: '0 0 280 180',
}

/** Корпус телефона: рамка и экран. */
function PhoneShape() {
  return (
    <>
      <rect x="4" y="4" width="112" height="232" rx="26" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="18" width="92" height="204" rx="18" fill="currentColor" opacity="0.14" />
      <rect x="48" y="10" width="24" height="4" rx="2" fill="currentColor" opacity="0.5" />
    </>
  )
}

/** Корпус планшета: шире телефона, с полосой Apple Pencil сбоку. */
function PadShape() {
  return (
    <>
      <rect x="4" y="4" width="180" height="272" rx="22" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="16" width="156" height="248" rx="14" fill="currentColor" opacity="0.14" />
      <rect x="192" y="96" width="6" height="88" rx="3" fill="currentColor" opacity="0.5" />
    </>
  )
}

/** Ноутбук: крышка с экраном и трапеция основания. */
function LaptopShape() {
  return (
    <>
      <rect x="60" y="8" width="160" height="112" rx="10" stroke="currentColor" strokeWidth="2" />
      <rect x="70" y="18" width="140" height="92" rx="6" fill="currentColor" opacity="0.14" />
      <path d="M40 132h200l16 32H24l16-32Z" stroke="currentColor" strokeWidth="2" />
      <rect x="118" y="138" width="44" height="6" rx="3" fill="currentColor" opacity="0.5" />
    </>
  )
}

export function DeviceSilhouette({ variant, className = '' }: DeviceSilhouetteProps) {
  return (
    <svg
      viewBox={VIEW_BOX[variant]}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === 'iphone' ? <PhoneShape /> : null}
      {variant === 'ipad' ? <PadShape /> : null}
      {variant === 'macbook' ? <LaptopShape /> : null}
    </svg>
  )
}
