import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductModel } from '../products/product.model';

@ObjectType()
export class CartItemModel {
  @Field()
  id: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => ProductModel)
  product: ProductModel;
}
