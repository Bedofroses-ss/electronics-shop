import { useRef } from 'react'
import { useDeviceScene } from './useDeviceScene'

/** Сцена iPad: плита планшета со стилусом. Загружается лениво. */
export default function SceneIPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useDeviceScene(canvasRef, 'ipad')

  return <canvas ref={canvasRef} className="h-full w-full" />
}
