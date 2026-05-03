import { useState, useEffect } from 'react';
import { getProjects, createProject } from '../api';
import ProjectCard from '../components/ProjectCard';

const defaultProjects = [
  { id: 'student-attendance-system', name: 'Student-Attendance-System', category: 'Web App' },
  { id: 'resume-analyzer-web-app', name: 'Resume Analyzer Web App', category: 'AI/ML' },
  { id: 'expense-tracker', name: 'Expense Tracker', category: 'Web App' },
  { id: 'emotion-detection', name: 'Emotion Detection', category: 'AI/ML' },
  { id: 'whatsapp-web-clone', name: 'Whatsapp Web Clone', category: 'Web App' },
  { id: 'qr-attendance', name: 'QR Attendance', category: 'Web App' },
  { id: 'ai-student-result-analyzer', name: 'AI Student Result Analyzer', category: 'AI/ML' }
];

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    category: 'Web App'
  });

  // Replace this with your real auth logic.
  // Example: const isHost = user?.role === 'host';
  const isHost = localStorage.getItem('role') === 'host';

  useEffect(() => {
    getProjects()
      .then(r => {
        const dbProjects = Array.isArray(r.data) ? r.data : [];
        setProjects(dbProjects.length ? dbProjects : defaultProjects);
      })
      .catch(() => {
        setProjects(defaultProjects);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Web App', 'AI/ML'];
  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const handleAddProject = async e => {
    e.preventDefault();

    if (!newProject.name.trim()) return;

    const payload = {
      name: newProject.name.trim(),
      category: newProject.category
    };

    const response = await createProject(payload);
    setProjects(prev => [...prev, response.data]);
    setNewProject({ name: '', category: 'Web App' });
    setShowAddProject(false);
  };

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--bg2)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: 16 }}>
            All Projects
          </h1>

          <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 17 }}>
            Ready-to-deliver projects with full source code & documentation
          </p>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  padding: '8px 22px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  background: filter === c ? 'var(--accent)' : 'var(--surface)',
                  color: filter === c ? '#fff' : 'var(--muted)',
                  border: `1px solid ${filter === c ? 'var(--accent)' : 'var(--border)'}`,
                  transition: 'all 0.2s'
                }}
              >
                {c}
              </button>
            ))}

            {isHost && (
              <button
                onClick={() => setShowAddProject(prev => !prev)}
                title="Add new project"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  fontSize: 24,
                  fontWeight: 700,
                  lineHeight: 1,
                  background: 'var(--accent)',
                  color: '#fff',
                  border: '1px solid var(--accent)',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
            )}
          </div>

          {isHost && showAddProject && (
            <form
              onSubmit={handleAddProject}
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: 24
              }}
            >
              <input
                value={newProject.name}
                onChange={e => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Project name"
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  minWidth: 240
                }}
              />

              <select
                value={newProject.category}
                onChange={e => setNewProject(prev => ({ ...prev, category: e.target.value }))}
                style={{
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)'
                }}
              >
                <option value="Web App">Web App</option>
                <option value="AI/ML">AI/ML</option>
              </select>

              <button
                type="submit"
                style={{
                  padding: '10px 18px',
                  borderRadius: 8,
                  border: '1px solid var(--accent)',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontWeight: 700
                }}
              >
                Save
              </button>
            </form>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 80 }}>
              Loading projects...
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 24
              }}
            >
              {filtered.map((p, i) => (
                <ProjectCard key={p.id || p._id || p.name} project={p} delay={i * 80} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
