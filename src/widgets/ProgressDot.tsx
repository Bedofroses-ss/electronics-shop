interface ProgressDotProps {
  label: string
  isActive: boolean
  onSelect: () => void
}

/** Одна точка прогресс-бара: подпись секции и маркер. */
export function ProgressDot({ label, isActive, onSelect }: ProgressDotProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={isActive ? 'true' : undefined}
        className="group flex items-center gap-3"
      >
        <span
          className={`text-[10px] uppercase tracking-widest transition-opacity ${
            isActive ? 'text-mist opacity-100' : 'text-graphite opacity-0 group-hover:opacity-70'
          }`}
        >
          {label}
        </span>
        <span
          className={`h-2.5 w-2.5 rounded-full border transition-colors ${
            isActive ? 'border-accent bg-accent' : 'border-graphite bg-transparent'
          }`}
        />
      </button>
    </li>
  )
}
