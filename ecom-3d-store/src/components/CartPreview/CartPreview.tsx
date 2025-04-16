'use client';

import { useCartStore } from "@/store/useCartStore";
import Link from 'next/link';

export default function CartPreview() {

  const {
    items: cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  
  return (
    <div className="fixed right-4 top-20 w-[90vw] max-w-sm md:max-w-md backdrop-blur-lg bg-white/10 p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-400 text-center">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">{formatter.format(Number(item.price) || 0)} × {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
                >
                  −
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 text-xs hover:text-red-600 ml-2"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-5 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>{formatter.format(Number(total) || 0)}</span>
          </div>

          <Link href="/checkout">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors text-white font-bold py-2 rounded-lg shadow-lg">
              Proceed to Checkout →
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
