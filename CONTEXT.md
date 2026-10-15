# CONTEXT.md — состояние работ по сайту-витрине Apple

> Записка для новой сессии. Прочитай её целиком перед любыми действиями.
> **Путь проекта — `C:\Users\user\Documents\electronics-shop\apple-story`.**
> Папка `apple-showcase` в корне **пуста** и является остатком от переименования; проект там не лежит.

---

## 1. Что это за проект

Иммерсивный одностраничный scrollytelling-сайт о трёх продуктах Apple: Hero → iPhone 18 Pro → iPad (M4) → MacBook Air (M5) → Comparison → Footer. Стиль — кинематографичный, тёмный, с акцентом `#0071e3`.

Исходное ТЗ — `apple-story/TZ.md`. Референс приёмов — `apple-story/reference-casquette.html` (это **собранный билд**: кода анимаций и CSS в нём нет, только декларативный контракт — имена `data-атрибутов` и структура виджетов).

## 2. Как запустить и проверить

Дев-сервер (обязательно с привязкой к IPv4 — по умолчанию Vite слушает только `[::1]`, и ни PowerShell, ни curl туда не попадут):

```powershell
cd C:\Users\user\Documents\electronics-shop\apple-story
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort
```

Адрес: `http://127.0.0.1:5173/`

Проверки (запускать так, а не через `npm run` — обёртка npm падает с `spawn EPERM` в песочнице):

```powershell
node node_modules/typescript/bin/tsc -b
node node_modules/vite/bin/vite.js build
npm.cmd run lint
```

Текущее состояние на момент записи: `tsc` 0, `oxlint` 0/0 (41 файл), сборка проходит, растровых файлов в проекте ноль.

## 3. Окружение (проверено)

- Windows, PowerShell **5.1** — нет тернарного оператора `? :`, нет `??`.
- Node v24.21.0, npm 11.19.0. Chrome 155.0.8059.80.
- `git` в PATH отсутствует; `wsl` не требуется (сайт делается на Windows).
- npm пишет кэш в `%LOCALAPPDATA%\npm-cache` — вне рабочей папки. В режиме `workspace-write` это даёт `EPERM`; нужен `danger-full-access`.

## 4. Правила

- `C:\Users\user\Documents\electronics-shop\AGENTS.md` — регламент Flask-магазина (всё вне `apple-story/`).
- `apple-story/RULES.md` — регламент сайта. Ключевое: **каждый этап подтверждается пользователем**, комментарии по-русски, имена по-английски, магические числа выносятся в константы, код длиннее 50 строк дробится.

## 5. Стек

React 19.2 + TypeScript 6 + Vite 8.3.4, Tailwind CSS **v4** (`@tailwindcss/postcss`, без `tailwind.config.js`), Three.js 0.186 (**чистый, без `@react-three/fiber`**), GSAP 3.15 + ScrollTrigger, Lenis 1.3.

Установлены, но пока не использованы: `framer-motion` (вырезается из бандла), `lucide-react`.

## 6. Статус этапов

| Этап | Состояние |
|---|---|
| 1 — каркас | **готово**, проверено в браузере |
| 2 — анимации скролла | **готово**, проверено в браузере |
| 3 — 3D-сцены | **готово**, проверено в браузере |
| 4 — шейдеры и пост-обработка | **не начат**, ждёт подтверждения пользователя |
| 5 — fallback-система | не начат |
| 6 — документация | не начат |

Подробный чек-лист по каждому этапу — в `apple-story/docs/STAGES.md`.

## 7. Архитектура

```
src/
├── data/content.ts        ВСЕ тексты и цифры. В компонентах зашитых строк нет — проверено
├── lib/
│   ├── animation/
│   │   ├── gsapSetup.ts       регистрация плагинов (один раз)
│   │   ├── constants.ts       тайминги, дистанции, easing'и, медиа-запросы
│   │   ├── registry.ts        реестр 14 триггеров data-animation
│   │   └── splitWords.ts      разбивка текста на слова для stagger
│   └── smoothScroll.ts    доступ к Lenis вне React
├── hooks/
│   ├── useLenis.ts            Lenis + gsap.ticker + ScrollTrigger.update
│   ├── useScrollAnimation.ts  один проход по [data-animation], try/catch на каждый
│   ├── useActiveSection.ts    активная секция (общий источник для 3D и прогресс-бара)
│   ├── useReducedMotion.ts    prefers-reduced-motion
│   └── useCursorFollow.ts     движение кастомного курсора
├── scenes/
│   ├── CanvasRoot.tsx         React.lazy + Suspense, привязка секций к сценам
│   ├── useDeviceScene.ts      рендерер, камера, свет, цикл отрисовки
│   ├── deviceShapes.ts        примитивы: buildDevice / buildComparisonRow / buildTarget
│   ├── sceneConstants.ts      все числа 3D: материалы, свет, габариты, движение
│   ├── sceneFit.ts            дистанция камеры по соотношению сторон
│   └── SceneIPhone / SceneIPad / SceneMacBook / SceneComparison .tsx
├── widgets/               CursorWidget, CursorFollow, ProgressWidget, ProgressDot, PinsWidget
└── components/            секции страницы + Section, SectionHeading, FeatureList,
                           VisualBlock, DeviceSilhouette, MarqueeDots, LogoMark
```

## 8. Три слоя страницы

Снизу вверх, как в референсе:

1. фиксированная градиентная подложка (`bg-gradient-cool`);
2. прозрачный WebGL-слой в `#canvas-wrapper` (`CanvasRoot`);
3. контент в `div.relative.z-10`.

Фоны секций с 3D — полупрозрачные утилиты `bg-gradient-*-soft`, иначе непрозрачный фон перекрыл бы canvas. Hero полностью прозрачный.

## 9. Два реальных бага, уже исправленных (не повторять!)

**Белый экран вместо сайта.** В очистку эффекта был добавлен `renderer.forceContextLoss()`. В React StrictMode эффект выполняется дважды на одном и том же `canvas`: первая очистка теряла контекст безвозвратно, второй рендерер получал мёртвый контекст (`getContext` возвращает тот же потерянный объект). Chrome рисует такой канвас белой заливкой. **Вывод: только `renderer.dispose()`, без `forceContextLoss()`.**

**Застрявшие анимации.** Очистка вызывала `tween.kill()`, а он не снимает применённое стартовое состояние `gsap.from` (`opacity: 0`). В StrictMode повторный `from` читал испорченное значение как конечное и анимировал `0 → 0` — кнопка CTA в Hero была невидима навсегда. **Вывод: `tween.revert()`, а не `kill()`.**

Оба случая — пример того, что статические проверки такое не ловят, а браузер ловит.

## 10. Как выглядит 3D (настроено вживую)

Первая версия давала плоские ярко-синие прямоугольники. Причин было три: `bodyMetalness: 0.85` **без карты окружения** (металлу нечего отражать — корпус чёрный), эмиссивный экран при интенсивности 0.6 светился плитой, света не хватало на объём.

Сейчас: карта окружения `RoomEnvironment` через `PMREMGenerator`, `bodyMetalness: 0.62`, `screenEmissiveIntensity: 0.07`, матовый экран (`screenRoughness: 0.45` — иначе ловит яркое пятно окружения и выглядит белой кляксой), добавлен заполняющий свет, габарит кадра `FIT.height: 5.2`.

## 11. Известные проблемы и открытые вопросы

1. **Кастомный курсор не проверен.** Включается только при `pointer: fine` и появляется над секцией с `data-cursor` (сейчас — секция iPad, текст `CURSOR_HINT`). Синтетическими событиями проверяется плохо.
2. **Силуэты устройств дублируют 3D.** В разметке секций остались `DeviceSilhouette` — их надо снести на Этапе 5, когда появится `ScenePoster`.
3. **Chrome включает автоперевод** и подменяет тексты: «iPhone 18 Профессионал», «MacBook Воздух (M5)». Это поведение браузера, подтверждено сетевым логом (запросы к `translate-pa.googleapis.com`). Лечится `<meta name="google" content="notranslate">` — решение пользователя не запрошено.
4. **У MacBook небольшой зазор** между крышкой и основанием в месте петли. На текущем уровне стилизации терпимо.
5. **`AppleLogo` рисуется обобщённым знаком**, а не товарным знаком Apple — намеренно.
6. Сцена для секции Comparison была отложена при первом проходе и потом доделана. Световые линии между устройствами (шейдер) — это уже Этап 4.

## 12. Следующий шаг — Этап 4

Ждёт подтверждения пользователя. По ТЗ:

- частицы (`Points`) с шумом Перлина;
- `EffectComposer` + `UnrealBloomPass` — **только для десктопа**, на мобильных не подключать;
- проверка: скриншот и консоль.

## 13. Браузер для проверок

Сайт проверяется через **MCP `mcp__chrome__*`** (реальный Chrome пользователя). Расширение Deepseek Harness APP установлено в профиле Chrome (ID `kgjjcancjnedmappjhefngdjaommpop`, версия 0.3.8) и работает.

Проверка связи:

```powershell
(Invoke-WebRequest -Uri 'http://127.0.0.1:19387/chrome/status' -UseBasicParsing).Content
```

Должно быть `"extension_connected": true`. Если `false` — Chrome закрыт, запустить:

```powershell
Start-Process 'C:\Program Files\Google\Chrome\Application\chrome.exe'
```

Расширение подключится само. `--remote-debugging-port` на профиле по умолчанию Chrome 136+ игнорирует, CDP недоступен.

**Встроенного браузера (`browser_*`) в сессии нет** — в web-профиле подключены только `@deepseek-ai/dsh-base` и `@deepseek-ai/dsh-web-app`.

## 14. Полезные факты, добытые опытом

- Плагин **Chrome Bridge работает и без native-host**: папки `C:\Users\user\.dsh\native-host` не существует, ключей реестра `com.dsh.chrome` нет — мосту они на Windows не нужны.
- Адрес бэкенда в попапе расширения **захардкожен** (`getBackendUrl()` в `settings.js` всегда возвращает `http://127.0.0.1:3080`, а `normalizeBackendUrl` бросает исключение на любое другое значение). Запись в `chrome.storage` на это не влияет и на инструменты не влияет.
- При записи файлов в проект Vite иногда пишет `file watcher error: EBUSY ... .tmpdir` — это временные каталоги инструмента записи. Исключены в `vite.config.ts` и внесены в `.gitignore`.
- Проверку страницы удобно делать через клик по точкам прогресс-бара: они вызывают `lenis.scrollTo` и прокручивают точно к секции. Программный wheel-скролл один раз откатился к нулю.
- Полезный приём проверки: сканировать `[data-animation]`-элементы в зоне видимости на `opacity < 0.9` — так ловятся застрявшие анимации.
