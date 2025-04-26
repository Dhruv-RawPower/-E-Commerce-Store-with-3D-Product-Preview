'use client';

import { useState, ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import CartPreview from '@/components/CartPreview/CartPreview';
import PaypalLayoutWrapper from '@/components/PaypalLayoutWrapper/PaypalLayoutWrapper';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const [showCart, setShowCart] = useState(false);

  return (
    <PaypalLayoutWrapper>
      <Navbar toggleCart={() => setShowCart((prev) => !prev)} />

      <div className="relative">
        <main>{children}</main>

        {showCart && (
          <div 
            className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCart(false)} // <-- Click outside to close
          >
            <div 
              className="w-4/5 sm:w-96 bg-white dark:bg-gray-800 h-full shadow-lg p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // <-- Prevent closing when clicking inside the panel
            >
              {/* Close Button */}
              <button
                className="text-red-500 text-lg font-bold mb-4"
                onClick={() => setShowCart(false)}
              >
                ✖ Close
              </button>

              <CartPreview />
            </div>
          </div>
        )}
      </div>
    </PaypalLayoutWrapper>
  );
}
