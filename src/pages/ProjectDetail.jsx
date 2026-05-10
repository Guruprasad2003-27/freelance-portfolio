import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../api';

const allProjects = [
  { id: 1, title: 'Student Attendance System', category: 'Web App', description: 'Digital attendance management for schools and colleges. Mark, track, and generate reports with role-based access for admin and teachers.', tech: ['Python', 'Django', 'MySQL'], features: ['Role-based login', 'Attendance reports', 'Student dashboard', 'Export to Excel'], icon: '📋', color: '#4F46E5' },
  { id: 2, title: 'Resume Analyzer Web App', category: 'AI/ML', description: 'AI-powered tool that analyzes resumes and gives job match scores, keyword suggestions, and improvement tips.', tech: ['Python', 'NLP', 'Streamlit', 'PyPDF2'], features: ['PDF upload', 'ATS score', 'Keyword analysis', 'Skill gap detection'], icon: '📄', color: '#0891B2' },
  { id: 3, title: 'Expense Tracker', category: 'Web App', description: 'Personal finance tracker with monthly budgeting, category-wise spending charts, and savings suggestions.', tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'], features: ['Budget planning', 'Visual charts', 'Category tracking', 'Monthly reports'], icon: '💰', color: '#059669' },
  { id: 4, title: 'Emotion Detection', category: 'AI/ML', description: 'Real-time emotion detection using deep learning that identifies human emotions from webcam feed.', tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'], features: ['7 emotion classes', 'Real-time detection', 'Engagement analytics', 'REST API'], icon: '😊', color: '#DC2626' },
  { id: 5, title: 'WhatsApp Web Clone', category: 'Web App', description: 'Full-featured WhatsApp web clone with real-time messaging, group chats, image sharing, and online status.', tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'], features: ['Real-time chat', 'Group messages', 'Image sharing', 'Online status'], icon: '💬', color: '#16A34A' },
  { id: 6, title: 'QR Attendance', category: 'Web App', description: 'Dynamic QR code-based attendance system. New QR every session prevents proxy attendance with live dashboard.', tech: ['Python', 'Django', 'QRCode', 'Bootstrap'], features: ['Dynamic QR codes', 'Anti-proxy system', 'Live dashboard', 'Location tracking'], icon: '📱', color: '#B45309' },
  { id: 7, title: 'AI Student Result Analyzer', category: 'AI/ML', description: 'Smart result analysis tool that predicts student performance and gives personalized study suggestions using ML.', tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'], features: ['Performance prediction', 'Weak area detection', 'Study suggestions', 'Visual reports'], icon: '📊', color: '#9333EA' },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const local = allProjects.find(p => p.id === parseInt(id));
    if (local) { setProject(local); setLoading(false); return; }
    getProject(id).then(r => { setProject(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ paddingTop: 120, textAlign: 'center', color: 'var(--muted)' }}>Loading...</div>;
  if (!project) return (
    <div style={{ paddingTop: 120, textAlign: 'center' }}>
      Project not found. <Link to="/projects" style={{ color: 'var(--accent2)' }}>Go back</Link>
    </div>
  );

  const waMsg = encodeURIComponent('Hi! I am interested in the ' + project.title + ' project. Can you tell me more?');

  return (
    <div style={{ paddingTop: 80 }}>
      <style>{`
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
        @media (max-width: 640px) { .detail-grid { grid-template-columns: 1fr; gap: 24px; } }
      `}</style>

      {/* Header */}
      <section style={{ background: 'var(--bg2)', padding: '60px 0' }}>
        <div className="container">
          <Link to="/projects" style={{ color: 'var(--muted)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Back to Projects
          </Link>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20, fontSize: 40,
              background: (project.color || '#7c5cfc') + '22',
              border: '1px solid ' + (project.color || '#7c5cfc') + '44',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>{project.icon || '📁'}</div>
            <div style={{ flex: 1 }}>
              <span style={{ background: 'var(--surface2)', color: 'var(--muted)', padding: '4px 12px', borderRadius: 20, fontSize: 12, border: '1px solid var(--border)' }}>
                {project.category}
              </span>
              <h1 style={{ fontSize: 'clamp(26px, 4vw, 44px)', margin: '12px 0' }}>{project.title}</h1>
              <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 600, lineHeight: 1.7 }}>{project.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech + Features */}
      <section>
        <div className="container">
          <div className="detail-grid">
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 20 }}>Tech Stack</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {(project.tech || []).map(t => (
                  <span key={t} style={{ background: 'var(--surface2)', color: 'var(--accent2)', padding: '8px 16px', borderRadius: 8, fontSize: 14, border: '1px solid rgba(124,92,252,0.2)' }}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 20 }}>Key Features</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(project.features || []).map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: 15 }}>
                    <span style={{ color: 'var(--green)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing philosophy */}
      <section style={{ background: 'var(--bg2)', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: 16 }}>Affordable & Custom Priced</h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            Every project is priced based on your specific requirements, complexity, and deadline —
            not a fixed number. Students get the best quality at the most reasonable price possible.
          </p>

          <div className="contact-grid" style={{ marginBottom: 40 }}>
            {[
              { icon: '💡', title: 'Custom Requirements', desc: 'Price depends on features, tech stack, and complexity you need.' },
              { icon: '🎓', title: 'Student Friendly', desc: 'Special consideration for students with limited budgets.' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Delivered within your deadline without compromising quality.' },
              { icon: '🛠', title: 'Full Support', desc: 'Source code, documentation, and setup guidance included.' },
            ].map(c => (
              <div key={c.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, textAlign: 'left' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{
            background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.2)',
            borderRadius: 16, padding: '28px 32px', marginBottom: 36
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
            <p style={{ fontSize: 18, fontStyle: 'italic', color: 'var(--accent2)', lineHeight: 1.7 }}>
              "Quality project at an affordable price —<br />custom built for your exact needs."
            </p>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={'/hire?project=' + encodeURIComponent(project.title)} style={{
              background: 'var(--accent)', color: '#fff',
              padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
              🚀 Request This Project
            </Link>
            <a href={'https://wa.me/916382788045?text=' + waMsg} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(37,211,102,0.13)', color: '#25D366',
                padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600,
                border: '1px solid rgba(37,211,102,0.27)'
              }}>
              💬 Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
