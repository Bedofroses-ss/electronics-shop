/**
 * CSS-заглушки устройств с реальными пропорциями.
 * Никакого Three.js: только разметка, Tailwind и градиенты.
 * Пропорции взяты из габаритов корпусов (высота : ширина).
 */

export type MockupKind = 'iphone' | 'ipad' | 'macbook'

/**
 * Классы заданы статическими строками: Tailwind собирает их сканированием
 * исходников и динамически собранные имена не увидит.
 */
const FRAME: Record<MockupKind, string> = {
  // 163.4 × 78 мм → 2.095 : 1, радиус скругления 12% ширины
  iphone: 'aspect-[1/2.095] rounded-[12%]',
  // 281.6 × 215.5 мм → 1.306 : 1, радиус 4%
  ipad: 'aspect-[1/1.306] rounded-[4%]',
  // 304.1 × 215 мм в раскрытом виде → 1.414 : 1
  macbook: 'aspect-[1/1.414]',
}

const SHELL =
  'h-full w-full border border-white/15 bg-gradient-to-br from-[#3a3a3e] via-[#2a2a2e] to-[#1b1b1e] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
const SCREEN = 'h-full w-full rounded-[inherit] bg-gradient-to-b from-[#0b1020] to-[#05070d]'

/** Тройная камера: три объектива треугольником и вспышка рядом с ними. */
function PhoneCamera() {
  const lens = 'rounded-full bg-[#0d0d0f] ring-1 ring-white/15'

  return (
    <div className="absolute left-[7%] top-[3.5%] grid h-[24%] w-[44%] grid-cols-2 gap-[9%] rounded-[20%] border border-white/10 bg-black/35 p-[8%]">
      <span className={lens} />
      <span className={lens} />
      <span className={lens} />
      <span className="flex items-center justify-center">
        <span className="h-[42%] w-[42%] rounded-full bg-[#f5f5f7]/70" />
      </span>
    </div>
  )
}

/** Телефон: корпус, экран-вставка и блок камеры в верхнем левом углу. */
function PhoneBody() {
  return (
    <div className={`relative ${SHELL} rounded-[inherit] p-[4%]`}>
      <div className="h-full w-full rounded-[9%] bg-gradient-to-b from-[#101018] to-[#08080c]" />
      <PhoneCamera />
    </div>
  )
}

/** Планшет: светлее телефона, экран занимает почти всю площадь. */
function TabletBody() {
  return (
    <div className={`relative ${SHELL} rounded-[inherit] bg-gradient-to-br from-[#242428] via-[#1a1a1e] to-[#121215] p-[3%]`}>
      <div className={SCREEN} />
    </div>
  )
}

/** Ноутбук: экран сверху, клавиатура снизу чуть шире — раскрытие около 100°. */
function LaptopBody() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-end">
      <div
        className={`${SHELL} w-[86%] flex-1 rounded-t-[6px] p-[3.5%]`}
        style={{ clipPath: 'polygon(2% 0, 98% 0, 100% 100%, 0 100%)' }}
      >
        <div className="h-full w-full rounded-[4px] bg-gradient-to-b from-[#0b1020] to-[#05070d]" />
      </div>

      <div className="flex h-[15%] w-full items-center justify-center rounded-b-[8px] border border-white/15 bg-gradient-to-b from-[#3a3a3e] to-[#1e1e21]">
        <span className="h-[22%] w-[22%] rounded-full border border-white/15 bg-white/5" />
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
