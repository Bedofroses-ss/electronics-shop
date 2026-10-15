# Промт для DSH-агента: Иммерсивный сайт «iPhone 18 Pro / iPad / MacBook Air» в стиле Girard-Perregaux Casquette

## Контекст и среда
Ты — senior frontend-разработчик, работающий в среде DSH на **Windows 10**.
- **Рабочая папка (единственная доступная для записи):** `C:\Users\user\Documents\electronics-shop`
- **Рантайм:** Node v24 (встроенный), PowerShell, Python.
- **Доступные скиллы:** `motion-primitives`, `diagram-design`, `office-docx`, `chrome` (Playwright через Яндекс Браузер).
- **Ограничения среды:**
  - Писать можно только в рабочую папку.
  - Запуск Playwright/Chromium может упасть с `EPERM` из-за песочницы — **в этом случае сообщи мне и попроси разовое расширение прав. Не пытайся обойти песочницу.**
  - Скриншоты рабочего стола недоступны. Только `browser_screenshot` внутри браузера.
  - Все команды — **PowerShell**, не bash. Никаких WSL-команд.

## Задача
Создай **иммерсивный одностраничный сайт-историю (scrollytelling)** для презентации трёх продуктов Apple:
1. **iPhone 18 Pro** — A20 Pro (2 нм), 48 МП камера, до 43 ч видео.
2. **iPad (M4)** — 10-ядерные CPU/GPU, Ultra Retina XDR, Apple Pencil Pro.
3. **MacBook Air (M5)** — до +15% CPU, +30% GPU, ray tracing +45%, 153 ГБ/с, Wi-Fi 7.

Стиль — кинематографичный, тёмный, минималистичный, с «Liquid Glass»-акцентами, как на сайте Girard-Perregaux Casquette Collection (immersive.garden).

## Целевая аудитория
Технически подкованные пользователи, потенциальные покупатели премиальной техники Apple.

## Визуальный подход к устройствам (важно!)

**Готовых GLB-моделей iPhone 18 / iPad M4 / MacBook Air не существует.** Не пытайся их скачивать, не ищи на Sketchfab и не трать время.

Вместо этого:
- **Основной вариант:** стилизованные 3D-примитивы Three.js — скруглённый параллелепипед (RoundedBoxGeometry или ExtrudeGeometry), экран как плоскость с эмиссивным материалом, камера как маленький тор/сфера. Стилизация под силуэт устройства, не фотореализм.
- **Fallback:** если WebGL-контекст не создаётся (слабый GPU, отключён в браузере, mobile-режим с `prefers-reduced-motion`) — заменяй сцену на **постер** (статичная картинка-заглушка, сгенерированная через SVG или Canvas, лежащая в `public/posters/`) или короткое **видео** (если найдётся свободное).
- Явно предусмотри оба пути: `Scene3D` → при ошибке переходит на `ScenePoster`.

## Технологический стек
- **Фронтенд:** React 19 + TypeScript + Vite.
- **Стили:** Tailwind CSS + CSS-переменные тёмной темы.
- **3D:** Three.js (или OGL).
- **Анимации:** GSAP + ScrollTrigger + Lenis.
- **UI:** shadcn/ui + Framer Motion.
- **Скилл `motion-primitives`** — для готовых анимационных компонентов (появление секций, scroll-reveal, hover).
- **Скилл `diagram-design`** — для схемы архитектуры в `docs/`.
- **Скилл `office-docx`** — для `README.docx`.

## Структура проекта
```
C:\Users\user\Documents\electronics-shop\apple-story\
├── src\
│   ├── components\      # секции
│   ├── scenes\          # SceneIPhone, SceneIPad, SceneMacBook, ScenePoster
│   ├── shaders\         # шейдеры частиц и свечения
│   ├── data\content.ts  # тексты и характеристики
│   ├── hooks\           # useLenis, useScrollTrigger, useIsMobile, useReducedMotion
│   ├── styles\
│   └── utils\
├── public\
│   └── posters\         # SVG/PNG-заглушки для fallback
├── docs\                # README.docx, architecture.png, screenshots/
└── package.json
```

## Структура страницы

### 1. Hero
- Чёрный фон, частицы (Points + шум Перлина).
- Стилизованная 3D-«плита» iPhone (примитив), медленно вращается.
- H1: **iPhone 18 Pro**. Подзаголовок: **Beyond Intelligence.**
- CTA «Scroll to discover» — стеклянная пилюля.

### 2. iPhone 18 Pro — The Power of AI
- При скролле камера облетает примитив, он увеличивается.
- Блоки (появляются через ScrollTrigger):
  - `A20 Pro chip. 2nm. 6-core CPU. 7-core GPU.`
  - `48MP Pro Fusion Camera System. Variable Aperture.`
  - `Up to 43 hours video playback.`
- Подсветка зон через `ShaderMaterial` (uniform `uHighlight`).

### 3. iPad (M4) — Your Next Computer
- Переход: сцена отъезжает, появляется iPad-примитив.
- H2: **iPad. Supercharged by M4.**
- Блоки: M4 chip / Ultra Retina XDR / Apple Pencil Pro.
- Фон: светлый градиент (контраст с iPhone-секцией).

### 4. MacBook Air (M5) — Power. Silence. Elegance.
- Примитив MacBook открывается/закрывается, камера фокусируется на клавиатуре.
- Блоки: +15% CPU / +30% GPU, ray tracing +45% / 153 ГБ/с, Wi-Fi 7.
- Фон: глубокий чёрный с тёплыми акцентами.

### 5. Comparison
- Три примитива выстраиваются в ряд, между ними — световые линии (шейдер).
- Текст: `Three devices. One ecosystem.`

### 6. Footer
- SVG-логотип Apple, колонки ссылок, соцсети, копирайт `© 2026 Apple Inc.`

## Дизайн-система
- **Палитра:** `#000000`, акценты `#0071e3`, `#f5f5f7`, `#86868b`.
- **Градиенты:** от чёрного к тёмно-синему/фиолетовому.
- **Типографика:** SF Pro Display / Inter / Manrope. H1 — 80–120 px на десктопе.
- **Эффекты:** Liquid Glass (`backdrop-filter: blur`), параллакс, шейдерное свечение.
- **Адаптив:** mobile-first. На мобильных — упрощённый рендер или постер.

## Технические требования (обязательно реализовать)

1. **`React.lazy` + `Suspense`** для всех 3D-сцен:
   ```tsx
   const SceneIPhone = lazy(() => import('./scenes/SceneIPhone'));
   <Suspense fallback={<ScenePoster variant="iphone" />}>
     <SceneIPhone />
   </Suspense>
   ```

2. **`dpr: Math.min(window.devicePixelRatio, 2)`** в рендерере Three.js.

3. **Отключение тяжёлых эффектов на мобильных:**
   ```ts
   const isMobile = window.matchMedia('(max-width: 768px)').matches;
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   ```
   На мобильных — не подключать `EffectComposer` / `UnrealBloomPass`, понижать `dpr` до 1, либо полностью заменять 3D на `ScenePoster`.

4. **WebGL-детект с graceful fallback:**
   ```ts
   const hasWebGL = (() => {
     try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
   })();
   ```
   Если `false` — сразу `ScenePoster`.

5. **ErrorBoundary вокруг 3D-сцен** — при ошибке рендера показывать постер, не ломать страницу.

## Технические шаги (поэтапно!)

### Этап 1 — Каркас без 3D
1. `cd C:\Users\user\Documents\electronics-shop`
2. `mkdir apple-story; cd apple-story`
3. `npm create vite@latest . -- --template react-ts`
4. `npm install`
5. `npm install -D tailwindcss postcss autoprefixer; npx tailwindcss init -p`
6. Настроить Tailwind, тёмную тему, создать секции с текстом из `content.ts` **без 3D**.
7. **Проверка через Playwright:** `browser_navigate` на `http://localhost:5173`, `browser_snapshot`, `browser_screenshot`. Убедиться, что секции рендерятся, в консоли нет ошибок.
8. **Если Playwright падает с EPERM** — остановись, сообщи мне, попроси разовое расширение прав.

### Этап 2 — Анимации скролла
1. `npm install gsap lenis`
2. Lenis + ScrollTrigger, появление блоков.
3. **Проверка через Playwright:** пролистать, снять 3–4 скриншота разных секций.

### Этап 3 — 3D-сцены (примитивы)
1. `npm install three @types/three`
2. `SceneIPhone` — стилизованный примитив + свет.
3. **Проверка через Playwright:** убедиться, что canvas создаётся, в консоли нет ошибок WebGL. Снять `browser_screenshot`.
4. Аналогично `SceneIPad`, `SceneMacBook`.

### Этап 4 — Шейдеры и пост-обработка
1. Частицы + шум Перлина.
2. `EffectComposer` + `UnrealBloomPass` (только для десктопа).
3. **Проверка:** скриншот, проверка консоли.

### Этап 5 — Fallback-система
1. `ScenePoster` с SVG/Canvas-заглушками в `public/posters/`.
2. `ErrorBoundary` + `hasWebGL` детект + `useIsMobile` + `useReducedMotion`.
3. **Проверка:** временно форсировать fallback (например, через query-параметр `?fallback=1`) и снять скриншот в Playwright.

### Этап 6 — Документация
1. `README.md` — инструкция запуска (PowerShell).
2. `README.docx` через скилл `office-docx`.
3. Схема архитектуры через `diagram-design` → `docs/architecture.png`.
4. Скриншоты из Playwright → `docs/screenshots/`.

## Правила работы агента

1. **Не пытайся обойти песочницу.** Если `EPERM` — остановись и попроси расширение прав.
2. **Не скачивай GLB-модели устройств.** Только примитивы + постеры.
3. **После каждого этапа** показывай:
   - PowerShell-команды, которые выполнил.
   - stdout (кратко).
   - Результат Playwright-проверки (что открылось, что в консоли, скриншот).
4. **Если этап не проходит проверку** — не идти дальше, сначала починить.
5. **Все тексты/цифры — только в `src/data/content.ts`.** Никаких зашитых строк в компонентах.
6. **Не создавай файлы вне `C:\Users\user\Documents\electronics-shop`.**
