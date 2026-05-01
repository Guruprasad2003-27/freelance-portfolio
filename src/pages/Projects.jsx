import { useState, useEffect } from 'react';
import { getProjects } from '../api';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(r => { setProjects(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const categories = ['All', 'Web App', 'AI/ML'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--bg2)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: 16 }}>All Projects</h1>
          <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 17 }}>
            Ready-to-deliver projects with full source code & documentation
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: '8px 22px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                background: filter === c ? 'var(--accent)' : 'var(--surface)',
                color: filter === c ? '#fff' : 'var(--muted)',
                border: `1px solid ${filter === c ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'all 0.2s'
              }}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 80 }}>Loading projects...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {filtered.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 80} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
