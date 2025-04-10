// app/products/page.tsx
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map(product => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="border p-4 rounded-lg hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <p className="mt-2 font-semibold">₹ {product.price}</p>
        </Link>
      ))}
    </div>
  );
}
