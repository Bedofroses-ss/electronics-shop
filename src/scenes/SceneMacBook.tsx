import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense } from 'react'

function Model() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/macbook.glb`)
  return (
    <group scale={3} position={[0, -0.3, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export function SceneMacBook() {
  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 45 }}
      dpr={[1, 2]}
      gl={{ alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 2]} intensity={2.5} />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} />
      <Suspense fallback={null}>
        <Model />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} enableZoom={false} />
    </Canvas>
  )
}
