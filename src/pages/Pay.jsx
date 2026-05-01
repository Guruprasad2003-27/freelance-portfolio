import { useState } from 'react';
import { createPaymentOrder, verifyPayment } from '../api';

export default function Pay() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', amount: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const projectOptions = [
    'Student Attendance System', 'Face Attendance System', 'Resume Analyzer',
    'Expense Tracker', 'Emotion Detection', 'WhatsApp Web Clone',
    'QR Attendance System', 'AI Student Result Analyzer', 'Custom Project'
  ];

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handlePay = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectType || !form.amount) return;
    setLoading(true);
    try {
      const res = await createPaymentOrder({
        amount: Number(form.amount),
        name: form.name,
        email: form.email,
        projectType: form.projectType
      });

      const { orderId, amount, currency, keyId } = res.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: 'DevFolio Projects',
        description: form.projectType,
        order_id: orderId,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            setStatus('success');
          } catch {
            setStatus('error');
          }
        },
        prefill: { name: form.name, email: form.email },
        theme: { color: '#7c5cfc' },
        modal: { ondismiss: () => setLoading(false) }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch {
      setStatus('error');
      setLoading(false);
    }
  };

  if (status === 'success') return (
    <div style={{ paddingTop: 120, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 32, marginBottom: 12 }}>Payment Successful!</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
          Thank you! Your payment is confirmed. I'll start working on your project and deliver within the agreed timeline.
        </p>
        <a href={`https://wa.me/917530021461?text=${encodeURIComponent('Hi! I just made the payment. Please confirm receipt.')}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#25D366', color: '#fff', padding: '14px 28px',
            borderRadius: 10, fontSize: 16, fontWeight: 700
          }}>
          💬 Confirm on WhatsApp
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ background: 'var(--bg2)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 12 }}>Make a Payment</h1>
          <p style={{ color: 'var(--muted)' }}>Secure payments powered by Razorpay — UPI, cards, net banking all accepted</p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 560 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['🔒 SSL Secured', '💳 UPI & Cards', '🏦 Net Banking', '✅ Razorpay'].map(b => (
                <span key={b} style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>{b}</span>
              ))}
            </div>

            <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
                <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Project *</label>
                <select name="projectType" value={form.projectType} onChange={handleChange} required>
                  <option value="">Select your project</option>
                  {projectOptions.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>Amount (₹) *</label>
                <input name="amount" type="number" min="100" placeholder="Enter amount in rupees (e.g. 3000)" value={form.amount} onChange={handleChange} required />
              </div>

              {form.amount && (
                <div style={{ background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.2)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: 'var(--muted)', fontSize: 13 }}>You will be charged</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent2)' }}>₹{Number(form.amount).toLocaleString()}</div>
                </div>
              )}

              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: 12, color: '#ef4444', fontSize: 14 }}>
                  Payment failed. Please try again or contact via WhatsApp.
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary"
                style={{ justifyContent: 'center', padding: '16px', fontSize: 16, fontWeight: 700 }}>
                {loading ? 'Opening payment...' : '💳 Pay Securely with Razorpay'}
              </button>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)' }}>
                Your payment is 100% secure. Receipts sent to your email.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
