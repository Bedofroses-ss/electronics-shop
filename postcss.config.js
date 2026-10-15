/**
 * Конфигурация PostCSS для Tailwind CSS v4.
 * Плагин @tailwindcss/postcss сам выполняет префиксацию, поэтому autoprefixer не нужен.
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
