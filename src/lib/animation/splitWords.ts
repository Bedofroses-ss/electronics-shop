export interface SplitResult {
  /** Элементы, к которым применяется stagger. */
  targets: HTMLElement[]
  /** Возврат разметки в исходное состояние. */
  restore: () => void
}

/**
 * Разбивает текст элемента на слова-обёртки.
 * Если внутри есть другие элементы или текст пуст — возвращает сам элемент без правок,
 * чтобы не ломать вложенную разметку.
 */
export function splitWords(element: HTMLElement): SplitResult {
  const original = element.textContent ?? ''
  const hasElementChildren = Array.from(element.childNodes).some(
    (node) => node.nodeType === Node.ELEMENT_NODE,
  )

  if (hasElementChildren || !original.trim()) {
    return { targets: [element], restore: () => undefined }
  }

  const words = original.split(/\s+/).filter((word) => word.length > 0)
  element.textContent = ''

  const targets = words.map((word) => {
    const span = document.createElement('span')
    span.textContent = word
    span.style.display = 'inline-block'
    span.style.willChange = 'transform, opacity'
    element.append(span, document.createTextNode(' '))
    return span
  })

  return {
    targets,
    restore: () => {
      element.textContent = original
    },
  }
}
