import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { submitContact } from '../api';

export default function Hire() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    projectType: params.get('project') || '',
    budget: params.get('amount') ? `₹${Number(params.get('amount')).toLocaleString()}` : '',
    message: ''
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [waLink, setWaLink] = useState('');

  const projectOptions = [
    'Student Attendance System', 'Face Attendance System', 'Resume Analyzer',
    'Expense Tracker', 'Emotion Detection', 'WhatsApp Web Clone',
    'QR Attendance System', 'AI Student Result Analyzer', 'Custom Project'
  ];

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitContact(form);
      setStatus('success');
      setWaLink(res.data.whatsappLink);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ paddingTop: 120, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: 520, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
          <h2 style={{ fontSize: 32, marginBottom: 12 }}>Request Submitted!</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 32 }}>
            Your project request has been saved. You'll hear back within 24 hours.<br />
            Want to chat right now?
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25D366', color: '#fff', padding: '14px 32px',
              borderRadius: 10, fontSize: 16, fontWeight: 700
            }}>
            💬 Continue on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--bg2)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 12 }}>Request a Project</h1>
          <p style={{ color: 'var(--muted)', fontSize: 16 }}>Fill the form and I'll get back to you within 24 hours</p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 680 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Your Name *</label>
                  <input name="name" placeholder="Rahul Kumar" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Email *</label>
                  <input name="email" type="email" placeholder="rahul@college.edu" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Phone (WhatsApp)</label>
                  <input name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Budget Range</label>
                  <select name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select budget</option>
                    <option>Under ₹3,000</option>
                    <option>₹3,000 – ₹6,000</option>
                    <option>₹6,000 – ₹12,000</option>
                    <option>₹12,000 – ₹20,000</option>
                    <option>Above ₹20,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Project Type *</label>
                <select name="projectType" value={form.projectType} onChange={handleChange} required>
                  <option value="">Choose a project</option>
                  {projectOptions.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Message / Requirements *</label>
                <textarea name="message" rows={5} placeholder="Describe what you need — deadline, special features, college name, etc." value={form.message} onChange={handleChange} required style={{ resize: 'vertical' }} />
              </div>

              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: 12, color: '#ef4444', fontSize: 14 }}>
                  Something went wrong. Please try WhatsApp instead.
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button type="submit" className="btn-primary" disabled={status === 'loading'}
                  style={{ flex: 1, justifyContent: 'center', fontSize: 15, padding: '14px 24px' }}>
                  {status === 'loading' ? 'Submitting...' : '🚀 Submit Request'}
                </button>
                <a href={`https://wa.me/917530021461?text=${encodeURIComponent('Hi! I want to discuss a project.')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: '#25D366', color: '#fff', padding: '14px 24px',
                    borderRadius: 10, fontSize: 15, fontWeight: 600
                  }}>
                  💬 WhatsApp Me Instead
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
