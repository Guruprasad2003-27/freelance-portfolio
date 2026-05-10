import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api';
import ProjectCard from '../components/ProjectCard';

const defaultProjects = [
  { id: 1, title: 'Student Attendance System', category: 'Web App', description: 'Digital attendance management for schools and colleges.', tech: ['Python', 'Django', 'MySQL'], features: ['Role-based login', 'Reports', 'Export Excel'], icon: '📋', color: '#4F46E5' },
  { id: 2, title: 'Resume Analyzer Web App', category: 'AI/ML', description: 'AI-powered resume analyzer with ATS score and keyword suggestions.', tech: ['Python', 'NLP', 'Streamlit'], features: ['PDF upload', 'ATS score', 'Skill gap'], icon: '📄', color: '#0891B2' },
  { id: 3, title: 'Expense Tracker', category: 'Web App', description: 'Personal finance tracker with budgeting and visual charts.', tech: ['React', 'Node.js', 'MongoDB'], features: ['Budget planning', 'Charts', 'Reports'], icon: '💰', color: '#059669' },
];

export default function Home() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    getProjects().then(r => {
      if (Array.isArray(r.data) && r.data.length) setProjects(r.data.slice(0, 3));
    }).catch(() => {});
  }, []);

  const stats = [
    { val: '5+', label: 'Domains Covered' },
    { val: '100%', label: 'Student Friendly' },
    { val: 'Custom', label: 'Pricing Always' },
    { val: 'Custom Work', label: 'Custom Timeline' },
  ];

  return (
    <div>
      <style>{`
        .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 700px; margin: 56px auto 0; }
        .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; }
        .domain-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 36px; }
          .hero-btns { flex-direction: column; align-items: center; }
          .hero-btns a { width: 100%; max-width: 320px; justify-content: center; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="container fade-up" style={{ textAlign: 'center', position: 'relative', padding: '80px 24px 40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.3)',
            padding: '6px 18px', borderRadius: 20, marginBottom: 28, fontSize: 14, color: 'var(--accent2)'
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Open for project requests
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 8vw, 84px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>
            Projects That<br />
            <span style={{ color: 'var(--accent2)' }}>Speak for Themselves.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2.5vw, 19px)', color: 'var(--muted)', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.7 }}>
            From AI/ML to full-stack web apps — professional-grade student projects
            built fast, priced fairly, delivered with care.
          </p>

          <div className="hero-btns">
            <Link to="/projects" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
              Browse Projects →
            </Link>
            <a href="https://wa.me/916382788045?text=Hi!%20I%20want%20to%20discuss%20a%20project"
              target="_blank" rel="noopener noreferrer"
              style={{
                background: '#25D366', color: '#fff', padding: '14px 32px',
                borderRadius: 10, fontSize: 16, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 8
              }}>
              💬 Chat on WhatsApp
            </a>
          </div>

          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 800, fontFamily: 'Syne', color: 'var(--accent2)' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section style={{ background: 'var(--bg2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>What We Build</h2>
            <p style={{ color: 'var(--muted)' }}>Available across multiple domains — tailored to your academic or personal needs</p>
          </div>
          <div className="domain-grid">
            {[
              { icon: '🤖', label: 'AI / ML', desc: 'Smart systems, predictions, automation' },
              { icon: '🌐', label: 'Web Apps', desc: 'Full-stack, responsive, modern UI' },
              { icon: '📊', label: 'Data Science', desc: 'Analysis, visualization, dashboards' },
              { icon: '📱', label: 'Mobile Apps', desc: 'Android & cross-platform apps' },
              { icon: '🔐', label: 'Security Tools', desc: 'Auth systems, secure platforms' },
              
            ].map(d => (
              <div key={d.label} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '22px 18px', textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,92,252,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{d.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{d.label}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>Featured Projects</h2>
            <p style={{ color: 'var(--muted)' }}>A few of what's available — explore more inside</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 24 }}>
            {projects.map((p, i) => <ProjectCard key={p.id || p._id} project={p} delay={i * 100} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/projects" className="btn-ghost">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: 'var(--bg2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', marginBottom: 12 }}>How It Works</h2>
          </div>
          <div className="how-grid">
            {[
              { step: '01', title: 'Choose Project', desc: 'Browse and pick the domain or project you need', icon: '📋' },
              { step: '02', title: 'Send Request', desc: 'Fill the form or WhatsApp directly with your requirements', icon: '💬' },
              { step: '03', title: 'Get a Quote', desc: 'Receive a fair custom price based on your exact needs', icon: '🤝' },
              { step: '04', title: 'Get Delivered', desc: 'Source code + docs + demo within your deadline', icon: '🚀' },
            ].map(s => (
              <div key={s.step} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{s.step}</div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing philosophy strip */}
      <section style={{ padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{
            background: 'rgba(124,92,252,0.07)', border: '1px solid rgba(124,92,252,0.2)',
            borderRadius: 20, padding: 'clamp(24px, 5vw, 40px)', textAlign: 'center'
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>💡</div>
            <h3 style={{ fontSize: 'clamp(20px, 3vw, 28px)', marginBottom: 12 }}>No Fixed Price Tags</h3>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
              Every project is unique. Pricing is based on your requirements, tech stack, features, and deadline —
              always fair, always student-friendly. Just reach out and we'll figure it out together.
            </p>
            <Link to="/hire" className="btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>
              Request a Custom Quote →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.15), rgba(167,139,250,0.08))', borderTop: '1px solid rgba(124,92,252,0.2)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', marginBottom: 16 }}>Ready to get your project?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Share your requirements and get a custom quote within hours.</p>
          <div className="cta-btns">
            <Link to="/hire" className="btn-primary">Request a Project</Link>
            <a href="https://wa.me/916382788045" target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '12px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
