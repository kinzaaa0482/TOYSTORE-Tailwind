import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen]   = useState(false);
  const { cartCount }           = useCart();
  const { theme, toggleTheme }  = useTheme();
  const navigate                = useNavigate();
  const location                = useLocation();
  const isLoggedIn              = !!localStorage.getItem('ts_user');

  const isActive = (path) =>
    location.pathname === path ? 'bg-white/25' : '';

  const navLink =
    'text-white no-underline px-3 py-2 rounded-md font-medium text-sm transition-all duration-200 hover:bg-white/15 block';

  return (
    <nav className="sticky top-0 z-[999] flex items-center justify-between px-6 md:px-8 h-16 bg-[#004E89] shadow-lg">

      {/* Brand */}
      <Link to="/" className="text-xl font-extrabold text-white tracking-wide no-underline shrink-0">
        🧸 ToyStore
      </Link>

      {/* Desktop links — order: Home, Shop, Categories, Cart, Reviews, Contact, Dashboard */}
      <ul className="hidden md:flex list-none m-0 p-0 gap-1 items-center">

        {/* Home */}
        <li>
          <Link to="/" className={`${navLink} ${isActive('/')}`}>Home</Link>
        </li>

        {/* Shop */}
        <li>
          <Link to="/products" className={`${navLink} ${isActive('/products')}`}>Shop</Link>
        </li>

        {/* Categories dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setCatOpen(true)}
          onMouseLeave={() => setCatOpen(false)}
        >
          <span className={`${navLink} cursor-pointer select-none`}>
            Categories ▾
          </span>
          {catOpen && (
            <div
              className="absolute top-full left-0 mt-1 rounded-xl border border-[var(--border-muted)] shadow-xl z-[1000] py-1 min-w-[180px]"
              style={{ background: 'var(--bg-card)' }}
            >
              {[
                { cat: 'dolls',      label: 'Dolls'        },
                { cat: 'cars',       label: 'Cars'         },
                { cat: 'teddybears', label: 'Teddy Bears'  },
                { cat: 'puzzles',    label: 'Puzzles'      },
                { cat: 'kitchen',    label: 'Kitchen Sets' },
              ].map(({ cat, label }) => (
                <Link
                  key={cat}
                  to={`/products?cat=${cat}`}
                  onClick={() => setCatOpen(false)}
                  className="block px-4 py-2.5 text-sm no-underline transition-colors hover:bg-[#F7C59F]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </li>

        {/* Cart */}
        <li>
          <Link to="/cart" className={`${navLink} ${isActive('/cart')} flex items-center gap-1`}>
            🛒 Cart
            {cartCount > 0 && (
              <span className="bg-[#FF6B35] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </Link>
        </li>

        {/* Reviews */}
        <li>
          <Link to="/reviews" className={`${navLink} ${isActive('/reviews')}`}>Reviews</Link>
        </li>

        {/* Contact */}
        <li>
          <Link to="/contact" className={`${navLink} ${isActive('/contact')}`}>Contact</Link>
        </li>

        {/* Dashboard */}
        <li>
          <Link to="/dashboard" className={`${navLink} ${isActive('/dashboard')}`}>Dashboard</Link>
        </li>

        {/* Profile */}
        <li>
          <Link to="/profile" className={`${navLink} ${isActive('/profile')} flex items-center gap-1.5`}>
            <span className="w-5 h-5 rounded-full bg-[#FF6B35] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              {isLoggedIn ? (localStorage.getItem('ts_user') || 'U').charAt(0).toUpperCase() : '👤'}
            </span>
            Profile
          </Link>
        </li>

        {/* Theme toggle */}
        <li>
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="bg-transparent border-2 border-white/40 text-white px-2.5 py-1.5 rounded-md text-base cursor-pointer hover:bg-white/15 transition-colors"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </li>

        {/* Auth */}
        <li>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-white/15 text-white px-3 py-1.5 rounded-lg text-sm font-semibold no-underline hover:bg-white/25 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center text-xs font-bold">
                  {(localStorage.getItem('ts_user') || 'U').charAt(0).toUpperCase()}
                </span>
                Profile
              </Link>
              <button
                onClick={() => { localStorage.removeItem('ts_user'); navigate('/login'); }}
                className="bg-[#FF6B35] text-white border-none rounded-md px-3 py-2 text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-[#FF6B35] text-white border-none rounded-md px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
          )}
        </li>
      </ul>

      {/* Mobile right side */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={toggleTheme}
          className="bg-transparent border border-white/40 text-white px-2 py-1 rounded text-sm cursor-pointer"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
          className="bg-transparent border-2 border-white text-white px-2.5 py-1.5 rounded text-lg cursor-pointer"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu — same order */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#004E89] shadow-xl z-50 flex flex-col py-3 md:hidden">
          {[
            { to: '/',          label: 'Home'      },
            { to: '/products',  label: 'Shop'      },
            { to: '/cart',      label: `🛒 Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
            { to: '/reviews',   label: 'Reviews'   },
            { to: '/contact',   label: 'Contact'   },
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/profile',   label: '👤 Profile'  },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-white no-underline px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}

          {/* Mobile categories */}
          <div className="px-6 py-2 text-white/60 text-xs font-bold uppercase tracking-widest">
            Categories
          </div>
          {[
            { cat: 'dolls',      label: 'Dolls'        },
            { cat: 'cars',       label: 'Cars'         },
            { cat: 'teddybears', label: 'Teddy Bears'  },
            { cat: 'puzzles',    label: 'Puzzles'      },
            { cat: 'kitchen',    label: 'Kitchen Sets' },
          ].map(({ cat, label }) => (
            <Link
              key={cat}
              to={`/products?cat=${cat}`}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 no-underline pl-10 pr-6 py-2.5 text-sm hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}

          <div className="px-4 pt-2">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center no-underline bg-white/15 text-white rounded-md px-4 py-2.5 text-sm font-semibold hover:bg-white/25 transition-colors"
                >
                  👤 My Profile
                </Link>
                <button
                  onClick={() => { localStorage.removeItem('ts_user'); navigate('/login'); setMenuOpen(false); }}
                  className="w-full bg-[#FF6B35] text-white border-none rounded-md px-4 py-2.5 text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false); }}
                className="w-full bg-[#FF6B35] text-white border-none rounded-md px-4 py-2.5 text-sm font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
