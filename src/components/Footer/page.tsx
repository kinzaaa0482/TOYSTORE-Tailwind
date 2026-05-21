import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/products', label: 'Shop'    },
  { to: '/cart',     label: 'Cart'    },
  { to: '/contact',  label: 'Contact' },
  { to: '/reviews',  label: 'Reviews' },
  { to: '/login',    label: 'Login'   },
];

const CATEGORIES = [
  { to: '/products?cat=dolls',      label: 'Dolls'        },
  { to: '/products?cat=cars',       label: 'Cars'         },
  { to: '/products?cat=teddybears', label: 'Teddy Bears'  },
  { to: '/products?cat=puzzles',    label: 'Puzzles'      },
  { to: '/products?cat=kitchen',    label: 'Kitchen Sets' },
];

export default function Footer() {
  return (
    <footer className="bg-[#004E89] text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-12 pb-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-3">🧸 ToyStore</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Pakistan's favourite toy shop online. Safe, fun & delivered to your door.
            </p>
            <div className="flex gap-3">
              {['📘','📸','🐦','▶️'].map((icon, i) => (
                <span
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-base cursor-pointer hover:bg-[#FF6B35] transition-colors"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#F7C59F] text-xs font-bold uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0 space-y-2">
              {LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/70 text-sm no-underline hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1"
                  >
                    <span className="text-[#FF6B35] text-xs">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#F7C59F] text-xs font-bold uppercase tracking-widest mb-4">
              Categories
            </h3>
            <ul className="list-none p-0 m-0 space-y-2">
              {CATEGORIES.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/70 text-sm no-underline hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1"
                  >
                    <span className="text-[#FF6B35] text-xs">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#F7C59F] text-xs font-bold uppercase tracking-widest mb-4">
              Contact Us
            </h3>
            <ul className="list-none p-0 m-0 space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-0.5">📍</span>
                <span>Shop #5, Toy Market, GT Road, Gujranwala, Punjab, Pakistan</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <span>📞</span>
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <span>📧</span>
                <span>support@toystore.pk</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <span>🕐</span>
                <span>Mon–Sat: 9am – 8pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white/10 rounded-2xl px-6 py-6 mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-white text-base mb-0.5">📬 Subscribe to our Newsletter</p>
            <p className="text-white/60 text-sm">Get deals, new arrivals & exclusive offers.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-56 px-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
            />
            <button className="bg-[#FF6B35] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors whitespace-nowrap cursor-pointer border-none">
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-sm">
            © 2025 ToyStore Pakistan. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(t => (
              <span key={t} className="text-white/40 text-xs cursor-pointer hover:text-white/70 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

