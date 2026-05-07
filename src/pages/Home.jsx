import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(r => setProjects(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const stats = [
    { val: '8+', label: 'Projects Built' },
    { val: '100%', label: 'Student Friendly' },
    { val: '₹599', label: 'Starting Price' },
    { val: '48hr', label: 'Avg Delivery' },
  ];

  return (
    <div>
      <style>{`
        .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 700px; margin: 64px auto 0; }
        .featured-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 40px; }
          .hero-btns { flex-direction: column; align-items: center; }
          .hero-btns a, .hero-btns button { width: 100%; max-width: 320px; justify-content: center; }
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
            Available for new projects
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 8vw, 88px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>
            Student Projects,<br />
            <span style={{ color: 'var(--accent2)' }}>Built to Impress.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2.5vw, 19px)', color: 'var(--muted)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
            AI-powered apps, attendance systems, web clones — professional-grade projects
            delivered fast, at student-friendly prices.
          </p>

          <div className="hero-btns">
            <Link to="/projects" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
              Browse Projects →
            </Link>
            <a href="https://wa.me/917530021461?text=Hi!%20I%20want%20to%20discuss%20a%20project"
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
              <div key={s.label} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '18px 12px', textAlign: 'center'
              }}>
                <div style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 800, fontFamily: 'Syne', color: 'var(--accent2)' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ background: 'var(--bg2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', marginBottom: 12 }}>Featured Projects</h2>
            <p style={{ color: 'var(--muted)' }}>Hand-picked projects ready to order</p>
          </div>
          <div className="featured-grid">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 100} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/projects" className="btn-ghost">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', marginBottom: 12 }}>How It Works</h2>
          </div>
          <div className="how-grid">
            {[
              { step: '01', title: 'Choose Project', desc: 'Browse and pick the project you need', icon: '📋' },
              { step: '02', title: 'Send Request', desc: 'Fill the form or WhatsApp us directly', icon: '💬' },
              { step: '03', title: 'Pay Advance', desc: 'Secure UPI payment', icon: '💳' },
              { step: '04', title: 'Get Delivered', desc: 'Source code + docs + demo in 48hrs', icon: '🚀' },
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

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.15), rgba(167,139,250,0.08))', borderTop: '1px solid rgba(124,92,252,0.2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', marginBottom: 16 }}>Ready to order your project?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Get source code, documentation, and a live demo.</p>
          <div className="cta-btns">
            <Link to="/hire" className="btn-primary">Request a Project</Link>
            <Link to="/pay" className="btn-ghost">Make a Payment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
