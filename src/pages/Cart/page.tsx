import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, changeQty, clearCart } = useCart();
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const delivery  = subtotal > 3000 ? 0 : 200;
  const total     = subtotal + delivery;

  const handleCheckout = () => {
    alert('Order placed! Thank you for shopping at ToyStore 🧸');
    clearCart();
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-extrabold mb-8 text-[#FF6B35]">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-5">🛒</div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--brand-fourth)' }}>
              Your cart is empty
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/products"
              className="inline-block no-underline bg-[#FF6B35] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#004E89] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Cart Items */}
            <div className="flex-1 w-full">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-[1.5px] rounded-2xl px-5 py-4 mb-4 transition-all duration-300 hover:shadow-md"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                    onError={e => { e.target.src = 'https://via.placeholder.com/80x80?text=Toy'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold mb-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>
                      {item.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                      Rs {item.price.toLocaleString()} each
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-[#FF6B35] text-white border-none font-bold text-lg cursor-pointer hover:bg-[#004E89] transition-colors flex items-center justify-center"
                      >−</button>
                      <span className="w-8 text-center font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-[#FF6B35] text-white border-none font-bold text-lg cursor-pointer hover:bg-[#004E89] transition-colors flex items-center justify-center"
                      >+</button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 border-none text-xs font-semibold cursor-pointer hover:bg-red-200 transition-colors"
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-extrabold shrink-0 text-[#FF6B35]">
                    Rs {(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs font-medium cursor-pointer border-none bg-transparent hover:underline mt-2"
                style={{ color: 'var(--text-muted)' }}
              >
                🗑 Clear entire cart
              </button>
            </div>

            {/* Order Summary */}
            <div
              className="w-full lg:w-80 border-[1.5px] rounded-2xl p-6 shadow-md sticky top-20"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-muted)' }}
            >
              <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--brand-fourth)' }}>
                Order Summary
              </h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span>Subtotal ({cart.reduce((s,c)=>s+c.qty,0)} items)</span>
                  <strong>Rs {subtotal.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span>Delivery</span>
                  <strong>{delivery === 0 ? '🎉 Free' : `Rs ${delivery}`}</strong>
                </div>
                {delivery === 0 && (
                  <p className="text-xs text-green-600 font-medium">
                    ✅ You qualify for free delivery!
                  </p>
                )}
                <div
                  className="flex justify-between text-base font-extrabold pt-3 border-t"
                  style={{ borderColor: 'var(--border-muted)', color: 'var(--text-primary)' }}
                >
                  <span>Total</span>
                  <span className="text-[#FF6B35]">Rs {total.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#FF6B35] text-white border-none rounded-xl px-5 py-3 font-bold cursor-pointer hover:bg-[#004E89] transition-colors text-sm mb-3"
              >
                Proceed to Checkout →
              </button>
              <Link
                to="/products"
                className="block w-full text-center no-underline border-[1.5px] rounded-xl px-5 py-3 text-sm font-semibold hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all duration-200"
                style={{ borderColor: 'var(--border-muted)', color: 'var(--text-secondary)' }}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

