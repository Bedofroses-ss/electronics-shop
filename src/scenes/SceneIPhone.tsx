import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, useEffect } from 'react'

interface Props {
  onReady?: () => void
}

function Model({ onReady }: Props) {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/iphone.glb`)

  useEffect(() => {
    if (onReady) {
      // Ждём два кадра — пока браузер отрисует первый пиксель
      requestAnimationFrame(() => requestAnimationFrame(onReady))
    }
  }, [onReady])

  return (
    <group scale={12} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export function SceneIPhone({ onReady }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 2]}
      gl={{ alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 2]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} />
      <Suspense fallback={null}>
        <Model onReady={onReady} />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enablePan={false}
        enableZoom={false}
      />
    </Canvas>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/iphone.glb`)