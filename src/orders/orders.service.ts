import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Use string for userId
  getOrders(userId: string) {
    return this.prisma.order.findMany({ where: { userId } });
  }

  async checkout(userId: string) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }, // include the product relation
    });

    const total = cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: { userId, total },
    });

    await this.prisma.cartItem.deleteMany({ where: { userId } });
    return order;
  }
}
