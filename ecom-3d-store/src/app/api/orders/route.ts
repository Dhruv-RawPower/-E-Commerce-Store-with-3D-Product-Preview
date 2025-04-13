import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: {
      user: {
        email: session.user.email!,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  

  return NextResponse.json(orders);
}
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const order = await prisma.order.create({
      data: {
        userName: body.userName,
        email: body.email,
        total: body.total,
        orderDetails: body.orderDetails,
        user: {
          connect: {
            email: session.user.email, // 👈 this connects it to the User
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}