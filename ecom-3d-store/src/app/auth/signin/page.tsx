// app/auth/signin/page.tsx
'use client';

import { signIn } from 'next-auth/react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Login to 3DStore</h1>
      <button
        onClick={() => signIn('google', { callbackUrl: '/products' })}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
}
