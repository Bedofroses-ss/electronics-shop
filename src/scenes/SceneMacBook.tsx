import { useRef } from 'react'
import { useDeviceScene } from './useDeviceScene'

/** Сцена MacBook Air: раскрытый ноутбук из примитивов. Загружается лениво. */
export default function SceneMacBook() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useDeviceScene(canvasRef, 'macbook')

  return <canvas ref={canvasRef} className="h-full w-full" />
}
