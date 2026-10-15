import { Suspense } from 'react'
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

useGLTF.preload('/models/macbook.glb')

function Model() {
  const { scene } = useGLTF('/models/macbook.glb')
  return <primitive object={scene} scale={1} position={[0, -0.4, 0]} />
}

export function SceneMacBook() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <Model />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2.5} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Suspense>
    </Canvas>
  )
}

export default SceneMacBook
