import { useRef } from 'react'
import { useDeviceScene } from './useDeviceScene'

/** Сцена iPhone: стилизованная плита корпуса. Загружается лениво. */
export default function SceneIPhone() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useDeviceScene(canvasRef, 'iphone')

  return <canvas ref={canvasRef} className="h-full w-full" />
}
