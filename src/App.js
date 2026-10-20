import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import photo from './assets/shan.jpg';
import { profile, tools, skills, jobs, flow, mern, projects } from './data';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const Scrub = ({ text }) => (
  <p className="scrub">{text.split(' ').map((w, i) => <span className="sw" key={i}>{w} </span>)}</p>
);

const stages = [
  { id: 'about', tag: 'source', icon: 'uil-code-branch', title: 'About me' },
  { id: 'skills', tag: 'build', icon: 'uil-wrench', title: 'Skills' },
  { id: 'experience', tag: 'deploy', icon: 'uil-rocket', title: 'Experience' },
  { id: 'projects', tag: 'release', icon: 'uil-box', title: 'Projects' },
  { id: 'contact', tag: 'live', icon: 'uil-signal-alt-3', title: 'Contact' },
];

function useScrollEffects(pipeRef) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0, lastY = 0, vt = 0;
    const scrubs = [...document.querySelectorAll('.scrub')];
    const tick = () => {
      raf = 0;
      const y = window.scrollY, h = window.innerHeight;
      root.style.setProperty('--sy', y);
      root.style.setProperty('--sp', Math.min(1, y / (root.scrollHeight - h || 1)));
      root.style.setProperty('--hp', Math.min(1, y / h));
      root.style.setProperty('--v', Math.max(-14, Math.min(14, (y - lastY) * 0.3)));
      lastY = y;
      const st = document.querySelector('.strip');
      if (st) st.style.setProperty('--o', st.getBoundingClientRect().top - h / 2);
      const pipe = pipeRef.current;
      if (pipe) {
        const r = pipe.getBoundingClientRect();
        pipe.style.setProperty('--fill', Math.max(0, Math.min(1, (h * 0.6 - r.top) / r.height)));
        pipe.querySelectorAll('.stage').forEach((s) => s.classList.toggle('passed', s.getBoundingClientRect().top < h * 0.6));
      }
      scrubs.forEach((el) => {
        const r = el.getBoundingClientRect();
        const ws = el.querySelectorAll('.sw');
        const n = Math.round(clamp((h * 0.85 - r.top) / (h * 0.5)) * ws.length);
        ws.forEach((w, i) => w.classList.toggle('lit', i < n));
      });
      document.querySelectorAll('[data-sx]').forEach((el) => {
        el.style.setProperty('--tx', (el.getBoundingClientRect().top - h * 0.5) * -0.6 * el.dataset.sx + 'px');
      });
      const js = [...document.querySelectorAll('.job')];
      js.forEach((j, i) => {
        const nx = js[i + 1];
        const p = nx ? clamp((h * 0.75 - nx.getBoundingClientRect().top) / (h * 0.5)) : 0;
        j.style.scale = 1 - p * 0.06;
        j.style.filter = `brightness(${1 - p * 0.4})`;
      });
      const hs = document.querySelector('.hscroll');
      if (hs) {
        const tr = hs.querySelector('.htrack');
        const max = Math.max(0, tr.scrollWidth - hs.querySelector('.hsticky').clientWidth);
        hs.style.height = h + max + 'px';
        const p = clamp(-hs.getBoundingClientRect().top / (max || 1));
        tr.style.transform = `translate3d(${-p * max}px,0,0)`;
        hs.style.setProperty('--pp', p);
      }
      let cur = 'home';
      ['home', ...stages.map((s) => s.id)].forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < h * 0.4) cur = id;
      });
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
      clearTimeout(vt);
      vt = setTimeout(() => root.style.setProperty('--v', 0), 90);
    };
    const onMove = (e) => {
      root.style.setProperty('--cx', e.clientX + 'px');
      root.style.setProperty('--cy', e.clientY + 'px');
      const q = (sel) => e.target.closest && e.target.closest(sel);
      const c = q('.spot');
      if (c) { const b = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - b.left + 'px'); c.style.setProperty('--my', e.clientY - b.top + 'px'); }
      root.style.setProperty('--mxp', (e.clientX / window.innerWidth - 0.5) * 2);
      root.style.setProperty('--myp', (e.clientY / window.innerHeight - 0.5) * 2);
    };
    const onOut = (e) => {
      const el = e.target.closest && e.target.closest('.mag');
      if (el && !el.contains(e.relatedTarget)) ['--rx', '--ry', '--tx', '--ty'].forEach((p) => el.style.removeProperty(p));
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onOut);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.15 });
    document.querySelectorAll('[data-rv]').forEach((el) => io.observe(el));
    const co = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      co.unobserve(e.target);
      const el = e.target, end = +el.dataset.to, t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 1600); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    document.querySelectorAll('.count').forEach((el) => co.observe(el));
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      cancelAnimationFrame(raf);
      document.removeEventListener('pointerout', onOut);
      io.disconnect();
      co.disconnect();
    };
  }, [pipeRef]);
  return active;
}

function Split({ text }) {
  let c = 0;
  const words = text.split(' ');
  const n = text.replace(/ /g, '').length;
  return (
    <span className="split" style={{ '--n': n }} aria-label={text}>
      {words.map((w, wi) => (
        <React.Fragment key={wi}>
          <span className="w" aria-hidden="true">
            {[...w].map((ch, i) => <span key={i} className="ch" style={{ '--c': c++ }}>{ch}</span>)}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

function Loader() {
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState('load');
  const C = 2 * Math.PI * 70;
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduce ? 800 : 3000;
    const t0 = performance.now();
    let raf, t1, t2;
    const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(ease(p) * 100));
      if (p < 1) { raf = requestAnimationFrame(step); return; }
      t1 = setTimeout(() => {
        setPhase('out');
        document.body.classList.add('loaded');
        document.body.style.overflow = '';
      }, 2000);
      t2 = setTimeout(() => setPhase('gone'), 1700);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = ''; };
  }, []);
  const steps = [['Source', 0], ['Build', 28], ['Test', 58], ['Deploy', 86]];
  const status = n < 28 ? 'Pulling code from GitHub' : n < 58 ? 'Building the Docker image' : n < 86 ? 'Running checks' : n < 100 ? 'Deploying to production' : 'Live. Welcome!';
  return (
    <div className={'loader ' + phase} aria-hidden="true">
      <i className="pa" /><i className="pb" />
      <i className="seam" style={{ transform: `scaleX(${n / 100})` }} />
      <div className="lc">
        <div className="mono">
          <svg viewBox="0 0 160 160" className="rings">
            <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6b5e" /><stop offset="1" stopColor="#7b5cff" /></linearGradient></defs>
            <circle className="r0" cx="80" cy="80" r="76" />
            <circle className="r1" cx="80" cy="80" r="70" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - n / 100) }} />
          </svg>
          <span className="sd">SD</span>
        </div>
        <p className="pct">{n}<small>%</small></p>
        <ol className="stg">{steps.map(([t, at]) => <li key={t} className={n >= at && n > 0 ? 'on' : ''}><i /><span>{t}</span></li>)}</ol>
        <p className="status">{status}</p>
      </div>
    </div>
  );
}

function Stats() {
  const s = [[3, '+', 'years working in software and DevOps'], [3, '', 'companies, from frontend to DevOps'], [3, '', 'environments released to: Dev, UAT, Prod'], [7, '', 'tools wired into my pipeline project']];
  return (
    <section className="stats">
      {s.map(([n, x, l], i) => (
        <div key={l} className="stat" data-rv="zoom" style={{ '--d': i * 100 + 'ms' }}>
          <b><span className="count" data-to={n}>0</span>{x}</b><span>{l}</span>
        </div>
      ))}
    </section>
  );
}

function Strip() {
  const t = 'Build ✦ Test ✦ Ship ✦ Repeat ✦ '.repeat(4);
  return (
    <div className="strip" aria-hidden="true">
      <div className="row r1">{t}</div>
    </div>
  );
}

function Nav({ active }) {
  const links = [['home', 'Home'], ...stages.map((s) => [s.id, s.title.replace(' me', '')])];
  return (
    <header className="nav">
      <div className="bar" />
      <nav className="pill" aria-label="Main">
        <a href="#home" className="logo">SD</a>
        {links.map(([id, label]) => (
          <a key={id} href={'#' + id} className={active === id ? 'on' : ''}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const log = [
    ['$', 'git push origin main'],
    ['ok', 'docker build  ·  image ready'],
    ['ok', 'jenkins pipeline  ·  passed'],
    ['ok', 'terraform apply  ·  aws infra in sync'],
    ['live', 'deployed to production'],
  ];
  return (
    <section id="home" className="hero">
      <div className="blob b1" /><div className="blob b2" />
      <div className="hero-copy">
        <p className="hi" style={{ '--k': 0 }}>Hi, I’m Shanmugaraj, a DevOps engineer from Salem.</p>
        <h1>
          <span className="line"><Split text="I turn code into" /></span>
          <span className="line g"><Split text="reliable releases." /></span>
        </h1>
        <p className="lead" style={{ '--k': 2 }}>
          3+ years building, deploying and fixing real applications. I automate builds and deployments with CI/CD, run them in containers on AWS, and keep healthcare software shipping across Development, UAT and Production.
        </p>
        <div className="cta" style={{ '--k': 3 }}>
          <a className="btn solid" href="/Shanmugaraj-Resume.pdf" download><i className="uil uil-file-download-alt" /> Download resume</a>
          <a className="btn ghost" href="#contact">Plan a release with me</a>
        </div>
        <div className="socials" style={{ '--k': 4 }}>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><i className="uil uil-github-alt" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="uil uil-linkedin" /></a>
          <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><i className="uil uil-instagram" /></a>
        </div>
      </div>
      <div className="hero-art">
        <div className="stack">
          <div className="ring" />
          <img className="me" src={photo} alt="Shanmugaraj D" />
        </div>
        <div className="term" aria-hidden="true">
          <div className="dots"><i /><i /><i /><span>pipeline: main</span></div>
          {log.map(([k, t], i) => (
            <p key={i} className={'ln ' + k} style={{ '--i': i }}>
              <b>{k === 'ok' ? '✔' : k === 'live' ? '●' : '$'}</b> {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee({ rev }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0, last = window.scrollY, dir = 1, raf;
    const loop = () => {
      const y = window.scrollY, v = y - last; last = y;
      if (v > 0) dir = 1; else if (v < 0) dir = -1;
      const w = ref.current.scrollWidth / 2;
      x -= (rev ? -1 : 1) * dir * (0.9 + Math.min(Math.abs(v), 60) * 0.5);
      if (x <= -w) x += w; if (x > 0) x -= w;
      ref.current.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [rev]);
  const row = [...tools, ...tools];
  return (
    <div className={'marquee' + (rev ? ' rev' : '')} aria-hidden="true">
      <div className="track" ref={ref}>{row.map((t, i) => <span key={i}>{t}<em /></span>)}</div>
    </div>
  );
}

function Stage({ s, children, lead }) {
  return (
    <section id={s.id} className="stage">
      <div className="node"><i className={'uil ' + s.icon} /></div>
      <div className="stage-in">
        <p className="tag">stage: {s.tag}</p>
        <h2 data-rv="split"><Split text={s.title} /></h2>
        {lead && <p className="sub" data-rv="up">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Stage s={stages[0]} lead="Developer first, DevOps by practice.">
      <div className="about">
        <div className="about-text">
          <Scrub text="I started as a React.js developer and kept getting pulled toward the part where software actually reaches users. Today I run deployments, release management and CI/CD for healthcare applications, containerize them with Docker, and host them on AWS. Because I know the frontend, I can talk to developers in their own terms, trace a failed release back to its cause, and fix it without a long hand-off." />
        </div>
        <div className="about-side">
          <div className="card spot" data-rv="right">
            <h3>Education</h3>
            <p><b>Bachelor of Computer Science</b><br />AVS College of Arts &amp; Science, Salem<br /><span className="mute">Jun 2019 – May 2022</span></p>
          </div>
          <div className="card spot" data-rv="right">
            <h3>Certifications</h3>
            <p>DevOps Certification<br />Java Full Stack Developer Certification</p>
          </div>
        </div>
      </div>
    </Stage>
  );
}

function Skills() {
  return (
    <Stage s={stages[1]} lead="What I use to build, ship and debug. Tags marked project or exposure are things I’ve practiced outside production work.">
      <div className="bento">
        {skills.map((g, i) => (
          <div key={g.title} className={'card spot pat p' + (i % 4)} data-rv="zoom" style={{ '--d': (i % 3) * 110 + 'ms' }}>
            <i className={'uil ' + g.icon + ' big'} />
            <h3>{g.title}</h3>
            <div className="tags">
              {g.tags.map((t, ti) => {
                const [n, k] = t.split('|');
                return <span key={t} style={{ '--k': ti }} className={'chip' + (k ? ' soft' : '')}>{n}{k && <small>{k}</small>}</span>;
              })}
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function Job({ j, n }) {
  const [open, setOpen] = useState(false);
  const shown = j.points.slice(0, 3), rest = j.points.slice(3);
  return (
    <article className={'card spot job' + (open ? ' open' : '')} data-rv={n % 2 ? 'right' : 'left'} style={{ '--n': n }}>
      <div className="job-top">
        <div><h3>{j.company}</h3><p className="role">{j.role}</p></div>
        <p className="when">{j.period}<br /><span className="mute">{j.place}</span></p>
      </div>
      <ul>{shown.map((p) => <li key={p}>{p}</li>)}</ul>
      {rest.length > 0 && (
        <>
          <div className={'more' + (open ? ' open' : '')}><div><ul>{rest.map((p) => <li key={p}>{p}</li>)}</ul></div></div>
          <button className="link" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Show less' : 'Show all ' + j.points.length + ' responsibilities'}</button>
        </>
      )}
      <div className="tags">{j.tech.map((t, n) => <span key={t} style={{ '--k': n }} className="chip">{t}</span>)}</div>
    </article>
  );
}

function Experience() {
  return (
    <Stage s={stages[2]} lead="Three teams, one direction: from writing the app to running it.">
      <div className="jobs">{jobs.map((j, i) => <Job key={j.company} j={j} n={i} />)}</div>
    </Stage>
  );
}

function Projects() {
  return (
    <Stage s={stages[3]} lead="A full DevOps pipeline I built myself, and the products I’ve built interfaces for.">
      <div className="card spot feature" data-rv="zoom">
        <h3>MERN application: end-to-end DevOps deployment</h3>
        <p className="mute">Personal project</p>
        <div className="flow">
          {flow.map(([n, ic, d], i) => (
            <div key={n} className="fn" style={{ '--i': i }}>
              <span className="fi"><i className={'uil ' + ic} /></span>
              <b>{n}</b><small>{d}</small>
            </div>
          ))}
        </div>
        <ul className="two">{mern.map((m) => <li key={m}>{m}</li>)}</ul>
      </div>
      <div className="hscroll">
        <div className="hsticky">
          <p className="hint">Keep scrolling: the projects slide across <i className="uil uil-arrow-right" /></p>
          <div className="htrack">
            {projects.map((p) => (
              <article key={p.name} className="card spot proj hcard">
                <p className="mute">{p.kind}</p>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <div className="tags">{p.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              </article>
            ))}
            <a href="#contact" className="card hcard cta-card"><h3>Have a project in mind?</h3><span className="btn solid">Let’s talk</span></a>
          </div>
          <div className="hbar"><i /></div>
        </div>
      </div>
    </Stage>
  );
}

function Contact() {
  const [f, setF] = useState({ name: '', email: '', msg: '' });
  const send = (e) => {
    e.preventDefault();
    const body = `${f.msg}\n\n— ${f.name} (${f.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + f.name)}&body=${encodeURIComponent(body)}`;
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const ways = [
    ['uil-envelope', 'Email', profile.email, 'mailto:' + profile.email],
    ['uil-whatsapp', 'WhatsApp', profile.phone, profile.whatsapp],
    ['uil-linkedin', 'LinkedIn', 'shanmugaraj-durairajan', profile.linkedin],
    ['uil-github-alt', 'GitHub', 'shanmugarajshan', profile.github],
  ];
  return (
    <Stage s={stages[4]} lead="Hiring for a DevOps role or need a release pipeline set up? Send a message.">
      <div className="giant" aria-hidden="true">
        <span data-sx="1">Let’s ship it together</span>
      </div>
      <div className="contact">
        <div className="ways">
          {ways.map(([ic, l, v, h]) => (
            <a key={l} className="card spot way" href={h} target="_blank" rel="noreferrer" data-rv="left">
              <i className={'uil ' + ic} /><span><b>{l}</b><small>{v}</small></span>
            </a>
          ))}
        </div>
        <form className="card form" onSubmit={send} data-rv="right">
          <label>Your name<input required value={f.name} onChange={set('name')} placeholder="Your full name" /></label>
          <label>Your email<input required type="email" value={f.email} onChange={set('email')} placeholder="you@company.com" /></label>
          <label>Message<textarea required rows="5" value={f.msg} onChange={set('msg')} placeholder="What do you need to ship?" /></label>
          <button className="btn solid" type="submit">Send message</button>
        </form>
      </div>
    </Stage>
  );
}

export default function App() {
  const pipe = useRef(null);
  const active = useScrollEffects(pipe);
  return (
    <div className="app">
      <Loader />
      <div className="cursor" aria-hidden="true" />
      <Nav active={active} />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Strip />
        <div className="pipe" ref={pipe}>
          <div className="spine"><i /></div>
          <About /><Skills /><Experience /><Projects /><Contact />
        </div>
      </main>
      <a href="#home" className="totop" aria-label="Back to top"><svg viewBox="0 0 48 48"><circle className="trk" cx="24" cy="24" r="20" /><circle className="prg" cx="24" cy="24" r="20" /></svg><i className="uil uil-arrow-up" /></a>
      <Marquee rev />
      <footer>© 2026 Shanmugaraj D. Built and deployed with care.</footer>
    </div>
  );
}
