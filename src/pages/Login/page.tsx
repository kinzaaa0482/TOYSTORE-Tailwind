import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('ts_user', email);
      navigate('/dashboard');
    }, 600);
  };

  const inputCls = 'w-full px-4 py-3 border-[1.5px] rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-colors';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--bg-main)' }}
    >
      <div
        className="w-full max-w-md border-[1.5px] rounded-2xl p-8 shadow-xl"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧸</div>
          <h1 className="text-2xl font-extrabold mb-1 text-[#FF6B35]">
            Welcome Back!
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Sign in to your ToyStore account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={inputCls}
              style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={inputCls}
              style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] text-white border-none rounded-xl py-3 font-bold text-sm cursor-pointer hover:bg-[#004E89] transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div
          className="mt-6 pt-5 border-t text-center text-sm"
          style={{ borderColor: 'var(--border-muted)', color: 'var(--text-muted)' }}
        >
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold no-underline hover:underline text-[#FF6B35]">
            Create one free
          </Link>
        </div>
      </div>
    </div>
  );
}

