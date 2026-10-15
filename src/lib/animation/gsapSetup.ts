import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * Единая точка регистрации плагинов GSAP.
 * Импортируется всеми модулями анимации, чтобы регистрация случилась ровно один раз.
 */
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
