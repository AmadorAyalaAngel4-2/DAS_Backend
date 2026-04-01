import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Este correo electrónico ya está en uso.');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        tenantId: createUserDto.tenantId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        tenantId: true,
      },
    });
  }

  async findAllByTenant(tenantId: string) {
    return await this.prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
