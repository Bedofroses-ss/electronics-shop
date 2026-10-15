import { useEffect, type RefObject } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { buildTarget, disposeGroup, type SceneTarget } from './deviceShapes'
import { CAMERA, COLOR, ENV, LIGHT, MOTION, RENDER } from './sceneConstants'
import { cameraDistanceFor } from './sceneFit'

/**
 * Поднимает рендерер Three.js на переданном canvas и крутит цикл отрисовки.
 * Прозрачный фон: сцена ложится поверх фиксированной подложки страницы.
 * Одиночное устройство вращается, ряд устройств — мягко покачивается.
 */
export function useDeviceScene(canvasRef: RefObject<HTMLCanvasElement | null>, target: SceneTarget): void {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch (error) {
      // WebGL недоступен — страница не должна из-за этого падать.
      // На Этапе 5 сюда встанет ScenePoster с векторной заглушкой.
      console.warn('WebGL недоступен, 3D-сцена не создана', error)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, RENDER.maxPixelRatio))

    // Мягкое студийное окружение: источник отражений для металлического корпуса.
    const pmrem = new THREE.PMREMGenerator(renderer)
    const environment = pmrem.fromScene(new RoomEnvironment(), ENV.blur).texture

    const scene = new THREE.Scene()
    scene.environment = environment
    const camera = new THREE.PerspectiveCamera(CAMERA.fov, 1, CAMERA.near, CAMERA.far)
    camera.position.set(0, 0, CAMERA.z)

    scene.add(new THREE.AmbientLight(0xffffff, LIGHT.ambient))

    const key = new THREE.DirectionalLight(0xffffff, LIGHT.key)
    key.position.set(LIGHT.keyPosition[0], LIGHT.keyPosition[1], LIGHT.keyPosition[2])
    scene.add(key)

    const rim = new THREE.DirectionalLight(COLOR.rim, LIGHT.rim)
    rim.position.set(LIGHT.rimPosition[0], LIGHT.rimPosition[1], LIGHT.rimPosition[2])
    scene.add(rim)

    // Заполняющий свет спереди слева: без него у корпуса не читается объём.
    const fill = new THREE.DirectionalLight(0xffffff, LIGHT.fill)
    fill.position.set(LIGHT.fillPosition[0], LIGHT.fillPosition[1], LIGHT.fillPosition[2])
    scene.add(fill)

    const device = buildTarget(target)
    scene.add(device)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      if (clientWidth === 0 || clientHeight === 0) return

      const aspect = clientWidth / clientHeight
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = aspect
      camera.updateProjectionMatrix()

      // Камера отъезжает на узких экранах, чтобы устройство не обрезалось.
      camera.position.z = cameraDistanceFor(aspect)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const clock = new THREE.Clock()
    let frame = 0

    const tick = () => {
      frame = requestAnimationFrame(tick)
      const elapsed = clock.getElapsedTime()

      device.rotation.y =
        target === 'comparison'
          ? Math.sin(elapsed * MOTION.swaySpeed) * MOTION.sway
          : elapsed * MOTION.spin

      device.position.y = Math.sin(elapsed * MOTION.floatSpeed) * MOTION.floatAmplitude

      renderer.render(scene, camera)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      disposeGroup(device)
      environment.dispose()
      pmrem.dispose()
      // Только dispose: освобождает ресурсы, но оставляет контекст живым.
      // forceContextLoss() здесь вызывать нельзя — в StrictMode эффект
      // выполняется дважды на одном и том же canvas, и первый же cleanup
      // убил бы контекст, который затем достался бы второму рендереру:
      // getContext вернул бы тот же потерянный объект, новый не создаётся.
      renderer.dispose()
    }
  }, [canvasRef, target])
}
