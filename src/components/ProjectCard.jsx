import { Link } from 'react-router-dom';

export default function ProjectCard({ project, delay = 0 }) {
  return (
    <div className="fade-up" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      transition: 'all 0.3s',
      animationDelay: `${delay}ms`,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(124,92,252,0.4)';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 16px 48px rgba(124,92,252,0.12)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: project.color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, border: `1px solid ${project.color}44`
        }}>{project.icon}</div>
        <span className="tag">{project.category}</span>
      </div>

      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{project.title}</h3>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{project.description}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tech.map(t => (
          <span key={t} style={{
            background: 'var(--bg2)', color: 'var(--muted)',
            padding: '3px 10px', borderRadius: 6, fontSize: 12,
            border: '1px solid var(--border)'
          }}>{t}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
        <div>
          <span style={{ color: 'var(--muted)', fontSize: 12 }}>Starting from</span>
          <div style={{ color: 'var(--accent2)', fontWeight: 700, fontSize: 18 }}>
            ₹{project.price.basic.toLocaleString()}
          </div>
        </div>
        <Link to={`/projects/${project.id}`} style={{
          background: 'var(--accent)', color: '#fff',
          padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600
        }}>View Details →</Link>
      </div>
    </div>
  );
}
