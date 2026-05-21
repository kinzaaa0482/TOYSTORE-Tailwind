import { useState } from 'react';

const INFO = [
  { icon: '📍', title: 'Address', text: 'Shop #5, Toy Market, GT Road, Gujranwala, Punjab, Pakistan' },
  { icon: '📞', title: 'Phone',   text: '+92 300 1234567' },
  { icon: '📧', title: 'Email',   text: 'support@toystore.pk' },
  { icon: '🕐', title: 'Hours',   text: 'Mon–Sat: 9am – 8pm' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls = 'w-full px-4 py-3 border-[1.5px] rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-colors';
  const labelCls = 'block text-sm font-semibold mb-1.5';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Page header */}
        <h1 className="text-3xl font-extrabold mb-2 text-[#FF6B35]">📬 Contact Us</h1>
        <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
          We'd love to hear from you. Fill in the form and we'll respond within 24 hours.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Form */}
          <div
            className="flex-1 border-[1.5px] rounded-2xl p-8 shadow-md"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--brand-fourth)' }}>
              ✉️ Send a Message
            </h2>

            {sent && (
              <div className="bg-green-100 text-green-800 px-4 py-3 rounded-xl mb-5 font-semibold text-sm flex items-center gap-2">
                ✅ Thank you! Your message has been sent. We'll reply shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                  <input
                    type="text" name="name" placeholder="Your name"
                    value={form.name} onChange={handleChange} required
                    className={inputCls}
                    style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Email</label>
                  <input
                    type="email" name="email" placeholder="you@email.com"
                    value={form.email} onChange={handleChange} required
                    className={inputCls}
                    style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Subject</label>
                <select
                  name="subject" value={form.subject} onChange={handleChange}
                  className={`${inputCls} appearance-none`}
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                >
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Return/Refund</option>
                  <option>Bulk Order</option>
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Message</label>
                <textarea
                  name="message" placeholder="Write your message here…"
                  value={form.message} onChange={handleChange} required rows={5}
                  className={`${inputCls} resize-y font-[inherit]`}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF6B35] text-white border-none rounded-xl py-3 font-bold text-sm cursor-pointer hover:bg-[#004E89] transition-colors"
              >
                Send Message →
              </button>
            </form>
          </div>

          {/* Info cards */}
          <div className="w-full lg:w-80 space-y-4">
            {INFO.map(item => (
              <div
                key={item.title}
                className="flex items-start gap-4 border-[1.5px] rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-[#FF6B35] transition-all duration-200"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
              >
                <div className="text-3xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.text}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="border-[1.5px] rounded-2xl overflow-hidden shadow-sm"
              style={{ borderColor: 'var(--border-muted)' }}
            >
              <div
                className="h-40 flex items-center justify-center text-4xl"
                style={{ background: 'var(--bg-card)' }}
              >
                🗺️
              </div>
              <div className="px-4 py-3" style={{ background: 'var(--bg-card)' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  GT Road, Gujranwala, Punjab
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

