import { Resolver, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private users: UsersService) {}

  @Query(() => String)
  async me(@Context() ctx: any) {
    return `Hello user ${ctx.req.user?.email || 'guest'}`;
  }
}
