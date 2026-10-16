# RULES.md — правила для сайта-витрины (каталог apple-story/)
Вне apple-story/ действует ../AGENTS.md.

## Среда
- Windows + PowerShell. Без bash и WSL. Node v24.21.0, npm 11.19.0, git отсутствует.
- Рабочая папка: `C:\Users\user\Documents\electronics-shop`. Файлы вне неё не создавать.
- Кэш npm вне рабочей папки → при `EPERM` остановиться и запросить разовое расширение прав, не обходить.

## Язык
- Ответы — на русском; код/команды/имена — латиницей.
- Все тексты контента — только в `src/data/content.ts`.

## Процесс
- Работать по `docs/STAGES.md`. После этапа: команды → stdout (кратко) → проверка.
- Не переходить к следующему этапу без подтверждения.
- Сначала читать `docs/`, потом спрашивать.

## Запрещено
- Playwright (проверок не выполнять, прав не запрашивать), скриншоты рабочего стола.
- Скачивать GLB-модели — только примитивы + постеры.
- Эмулировать более мощную модель.
- Спрашивать то, что есть в `docs/`.

## Пакеты
- Разрешены: react, react-dom, vite, gsap, lenis, three, @react-three/fiber. Остальные — только с подтверждения.

## Референс (reference-casquette.html)
- Это собранный билд Girard-Perregaux Casquette: JS/CSS в поставке нет, берётся только декларативный контракт (data-атрибуты, структура секций/виджетов). Тайминги и easing — писать самому.
- Запрещено копировать классы и вёрстку. Перенимаются только: GSAP + ScrollTrigger + Lenis; виджеты Cursor, Progress, Pins; триггеры `data-animation` (title, paragraph, fadeIn, imageScaleDown, imageParallax, marqueeDots, gridPictures, hoursParallax, watchesGenerations); привязка секций через `data-webgl`.
- Контент Apple: Hero → iPhone → iPad → MacBook → Comparison → Footer. Вёрстка — под React-компоненты.
