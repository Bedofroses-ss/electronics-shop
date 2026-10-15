export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink/80 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-semibold text-mist">Продукты</h4>
            <ul className="space-y-2 text-sm text-graphite">
              <li><a href="#iphone" className="hover:text-mist">iPhone 18 Pro</a></li>
              <li><a href="#ipad" className="hover:text-mist">iPad mini</a></li>
              <li><a href="#macbook" className="hover:text-mist">MacBook Pro</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-mist">Разделы</h4>
            <ul className="space-y-2 text-sm text-graphite">
              <li><a href="#comparison" className="hover:text-mist">Сравнение</a></li>
              <li><a href="#hero" className="hover:text-mist">Обзор</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-mist">О Trio</h4>
            <ul className="space-y-2 text-sm text-graphite">
              <li><a href="#" className="hover:text-mist">О проекте</a></li>
              <li><a href="#" className="hover:text-mist">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-mist">Trio</h4>
            <p className="text-sm text-graphite">Три устройства. Одна экосистема.</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs text-graphite">
          © 2026 Trio. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
