import { useRef } from 'react'
import { useDeviceScene } from './useDeviceScene'

/**
 * Сцена сравнения: три устройства в ряд.
 * Ряд покачивается, а не вращается — так все три остаются читаемыми.
 */
export default function SceneComparison() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useDeviceScene(canvasRef, 'comparison')

  return <canvas ref={canvasRef} className="h-full w-full" />
}
