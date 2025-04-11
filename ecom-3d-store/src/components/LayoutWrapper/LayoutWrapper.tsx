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
      <main>{children}</main>
      {showCart && (        
        <CartPreview />
      )}
    </PaypalLayoutWrapper>
  );
}
