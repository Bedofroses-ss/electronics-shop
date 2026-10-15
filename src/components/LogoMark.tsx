import { SITE } from '../data/content'

interface LogoMarkProps {
  className?: string
}

/**
 * Логотип сайта — стилизованное слово Trio, без картинки.
 * Разрядка и вес подобраны так, чтобы знак читался и в подвале, и в шапке.
 */
export function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <span
      className={`font-semibold lowercase tracking-[0.18em] text-mist ${className}`}
      aria-label={SITE.brand}
    >
      {SITE.brand}
    </span>
  )
}
