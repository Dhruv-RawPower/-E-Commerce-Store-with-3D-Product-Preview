// app/api/products/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}
