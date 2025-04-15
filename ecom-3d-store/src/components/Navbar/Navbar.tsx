'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";

interface NavbarProps {
  toggleCart: () => void;
}

export default function Navbar({ toggleCart }: NavbarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded ${
      pathname === path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center relative z-10">
      <Link href="/" className="text-xl font-bold text-white">🛒 3DStore</Link>
      <div className="space-x-4 flex items-center">
        <Link href="/" className={linkClass('/')}>Home</Link>
        <Link href="/products" className={linkClass('/products')}>Products</Link>
        <button
          onClick={toggleCart}
          className="px-4 py-2 rounded text-gray-300 hover:text-white"
        >
          Cart
        </button>
        <Link href="/orders" className={linkClass('/orders')}>My Orders</Link>
        {/* Prevent hydration mismatch */}
        {status === 'loading' ? null : session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() =>{
              console.log("Attempting login from:", window.location.origin);
              signIn('google')
            }
            }
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
