/**
 * Числовые параметры 3D-сцен: геометрия, свет, материалы, движение.
 * В коде сцен магических чисел нет — всё живёт здесь.
 */

export const RENDER = {
  /** Потолок devicePixelRatio: выше двух растёт нагрузка без выигрыша в картинке. */
  maxPixelRatio: 2,
  /** Сегментов скругления у примитивов. */
  roundingSegments: 2,
} as const

export const CAMERA = {
  fov: 42,
  near: 0.1,
  far: 100,
  z: 6.2,
} as const

/** Габарит, который сцена обязана уместить в кадр при любом соотношении сторон. */
export const FIT = {
  width: 4.2,
  height: 5.2,
} as const

export const LIGHT = {
  ambient: 0.9,
  key: 2.6,
  rim: 1.7,
  fill: 1.2,
  keyPosition: [3, 4, 5],
  rimPosition: [-4, -2, -3],
  fillPosition: [-2, 1, 4],
} as const

export const MOTION = {
  /** Скорость вращения устройства, радиан в секунду. */
  spin: 0.18,
  /** Размах покачивания ряда устройств, радианы. */
  sway: 0.24,
  /** Частота покачивания ряда. */
  swaySpeed: 0.35,
  /** Амплитуда покачивания по вертикали. */
  floatAmplitude: 0.08,
  /** Частота покачивания. */
  floatSpeed: 1.1,
} as const

/** Раскладка трёх устройств в ряд для секции сравнения. */
export const COMPARISON = {
  /** Уменьшение габаритов, чтобы три устройства поместились в кадр. */
  scale: 0.45,
  /** Расстояние между центрами устройств. */
  spacing: 1.15,
  /** Сдвиг ряда влево: MacBook шире остальных, без сдвига ряд перевешивает вправо. */
  offsetX: -0.21,
} as const

export const ROTATION = {
  quarterTurn: Math.PI / 2,
} as const

export const COLOR = {
  /** Светлее исходного: почти чёрный корпус не ловил свет и читался как силуэт. */
  body: 0x3f4042,
  screen: 0x05070d,
  screenEmissive: 0x0a84ff,
  rim: 0x0071e3,
} as const

export const MATERIAL = {
  /**
   * Металличность работает только вместе с картой окружения (scene.environment).
   * Без неё металлу нечего отражать, и корпус рендерится практически чёрным.
   */
  bodyMetalness: 0.62,
  bodyRoughness: 0.38,
  /** Экран — тёмное стекло с едва заметным свечением, а не светящаяся плита. */
  screenEmissiveIntensity: 0.07,
  /**
   * Экран намеренно матовый. При низкой шероховатости он работает как зеркало
   * и ловит яркое пятно студийного окружения — на крышке MacBook это выглядело
   * белой кляксой вместо экрана.
   */
  screenMetalness: 0.05,
  screenRoughness: 0.45,
} as const

/** Размытие карты окружения: даёт мягкие студийные отражения на корпусе. */
export const ENV = {
  blur: 0.04,
} as const

/** Корпуса устройств: ширина, высота, глубина и радиус скругления. */
export const BODY = {
  iphone: { width: 1.55, height: 3.1, depth: 0.22, radius: 0.26 },
  ipad: { width: 2.35, height: 3.15, depth: 0.2, radius: 0.2 },
  macbook: { width: 3.4, height: 0.14, depth: 2.3, radius: 0.07 },
} as const

/** Детали устройств: экраны, объектив, стилус, крышка ноутбука. */
export const DETAIL = {
  iphone: {
    screenWidth: 1.4,
    screenHeight: 2.94,
    screenOffset: 0.112,
    lensRadius: 0.17,
    lensDepth: 0.05,
    lensX: -0.42,
    lensY: 1.14,
  },
  ipad: {
    screenWidth: 2.2,
    screenHeight: 3,
    screenOffset: 0.102,
    pencilRadius: 0.045,
    pencilLength: 2.4,
    pencilX: 1.26,
  },
  macbook: {
    lidHeight: 2.15,
    lidDepth: 0.1,
    lidAngle: 0.32,
    screenWidth: 3.2,
    screenHeight: 1.95,
    screenOffset: 0.055,
    keyboardWidth: 2.9,
    keyboardDepth: 1.7,
    keyboardHeight: 0.02,
    baseY: -1,
  },
} as const
