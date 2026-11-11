import { useEffect, useMemo, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import { projects, clusters } from '../data.js'

// Hero scene: every project is a point in a 3-D "embedding space", grouped
// into clusters, each with a diamond prototype at its centre.

function mean(points) {
  const n = points.length
  return [0, 1, 2].map((i) => points.reduce((a, p) => a + p[i], 0) / n)
}

function rng(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

// Pull the camera back on narrow screens so every cluster stays in view.
function FitCamera() {
  const { camera, size } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    const z = aspect < 1.25 ? 11 * (1.25 / aspect) : 11
    camera.position.set(0, 1.4 * (z / 11), z)
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function ProjectPoint({ p, selected, onSelect }) {
  const [hover, setHover] = useState(false)
  const color = clusters[p.cluster].color
  const r = p.featured ? 0.3 : 0.22
  return (
    <group position={p.pos}>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onSelect(p.id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHover(false)
          document.body.style.cursor = ''
        }}
        scale={hover ? 1.15 : 1}
      >
        <sphereGeometry args={[r, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} roughness={0.35} metalness={0.1} />
      </mesh>
      <Html position={[0, r + 0.3, 0]} center style={{ pointerEvents: 'none' }} zIndexRange={[10, 0]}>
        <span className="space-label">{p.label}</span>
      </Html>
      {selected && (
        <mesh>
          <sphereGeometry args={[r * 1.7, 32, 32]} />
          <meshBasicMaterial color="#EEF1FA" wireframe transparent opacity={0.35} />
        </mesh>
      )}
    </group>
  )
}

export default function EmbeddingSpace({ selected, onSelect }) {
  const groups = useMemo(
    () =>
      Object.entries(clusters).map(([key, c]) => {
        const members = projects.filter((p) => p.cluster === key)
        return { key, ...c, members, centre: mean(members.map((m) => m.pos)) }
      }),
    []
  )

  const dust = useMemo(() => {
    const r = rng(42)
    const out = []
    groups.forEach((g) => {
      for (let i = 0; i < 14; i++) {
        out.push({
          color: g.color,
          pos: g.centre.map((v) => v + (r() - 0.5) * 2.6),
        })
      }
    })
    return out
  }, [groups])

  return (
    <Canvas camera={{ position: [0, 1.4, 11], fov: 42 }} dpr={[1, 2]} onPointerMissed={() => onSelect(null)}>
      <FitCamera />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 6]} intensity={1.2} />
      <gridHelper args={[14, 14, '#2A3868', '#1C2850']} position={[0, -3, 0]} />
      {/* drei drops the first <Html> mounted in this scene; this empty one absorbs that. */}
      <Html><span aria-hidden="true" /></Html>

      {dust.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={d.color} transparent opacity={0.35} />
        </mesh>
      ))}

      {groups.map((g) => (
        <group key={g.key}>
          {g.members.map((m) => (
            <Line key={m.id} points={[g.centre, m.pos]} color={g.color} transparent opacity={0.45} lineWidth={1.2} />
          ))}
          <mesh position={g.centre}>
            <octahedronGeometry args={[0.26]} />
            <meshStandardMaterial color={g.color} emissive={g.color} emissiveIntensity={0.35} flatShading />
          </mesh>
        </group>
      ))}

      {projects.map((p) => (
        <ProjectPoint key={p.id} p={p} selected={p.id === selected} onSelect={onSelect} />
      ))}


      <OrbitControls enablePan={false} minDistance={6} maxDistance={22} enableDamping dampingFactor={0.08} />
    </Canvas>
  )
}
