import { useParams, Link } from 'react-router-dom';

const allProjects = [
  { id: 1, title: 'Student Attendance System', category: 'Web App', description: 'Digital attendance management for schools and colleges. Mark, track, and generate reports with role-based access for admin and teachers.', tech: ['Python', 'Django', 'MySQL'], features: ['Role-based login', 'Attendance reports', 'Student dashboard', 'Export to Excel'], price: { basic: 999, standard: 1500, premium: 3500 }, icon: '📋', color: '#4F46E5' },
  { id: 2, title: 'Resume Analyzer Web App', category: 'AI/ML', description: 'AI-powered tool that analyzes resumes and gives job match scores, keyword suggestions, and improvement tips.', tech: ['Python', 'NLP', 'Streamlit', 'PyPDF2'], features: ['PDF upload', 'ATS score', 'Keyword analysis', 'Skill gap detection'], price: { basic: 999, standard: 1500, premium: 2500 }, icon: '📄', color: '#0891B2' },
  { id: 3, title: 'Expense Tracker', category: 'Web App', description: 'Personal finance tracker with monthly budgeting, category-wise spending charts, and savings suggestions.', tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'], features: ['Budget planning', 'Visual charts', 'Category tracking', 'Monthly reports'], price: { basic: 599, standard: 1500, premium: 2500 }, icon: '💰', color: '#059669' },
  { id: 4, title: 'Emotion Detection', category: 'AI/ML', description: 'Real-time emotion detection system using deep learning that identifies human emotions from webcam feed.', tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'], features: ['7 emotion classes', 'Real-time detection', 'Engagement analytics', 'REST API'], price: { basic: 1500, standard: 3000, premium: 6000 }, icon: '😊', color: '#DC2626' },
  { id: 5, title: 'WhatsApp Web Clone', category: 'Web App', description: 'Full-featured WhatsApp web clone with real-time messaging, group chats, image sharing, and online status.', tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'], features: ['Real-time chat', 'Group messages', 'Image sharing', 'Online status'], price: { basic: 1200, standard: 1700, premium: 2500 }, icon: '💬', color: '#16A34A' },
  { id: 6, title: 'QR Attendance', category: 'Web App', description: 'Dynamic QR code-based attendance system. New QR every session prevents proxy attendance with live dashboard.', tech: ['Python', 'Django', 'QRCode', 'Bootstrap'], features: ['Dynamic QR codes', 'Anti-proxy system', 'Live dashboard', 'Location tracking'], price: { basic: 999, standard: 1500, premium: 2000 }, icon: '📱', color: '#B45309' },
  { id: 7, title: 'AI Student Result Analyzer', category: 'AI/ML', description: 'Smart result analysis tool that predicts student performance and gives personalized study suggestions using ML.', tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'], features: ['Performance prediction', 'Weak area detection', 'Study suggestions', 'Visual reports'], price: { basic: 1000, standard: 1500, premium: 3000 }, icon: '📊', color: '#9333EA' },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = allProjects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center' }}>
        Project not found.{' '}
        <Link to="/projects" style={{ color: 'var(--accent2)' }}>Go back</Link>
      </div>
    );
  }

  const tiers = [
    {
      name: 'Basic',
      price: project.price.basic,
      features: ['Source code', 'Basic docs', '1 revision', 'Email support'],
    },
    {
      name: 'Standard',
      price: project.price.standard,
      features: ['Source code', 'Full documentation', '3 revisions', 'WhatsApp support', 'Setup guide'],
    },
    {
      name: 'Premium',
      price: project.price.premium,
      features: ['Source code', 'Full docs + video', 'Unlimited revisions', 'Priority support', 'Deployment help', 'Demo presentation'],
    },
  ];

  const waMsg = encodeURIComponent(
    'Hi! I am interested in the ' + project.title + ' project. Can you tell me more?'
  );

  return (
    <div style={{ paddingTop: 80 }}>

      {/* Header */}
      <section style={{ background: 'var(--bg2)', padding: '60px 0' }}>
        <div className="container">
          <Link
            to="/projects"
            style={{ color: 'var(--muted)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}
          >
            Back to Projects
          </Link>

          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20, fontSize: 40,
              background: project.color + '22',
              border: '1px solid ' + project.color + '44',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {project.icon}
            </div>

            <div style={{ flex: 1 }}>
              <span style={{
                background: 'var(--surface2)', color: 'var(--muted)',
                padding: '4px 12px', borderRadius: 20, fontSize: 12,
                border: '1px solid var(--border)'
              }}>
                {project.category}
              </span>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '12px 0' }}>
                {project.title}
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 600, lineHeight: 1.7 }}>
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack + Features */}
      <section>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
          <div>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Tech Stack</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  background: 'var(--surface2)', color: 'var(--accent2)',
                  padding: '8px 16px', borderRadius: 8, fontSize: 14,
                  border: '1px solid rgba(124,92,252,0.2)'
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Key Features</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {project.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: 15 }}>
                  <span style={{ color: 'var(--green)' }}>&#10003;</span> {f}
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
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 48 }}>
            All plans include full source code
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {tiers.map((tier, i) => (
              <div key={tier.name} style={{
                background: i === 1 ? 'rgba(124,92,252,0.08)' : 'var(--surface)',
                border: i === 1 ? '2px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: 16, padding: 28, position: 'relative'
              }}>
                {i === 1 && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--accent)', color: '#fff',
                    padding: '4px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    whiteSpace: 'nowrap'
                  }}>
                    POPULAR
                  </div>
                )}

                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{tier.name}</h3>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent2)', marginBottom: 20 }}>
                  Rs.{tier.price.toLocaleString()}
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--green)' }}>&#10003;</span> {f}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link
                    to={'/hire?project=' + encodeURIComponent(project.title) + '&plan=' + tier.name + '&amount=' + tier.price}
                    style={{
                      background: 'var(--accent)', color: '#fff',
                      padding: '10px 20px', borderRadius: 8,
                      fontSize: 14, fontWeight: 600, textAlign: 'center'
                    }}
                  >
                    Order Now
                  </Link>

                  <a
                    href={'https://wa.me/917530021461?text=' + waMsg}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                      background: 'rgba(37,211,102,0.13)', color: '#25D366',
                      border: '1px solid rgba(37,211,102,0.27)'
                    }}
                  >
                    Ask on WhatsApp
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
