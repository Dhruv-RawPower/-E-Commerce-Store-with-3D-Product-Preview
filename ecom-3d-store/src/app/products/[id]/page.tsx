//import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import ProductViewer from '@/components/ProductViewer/ProductViewer';
import AddToCartButton from '@/components/addToCartButton/AddToCartButton';
import { prisma } from "@/lib/prisma";

//const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return notFound();

  return (
    <div className="relative flex h-[calc(100vh-80px)] p-6 gap-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Left: 3D Viewer Panel with glassmorphism */}
      <div className="w-1/2 h-full rounded-2xl relative p-1 bg-gradient-to-br from-[#ffffff0d] to-[#ffffff05] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md border border-white/20 overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <ProductViewer modelUrl={product.modelUrl} />
      </div>

      {/* Right: Product Info Panel with glassy + glow */}
      <div className="w-1/2 flex flex-col justify-center p-10 rounded-2xl relative bg-gradient-to-br from-[#ffffff1a] to-[#ffffff0d] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md border border-white/20 space-y-6 transition-all duration-300 ease-in-out overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

        <h1 className="text-4xl font-extrabold text-white drop-shadow-md tracking-tight">
          {product.name}
        </h1>

        <p className="text-lg text-gray-200 leading-relaxed drop-shadow-sm">
          {product.description}
        </p>

        <p className="text-3xl font-bold text-emerald-400 drop-shadow-lg">
          ${product.price.toFixed(2)}
        </p>

        <div className="pt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((product) => ({ id: product.id.toString() }));
}
