import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/electronics-shop/',
  plugins: [react()],
  server: {
    // Инструменты записи создают рядом с файлами временные каталоги вида
    // .ИМЯ.<guid>.tmpdir. Их появление роняет наблюдатель файлов с EBUSY,
    // поэтому исключаем такие каталоги из слежения.
    watch: {
      ignored: ['**/.*.tmpdir/**', '**/*.tmpdir/**'],
    },
  },
})
