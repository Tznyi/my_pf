import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'

// A Prototypical Network in 3-D. Each group's prototype is the mean of its
// labelled examples; every other point joins the nearest prototype.
// The data is illustrative.

export const COLORS = ['#3CCBDD', '#9AA5FF', '#F472B6']
const NAMES = ['Group A', 'Group B', 'Group C']
const PER_CLASS = 22
const CENTRES = [[-1.6, 0.9, 0.2], [1.6, 0.8, -0.5], [0.1, -1.1, 0.9]]

function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function gauss(r) {
  let u = 0
  let v = 0
  while (!u) u = r()
  while (!v) v = r()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function makeData(seed) {
  const r = rng(seed)
  const pts = []
  CENTRES.forEach((c, k) => {
    const s = 0.65 + r() * 0.35
    for (let i = 0; i < PER_CLASS; i++) pts.push({ pos: c.map((v) => v + gauss(r) * s), k })
  })
  return pts
}

function sampleSupports(points, shots, seed) {
  const r = rng(seed * 7 + shots)
  const chosen = new Map()
  for (let k = 0; k < 3; k++) {
    const idx = points.map((p, i) => (p.k === k ? i : -1)).filter((i) => i >= 0)
    for (let s = 0; s < shots; s++) {
      const pick = idx.splice(Math.floor(r() * idx.length), 1)[0]
      chosen.set(pick, k)
    }
  }
  return chosen // index -> label given
}

function prototypesOf(points, supports) {
  return [0, 1, 2].map((k) => {
    const ps = [...supports].filter(([, lab]) => lab === k).map(([i]) => points[i].pos)
    if (!ps.length) return null
    return [0, 1, 2].map((d) => ps.reduce((a, p) => a + p[d], 0) / ps.length)
  })
}

function nearest(protos, pos) {
  let best = -1
  let bestD = Infinity
  protos.forEach((p, k) => {
    if (!p) return
    const d = (p[0] - pos[0]) ** 2 + (p[1] - pos[1]) ** 2 + (p[2] - pos[2]) ** 2
    if (d < bestD) {
      bestD = d
      best = k
    }
  })
  return best
}

function Prototype({ target, color }) {
  const ref = useRef()
  const reduce = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  useFrame(() => {
    if (!ref.current || !target) return
    const p = ref.current.position
    if (reduce) p.set(...target)
    else p.lerp({ x: target[0], y: target[1], z: target[2] }, 0.15)
  })
  if (!target) return null
  return (
    <mesh ref={ref} position={target}>
      <octahedronGeometry args={[0.2]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} flatShading />
    </mesh>
  )
}

export default function FewShotLab3D() {
  const [seed, setSeed] = useState(11)
  const [shots, setShots] = useState(1)
  const [active, setActive] = useState(0)
  const [custom, setCustom] = useState(false)
  const points = useMemo(() => makeData(seed), [seed])
  const [supports, setSupports] = useState(() => sampleSupports(makeData(11), 1, 11))
  const controls = useRef()

  const protos = useMemo(() => prototypesOf(points, supports), [points, supports])
  const stats = useMemo(() => {
    let correct = 0
    let total = 0
    points.forEach((p, i) => {
      if (supports.has(i)) return
      total++
      if (nearest(protos, p.pos) === p.k) correct++
    })
    return { pct: total ? Math.round((100 * correct) / total) : 0, total }
  }, [points, supports, protos])

  const setShotCount = (n) => {
    setShots(n)
    setCustom(false)
    setSupports(sampleSupports(points, n, seed))
  }
  const newData = () => {
    const s = Math.floor(Math.random() * 100000)
    setSeed(s)
    setCustom(false)
    setSupports(sampleSupports(makeData(s), shots, s))
  }
  const label = (i) => {
    setCustom(true)
    setSupports((prev) => new Map(prev).set(i, active))
  }

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <p className="lab-title">Few-shot lab in 3D</p>
          <p className="lab-sub">Drag to rotate. Click a point to label it as the selected group.</p>
        </div>
        <p className="lab-score" aria-live="polite">
          <strong>{stats.pct}%</strong>
          <span>correct on {stats.total} unlabelled points</span>
        </p>
      </div>

      <div className="lab-canvas">
        <Canvas camera={{ position: [0, 1.2, 7], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 6, 5]} intensity={1.1} />
          <gridHelper args={[8, 8, '#2A3868', '#1C2850']} position={[0, -2.6, 0]} />

          {points.map((p, i) => {
            const isSupport = supports.has(i)
            const shownLabel = isSupport ? supports.get(i) : nearest(protos, p.pos)
            const wrong = !isSupport && shownLabel !== p.k
            const color = COLORS[shownLabel] || '#8C95B3'
            return (
              <group key={i} position={p.pos}>
                <mesh
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isSupport) label(i)
                  }}
                  onPointerOver={() => (document.body.style.cursor = isSupport ? '' : 'pointer')}
                  onPointerOut={() => (document.body.style.cursor = '')}
                >
                  <sphereGeometry args={[isSupport ? 0.14 : 0.09, 20, 20]} />
                  {wrong ? (
                    <meshBasicMaterial color={color} wireframe />
                  ) : (
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.4} />
                  )}
                </mesh>
                {isSupport && (
                  <mesh>
                    <sphereGeometry args={[0.2, 20, 20]} />
                    <meshBasicMaterial color="#EEF1FA" wireframe transparent opacity={0.5} />
                  </mesh>
                )}
              </group>
            )
          })}

          {[...supports].map(([i, k]) =>
            protos[k] ? (
              <Line key={`l${i}`} points={[points[i].pos, protos[k]]} color={COLORS[k]} transparent opacity={0.5} lineWidth={1} />
            ) : null
          )}
          {protos.map((p, k) => (
            <Prototype key={k} target={p} color={COLORS[k]} />
          ))}

          <OrbitControls ref={controls} enablePan={false} minDistance={4} maxDistance={11} enableDamping dampingFactor={0.08} />
        </Canvas>
      </div>

      <div className="lab-controls">
        <fieldset className="seg">
          <legend>Labelled examples per group</legend>
          {[1, 3, 5].map((n) => (
            <button key={n} type="button" aria-pressed={shots === n && !custom} onClick={() => setShotCount(n)}>
              {n}-shot
            </button>
          ))}
        </fieldset>
        <fieldset className="seg">
          <legend>Label clicks as</legend>
          {NAMES.map((name, k) => (
            <button key={name} type="button" aria-pressed={active === k} onClick={() => setActive(k)} style={{ '--c': COLORS[k] }}>
              <i aria-hidden="true" />
              {name}
            </button>
          ))}
        </fieldset>
        <div className="seg-actions">
          <button type="button" className="ghost" onClick={() => controls.current?.reset()}>Reset view</button>
          <button type="button" className="ghost" onClick={newData}>New data</button>
        </div>
      </div>
      <p className="lab-legend">
        Diamonds are prototypes: the average of each group's labelled examples (ringed points). Every other point joins
        its nearest prototype; wireframe points are the ones it gets wrong. The data here is illustrative.
      </p>
    </div>
  )
}
