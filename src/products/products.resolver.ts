import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductModel } from './product.model';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [ProductModel])
  products() {
    return this.productsService.getAll();
  }

  @Query(() => ProductModel, { nullable: true })
  product(@Args('id') id: string) {  // ✅ string now
    return this.productsService.getById(id);
  }

  @Mutation(() => ProductModel)
  createProduct(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('price', { type: () => Int }) price: number,
    @Args('stock', { type: () => Int }) stock: number,
    @Args('imageUrl') imageUrl: string,
  ) {
    return this.productsService.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });
  }

  @Mutation(() => ProductModel)
  updateProduct(
    @Args('id') id: string,  // ✅ string now
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('price', { nullable: true , type: () => Int}) price?: number,
    @Args('stock', { nullable: true , type: () => Int }) stock?: number,
    @Args('imageUrl', { nullable: true }) imageUrl?: string,
  ) {
    return this.productsService.update(id, {
      name,
      description,
      price,
      stock,
      imageUrl,
    });
  }

  @Mutation(() => ProductModel)
  deleteProduct(@Args('id') id: string) {  // ✅ string now
    return this.productsService.delete(id);
  }
}
