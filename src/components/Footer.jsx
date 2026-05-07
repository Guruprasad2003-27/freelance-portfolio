import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '48px 0 32px' }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, marginBottom: 12 }}>
              <span style={{ color: 'var(--accent)' }}>&lt;</span>Dev<span style={{ color: 'var(--accent)' }}>/&gt;</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>
              Freelance developer building student-grade projects with professional quality.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 600, marginBottom: 16 }}>Projects</div>
            {['Student Attendance', 'Resume Analyzer', 'Expense Tracker', 'Emotion Detection'].map(p => (
              <div key={p} style={{ marginBottom: 8 }}>
                <Link to="/projects" style={{ color: 'var(--muted)', fontSize: 14 }}>{p}</Link>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 600, marginBottom: 16 }}>Quick Links</div>
            {[{ to: '/hire', label: 'Hire Me' }, { to: '/pay', label: 'Pay Now' }, { to: '/projects', label: 'All Projects' }].map(l => (
              <div key={l.to} style={{ marginBottom: 8 }}>
                <Link to={l.to} style={{ color: 'var(--muted)', fontSize: 14 }}>{l.label}</Link>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontWeight: 600, marginBottom: 16 }}>Contact</div>
            <a href="https://wa.me/916382788045" target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#25D36622', color: '#25D366', padding: '10px 18px',
                borderRadius: 8, fontSize: 14, fontWeight: 600,
                border: '1px solid #25D36644', marginBottom: 12
              }}>💬 WhatsApp</a>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>Based in Tamil Nadu, India<br />Available worldwide</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
          © {new Date().getFullYear()} DevFolio. Built with React + Node.js
        </div>
      </div>
    </footer>
  );
}
