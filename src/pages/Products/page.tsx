import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';

const ALL_PRODUCTS = [
  { id: 'd1', name: 'Barbie Fashion Doll',     category: 'dolls',      price: 2400, img: img2, desc: 'Classic Barbie with stylish outfits – ages 3+',              badge: 'Dolls'       },
  { id: 'd2', name: 'Baby Doll Set',            category: 'dolls',      price: 1800, img: img1, desc: 'Soft & cuddly baby doll with accessories – ages 2+',         badge: 'Dolls'       },
  { id: 'c1', name: 'RC Racing Car',            category: 'cars',       price: 3100, img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop', desc: 'Remote-controlled sports car – ages 5+ – 30 km/h', badge: 'Cars' },
  { id: 'c2', name: 'Die-Cast Car Set (6pc)',   category: 'cars',       price: 1200, img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop', desc: 'Collectible metal toy cars – ages 3+ – multicolour', badge: 'Cars' },
  { id: 't1', name: 'Giant Teddy Bear',         category: 'teddybears', price: 2800, img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&h=300&fit=crop', desc: 'Super soft 90 cm teddy – perfect gift – all ages', badge: 'Teddy Bears' },
  { id: 't2', name: 'Mini Teddy Pack (3pc)',    category: 'teddybears', price: 900,  img: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&h=300&fit=crop', desc: 'Set of 3 colourful mini teddies – ages 2+', badge: 'Teddy Bears' },
  { id: 'p1', name: '1000-Piece Jigsaw Puzzle', category: 'puzzles',    price: 950,  img: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop', desc: 'World map theme – challenging & educational – ages 10+', badge: 'Puzzles' },
  { id: 'p2', name: 'Kids Puzzle (100 pcs)',    category: 'puzzles',    price: 500,  img: 'https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=400&h=300&fit=crop', desc: 'Colourful animal theme – easy grip pieces – ages 4+', badge: 'Puzzles' },
  { id: 'k1', name: 'Deluxe Kitchen Play Set',  category: 'kitchen',    price: 4200, img: img3, desc: '50+ pieces with sounds & lights – ages 3+ – pink',           badge: 'Kitchen'     },
  { id: 'k2', name: 'Mini Cooking Set',         category: 'kitchen',    price: 1600, img: img4, desc: 'Includes pots, pans & food items – ages 3+',                 badge: 'Kitchen'     },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const { addToCart }  = useCart();
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [priceMax, setPriceMax] = useState(9999);
  const [sortBy,   setSortBy]   = useState('');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = ALL_PRODUCTS
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (!category || p.category === category) &&
      p.price <= priceMax
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      return 0;
    });

  const inputCls = 'px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-colors';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-extrabold mb-2 text-[#FF6B35]">🏪 Our Toys</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Browse our full collection — filter by category, price or name.
        </p>

        {/* Filter Bar */}
        <div
          className="flex flex-wrap gap-3 items-center px-5 py-4 rounded-2xl border-[1.5px] mb-8 shadow-sm"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
        >
          <input
            type="text"
            placeholder="🔍  Search toys…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`flex-1 min-w-[180px] ${inputCls}`}
            style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={`w-44 ${inputCls} appearance-none`}
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
          >
            <option value="">All Categories</option>
            <option value="dolls">Dolls</option>
            <option value="cars">Cars</option>
            <option value="teddybears">Teddy Bears</option>
            <option value="puzzles">Puzzles</option>
            <option value="kitchen">Kitchen Sets</option>
          </select>
          <select
            value={priceMax}
            onChange={e => setPriceMax(Number(e.target.value))}
            className={`w-44 ${inputCls} appearance-none`}
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
          >
            <option value={9999}>Any Price</option>
            <option value={1000}>Under Rs 1,000</option>
            <option value={2000}>Under Rs 2,000</option>
            <option value={3000}>Under Rs 3,000</option>
            <option value={5000}>Under Rs 5,000</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={`w-40 ${inputCls} appearance-none`}
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name A–Z</option>
          </select>
          <button
            onClick={() => {}}
            className="bg-[#FF6B35] text-white border-none rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#004E89] transition-colors"
          >
            Search
          </button>
          {(search || category || priceMax < 9999 || sortBy) && (
            <button
              onClick={() => { setSearch(''); setCategory(''); setPriceMax(9999); setSortBy(''); }}
              className="text-sm font-medium cursor-pointer border-none bg-transparent hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
          Showing <strong>{filtered.length}</strong> of {ALL_PRODUCTS.length} products
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold" style={{ color: 'var(--text-muted)' }}>No products found.</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map(product => (
              <div
                key={product.id}
                className="flex flex-col border-[1.5px] rounded-xl p-3.5 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B35] transition-all duration-300"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-36 object-cover rounded-lg mb-3"
                  onError={e => { e.target.src = 'https://via.placeholder.com/240x180?text=Toy'; }}
                />
                <h3 className="text-sm font-bold mb-1 leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  {product.name}
                </h3>
                <p className="text-xs leading-relaxed mb-2 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                  {product.desc}
                </p>
                <p className="text-sm font-bold mb-2 text-[#FF6B35]">
                  Rs {product.price.toLocaleString()}
                </p>
                <span className="self-start inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F7C59F] text-[#004E89] mb-3">
                  {product.badge}
                </span>
                <button
                  className="mt-auto bg-[#FF6B35] text-white border-none rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer hover:bg-[#004E89] transition-colors"
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, img: product.img })}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

