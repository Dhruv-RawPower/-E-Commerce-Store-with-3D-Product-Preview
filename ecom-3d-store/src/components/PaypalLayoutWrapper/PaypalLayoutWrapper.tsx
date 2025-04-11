// src/components/PaypalLayoutWrapper.tsx
'use client';

import { ReactNode } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider options={{ clientId: "ARKcwK5N4xEoO-oJSvObLu_QX2CZYPg_HPoIa7DRf5GJCEsli0PXAwC4cq7ca__yi7uZvgar3PPjzL_u" }}>
      {children}
    </PayPalScriptProvider>
  );
}
