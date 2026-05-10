import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/hire', label: 'Hire Me' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? 'rgba(5,5,8,0.96)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link to="/" style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, color: '#fff' }}>
            <span style={{ color: 'var(--accent)' }}>&lt;</span>Dev<span style={{ color: 'var(--accent)' }}>/&gt;</span>
          </Link>

          {/* Desktop */}
          <div className="nav-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: location.pathname === l.to ? 'var(--accent2)' : 'var(--muted)',
                background: location.pathname === l.to ? 'rgba(124,92,252,0.12)' : 'transparent',
                transition: 'all 0.2s'
              }}>{l.label}</Link>
            ))}
            <a href="https://wa.me/916382788045" target="_blank" rel="noopener noreferrer" style={{
              background: '#25D366', color: '#fff', padding: '8px 16px',
              borderRadius: 8, fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8
            }}>💬 WhatsApp</a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} className="nav-hamburger" style={{
            background: 'transparent', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 12px', color: 'var(--text)',
            fontSize: 20, cursor: 'pointer'
          }}>{menuOpen ? '✕' : '☰'}</button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ padding: '8px 24px 24px', borderTop: '1px solid var(--border)', background: 'rgba(5,5,8,0.98)' }}>
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: 16, fontWeight: 500,
                color: location.pathname === l.to ? 'var(--accent2)' : 'var(--text)',
              }}>{l.label}</Link>
            ))}
            <a href="https://wa.me/916382788045" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 16, background: '#25D366', color: '#fff',
              padding: 14, borderRadius: 10, fontSize: 16, fontWeight: 700
            }}>💬 Chat on WhatsApp</a>
          </div>
        )}
      </nav>

      <style>{`
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
