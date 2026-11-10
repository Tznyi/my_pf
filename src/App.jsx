import FewShotLab from './components/FewShotLab.jsx'
import { profile, experience, projects, skills, education } from './data.js'

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#top">{profile.name}</a>
      <nav aria-label="Sections">
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        <a className="nav-cta" href={`mailto:${profile.email}`}>Email me</a>
      </nav>
    </header>
  )
}

function Timeline({ items }) {
  return (
    <ol className="timeline" reversed>
      {items.map((it) => (
        <li key={it.role || it.title}>
          <p className="when">{it.when}</p>
          <div>
            <h3>{it.role || it.title}</h3>
            <p className="org">{it.org}</p>
            {it.points && (
              <ul>
                {it.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            )}
            {it.detail && <p className="detail">{it.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

function Project({ p }) {
  return (
    <article className={p.featured ? 'project featured' : 'project'}>
      <h3>{p.title}</h3>
      <p className="kind">
        {p.kind}
        {p.link && (
          <>
            {', '}
            <a href={p.link.href}>{p.link.label}</a>
          </>
        )}
      </p>
      <ul>
        {p.points.map((pt) => <li key={pt}>{pt}</li>)}
      </ul>
      {p.result && <p className="result">{p.result}</p>}
      <ul className="tags" aria-label="Tools used">
        {p.tags.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </article>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section className="hero" id="top">
          <div className="hero-text">
            <h1>{profile.headline}</h1>
            <p className="intro">{profile.intro}</p>
            <p className="status">{profile.status}</p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${profile.email}`}>Email me</a>
              <a className="btn" href="#projects">See my projects</a>
            </div>
          </div>
          <FewShotLab />
        </section>

        <section id="experience" className="block">
          <h2>Experience</h2>
          <Timeline items={experience} />
        </section>

        <section id="projects" className="block">
          <h2>Projects</h2>
          <div className="project-grid">
            {projects.map((p) => <Project key={p.title} p={p} />)}
          </div>
        </section>

        <section id="skills" className="block">
          <h2>Skills</h2>
          <div className="skill-grid">
            {skills.map((s) => (
              <div key={s.area} className="skill-group">
                <h3>{s.area}</h3>
                <ul className="tags">
                  {s.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="block">
          <h2>Education</h2>
          <Timeline items={education} />
        </section>

        <section id="contact" className="block contact">
          <h2>Let's talk</h2>
          <p>
            I'm open to graduate roles, internships and research collaborations in AI, machine learning and cyber
            security.
          </p>
          <p className="big-mail">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className="socials">
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.github}>GitHub</a>
          </p>
        </section>
      </main>
      <footer className="foot">Designed and built by Nyi Lin Naing with React and Vite.</footer>
    </>
  )
}
