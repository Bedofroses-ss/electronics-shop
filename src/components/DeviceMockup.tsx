export type MockupKind = 'iphone' | 'ipad' | 'macbook'

const SOURCES: Record<MockupKind, string> = {
  iphone: `${import.meta.env.BASE_URL}models/iphone.png`,
  ipad: `${import.meta.env.BASE_URL}models/ipad.png`,
  macbook: `${import.meta.env.BASE_URL}models/macbook.png`,
}

interface DeviceMockupProps {
  kind: MockupKind
  className?: string
}

export function DeviceMockup({ kind, className = '' }: DeviceMockupProps) {
  return (
    <img
      src={SOURCES[kind]}
      alt={kind}
      draggable={false}
      className={`object-contain ${className}`}
    />
  )
}
