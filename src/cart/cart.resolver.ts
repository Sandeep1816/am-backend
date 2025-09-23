import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CartItemModel } from './cart.model';

@Resolver()
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [CartItemModel])
  @UseGuards(JwtAuthGuard)
  async cart(@CurrentUser('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

@Mutation(() => CartItemModel)
@UseGuards(JwtAuthGuard)
async addToCart(
  @CurrentUser('userId') userId: string,
  @Args('productId', { type: () => String }) productId: string,
  @Args('quantity', { type: () => Int }) quantity: number,
) {
  return this.cartService.addToCart(userId, productId, quantity);
}


  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @CurrentUser('userId') userId: string,
    @Args('cartItemId', { type: () => String }) cartItemId: string,
  ) {
    await this.cartService.removeFromCart(cartItemId, userId);
    return 'Item removed successfully';
  }
}
