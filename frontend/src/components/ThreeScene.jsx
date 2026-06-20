import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()

    const geo = new THREE.BoxGeometry(2.4, 0.02, 0.02)
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.3,
    })

    for (let i = 0; i < 8; i++) {
      const bar = new THREE.Mesh(geo, mat.clone())
      const h = 0.3 + Math.random() * 0.8
      bar.scale.y = h
      bar.position.set(-1.4 + i * 0.4, -0.4 + h / 2, 0)
      group.add(bar)
    }

    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      metalness: 0.5,
      roughness: 0.3,
      transparent: true,
      opacity: 0.15,
    })

    const frame = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.8, 0.01), frameMat)
    group.add(frame)

    const light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(1, 2, 3)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))

    let angle = 0
    const animate = () => {
      requestAnimationFrame(animate)
      angle += 0.004
      group.rotation.x = Math.sin(angle) * 0.1
      group.rotation.y = angle * 0.2
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
