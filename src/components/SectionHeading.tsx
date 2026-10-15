interface SectionHeadingProps {
  eyebrow: string
  heading: string
  /** Светлая секция — например, глава iPad. */
  light?: boolean
}

/** Заголовок главы: надзаголовок и h2 с триггерами title и paragraph. */
export function SectionHeading({ eyebrow, heading, light = false }: SectionHeadingProps) {
  return (
    <header className="mb-12">
      <p
        className={`mb-3 text-sm uppercase tracking-widest ${light ? 'text-graphite' : 'text-accent'}`}
        data-animation="paragraph"
      >
        {eyebrow}
      </p>
      <h2
        className={`text-4xl font-semibold leading-tight md:text-6xl ${light ? 'text-ink' : 'text-mist'}`}
        data-animation="title"
      >
        {heading}
      </h2>
    </header>
  )
}
