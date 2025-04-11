// app/orders/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Order {
  id: string;
  total: number;
  createdAt: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, [session]);

  if (status === 'loading') return <p className="text-white p-4">Loading...</p>;
  if (!session) return <p className="text-white p-4">Please log in to view your orders.</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map(order => (
            <li key={order.id} className="border border-white p-2 rounded">
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>Total:</strong> ₹{order.total}</div>
              <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
