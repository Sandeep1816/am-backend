import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private auth: AuthService) {}

  @Mutation(() => String)
  async signup(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ) {
    const token = await this.auth.signup(email, password, name);
    return token.accessToken;
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const token = await this.auth.login(email, password);
    return token.accessToken;
  }
}
