import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense } from 'react'

export function IPadModel({ scale = 8, position }: { scale?: number; position?: [number, number, number] }) {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/ipad.glb`)
  return (
    <group scale={scale} position={position ?? [0, -0.3, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export function SceneIPad() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 2]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} />
      <Suspense fallback={null}>
        <IPadModel scale={2.5} />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} enableZoom={false} />
    </Canvas>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/ipad.glb`)
