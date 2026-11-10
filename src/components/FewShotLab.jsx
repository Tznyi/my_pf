import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Interactive Prototypical Network demo.
// Each dot is an example in a 2-D embedding space (illustrative data).
// A group's prototype is the mean of its labelled examples; every other
// point is assigned to the nearest prototype (Euclidean distance).

export const COLORS = ['#3CCBDD', '#9AA5FF', '#F472B6']
const NAMES = ['Group A', 'Group B', 'Group C']
const REGION = ['rgba(60, 203, 221, .15)', 'rgba(154, 165, 255, .16)', 'rgba(244, 114, 182, .15)']
const PER_CLASS = 26

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

const clamp = (v) => Math.min(0.96, Math.max(0.04, v))

function makeData(seed) {
  const r = rng(seed)
  const centres = [[0.28, 0.33], [0.72, 0.36], [0.5, 0.73]]
  const pts = []
  centres.forEach(([cx, cy], k) => {
    const jx = (r() - 0.5) * 0.1
    const jy = (r() - 0.5) * 0.1
    const sx = 0.085 + r() * 0.06
    const sy = 0.085 + r() * 0.06
    for (let i = 0; i < PER_CLASS; i++) {
      pts.push({ x: clamp(cx + jx + gauss(r) * sx), y: clamp(cy + jy + gauss(r) * sy), k })
    }
  })
  return pts
}

function sampleSupports(points, shots, seed) {
  const r = rng(seed * 7 + shots)
  const chosen = []
  for (let k = 0; k < 3; k++) {
    const idx = points.map((p, i) => (p.k === k ? i : -1)).filter((i) => i >= 0)
    for (let s = 0; s < shots; s++) {
      const pick = idx.splice(Math.floor(r() * idx.length), 1)[0]
      chosen.push({ ...points[pick], idx: pick })
    }
  }
  return chosen
}

function computePrototypes(supports) {
  return [0, 1, 2].map((k) => {
    const s = supports.filter((p) => p.k === k)
    if (!s.length) return null
    return { x: s.reduce((a, p) => a + p.x, 0) / s.length, y: s.reduce((a, p) => a + p.y, 0) / s.length }
  })
}

function nearest(protos, x, y) {
  let best = -1
  let bestD = Infinity
  protos.forEach((p, k) => {
    if (!p) return
    const d = (p.x - x) ** 2 + (p.y - y) ** 2
    if (d < bestD) {
      bestD = d
      best = k
    }
  })
  return best
}

export default function FewShotLab() {
  const [seed, setSeed] = useState(7)
  const [shots, setShots] = useState(1)
  const [active, setActive] = useState(0)
  const points = useMemo(() => makeData(seed), [seed])
  const [supports, setSupports] = useState(() => sampleSupports(makeData(7), 1, 7))

  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const shown = useRef(null) // prototype positions currently drawn (animated)
  const frame = useRef(0)
  const [size, setSize] = useState({ w: 560, h: 440 })

  const protos = useMemo(() => computePrototypes(supports), [supports])
  const supportIdx = useMemo(() => new Set(supports.filter((s) => s.idx !== undefined).map((s) => s.idx)), [supports])

  const stats = useMemo(() => {
    let correct = 0
    let total = 0
    points.forEach((p, i) => {
      if (supportIdx.has(i)) return
      total++
      if (nearest(protos, p.x, p.y) === p.k) correct++
    })
    return { correct, total, pct: total ? Math.round((100 * correct) / total) : 0 }
  }, [points, protos, supportIdx])

  const resample = (n, s = seed) => {
    setShots(n)
    setSupports(sampleSupports(makeData(s), n, s))
  }

  const shuffle = () => {
    const s = Math.floor(Math.random() * 100000)
    setSeed(s)
    setSupports(sampleSupports(makeData(s), shots, s))
  }

  // Keep the canvas sized to its container
  useEffect(() => {
    const el = wrapRef.current
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width)
      setSize({ w, h: Math.round(w * 0.78) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const draw = useCallback(
    (drawn) => {
      const c = canvasRef.current
      if (!c) return
      const dpr = window.devicePixelRatio || 1
      const { w, h } = size
      if (c.width !== w * dpr) {
        c.width = w * dpr
        c.height = h * dpr
      }
      const ctx = c.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Decision regions
      const cell = 3
      for (let y = 0; y < h; y += cell) {
        for (let x = 0; x < w; x += cell) {
          const k = nearest(drawn, (x + cell / 2) / w, (y + cell / 2) / h)
          if (k < 0) continue
          ctx.fillStyle = REGION[k]
          ctx.fillRect(x, y, cell, cell)
        }
      }

      // Unlabelled points, coloured by prediction; hollow when wrong
      points.forEach((p, i) => {
        if (supportIdx.has(i)) return
        const k = nearest(drawn, p.x, p.y)
        const px = p.x * w
        const py = p.y * h
        ctx.beginPath()
        ctx.arc(px, py, 4.2, 0, Math.PI * 2)
        if (k === p.k) {
          ctx.fillStyle = COLORS[k]
          ctx.fill()
        } else {
          ctx.lineWidth = 1.8
          ctx.strokeStyle = k >= 0 ? COLORS[k] : '#8C95B3'
          ctx.stroke()
        }
      })

      // Links from labelled examples to their prototype
      supports.forEach((s) => {
        const p = drawn[s.k]
        if (!p) return
        ctx.beginPath()
        ctx.moveTo(s.x * w, s.y * h)
        ctx.lineTo(p.x * w, p.y * h)
        ctx.strokeStyle = COLORS[s.k] + '99'
        ctx.lineWidth = 1.2
        ctx.stroke()
      })

      // Labelled examples
      supports.forEach((s) => {
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, 7, 0, Math.PI * 2)
        ctx.fillStyle = COLORS[s.k]
        ctx.fill()
        ctx.lineWidth = 2.2
        ctx.strokeStyle = '#F4F6FC'
        ctx.stroke()
      })

      // Prototypes
      drawn.forEach((p, k) => {
        if (!p) return
        const px = p.x * w
        const py = p.y * h
        ctx.beginPath()
        ctx.arc(px, py, 20, 0, Math.PI * 2)
        ctx.strokeStyle = COLORS[k] + '66'
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(Math.PI / 4)
        ctx.fillStyle = COLORS[k]
        ctx.strokeStyle = '#101935'
        ctx.lineWidth = 2.5
        ctx.fillRect(-7.5, -7.5, 15, 15)
        ctx.strokeRect(-7.5, -7.5, 15, 15)
        ctx.restore()
      })
    },
    [points, supports, supportIdx, size]
  )

  // Animate prototypes towards their new positions when labels change
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!shown.current || reduce) {
      shown.current = protos.map((p) => (p ? { ...p } : null))
      draw(shown.current)
      return
    }
    cancelAnimationFrame(frame.current)
    const from = shown.current.map((p, k) => p || protos[k])
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 450)
      const e = 1 - Math.pow(1 - t, 3)
      shown.current = protos.map((p, k) =>
        p ? { x: from[k] ? from[k].x + (p.x - from[k].x) * e : p.x, y: from[k] ? from[k].y + (p.y - from[k].y) * e : p.y } : null
      )
      draw(shown.current)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [protos, draw])

  const onCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setSupports((s) => [...s, { x, y, k: active }])
  }

  const userAdded = supports.filter((s) => s.idx === undefined).length

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <h2 className="lab-title">Few-shot lab</h2>
          <p className="lab-sub">A live Prototypical Network, the method behind my dissertation.</p>
        </div>
        <p className="lab-score" aria-live="polite">
          <strong>{stats.pct}%</strong>
          <span>
            correct on {stats.total} unlabelled points
          </span>
        </p>
      </div>

      <div className="lab-canvas" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: size.h }}
          onClick={onCanvasClick}
          role="img"
          aria-label={`Scatter plot of three groups. ${supports.length} labelled examples. ${stats.pct} percent of unlabelled points classified correctly.`}
        />
      </div>

      <div className="lab-controls">
        <fieldset className="seg">
          <legend>Labelled examples per group</legend>
          {[1, 3, 5].map((n) => (
            <button key={n} type="button" aria-pressed={shots === n && userAdded === 0} onClick={() => resample(n)}>
              {n}-shot
            </button>
          ))}
        </fieldset>
        <fieldset className="seg">
          <legend>Click the plot to label a point as</legend>
          {NAMES.map((name, k) => (
            <button key={name} type="button" aria-pressed={active === k} onClick={() => setActive(k)} style={{ '--c': COLORS[k] }}>
              <i aria-hidden="true" />
              {name}
            </button>
          ))}
        </fieldset>
        <button type="button" className="ghost" onClick={shuffle}>
          New data
        </button>
      </div>

      <p className="lab-legend">
        Diamonds are prototypes: the average of each group's labelled examples (white-ringed dots). Every other point
        joins its nearest prototype; hollow dots are the ones it gets wrong. Compare 1-shot with 5-shot, or add your own
        labels. The data here is illustrative.
      </p>
    </div>
  )
}
