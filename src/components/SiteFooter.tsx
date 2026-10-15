import { FOOTER_COLUMNS, SITE, SOCIAL_LINKS } from '../data/content'
import { LogoMark } from './LogoMark'

/** Подвал: колонки ссылок, соцсети, знак и копирайт. */
export function SiteFooter() {
  return (
    <footer className="w-full bg-ink px-6 py-16 md:px-12 lg:px-20" data-animation="fadeIn">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 grid gap-8 md:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <section key={column.title}>
              <h4 className="mb-3 text-sm font-semibold text-mist" data-animation="fadeIn">
                {column.title}
              </h4>
              <ul className="space-y-2" data-animation="revealItems">
                {column.links.map((link) => (
                  <li key={link} className="text-sm text-graphite">
                    {link}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <ul className="mb-8 flex flex-wrap gap-6" data-animation="revealItems">
          {SOCIAL_LINKS.map((social) => (
            <li key={social} className="text-sm text-graphite">
              {social}
            </li>
          ))}
        </ul>

        <div className="mb-8 h-px w-full bg-white/10" data-animation="line" />

        <div className="flex items-center gap-4">
          <LogoMark className="text-xl" />
          <p className="text-sm text-graphite">{SITE.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
