// app/products/[id]/page.tsx
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import ProductViewer from '@/components/ProductViewer/ProductViewer';

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) return notFound();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-6 p-6">
      {/* 3D Model Viewer */}
      <div className="w-full h-[60vh]">
        <ProductViewer modelUrl={product.modelUrl} />
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold mt-2">₹ {product.price}</p>
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
