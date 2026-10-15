/**
 * CSS-заглушки устройств с реальными пропорциями.
 * Никакого Three.js: только разметка, Tailwind и градиенты.
 * Пропорции взяты из габаритов корпусов (высота : ширина).
 */

export type MockupKind = 'iphone' | 'ipad' | 'macbook'

const FRAME: Record<MockupKind, string> = {
  iphone: 'aspect-[1/2.095] rounded-[12%]',
  ipad: 'aspect-[1/1.306] rounded-[4%]',
  macbook: 'w-[7.75rem] md:w-[10.6rem]',
}

const GLOW =
  'shadow-[0_0_24px_rgba(0,113,227,0.18),0_8px_32px_rgba(0,0,0,0.55)]'

function PhoneBody() {
  return (
    <div
      className={`relative h-full w-full rounded-[inherit] border border-[#55555a] bg-gradient-to-b from-[#3a3a3e] to-[#1e1e21] ${GLOW}`}
    >
      <div className="absolute inset-[2.5%] overflow-hidden rounded-[10%] bg-[#4a4a4e]">
        <div className="absolute inset-[1.5%] rounded-[8.5%] bg-gradient-to-b from-[#0a0a2a] to-[#050510]">
          <div className="absolute left-1/2 top-[3%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}

function TabletBody() {
  return (
    <div
      className={`relative h-full w-full rounded-[inherit] border border-[#55555a]/80 bg-gradient-to-b from-[#3a3a3e] to-[#2a2a2e] ${GLOW}`}
    >
      <div className="absolute inset-[5%] overflow-hidden rounded-[2%] bg-[#2a2a2e]">
        <div className="absolute inset-0 rounded-[1.5%] bg-gradient-to-b from-[#0a1929] to-[#1a0a2e]">
          <div className="absolute left-1/2 top-[2.2%] h-[1.8%] w-[1.8%] -translate-x-1/2 rounded-full bg-[#0a0a0c] ring-1 ring-white/10" />
        </div>
      </div>
    </div>
  )
}

function LaptopBody() {
  return (
    <div className={`relative h-full w-full ${GLOW}`}>
      {/* Экран — 68% высоты, трапеция */}
      <div
        className="absolute left-1/2 top-0 h-[68%] w-[92%] -translate-x-1/2 bg-[#2a2a2e]"
        style={{ clipPath: 'polygon(2.5% 0, 97.5% 0, 100% 100%, 0 100%)' }}
      >
        <div className="absolute inset-[4%_3%_3%_3%] bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2a]" />
      </div>

      {/* Шарнир */}
      <div className="absolute left-1/2 top-[68%] z-10 h-[2px] w-[94%] -translate-x-1/2 bg-black" />

      {/* Клавиатура — 30% высоты */}
      <div className="absolute bottom-0 left-1/2 h-[30%] w-full -translate-x-1/2 rounded-b-[6px] border border-[#55555a]/60 bg-gradient-to-b from-[#3a3a3e] to-[#232326]">
        <div className="mx-auto mt-[6%] h-[35%] w-[28%] rounded-[3px] border border-white/5 bg-[#1a1a1e]" />
        <div className="mx-auto mt-[5%] flex w-[78%] flex-col gap-[10%]">
          <div className="h-px w-full bg-white/15" />
          <div className="h-px w-full bg-white/15" />
          <div className="h-px w-full bg-white/15" />
        </div>
      </div>
    </div>
  )
}

interface DeviceMockupProps {
  kind: MockupKind
  className?: string
}

export function DeviceMockup({ kind, className = '' }: DeviceMockupProps) {
  return (
    <div className={`relative ${FRAME[kind]} ${className}`}>
      {kind === 'iphone' ? <PhoneBody /> : null}
      {kind === 'ipad' ? <TabletBody /> : null}
      {kind === 'macbook' ? <LaptopBody /> : null}
    </div>
  )
}
