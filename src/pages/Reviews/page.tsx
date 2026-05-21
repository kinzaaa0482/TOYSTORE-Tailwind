import { useState } from 'react';

const INITIAL_REVIEWS = [
  { id: 1, name: 'Ayesha Tariq',  initials: 'AT', grad: 'linear-gradient(135deg,#6c63ff,#ec4899)', product: 'Barbie Fashion Doll',    rating: 5, date: 'May 15, 2026', text: 'My daughter absolutely loves this doll! The quality is amazing and it arrived beautifully packed. Will definitely order again from ToyStore.' },
  { id: 2, name: 'Usman Raza',    initials: 'UR', grad: 'linear-gradient(135deg,#f97316,#f59e0b)', product: 'RC Racing Car',           rating: 5, date: 'May 12, 2026', text: "The RC car is super fast and my son hasn't put it down since it arrived. Great build quality for the price. Highly recommended!" },
  { id: 3, name: 'Fatima Malik',  initials: 'FM', grad: 'linear-gradient(135deg,#22c55e,#06b6d4)', product: 'Deluxe Kitchen Play Set', rating: 5, date: 'May 10, 2026', text: 'Bought this for my 4-year-old and she plays with it every single day. The sounds and lights make it so interactive. Worth every rupee!' },
  { id: 4, name: 'Hassan Ali',    initials: 'HA', grad: 'linear-gradient(135deg,#3b82f6,#6c63ff)', product: 'Giant Teddy Bear',        rating: 4, date: 'May 8, 2026',  text: 'Very soft and fluffy teddy bear. My kid sleeps with it every night. Delivery was fast too. Only minor issue was the packaging could be better.' },
  { id: 5, name: 'Sara Khan',     initials: 'SK', grad: 'linear-gradient(135deg,#06b6d4,#3b82f6)', product: '1000-Piece Jigsaw Puzzle',rating: 5, date: 'May 5, 2026',  text: 'Excellent puzzle for the whole family. We spent the whole weekend on it. Great quality pieces that fit perfectly. ToyStore never disappoints!' },
  { id: 6, name: 'Bilal Ahmed',   initials: 'BA', grad: 'linear-gradient(135deg,#ec4899,#f97316)', product: 'Mini Teddy Pack (3pc)',   rating: 4, date: 'May 2, 2026',  text: 'Cute little teddies, great value for money. Bought as a gift and the recipient loved them. Would order again.' },
  { id: 7, name: 'Zara Hussain',  initials: 'ZH', grad: 'linear-gradient(135deg,#f59e0b,#22c55e)', product: 'Baby Doll Set',           rating: 5, date: 'Apr 28, 2026', text: 'Perfect for my 2-year-old niece. Very soft and safe. No sharp edges at all. The accessories included are a bonus. 5 stars!' },
  { id: 8, name: 'Ali Nawaz',     initials: 'AN', grad: 'linear-gradient(135deg,#6c63ff,#22c55e)', product: 'Die-Cast Car Set (6pc)',  rating: 4, date: 'Apr 25, 2026', text: 'Nice set of metal cars. Good detail and finish. My boys love collecting them. Delivery was on time as well.' },
];

function Stars({ rating, interactive = false, onRate }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          onClick={() => interactive && onRate && onRate(i)}
          className={`text-xl ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          style={{ color: i <= rating ? '#f59e0b' : '#d1d5db' }}
        >★</span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const [reviews,   setReviews]   = useState(INITIAL_REVIEWS);
  const [form,      setForm]      = useState({ name: '', product: '', rating: 5, text: '' });
  const [submitted, setSubmitted] = useState(false);

  const avgRating    = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map(r => ({ r, count: reviews.filter(rv => rv.rating === r).length }));
  const positivePct  = Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const grads = ['linear-gradient(135deg,#6c63ff,#ec4899)','linear-gradient(135deg,#22c55e,#06b6d4)','linear-gradient(135deg,#f97316,#f59e0b)','linear-gradient(135deg,#3b82f6,#6c63ff)'];
    setReviews(prev => [{
      id: Date.now(), name: form.name, initials,
      grad: grads[Math.floor(Math.random() * grads.length)],
      product: form.product, rating: Number(form.rating),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      text: form.text,
    }, ...prev]);
    setForm({ name: '', product: '', rating: 5, text: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputCls = 'w-full px-4 py-3 border-[1.5px] rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-colors';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-extrabold mb-2 text-[#FF6B35]">⭐ Customer Reviews</h1>
        <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
          Real reviews from real ToyStore customers across Pakistan.
        </p>

        {/* Rating Summary */}
        <div
          className="flex flex-wrap gap-8 items-center border-[1.5px] rounded-2xl p-8 mb-12 shadow-sm"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
        >
          <div className="text-center min-w-[110px]">
            <div className="text-5xl font-extrabold leading-none mb-1 text-[#FF6B35]">
              {avgRating}
            </div>
            <Stars rating={Math.round(Number(avgRating))} />
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{reviews.length} reviews</div>
          </div>

          <div className="flex-1 min-w-[180px] space-y-2">
            {ratingCounts.map(({ r, count }) => (
              <div key={r} className="flex items-center gap-2.5">
                <span className="text-xs w-8 text-right" style={{ color: 'var(--text-muted)' }}>{r} ★</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-muted)' }}>
                  <div
                    className="h-full rounded-full bg-[#f59e0b] transition-all duration-500"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs w-4" style={{ color: 'var(--text-muted)' }}>{count}</span>
              </div>
            ))}
          </div>

          <div className="text-center min-w-[130px]">
            <div className="text-4xl mb-1">😊</div>
            <div className="font-extrabold text-lg" style={{ color: 'var(--text-primary)' }}>
              {positivePct}% Positive
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Would recommend</div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid gap-5 mb-14" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {reviews.map(r => (
            <div
              key={r.id}
              className="flex flex-col border-[1.5px] rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B35] transition-all duration-300"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: r.grad }}
                >
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{r.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.date}</div>
                </div>
                <Stars rating={r.rating} />
              </div>
              <span className="self-start text-xs font-bold px-2.5 py-0.5 rounded-full mb-3 bg-[#FF6B35]/10 text-[#FF6B35]">
                {r.product}
              </span>
              <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
                "{r.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Write a Review */}
        <div
          className="border-[1.5px] rounded-2xl p-8 max-w-2xl mx-auto shadow-md"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--brand-fourth)' }}>✍️ Write a Review</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Share your experience with other parents.
          </p>

          {submitted && (
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-xl mb-5 font-semibold text-sm">
              ✅ Thank you! Your review has been posted.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Your Name
                </label>
                <input
                  type="text" name="name" placeholder="e.g. Ali Raza"
                  value={form.name} onChange={handleChange} required
                  className={inputCls}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Product
                </label>
                <input
                  type="text" name="product" placeholder="e.g. RC Racing Car"
                  value={form.product} onChange={handleChange} required
                  className={inputCls}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                Rating
              </label>
              <Stars
                rating={Number(form.rating)}
                interactive
                onRate={n => setForm(f => ({ ...f, rating: n }))}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Your Review
              </label>
              <textarea
                name="text" placeholder="Tell us about your experience…"
                value={form.text} onChange={handleChange} required rows={4}
                className={`${inputCls} resize-y font-[inherit]`}
                style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6B35] text-white border-none rounded-xl py-3 font-bold text-sm cursor-pointer hover:bg-[#004E89] transition-colors"
            >
              Submit Review →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

