import { useState, useEffect } from 'react';
import { getProjects, createProject } from '../api';
import ProjectCard from '../components/ProjectCard';

const defaultProjects = [
  { id: 1, title: 'Student Attendance System', category: 'Web App', description: 'Digital attendance management for schools and colleges.', tech: ['Python', 'Django', 'MySQL'], features: ['Role-based login', 'Reports', 'Export Excel'], price: { basic: 999, standard: 1500, premium: 3500 }, icon: '📋', color: '#4F46E5' },
  { id: 2, title: 'Resume Analyzer Web App', category: 'AI/ML', description: 'AI-powered resume analyzer with ATS score and keyword suggestions.', tech: ['Python', 'NLP', 'Streamlit'], features: ['PDF upload', 'ATS score', 'Skill gap'], price: { basic: 999, standard: 1500, premium: 2500 }, icon: '📄', color: '#0891B2' },
  { id: 3, title: 'Expense Tracker', category: 'Web App', description: 'Personal finance tracker with budgeting and visual charts.', tech: ['React', 'Node.js', 'MongoDB'], features: ['Budget planning', 'Charts', 'Reports'], price: { basic: 599, standard: 1500, premium: 2500 }, icon: '💰', color: '#059669' },
  { id: 4, title: 'Emotion Detection', category: 'AI/ML', description: 'Real-time emotion detection using deep learning and webcam.', tech: ['Python', 'TensorFlow', 'OpenCV'], features: ['7 emotions', 'Real-time', 'REST API'], price: { basic: 1500, standard: 3000, premium: 6000 }, icon: '😊', color: '#DC2626' },
  { id: 5, title: 'WhatsApp Web Clone', category: 'Web App', description: 'Full-featured WhatsApp clone with real-time messaging.', tech: ['React', 'Socket.io', 'MongoDB'], features: ['Real-time chat', 'Groups', 'Media sharing'], price: { basic: 1200, standard: 1700, premium: 2500 }, icon: '💬', color: '#16A34A' },
  { id: 6, title: 'QR Attendance', category: 'Web App', description: 'Dynamic QR code attendance system with anti-proxy protection.', tech: ['Python', 'Django', 'QRCode'], features: ['Dynamic QR', 'Anti-proxy', 'Live dashboard'], price: { basic: 999, standard: 1500, premium: 2000 }, icon: '📱', color: '#B45309' },
  { id: 7, title: 'AI Student Result Analyzer', category: 'AI/ML', description: 'ML-powered result analysis with performance prediction.', tech: ['Python', 'Scikit-learn', 'Streamlit'], features: ['Prediction', 'Weak areas', 'Study tips'], price: { basic: 1000, standard: 1500, premium: 3000 }, icon: '📊', color: '#9333EA' },
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
