import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProject(id).then(r => { setProject(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>;
  if (!project) return <div style={{ paddingTop: 120, textAlign: 'center' }}>Project not found. <Link to="/projects" style={{ color: 'var(--accent2)' }}>Go back</Link></div>;

  const tiers = [
    { name: 'Basic', price: project.price.basic, features: ['Source code', 'Basic docs', '1 revision', 'Email support'] },
    { name: 'Standard', price: project.price.standard, features: ['Source code', 'Full documentation', '3 revisions', 'WhatsApp support', 'Setup guide'] },
    { name: 'Premium', price: project.price.premium, features: ['Source code', 'Full docs + video', 'Unlimited revisions', 'Priority support', 'Deployment help', 'Demo presentation'] },
  ];

  const waMsg = encodeURIComponent(`Hi! I'm interested in the ${project.title} project. Can you tell me more?`);

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Header */}
      <section style={{ background: 'var(--bg2)', padding: '60px 0' }}>
        <div className="container">
          <Link to="/projects" style={{ color: 'var(--muted)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>← Back to Projects</Link>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20, fontSize: 40,
              background: project.color + '22', border: `1px solid ${project.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>{project.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span className="tag">{project.category}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 12 }}>{project.title}</h1>
              <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 600, lineHeight: 1.7 }}>{project.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack + Features */}
      <section>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Tech Stack</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  background: 'var(--surface2)', color: 'var(--accent2)',
                  padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  border: '1px solid rgba(124,92,252,0.2)'
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Key Features</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: 15 }}>
                  <span style={{ color: 'var(--green)', fontSize: 16 }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section style={{ background: 'var(--bg2)', padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 32, textAlign: 'center', marginBottom: 12 }}>Choose Your Plan</h2>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 48 }}>All plans include full source code</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {tiers.map((tier, i) => (
              <div key={tier.name} style={{
                background: i === 1 ? 'rgba(124,92,252,0.08)' : 'var(--surface)',
                border: i === 1 ? '2px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: 16, padding: 28, position: 'relative'
              }}>
                {i === 1 && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--accent)', color: '#fff', padding: '4px 16px',
                    borderRadius: 20, fontSize: 12, fontWeight: 700
                  }}>POPULAR</div>
                )}
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{tier.name}</h3>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent2)', marginBottom: 20 }}>
                  ₹{tier.price.toLocaleString()}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--green)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link to={`/hire?project=${encodeURIComponent(project.title)}&plan=${tier.name}&amount=${tier.price}`}
                    className="btn-primary" style={{ justifyContent: 'center', fontSize: 14 }}>
                    Order Now
                  </Link>
                  <a href={`https://wa.me/917530021461?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                      background: '#25D36622', color: '#25D366', border: '1px solid #25D36644'
                    }}>
                    💬 Ask on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
