// app/products/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ProductsPage() {
  const products = await prisma.product.findMany().catch((err: any) => {
    console.error("❌ Failed to fetch products:", err);
    return [];
  });

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="border p-4 rounded-lg hover:shadow-xl transition bg-white/5 backdrop-blur-md"
        >
          <div className="relative w-full aspect-[4/3] bg-gray-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
          <p className="mt-2 font-semibold">{formatter.format(Number(product.price) || 0)}</p>
        </Link>
      ))}
    </div>
  );
}
