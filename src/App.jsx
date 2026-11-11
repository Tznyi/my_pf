import { Component, Suspense, lazy, useState } from 'react'
import Thumb from './components/Thumb.jsx'
import { profile, results, clusters, filters, projects, experience, education, skills } from './data.js'

const EmbeddingSpace = lazy(() => import('./components/EmbeddingSpace.jsx'))
const FewShotLab3D = lazy(() => import('./components/FewShotLab3D.jsx'))

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return <p className="scene-fallback">This 3D view needs WebGL, which your browser has turned off. Everything else on the page still works.</p>
    }
    return this.props.children
  }
}

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#top">{profile.name}</a>
      <nav aria-label="Sections">
        <a href="#projects">Projects</a>
        <a href="#lab">Few-shot lab</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a className="nav-cta" href={`mailto:${profile.email}`}>Email me</a>
      </nav>
    </header>
  )
}

function Facts({ p }) {
  return (
    <dl className="facts">
      <div><dt>Role</dt><dd>{p.role}</dd></div>
      <div><dt>Stack</dt><dd>{p.stack}</dd></div>
      <div><dt>Context</dt><dd>{p.context}</dd></div>
      <div><dt>Outcome</dt><dd>{p.outcome}</dd></div>
    </dl>
  )
}

function ProjectCard({ p, open, onToggle }) {
  const color = clusters[p.cluster].color
  return (
    <article id={`project-${p.id}`} className={open ? 'card open' : 'card'}>
      <Thumb id={p.id} />
      <p className="card-area" style={{ color }}>{p.area}</p>
      <h3>{p.title}</h3>
      <p className="card-short">{p.short}</p>
      {open && (
        <div className="card-detail" id={`detail-${p.id}`}>
          <Facts p={p} />
          <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        </div>
      )}
      <div className="card-links">
        <button type="button" className="linkish" aria-expanded={open} aria-controls={`detail-${p.id}`} onClick={onToggle}>
          {open ? 'Close the case study' : 'Read the case study'}
        </button>
        {p.link && <a href={p.link.href}>{p.link.label}</a>}
      </div>
    </article>
  )
}

function Timeline({ items }) {
  return (
    <ol className="timeline" reversed>
      {items.map((it) => (
        <li key={it.title}>
          <p className="when">{it.when}</p>
          <div>
            <h3>{it.title}</h3>
            <p className="org">{it.org}</p>
            <ul>{it.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function App() {
  const [selected, setSelected] = useState('few-shot')
  const [filter, setFilter] = useState('All')
  const [openIds, setOpenIds] = useState(() => new Set())

  const featured = projects.find((p) => p.featured)
  const sel = projects.find((p) => p.id === selected)
  const others = projects.filter((p) => !p.featured && (filter === 'All' || p.tags.includes(filter)))
  const showFeatured = filter === 'All' || featured.tags.includes(filter)

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const openProject = (id) => {
    setFilter('All')
    if (id !== featured.id) setOpenIds((prev) => new Set(prev).add(id))
    requestAnimationFrame(() => document.getElementById(`project-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section className="hero" id="top">
          <div className="hero-text">
            <p className="kicker">{profile.kicker}</p>
            <h1>{profile.headline}</h1>
            <p className="intro">{profile.intro}</p>
            <dl className="results">
              {results.map((r) => (
                <div key={r.value}>
                  <dt>{r.value}</dt>
                  <dd>{r.label}</dd>
                </div>
              ))}
            </dl>
            <div className="actions">
              <a className="btn primary" href="#projects">See my projects</a>
              <a className="btn" href={profile.linkedin}>LinkedIn</a>
            </div>
          </div>
          <div className="space">
            <div className="space-scene" role="region" aria-label="3D map of my projects. Drag to rotate; select a point to read about the project.">
              <SceneBoundary>
                <Suspense fallback={<p className="scene-fallback">Loading the 3D view…</p>}>
                  <EmbeddingSpace selected={selected} onSelect={setSelected} />
                </Suspense>
              </SceneBoundary>
              <ul className="space-legend" aria-label="Clusters">
                {Object.values(clusters).map((c) => (
                  <li key={c.name}><i style={{ background: c.color }} aria-hidden="true" />{c.name}</li>
                ))}
              </ul>
              <p className="space-hint">Drag to orbit. Click a point to open it.</p>
            </div>
            {sel && (
              <div className="space-card" aria-live="polite">
                <div>
                  <p className="space-card-kicker">{clusters[sel.cluster].name}</p>
                  <p className="space-card-title">{sel.title}</p>
                  <p className="space-card-text">{sel.short}</p>
                </div>
                <button type="button" onClick={() => openProject(sel.id)}>Open project</button>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="block">
          <div className="block-head">
            <div>
              <h2>Projects</h2>
              <p className="block-sub">Each project uses the same format: my role, the stack, the context and the outcome.</p>
            </div>
            <div className="filters" role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>

          {showFeatured && (
            <article id={`project-${featured.id}`} className="featured">
              <div className="featured-text">
                <p className="card-area" style={{ color: clusters.ml.color }}>Machine learning, featured</p>
                <h3>{featured.title}</h3>
                <Facts p={featured} />
                <ul>{featured.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </div>
              <div id="lab" className="featured-lab">
                <SceneBoundary>
                  <Suspense fallback={<p className="scene-fallback">Loading the lab…</p>}>
                    <FewShotLab3D />
                  </Suspense>
                </SceneBoundary>
              </div>
            </article>
          )}

          <div className="grid">
            {others.map((p) => (
              <ProjectCard key={p.id} p={p} open={openIds.has(p.id)} onToggle={() => toggle(p.id)} />
            ))}
          </div>
          {!showFeatured && others.length === 0 && <p className="block-sub">No projects in this area yet. Choose All to see everything.</p>}
        </section>

        <section id="experience" className="block">
          <h2>Experience</h2>
          <Timeline items={experience} />
        </section>

        <section id="education" className="block">
          <h2>Education</h2>
          <Timeline items={education} />
        </section>

        <section id="skills" className="block">
          <h2>Skills</h2>
          <div className="skill-grid">
            {skills.map((s) => (
              <div key={s.area}>
                <h3>{s.area}</h3>
                <ul className="tags">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="block contact">
          <h2>Let's talk</h2>
          <p>{profile.status}. Email is the fastest way to reach me.</p>
          <p className="big-mail"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p className="socials">
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.github}>GitHub</a>
          </p>
        </section>
      </main>
      <footer className="foot">Designed and built by Nyi Lin Naing with React, Three.js and Vite.</footer>
    </>
  )
}
