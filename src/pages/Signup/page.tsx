import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { alert('Passwords do not match!'); return; }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('ts_user', form.email);
      navigate('/dashboard');
    }, 600);
  };

  const inputCls = 'w-full px-4 py-3 border-[1.5px] rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-colors';
  const labelCls = 'block text-sm font-semibold mb-1.5';

  const fields = [
    { name: 'fullname', label: 'Full Name',       type: 'text',     placeholder: 'John Doe',          required: true  },
    { name: 'email',    label: 'Email Address',   type: 'email',    placeholder: 'you@email.com',     required: true  },
    { name: 'phone',    label: 'Phone Number',    type: 'tel',      placeholder: '+92 300 0000000',   required: false },
    { name: 'password', label: 'Password',        type: 'password', placeholder: '••••••••',          required: true  },
    { name: 'confirm',  label: 'Confirm Password',type: 'password', placeholder: '••••••••',          required: true  },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--bg-main)' }}
    >
      <div
        className="w-full max-w-md border-[1.5px] rounded-2xl p-8 shadow-xl"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="text-2xl font-extrabold mb-1 text-[#FF6B35]">
            Create Account
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Join ToyStore and start shopping!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(f => (
            <div key={f.name}>
              <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                required={f.required}
                className={inputCls}
                style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] text-white border-none rounded-xl py-3 font-bold text-sm cursor-pointer hover:bg-[#004E89] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>

        <div
          className="mt-6 pt-5 border-t text-center text-sm"
          style={{ borderColor: 'var(--border-muted)', color: 'var(--text-muted)' }}
        >
          Already have an account?{' '}
          <Link to="/login" className="font-bold no-underline hover:underline text-[#FF6B35]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

