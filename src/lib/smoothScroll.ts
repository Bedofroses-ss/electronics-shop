import type Lenis from 'lenis'

/*
 * Доступ к экземпляру Lenis вне React.
 * Нужен виджетам — например, прогресс-бару, который по клику прокручивает к секции.
 */
let instance: Lenis | null = null

export function setLenis(next: Lenis | null): void {
  instance = next
}

export function getLenis(): Lenis | null {
  return instance
}

export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  if (instance) {
    instance.scrollTo(target)
    return
  }

  target.scrollIntoView({ behavior: 'smooth' })
}
