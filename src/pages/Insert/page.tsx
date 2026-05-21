import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_STOCK = [
  { id: '#001', name: 'Barbie Fashion Doll', cat: 'Dolls',        price: 2400, qty: 80 },
  { id: '#002', name: 'RC Racing Car',       cat: 'Cars',         price: 3100, qty: 65 },
  { id: '#003', name: 'Giant Teddy Bear',    cat: 'Teddy Bears',  price: 2800, qty: 50 },
  { id: '#004', name: '1000-Piece Puzzle',   cat: 'Puzzles',      price: 950,  qty: 90 },
  { id: '#005', name: 'Deluxe Kitchen Set',  cat: 'Kitchen Sets', price: 4200, qty: 45 },
];

export default function Insert() {
  const [form,   setForm]   = useState({ name: '', cat: 'dolls', price: '', qty: '', age: '', desc: '', img: '' });
  const [stock,  setStock]  = useState(INITIAL_STOCK);
  const [nextId, setNextId] = useState(6);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStock(prev => [...prev, {
      id: `#00${nextId}`,
      name: form.name,
      cat: form.cat.charAt(0).toUpperCase() + form.cat.slice(1),
      price: parseInt(form.price),
      qty: parseInt(form.qty),
    }]);
    setNextId(n => n + 1);
    alert('Product added: ' + form.name);
    setForm({ name: '', cat: 'dolls', price: '', qty: '', age: '', desc: '', img: '' });
  };

  const inputCls = 'w-full px-4 py-3 border-[1.5px] rounded-xl text-sm focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 transition-colors';
  const labelCls = 'block text-sm font-semibold mb-1.5';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-extrabold mb-2 text-[#FF6B35]">➕ Insert New Stock</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Add a new product to the ToyStore inventory.
        </p>

        {/* Form */}
        <div
          className="border-[1.5px] rounded-2xl p-8 shadow-md mb-10 max-w-2xl"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
        >
          <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--brand-fourth)' }}>Product Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Product Name</label>
                <input type="text" name="name" placeholder="e.g. Barbie Dream House"
                  value={form.name} onChange={handleChange} required
                  className={inputCls}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Category</label>
                <select name="cat" value={form.cat} onChange={handleChange}
                  className={`${inputCls} appearance-none`}
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                >
                  <option value="dolls">Dolls</option>
                  <option value="cars">Cars</option>
                  <option value="teddybears">Teddy Bears</option>
                  <option value="puzzles">Puzzles</option>
                  <option value="kitchen">Kitchen Sets</option>
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Age Range</label>
                <input type="text" name="age" placeholder="e.g. 3+ years"
                  value={form.age} onChange={handleChange}
                  className={inputCls}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Price (Rs)</label>
                <input type="number" name="price" placeholder="2000" min="1"
                  value={form.price} onChange={handleChange} required
                  className={inputCls}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Stock Quantity</label>
                <input type="number" name="qty" placeholder="50" min="1"
                  value={form.qty} onChange={handleChange} required
                  className={inputCls}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Description</label>
                <textarea name="desc" placeholder="Short product description…"
                  value={form.desc} onChange={handleChange} rows={3}
                  className={`${inputCls} resize-y font-[inherit]`}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} style={{ color: 'var(--text-secondary)' }}>Image URL</label>
                <input type="url" name="img" placeholder="https://…"
                  value={form.img} onChange={handleChange}
                  className={inputCls}
                  style={{ background: 'var(--bg-main)', borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit"
                className="bg-[#FF6B35] text-white border-none rounded-xl px-6 py-3 font-bold text-sm cursor-pointer hover:bg-[#004E89] transition-colors"
              >
                Add Product
              </button>
              <button type="reset"
                onClick={() => setForm({ name: '', cat: 'dolls', price: '', qty: '', age: '', desc: '', img: '' })}
                className="border-[1.5px] rounded-xl px-6 py-3 font-bold text-sm cursor-pointer hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all duration-200"
                style={{ borderColor: 'var(--border-muted)', color: 'var(--text-secondary)', background: 'transparent' }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Inventory Table */}
        <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--brand-fourth)' }}>📋 Existing Inventory</h2>
        <div className="w-full overflow-x-auto rounded-2xl border-[1.5px] shadow-md" style={{ borderColor: 'var(--border-muted)' }}>
          <table className="w-full border-collapse text-sm" style={{ minWidth: '600px' }}>
            <thead>
              <tr className="bg-[#004E89] text-white">
                {['ID', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stock.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-[#F7C59F]/30 transition-colors cursor-pointer"
                  style={{
                    borderColor: 'var(--border-muted)',
                    background: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-main)',
                  }}
                >
                  <td className="px-5 py-3.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{row.id}</td>
                  <td className="px-5 py-3.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>{row.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F7C59F] text-[#004E89]">
                      {row.cat}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-[#FF6B35]">
                    Rs {row.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-semibold" style={{ color: 'var(--text-secondary)' }}>{row.qty}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Edit: ${row.name}`)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer bg-[#6c63ff]/10 text-[#6c63ff] hover:bg-[#6c63ff]/20 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setStock(prev => prev.filter(r => r.id !== row.id))}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-block no-underline bg-[#004E89] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#FF6B35] transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

