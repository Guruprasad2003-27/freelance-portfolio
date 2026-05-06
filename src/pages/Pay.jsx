import { useState } from 'react';
import upiqr from './public/upi-qr.png';
// ✅ REPLACE THESE WITH YOUR REAL DETAILS
const UPI_ID = 'guruprasadsenthilkumar@okhdfcbank';
const UPI_NAME = 'Guruprasad K S';         // Your name as in UPI
const UPI_QR_IMAGE = upiqr;
const projectOptions = [
  'Student Attendance System',
  'Resume Analyzer Web App',
  'Expense Tracker',
  'Emotion Detection',
  'WhatsApp Web Clone',
  'QR Attendance',
  'AI Student Result Analyzer',
  'Custom Project',
];

export default function Pay() {
  const [step, setStep] = useState(1); // 1 = form, 2 = QR, 3 = confirm
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', amount: '', txnId: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${form.amount}&cu=INR&tn=${encodeURIComponent(form.projectType || 'Project Payment')}`;

  const handleSubmitForm = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectType || !form.amount) return;
    setStep(2);
  };

  const handleConfirm = async e => {
    e.preventDefault();
    if (!form.txnId.trim()) return;
    setLoading(true);

    const waMsg = encodeURIComponent(
      'Hi! I have made a UPI payment.\n' +
      'Name: ' + form.name + '\n' +
      'Email: ' + form.email + '\n' +
      'Project: ' + form.projectType + '\n' +
      'Amount: Rs.' + form.amount + '\n' +
      'UPI Transaction ID: ' + form.txnId
    );

    // Send to backend (optional — works even if backend is offline)
    try {
      await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/payment/upi-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
    } catch (_) {}

    setLoading(false);
    setSubmitted(true);

    // Auto open WhatsApp after 1 second
    setTimeout(() => {
      window.open('https://wa.me/919XXXXXXXXX?text=' + waMsg, '_blank');
    }, 1000);
  };

  // Step 3 — Success
  if (submitted) {
    return (
      <div style={{ paddingTop: 120, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 32, marginBottom: 12 }}>Payment Confirmed!</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 8 }}>
            Thank you, <strong style={{ color: 'var(--text)' }}>{form.name}</strong>!
          </p>
          <p style={{ color: 'var(--muted)', marginBottom: 32 }}>
            Your transaction ID <strong style={{ color: 'var(--accent2)' }}>{form.txnId}</strong> has been received.
            WhatsApp is opening — please send a screenshot of your payment there too.
          </p>
          <a
            href={'https://wa.me/919XXXXXXXXX?text=' + encodeURIComponent(
              'Hi! I paid Rs.' + form.amount + ' for ' + form.projectType + '. Txn ID: ' + form.txnId
            )}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25D366', color: '#fff',
              padding: '14px 28px', borderRadius: 10,
              fontSize: 16, fontWeight: 700
            }}
          >
            💬 Open WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 80 }}>

      {/* Header */}
      <section style={{ background: 'var(--bg2)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 12 }}>Make a Payment</h1>
          <p style={{ color: 'var(--muted)' }}>
            Pay directly via UPI — Google Pay, PhonePe, Paytm, or any UPI app
          </p>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28 }}>
            {['Fill Details', 'Scan & Pay', 'Confirm'].map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: step > i ? 'var(--accent)' : step === i + 1 ? 'var(--accent)' : 'var(--surface)',
                  border: '2px solid ' + (step >= i + 1 ? 'var(--accent)' : 'var(--border)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700,
                  color: step >= i + 1 ? '#fff' : 'var(--muted)'
                }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 13, color: step === i + 1 ? 'var(--text)' : 'var(--muted)' }}>{label}</span>
                {i < 2 && <div style={{ width: 32, height: 1, background: 'var(--border)', margin: '0 4px' }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 560 }}>

          {/* STEP 1 — Fill Details */}
          {step === 1 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>
              <h2 style={{ fontSize: 20, marginBottom: 24 }}>Your Details</h2>
              <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
                  <input
                    name="amount" type="number" min="1"
                    placeholder="Enter amount (e.g. 999)"
                    value={form.amount} onChange={handleChange} required
                  />
                </div>

                {form.amount && (
                  <div style={{
                    background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.2)',
                    borderRadius: 10, padding: 16, textAlign: 'center'
                  }}>
                    <div style={{ color: 'var(--muted)', fontSize: 13 }}>You will pay</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent2)' }}>
                      Rs.{Number(form.amount).toLocaleString()}
                    </div>
                  </div>
                )}

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: 14, fontSize: 15 }}>
                  Next — Scan QR to Pay →
                </button>
              </form>
            </div>
          )}

          {/* STEP 2 — QR Code */}
          {step === 2 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, textAlign: 'center' }}>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Scan QR to Pay</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>
                Open Google Pay, PhonePe, or Paytm and scan the QR below
              </p>

              {/* QR Code */}
              <div style={{
                background: '#fff', borderRadius: 16, padding: 16,
                display: 'inline-block', marginBottom: 20,
                boxShadow: '0 0 0 1px rgba(0,0,0,0.08)'
              }}>
                <img
                  src={UPI_QR_IMAGE}
                  alt="UPI QR Code"
                  style={{ width: 220, height: 220, display: 'block' }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback if QR image missing */}
                <div style={{
                  width: 220, height: 220, background: '#f3f4f6',
                  display: 'none', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 8, borderRadius: 8,
                  color: '#666', fontSize: 13, textAlign: 'center', padding: 16
                }}>
                  <span style={{ fontSize: 40 }}>📷</span>
                  Add your QR image as<br />
                  <code style={{ fontSize: 11 }}>frontend/public/upi-qr.png</code>
                </div>
              </div>

              {/* UPI details */}
              <div style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 12, padding: 16, marginBottom: 20, textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>UPI ID</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{UPI_ID}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>Name</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{UPI_NAME}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>Project</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{form.projectType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>Amount</span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--accent2)' }}>Rs.{Number(form.amount).toLocaleString()}</span>
                </div>
              </div>

              {/* Pay via app button (mobile) */}
              <a
                href={upiLink}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: '#1a1a2e', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '12px 20px', marginBottom: 20,
                  color: 'var(--text)', fontSize: 14, fontWeight: 500
                }}
              >
                📱 Or tap here to pay via UPI app (mobile only)
              </a>

              <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>
                After paying, click the button below to enter your Transaction ID
              </p>

              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setStep(1)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                  Back
                </button>
                <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                  I have paid →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Confirm Transaction ID */}
          {step === 3 && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Confirm Your Payment</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>
                Enter the UPI Transaction ID from your payment app to confirm
              </p>

              <div style={{
                background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 10, padding: 14, marginBottom: 24, fontSize: 13, color: '#22c55e'
              }}>
                📍 Where to find Transaction ID: Open your UPI app → Payment History → Click the payment → Copy the UPI Ref / Transaction ID
              </div>

              <form onSubmit={handleConfirm} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>
                    UPI Transaction ID *
                  </label>
                  <input
                    name="txnId"
                    placeholder="e.g. 425631789012"
                    value={form.txnId}
                    onChange={handleChange}
                    required
                    style={{ fontFamily: 'monospace', letterSpacing: 1 }}
                  />
                </div>

                <div style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: 14
                }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Payment Summary</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                    <span style={{ color: 'var(--muted)' }}>Name</span>
                    <span>{form.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                    <span style={{ color: 'var(--muted)' }}>Project</span>
                    <span>{form.projectType}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span style={{ color: 'var(--muted)' }}>Amount Paid</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent2)' }}>Rs.{Number(form.amount).toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" onClick={() => setStep(2)} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                    Back
                  </button>
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
