'use client';

import { useCartStore } from "@/store/useCartStore";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';


export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items: cart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/api/auth/signin');
    }
  }, [status]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🧾 Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
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
                <p className="text-lg font-bold">
                {formatter.format(Number(item.price * item.quantity) || 0)}
                </p>
              </div>
            ))}

            <div className="text-right mt-4">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-6">
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "pill",
                label: "paypal",
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: total.toFixed(2),
                      },
                    },
                  ],
                  application_context: {
                    shipping_preference: "NO_SHIPPING", // 👈 this disables shipping
                    user_action: "PAY_NOW", // Optional but recommended: shows "Pay Now" instead of "Continue"  
                  },
                });
              }}
              onApprove={(data, actions) => {
                return new Promise<void>((resolve, reject) => {
                  if (!actions.order) {
                    reject("actions.order is undefined");
                    return;
                  }
              
                  actions.order.capture().then(async (details) => {
                    const userName = details?.payer?.name?.given_name ?? "Guest";
                    const email = details?.payer?.email_address ?? "unknown@example.com";
              
                    toast.success(`${userName} added to cart! 🛒`);  
                    try {
                      await fetch("/api/orders", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userName,
                          email,
                          total,
                          orderDetails: JSON.stringify(cart),
                        }),
                      });
                    } catch (err) {
                      console.error("❌ Failed to save order:", err);
                    }
              
                    clearCart();
                    window.location.href = "/success";
                    resolve();
                  }).catch((error) => {
                    console.error("Payment failed:", error);
                    reject(error);
                  });
                });
              }}
                            
            />
          </div>
        </>
      )}
    </div>
  );
}
