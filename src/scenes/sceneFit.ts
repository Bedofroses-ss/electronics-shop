import { CAMERA, FIT } from './sceneConstants'

/** Перевод градусов в радианы. */
const DEGREES_TO_RADIANS = Math.PI / 180

/** Тангенс половины угла обзора — основа расчёта дистанции. */
const HALF_FOV_TANGENT = Math.tan((CAMERA.fov / 2) * DEGREES_TO_RADIANS)

/**
 * Дистанция камеры, при которой сцена целиком помещается в кадр.
 * На узком окне камера отъезжает, иначе широкий MacBook обрезается по краям.
 */
export function cameraDistanceFor(aspect: number): number {
  const safeAspect = aspect > 0 ? aspect : 1
  const distanceForHeight = FIT.height / (2 * HALF_FOV_TANGENT)
  const distanceForWidth = FIT.width / (2 * HALF_FOV_TANGENT * safeAspect)

  return Math.max(CAMERA.z, distanceForHeight, distanceForWidth)
}
