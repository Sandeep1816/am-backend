import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field()       // string, not Int
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  stock: number;

  @Field()
  imageUrl: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
