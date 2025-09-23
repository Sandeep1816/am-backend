import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

async signup(email: string, password: string, name: string) {
  const hashed = await bcrypt.hash(password, 10);
  const user = await this.prisma.user.create({
    data: { email, password: hashed, name },
  });
  return this.generateToken(user.id, user.email, user.role);
}

// async login(email: string, password: string) {
//   const user = await this.prisma.user.findUnique({ where: { email } });
//   if (!user) throw new UnauthorizedException('Invalid credentials');
//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) throw new UnauthorizedException('Invalid credentials');
//   return this.generateToken(user.id, user.email, user.role);
// }

async login(email: string, password: string) {
  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user) throw new UnauthorizedException('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new UnauthorizedException('Invalid credentials');

  return {
    accessToken: this.jwt.sign({ sub: user.id, email: user.email, role: user.role }),
    user,
  };
}



private generateToken(userId: string, email: string, role: string) {
  return {
    accessToken: this.jwt.sign({ sub: userId, email, role }),
  };
}
}