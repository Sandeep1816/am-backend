import { Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query(() => [String])
  orders(@Context() ctx: any) {
    return this.ordersService.getOrders(ctx.req.user.userId);
  }

  @Mutation(() => String)
  checkout(@Context() ctx: any) {
    return this.ordersService.checkout(ctx.req.user.userId);
  }
}
