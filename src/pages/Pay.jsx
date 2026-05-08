import { useState } from 'react';

const UPI_ID = 'guruprasadsenthilkumar@okhdfcbank';
const UPI_NAME = 'Guruprasad K S';
const UPI_QR_IMAGE = '/freelance-portfolio/upi-qr.png';

const projectOptions = [
  'Student Attendance System', 'Resume Analyzer Web App', 'Expense Tracker',
  'Emotion Detection', 'WhatsApp Web Clone', 'QR Attendance',
  'AI Student Result Analyzer', 'Custom Project',
];

export default function Pay() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', amount: '', txnId: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const upiLink = 'upi://pay?pa=' + UPI_ID + '&pn=' + encodeURIComponent(UPI_NAME) + '&am=' + form.amount + '&cu=INR&tn=' + encodeURIComponent(form.projectType || 'Project Payment');

  const handleSubmitForm = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectType || !form.amount) return;
    setStep(2);
  };

  const handleConfirm = async e => {
    e.preventDefault();
    if (!form.txnId.trim()) return;
    setLoading(true);
    try {
      await fetch((import.meta.env.VITE_API_URL || 'https://freelance-portfolio-backend-api.onrender.com/api') + '/payment/upi-confirm', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
    const waMsg = encodeURIComponent('Hi! I paid Rs.' + form.amount + ' for ' + form.projectType + '. Txn ID: ' + form.txnId);
    setTimeout(() => window.open('https://wa.me/917530021461?text=' + waMsg, '_blank'), 1000);
  };

  if (submitted) return (
    <div style={{ paddingTop: 120, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', marginBottom: 12 }}>Payment Confirmed!</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>
          Thank you, <strong style={{ color: 'var(--text)' }}>{form.name}</strong>!
          WhatsApp is opening — send a screenshot of your payment there too.
        </p>
        <a href={'https://wa.me/917530021461?text=' + encodeURIComponent('Hi! I paid Rs.' + form.amount + ' for ' + form.projectType + '. Txn ID: ' + form.txnId)}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700 }}>
          💬 Open WhatsApp
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 80 }}>
      <style>{`
        .pay-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .step-back-next { display: flex; gap: 12px; }
        @media (max-width: 560px) {
          .pay-form-grid { grid-template-columns: 1fr; }
          .step-back-next { flex-direction: column; }
        }
      `}</style>

      <section style={{ background: 'var(--bg2)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 56px)', marginBottom: 12 }}>Make a Payment</h1>
          <p style={{ color: 'var(--muted)' }}>Pay via UPI — Google Pay, PhonePe, Paytm, or any UPI app</p>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
            {['Fill Details', 'Scan & Pay', 'Confirm'].map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: step >= i + 1 ? 'var(--accent)' : 'var(--surface)',
                  border: '2px solid ' + (step >= i + 1 ? 'var(--accent)' : 'var(--border)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: step >= i + 1 ? '#fff' : 'var(--muted)'
                }}>{step > i + 1 ? '✓' : i + 1}</div>
                <span style={{ fontSize: 13, color: step === i + 1 ? 'var(--text)' : 'var(--muted)' }}>{label}</span>
                {i < 2 && <div style={{ width: 24, height: 1, background: 'var(--border)' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 560 }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 'clamp(20px, 5vw, 40px)' }}>
              <h2 style={{ fontSize: 20, marginBottom: 24 }}>Your Details</h2>
              <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="pay-form-grid">
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Full Name *</label>
                    <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Email *</label>
                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>WhatsApp Number</label>
                  <input name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Project *</label>
                  <select name="projectType" value={form.projectType} onChange={handleChange} required>
                    <option value="">Select your project</option>
                    {projectOptions.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Amount (Rs.) *</label>
                  <input name="amount" type="number" min="1" placeholder="e.g. 999" value={form.amount} onChange={handleChange} required />
                </div>
                {form.amount && (
                  <div style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ color: 'var(--muted)', fontSize: 13 }}>You will pay</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent2)' }}>Rs.{Number(form.amount).toLocaleString()}</div>
                  </div>
                )}
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: 14, fontSize: 15 }}>
                  Next — Scan QR to Pay →
                </button>
              </form>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 'clamp(20px, 5vw, 40px)', textAlign: 'center' }}>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Scan QR to Pay</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>Open Google Pay, PhonePe, or Paytm and scan</p>

              <div style={{ background: '#fff', borderRadius: 16, padding: 16, display: 'inline-block', marginBottom: 20 }}>
                <img src={UPI_QR_IMAGE} alt="UPI QR Code" style={{ width: 'min(220px, 70vw)', height: 'min(220px, 70vw)', display: 'block' }}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div style={{ width: 'min(220px, 70vw)', height: 'min(220px, 70vw)', background: '#f3f4f6', display: 'none', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, borderRadius: 8, color: '#666', fontSize: 13, textAlign: 'center', padding: 16 }}>
                  <span style={{ fontSize: 40 }}>📷</span>
                  Add QR as<br /><code style={{ fontSize: 11 }}>public/upi-qr.png</code>
                </div>
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 16, textAlign: 'left' }}>
                {[['UPI ID', UPI_ID], ['Name', UPI_NAME], ['Amount', 'Rs.' + Number(form.amount).toLocaleString()]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: 'var(--muted)', fontSize: 13 }}>{k}</span>
                    <span style={{ fontWeight: 600, fontSize: 14, color: k === 'Amount' ? 'var(--accent2)' : 'var(--text)' }}>{v}</span>
                  </div>
                ))}
              </div>

              <a href={upiLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 20px', marginBottom: 20, color: 'var(--text)', fontSize: 14 }}>
                📱 Tap to pay via UPI app (mobile)
              </a>

              <div className="step-back-next">
                <button onClick={() => setStep(1)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>I have paid →</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 'clamp(20px, 5vw, 40px)' }}>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Confirm Your Payment</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>Enter the UPI Transaction ID from your app</p>

              <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, padding: 12, marginBottom: 20, fontSize: 13, color: '#22c55e' }}>
                Find it in: UPI app → Payment History → Click payment → Copy Ref ID
              </div>

              <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>UPI Transaction ID *</label>
                  <input name="txnId" placeholder="e.g. 425631789012" value={form.txnId} onChange={handleChange} required style={{ fontFamily: 'monospace' }} />
                </div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
                  {[['Name', form.name], ['Project', form.projectType], ['Amount', 'Rs.' + Number(form.amount).toLocaleString()]].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                      <span style={{ color: 'var(--muted)' }}>{k}</span>
                      <span style={{ fontWeight: k === 'Amount' ? 700 : 400, color: k === 'Amount' ? 'var(--accent2)' : 'var(--text)' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="step-back-next">
                  <button type="button" onClick={() => setStep(2)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                  <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                    {loading ? 'Confirming...' : '✅ Confirm Payment'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
