import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { BODY, COLOR, COMPARISON, DETAIL, MATERIAL, RENDER, ROTATION } from './sceneConstants'

export type DeviceKind = 'iphone' | 'ipad' | 'macbook'

/** Что именно строит сцена: одно устройство или ряд из трёх. */
export type SceneTarget = DeviceKind | 'comparison'

function createBodyMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: COLOR.body,
    metalness: MATERIAL.bodyMetalness,
    roughness: MATERIAL.bodyRoughness,
  })
}

function createScreenMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: COLOR.screen,
    emissive: COLOR.screenEmissive,
    emissiveIntensity: MATERIAL.screenEmissiveIntensity,
    metalness: MATERIAL.screenMetalness,
    roughness: MATERIAL.screenRoughness,
  })
}

/** Скруглённый параллелепипед — основной примитив всех устройств. */
function createShell(width: number, height: number, depth: number, radius: number): THREE.Mesh {
  return new THREE.Mesh(
    new RoundedBoxGeometry(width, height, depth, RENDER.roundingSegments, radius),
    createBodyMaterial(),
  )
}

function createScreen(width: number, height: number): THREE.Mesh {
  return new THREE.Mesh(new THREE.PlaneGeometry(width, height), createScreenMaterial())
}

/** Телефон: скруглённая плита, экран и объектив камеры. */
function buildPhone(): THREE.Group {
  const group = new THREE.Group()
  const { width, height, depth, radius } = BODY.iphone
  const detail = DETAIL.iphone

  group.add(createShell(width, height, depth, radius))

  const screen = createScreen(detail.screenWidth, detail.screenHeight)
  screen.position.z = detail.screenOffset
  group.add(screen)

  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(detail.lensRadius, detail.lensRadius, detail.lensDepth, 24),
    createBodyMaterial(),
  )
  lens.rotation.x = ROTATION.quarterTurn
  lens.position.set(detail.lensX, detail.lensY, detail.screenOffset)
  group.add(lens)

  return group
}

/** Планшет: та же плита шире, плюс стилус вдоль боковой грани. */
function buildPad(): THREE.Group {
  const group = new THREE.Group()
  const { width, height, depth, radius } = BODY.ipad
  const detail = DETAIL.ipad

  group.add(createShell(width, height, depth, radius))

  const screen = createScreen(detail.screenWidth, detail.screenHeight)
  screen.position.z = detail.screenOffset
  group.add(screen)

  const pencil = new THREE.Mesh(
    new THREE.CylinderGeometry(detail.pencilRadius, detail.pencilRadius, detail.pencilLength, 16),
    createBodyMaterial(),
  )
  pencil.position.x = detail.pencilX
  group.add(pencil)

  return group
}

/** Ноутбук: основание, клавиатурная выемка и крышка на петле. */
function buildLaptop(): THREE.Group {
  const group = new THREE.Group()
  const { width, height, depth, radius } = BODY.macbook
  const detail = DETAIL.macbook

  const base = createShell(width, height, depth, radius)
  base.position.y = detail.baseY
  group.add(base)

  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(detail.keyboardWidth, detail.keyboardHeight, detail.keyboardDepth),
    createScreenMaterial(),
  )
  keyboard.position.y = detail.baseY + height / 2
  group.add(keyboard)

  const hinge = new THREE.Group()
  hinge.position.set(0, detail.baseY + height / 2, -depth / 2)
  hinge.rotation.x = -detail.lidAngle
  group.add(hinge)

  const lid = createShell(width, detail.lidHeight, detail.lidDepth, radius)
  lid.position.y = detail.lidHeight / 2
  hinge.add(lid)

  const screen = createScreen(detail.screenWidth, detail.screenHeight)
  screen.position.set(0, detail.lidHeight / 2, detail.lidDepth / 2 + detail.screenOffset)
  hinge.add(screen)

  return group
}

export function buildDevice(kind: DeviceKind): THREE.Group {
  if (kind === 'iphone') return buildPhone()
  if (kind === 'ipad') return buildPad()
  return buildLaptop()
}

/** Три устройства в ряд — сцена секции сравнения. */
function buildComparisonRow(): THREE.Group {
  const row = new THREE.Group()

  const plan: Array<{ kind: DeviceKind; x: number }> = [
    { kind: 'iphone', x: -COMPARISON.spacing },
    { kind: 'ipad', x: 0 },
    { kind: 'macbook', x: COMPARISON.spacing },
  ]

  plan.forEach(({ kind, x }) => {
    const device = buildDevice(kind)
    device.scale.setScalar(COMPARISON.scale)
    device.position.x = x
    row.add(device)
  })

  row.position.x = COMPARISON.offsetX
  return row
}

export function buildTarget(target: SceneTarget): THREE.Group {
  if (target === 'comparison') return buildComparisonRow()
  return buildDevice(target)
}

/** Освобождает геометрию и материалы группы — иначе WebGL-память течёт. */
export function disposeGroup(group: THREE.Object3D): void {
  group.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return

    node.geometry.dispose()
    const materials = Array.isArray(node.material) ? node.material : [node.material]
    materials.forEach((material) => material.dispose())
  })
}
