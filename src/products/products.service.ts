import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.product.findMany();
  }

  getById(id: string) {  // ✅ changed to string
    return this.prisma.product.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.product.create({ data });
  }

  update(id: string, data: any) {  // ✅ changed to string
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(id: string) {  // ✅ changed to string
    return this.prisma.product.delete({ where: { id } });
  }
}
