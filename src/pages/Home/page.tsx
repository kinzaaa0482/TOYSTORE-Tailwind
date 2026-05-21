import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';

const FEATURED = [
  { id: 'd1', name: 'Barbie Fashion Doll',    price: 2400, img: img2, badge: 'Dolls'   },
  { id: 'c1', name: 'RC Racing Car',           price: 3100, img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop', badge: 'Cars' },
  { id: 'k1', name: 'Deluxe Kitchen Play Set', price: 4200, img: img3, badge: 'Kitchen' },
  { id: 't1', name: 'Giant Teddy Bear',        price: 2800, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&h=300&fit=crop', badge: 'Teddy Bears' },
];

const CATEGORIES = [
  { label: 'Dolls',        emoji: '🎀', cat: 'dolls'      },
  { label: 'Cars',         emoji: '🚗', cat: 'cars'       },
  { label: 'Teddy Bears',  emoji: '🐻', cat: 'teddybears' },
  { label: 'Puzzles',      emoji: '🧩', cat: 'puzzles'    },
  { label: 'Kitchen Sets', emoji: '🍳', cat: 'kitchen'    },
];

const WHY_US = [
  { icon: '🛡️', title: 'Safety First',  desc: 'All toys are tested and certified safe for children of all ages.' },
  { icon: '💰', title: 'Best Prices',    desc: 'Competitive prices with regular deals and discounts every week.' },
  { icon: '🎁', title: 'Gift Wrapping',  desc: 'Free gift wrapping on orders above Rs 2,000. Perfect for birthdays!' },
  { icon: '⭐', title: '4.8★ Rated',     desc: 'Over 1,200 happy customers have rated us 4.8 out of 5 stars.' },
];

const TRUST = [
  { icon: '🚚', text: 'Free Delivery over Rs 3,000' },
  { icon: '🔒', text: '100% Secure Payments'        },
  { icon: '↩️', text: 'Easy 7-Day Returns'          },
  { icon: '✅', text: 'Certified Safe Toys'          },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#004E89] to-[#2d3a8c] text-white py-24 px-6 text-center">
        <div className="text-7xl mb-5 animate-bounce">🧸</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Pakistan's Favourite<br className="hidden md:block" /> Toy Store
        </h1>
        <p className="text-lg md:text-xl text-white/85 max-w-xl mx-auto mb-10 leading-relaxed">
          Discover thousands of toys for every age — from cuddly teddies to racing cars.
          Safe, fun &amp; delivered to your door.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/products"
            className="bg-[#FF6B35] text-white px-8 py-3.5 rounded-xl font-bold text-base no-underline hover:bg-orange-500 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
          >
            🛍️ Shop Now
          </Link>
          <Link
            to="/reviews"
            className="bg-white/15 text-white px-8 py-3.5 rounded-xl font-bold text-base no-underline border-2 border-white/40 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200"
          >
            ⭐ Read Reviews
          </Link>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section
        className="py-5 px-6 border-b"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
      >
        <div className="flex justify-center flex-wrap gap-8 max-w-4xl mx-auto">
          {TRUST.map(b => (
            <div key={b.text} className="flex items-center gap-2.5 font-semibold text-sm">
              <span className="text-2xl">{b.icon}</span>
              <span style={{ color: 'var(--text-primary)' }}>{b.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-4">
        <h2 className="text-center text-2xl font-bold mb-8" style={{ color: 'var(--brand-fourth)' }}>
          🗂️ Shop by Category
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          {CATEGORIES.map(c => (
            <Link
              key={c.cat}
              to={`/products?cat=${c.cat}`}
              className="flex flex-col items-center gap-2 border-2 rounded-2xl py-6 px-8 no-underline font-bold text-sm min-w-[120px] hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B35] transition-all duration-200"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-muted)',
                color: 'var(--text-primary)',
              }}
            >
              <span className="text-4xl">{c.emoji}</span>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-center text-2xl font-bold mb-2" style={{ color: 'var(--brand-fourth)' }}>
          🌟 Featured Products
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
          Hand-picked favourites loved by kids across Pakistan
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {FEATURED.map(p => (
            <div
              key={p.id}
              className="flex flex-col border-[1.5px] rounded-xl p-4 w-56 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B35] transition-all duration-300 cursor-pointer"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-44 object-cover rounded-lg mb-3"
                onError={e => { e.target.src = 'https://via.placeholder.com/240x180?text=Toy'; }}
              />
              <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                {p.name}
              </h3>
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                Rs {p.price.toLocaleString()}
              </p>
              <span className="self-start inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F7C59F] text-[#004E89] mb-3">
                {p.badge}
              </span>
              <button
                className="mt-auto bg-[#FF6B35] text-white border-none rounded-lg px-4 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#004E89] hover:-translate-y-px transition-all duration-200"
                onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, img: p.img })}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="bg-[#FF6B35] text-white px-8 py-3 rounded-xl font-bold no-underline text-sm hover:bg-[#004E89] transition-colors shadow-md"
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 px-6" style={{ background: 'var(--bg-card)' }}>
        <h2 className="text-center text-2xl font-bold mb-12" style={{ color: 'var(--brand-fourth)' }}>
          💛 Why Parents Love ToyStore
        </h2>
        <div className="flex gap-6 justify-center flex-wrap max-w-4xl mx-auto">
          {WHY_US.map(w => (
            <div
              key={w.title}
              className="flex flex-col border-[1.5px] rounded-xl p-8 w-52 text-center shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B35] transition-all duration-300"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
            >
              <div className="text-4xl mb-3">{w.icon}</div>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>
                {w.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-[#004E89] py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: '10,000+', label: 'Happy Customers' },
            { val: '500+',    label: 'Products'        },
            { val: '4.8★',    label: 'Avg Rating'      },
            { val: '48hr',    label: 'Fast Delivery'   },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-white mb-1">{s.val}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-br from-[#f97316] to-[#ec4899] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-3">🎉 New Arrivals Every Week!</h2>
        <p className="text-lg text-white/90 mb-8 max-w-lg mx-auto">
          Sign up and be the first to know about new toys, deals &amp; exclusive offers.
        </p>
        <Link
          to="/signup"
          className="bg-white text-[#f97316] px-10 py-3.5 rounded-xl font-extrabold text-base no-underline hover:opacity-90 transition-opacity shadow-lg"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
}

