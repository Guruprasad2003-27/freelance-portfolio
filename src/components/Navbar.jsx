import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/hire', label: 'Hire Me' },
    { to: '/pay', label: 'Pay Now' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.3s'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, color: '#fff' }}>
          <span style={{ color: 'var(--accent)' }}>&lt;</span>Dev<span style={{ color: 'var(--accent)' }}>/&gt;</span>
        </Link>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: location.pathname === l.to ? 'var(--accent2)' : 'var(--muted)',
              background: location.pathname === l.to ? 'rgba(124,92,252,0.12)' : 'transparent',
              transition: 'all 0.2s'
            }}>{l.label}</Link>
          ))}
          <a href="https://wa.me/917530021461" target="_blank" rel="noopener noreferrer"
            style={{
              background: '#25D366', color: '#fff', padding: '8px 16px',
              borderRadius: 8, fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
