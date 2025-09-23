import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {   // 👈 change to string
    return this.prisma.user.findUnique({ where: { id } });
  }
}
