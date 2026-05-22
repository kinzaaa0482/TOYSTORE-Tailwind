import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ORDER_HISTORY = [
  { id: '#1021', product: 'Barbie Fashion Doll',    amount: 2400, date: 'May 10, 2026', status: 'Delivered',  statusColor: 'bg-green-100 text-green-700'  },
  { id: '#1022', product: 'RC Racing Car',           amount: 3100, date: 'May 8, 2026',  status: 'Shipped',    statusColor: 'bg-blue-100 text-blue-700'    },
  { id: '#1023', product: 'Deluxe Kitchen Play Set', amount: 4200, date: 'Apr 28, 2026', status: 'Delivered',  statusColor: 'bg-green-100 text-green-700'  },
  { id: '#1024', product: 'Giant Teddy Bear',        amount: 2800, date: 'Apr 15, 2026', status: 'Delivered',  statusColor: 'bg-green-100 text-green-700'  },
  { id: '#1025', product: '1000-Piece Puzzle',       amount: 950,  date: 'Apr 2, 2026',  status: 'Cancelled',  statusColor: 'bg-red-100 text-red-600'      },
];

const STATS = [
  { icon: '🛍️', label: 'Total Orders',    value: '12'       },
  { icon: '💰', label: 'Total Spent',     value: 'Rs 28,450' },
  { icon: '⭐', label: 'Reviews Given',   value: '5'         },
  { icon: '❤️', label: 'Wishlist Items',  value: '8'         },
];

export default function Profile() {
  const navigate  = useNavigate();
  const savedUser = localStorage.getItem('ts_user') || 'user@toystore.pk';

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
  const [editing,   setEditing]   = useState(false);
  const [profile,   setProfile]   = useState({
    name:    'ToyStore User',
    email:   savedUser,
    phone:   '+92 300 1234567',
    address: 'GT Road, Gujranwala, Punjab, Pakistan',
    dob:     '1995-06-15',
  });
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...form });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('ts_user');
    navigate('/login');
  };

  const tabBtn = (tab: typeof activeTab, label: string) =>
    `px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-none transition-all duration-200 ${
      activeTab === tab
        ? 'bg-[#FF6B35] text-white shadow-md'
        : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
    }`;

  const inputCls =
    'w-full px-4 py-3 border-[1.5px] rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-colors';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── PROFILE HEADER CARD ── */}
        <div
          className="rounded-2xl border-[1.5px] overflow-hidden shadow-md mb-8"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-[#004E89] to-[#2d3a8c] relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FF6B35 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F7C59F 0%, transparent 40%)' }}
            />
          </div>

          {/* Avatar + info */}
          <div className="px-8 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 mb-4">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-4xl font-extrabold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #004E89)' }}
              >
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 pt-14 sm:pt-0">
                <h1 className="text-2xl font-extrabold text-[#FF6B35]">{profile.name}</h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{profile.email}</p>
              </div>
              <div className="flex gap-2 pt-14 sm:pt-0">
                <button
                  onClick={() => { setEditing(true); setActiveTab('settings'); }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border-[1.5px] cursor-pointer hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all duration-200"
                  style={{ borderColor: 'var(--border-muted)', color: 'var(--text-secondary)', background: 'transparent' }}
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border-none cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {STATS.map(s => (
                <div
                  key={s.label}
                  className="rounded-xl px-4 py-3 text-center border-[1.5px]"
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)' }}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-lg font-extrabold text-[#FF6B35]">{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div
          className="flex gap-2 p-1.5 rounded-2xl border-[1.5px] mb-8 w-fit"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
        >
          <button onClick={() => setActiveTab('overview')}  className={tabBtn('overview',  'Overview')} >📊 Overview</button>
          <button onClick={() => setActiveTab('orders')}    className={tabBtn('orders',    'Orders')}   >🛍️ My Orders</button>
          <button onClick={() => setActiveTab('settings')}  className={tabBtn('settings',  'Settings')} >⚙️ Settings</button>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Personal Info */}
            <div
              className="lg:col-span-2 border-[1.5px] rounded-2xl p-6 shadow-sm"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
            >
              <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--brand-fourth)' }}>
                👤 Personal Information
              </h2>
              <div className="space-y-4">
                {[
                  { icon: '👤', label: 'Full Name',    value: profile.name    },
                  { icon: '📧', label: 'Email',        value: profile.email   },
                  { icon: '📞', label: 'Phone',        value: profile.phone   },
                  { icon: '📍', label: 'Address',      value: profile.address },
                  { icon: '🎂', label: 'Date of Birth',value: profile.dob     },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: 'var(--bg-main)' }}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div
                className="border-[1.5px] rounded-2xl p-6 shadow-sm"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
              >
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--brand-fourth)' }}>
                  ⚡ Quick Actions
                </h2>
                <div className="space-y-2">
                  {[
                    { icon: '🛍️', label: 'Browse Products', to: '/products' },
                    { icon: '🛒', label: 'View Cart',        to: '/cart'     },
                    { icon: '⭐', label: 'My Reviews',       to: '/reviews'  },
                    { icon: '📦', label: 'Insert Stock',     to: '/insert'   },
                    { icon: '📊', label: 'Dashboard',        to: '/dashboard'},
                  ].map(a => (
                    <Link
                      key={a.to}
                      to={a.to}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl no-underline text-sm font-medium hover:bg-[#FF6B35] hover:text-white transition-all duration-200 group"
                      style={{ color: 'var(--text-secondary)', background: 'var(--bg-main)' }}
                    >
                      <span className="text-lg">{a.icon}</span>
                      {a.label}
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Member badge */}
              <div className="rounded-2xl p-6 text-center bg-gradient-to-br from-[#004E89] to-[#2d3a8c] text-white shadow-md">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-extrabold text-lg mb-1">Gold Member</div>
                <div className="text-white/70 text-xs">Member since Jan 2024</div>
                <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#FF6B35] h-full rounded-full" style={{ width: '72%' }} />
                </div>
                <div className="text-white/60 text-xs mt-1">72% to Platinum</div>
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div
            className="border-[1.5px] rounded-2xl overflow-hidden shadow-sm"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
          >
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-muted)' }}>
              <h2 className="text-lg font-bold" style={{ color: 'var(--brand-fourth)' }}>🛍️ Order History</h2>
              <span className="text-xs px-3 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] font-semibold">
                {ORDER_HISTORY.length} orders
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm" style={{ minWidth: '560px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)' }}>
                    {['Order ID', 'Product', 'Amount', 'Date', 'Status'].map(h => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider border-b"
                        style={{ color: 'var(--text-muted)', borderColor: 'var(--border-muted)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ORDER_HISTORY.map((order, idx) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-b-0 hover:bg-[#FF6B35]/5 transition-colors cursor-pointer"
                      style={{
                        borderColor: 'var(--border-muted)',
                        background: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-main)',
                      }}
                    >
                      <td className="px-5 py-3.5 font-bold text-[#FF6B35]">{order.id}</td>
                      <td className="px-5 py-3.5 font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {order.product}
                      </td>
                      <td className="px-5 py-3.5 font-bold" style={{ color: 'var(--text-primary)' }}>
                        Rs {order.amount.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {order.date}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Edit Form */}
            <div
              className="lg:col-span-2 border-[1.5px] rounded-2xl p-6 shadow-sm"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold" style={{ color: 'var(--brand-fourth)' }}>
                  ⚙️ Edit Profile
                </h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#FF6B35] text-white border-none cursor-pointer hover:bg-[#004E89] transition-colors"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>

              {saved && (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-xl mb-5 font-semibold text-sm">
                  ✅ Profile updated successfully!
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Full Name
                    </label>
                    <input
                      type="text" value={form.name} disabled={!editing}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={`${inputCls} disabled:opacity-60 disabled:cursor-not-allowed`}
                      style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Email Address
                    </label>
                    <input
                      type="email" value={form.email} disabled={!editing}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={`${inputCls} disabled:opacity-60 disabled:cursor-not-allowed`}
                      style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel" value={form.phone} disabled={!editing}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={`${inputCls} disabled:opacity-60 disabled:cursor-not-allowed`}
                      style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Date of Birth
                    </label>
                    <input
                      type="date" value={form.dob} disabled={!editing}
                      onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                      className={`${inputCls} disabled:opacity-60 disabled:cursor-not-allowed`}
                      style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Address
                    </label>
                    <textarea
                      value={form.address} disabled={!editing} rows={2}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      className={`${inputCls} resize-none font-[inherit] disabled:opacity-60 disabled:cursor-not-allowed`}
                      style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                {editing && (
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-[#FF6B35] text-white border-none rounded-xl px-6 py-3 font-bold text-sm cursor-pointer hover:bg-[#004E89] transition-colors"
                    >
                      💾 Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditing(false); setForm({ ...profile }); }}
                      className="border-[1.5px] rounded-xl px-6 py-3 font-bold text-sm cursor-pointer hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                      style={{ borderColor: 'var(--border-muted)', color: 'var(--text-secondary)', background: 'transparent' }}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4">
              <div
                className="border-[1.5px] rounded-2xl p-6 shadow-sm"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
              >
                <h3 className="text-base font-bold mb-4" style={{ color: 'var(--text-secondary)' }}>
                  🔔 Notifications
                </h3>
                {[
                  { label: 'Order updates',    checked: true  },
                  { label: 'New arrivals',      checked: true  },
                  { label: 'Deals & offers',    checked: false },
                  { label: 'Newsletter',        checked: false },
                ].map(n => (
                  <label key={n.label} className="flex items-center justify-between py-2 cursor-pointer">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{n.label}</span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${n.checked ? 'bg-[#FF6B35]' : 'bg-gray-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${n.checked ? 'left-5' : 'left-0.5'}`} />
                    </div>
                  </label>
                ))}
              </div>

              <div className="border-[1.5px] border-red-200 rounded-2xl p-6 bg-red-50">
                <h3 className="text-base font-bold text-red-600 mb-3">⚠️ Danger Zone</h3>
                <p className="text-xs text-red-500 mb-4">These actions cannot be undone.</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white border-none rounded-xl py-2.5 text-sm font-bold cursor-pointer hover:bg-red-600 transition-colors mb-2"
                >
                  🚪 Sign Out
                </button>
                <button
                  onClick={() => alert('Account deletion requires contacting support.')}
                  className="w-full bg-transparent border-[1.5px] border-red-300 text-red-500 rounded-xl py-2.5 text-sm font-bold cursor-pointer hover:bg-red-100 transition-colors"
                >
                  🗑 Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
