import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../api';
import axios from 'axios';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const emptyForm = {
  title: '',
  category: 'Web App',
  description: '',
  tech: '',
  features: '',
  icon: '📁',
  color: '#7c5cfc',
  priceBasic: '',
  priceStandard: '',
  pricePremium: '',
};

const iconOptions = ['📋', '🤖', '📄', '💰', '😊', '💬', '📱', '📊', '🌐', '🔐', '📦', '🎯', '⚡', '🧠', '🛒'];
const colorOptions = ['#4F46E5', '#7C3AED', '#0891B2', '#059669', '#DC2626', '#16A34A', '#B45309', '#9333EA', '#7c5cfc', '#0EA5E9'];

export default function Admin() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [wrongPass, setWrongPass] = useState(false);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('adminAuthed') === 'yes') {
      setAuthed(true);
      localStorage.setItem('role', 'host');
    }
  }, []);

  useEffect(() => {
    if (authed) fetchProjects();
  }, [authed]);

  const fetchProjects = () => {
    getProjects().then(r => setProjects(Array.isArray(r.data) ? r.data : [])).catch(() => {});
  };

  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setWrongPass(false);
      localStorage.setItem('adminAuthed', 'yes');
      localStorage.setItem('role', 'host');
    } else {
      setWrongPass(true);
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    localStorage.removeItem('adminAuthed');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description,
        tech: form.tech.split(',').map(t => t.trim()).filter(Boolean),
        features: form.features.split(',').map(f => f.trim()).filter(Boolean),
        icon: form.icon,
        color: form.color,
        price: {
          basic: Number(form.priceBasic),
          standard: Number(form.priceStandard),
          premium: Number(form.pricePremium),
        },
      };
      await axios.post(API_BASE + '/projects', payload);
      setSuccessMsg('Project added successfully!');
      setForm(emptyForm);
      setShowForm(false);
      fetchProjects();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch {
      setSuccessMsg('Failed to save. Is your backend running?');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(API_BASE + '/projects/' + id);
      fetchProjects();
    } catch {
      alert('Delete failed. Check backend.');
    }
    setDeleteId(null);
  };

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ width: 380, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
            <h1 style={{ fontSize: 24, fontFamily: 'Syne' }}>Admin Login</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>Only for the site owner</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>

            {wrongPass && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: 10, color: '#ef4444', fontSize: 13 }}>
                Wrong password. Try again.
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: 14 }}>
              Login →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      <section style={{ background: 'var(--bg2)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 32, fontFamily: 'Syne' }}>Admin Panel</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Manage your portfolio projects</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setShowForm(f => !f)}
              className="btn-primary"
            >
              {showForm ? '✕ Cancel' : '+ Add New Project'}
            </button>
            <button onClick={handleLogout} className="btn-ghost">
              Logout
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">

          {/* Success message */}
          {successMsg && (
            <div style={{
              background: successMsg.includes('Failed') ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
              border: '1px solid ' + (successMsg.includes('Failed') ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'),
              borderRadius: 10, padding: 14, marginBottom: 24,
              color: successMsg.includes('Failed') ? '#ef4444' : '#22c55e',
              fontSize: 14, fontWeight: 500
            }}>
              {successMsg}
            </div>
          )}

          {/* ADD PROJECT FORM */}
          {showForm && (
            <div style={{ background: 'var(--surface)', border: '1px solid rgba(124,92,252,0.3)', borderRadius: 20, padding: 36, marginBottom: 40 }}>
              <h2 style={{ fontSize: 20, marginBottom: 24 }}>Add New Project</h2>
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Project Title *</label>
                    <input name="title" placeholder="e.g. Face Attendance System" value={form.title} onChange={handleChange} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Category *</label>
                    <select name="category" value={form.category} onChange={handleChange}>
                      <option>Web App</option>
                      <option>AI/ML</option>
                      <option>Mobile App</option>
                      <option>Desktop App</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Description *</label>
                  <textarea name="description" rows={3} placeholder="Describe what this project does..." value={form.description} onChange={handleChange} required style={{ resize: 'vertical' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Tech Stack (comma separated) *</label>
                    <input name="tech" placeholder="Python, Django, MySQL" value={form.tech} onChange={handleChange} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Features (comma separated) *</label>
                    <input name="features" placeholder="Login, Reports, Export" value={form.features} onChange={handleChange} required />
                  </div>
                </div>

                {/* Icon picker */}
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10, display: 'block' }}>Icon</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {iconOptions.map(ic => (
                      <button type="button" key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))}
                        style={{
                          width: 44, height: 44, fontSize: 22, borderRadius: 10,
                          background: form.icon === ic ? 'var(--accent)' : 'var(--surface2)',
                          border: '1px solid ' + (form.icon === ic ? 'var(--accent)' : 'var(--border)'),
                          cursor: 'pointer'
                        }}>
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color picker */}
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10, display: 'block' }}>Card Color</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {colorOptions.map(c => (
                      <button type="button" key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                        style={{
                          width: 36, height: 36, borderRadius: 8, background: c,
                          border: form.color === c ? '3px solid #fff' : '2px solid transparent',
                          cursor: 'pointer', boxShadow: form.color === c ? '0 0 0 2px ' + c : 'none'
                        }} />
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10, display: 'block' }}>Pricing (Rs.) *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[['priceBasic', 'Basic'], ['priceStandard', 'Standard'], ['pricePremium', 'Premium']].map(([field, label]) => (
                      <div key={field}>
                        <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, display: 'block' }}>{label}</label>
                        <input name={field} type="number" min="1" placeholder="e.g. 999" value={form[field]} onChange={handleChange} required />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview card */}
                <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>Preview</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: form.color + '22', border: '1px solid ' + form.color + '44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                      {form.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{form.title || 'Project Title'}</div>
                      <div style={{ color: 'var(--muted)', fontSize: 13 }}>{form.category}</div>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={saving} className="btn-primary" style={{ justifyContent: 'center', padding: 14, fontSize: 15 }}>
                  {saving ? 'Saving...' : '💾 Save Project'}
                </button>
              </form>
            </div>
          )}

          {/* PROJECT LIST */}
          <h2 style={{ fontSize: 20, marginBottom: 20 }}>
            All Projects <span style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 400 }}>({projects.length})</span>
          </h2>

          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}>
              No projects yet. Click "+ Add New Project" to get started.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {projects.map(p => (
                <div key={p.id || p._id} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: (p.color || '#7c5cfc') + '22', border: '1px solid ' + (p.color || '#7c5cfc') + '44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {p.icon || '📁'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{p.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>
                      {p.category} &nbsp;·&nbsp; Basic: Rs.{p.price?.basic?.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ background: 'var(--bg2)', color: 'var(--muted)', padding: '4px 12px', borderRadius: 6, fontSize: 12, border: '1px solid var(--border)' }}>
                      ID: {p.id || p._id?.toString().slice(-6)}
                    </span>
                    <button
                      onClick={() => handleDelete(p.id || p._id)}
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
