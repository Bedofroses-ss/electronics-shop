import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'iPhone', href: '#iphone' },
  { label: 'iPad', href: '#ipad' },
  { label: 'MacBook', href: '#macbook' },
  { label: 'Compare', href: '#comparison' },
]

export function SiteHeader() {
  const [visible, setVisible] = useState(false)

  return (
    // Невидимая зона сверху: высота 24, курсор попадает в неё в самом верху страницы
    <div
      className="fixed top-0 left-0 z-50 w-full h-24"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-5 bg-ink/90 backdrop-blur-md border-b border-white/10">
          <a href="#" className="text-white font-semibold tracking-wide">
             Story
          </a>

          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/70 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  )
}
