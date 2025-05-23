// app/cart/page.tsx
'use client';

import { useCartStore } from '@/store/useCartStore';

export default function CartPage() {
  const { items: cart, removeFromCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 pb-2"
            >
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">
                {formatter.format(Number(item.price) || 0)} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">
                {formatter.format(Number(item.price * item.quantity) || 0)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-300"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: {formatter.format(Number(total.toFixed(2)) || 0)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
