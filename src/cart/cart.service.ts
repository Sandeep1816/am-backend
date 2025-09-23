import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    // Optional: check if product exists in cart and update quantity
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: { userId, productId, quantity },
      include: { product: true },
    });
  }

  async removeFromCart(id: string, userId: string) {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id } });

    if (!cartItem) throw new NotFoundException('Cart item not found');
    if (cartItem.userId !== userId)
      throw new NotFoundException('Not allowed to delete this item');

    return this.prisma.cartItem.delete({ where: { id } });
  }
}
