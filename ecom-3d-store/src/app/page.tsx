'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-6">🛍️ Welcome to the 3D E-Commerce Store</h1>
      <p className="text-lg mb-10 text-gray-300">
        Experience and explore products in 3D before you buy!
      </p>
      <Link
        href="/products"
        className="px-6 py-3 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition"
      >
        Browse Products
      </Link>
    </main>
  );
}
