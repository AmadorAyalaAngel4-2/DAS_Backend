import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDeviceDto: CreateDeviceDto) {
    return await this.prisma.device.create({
      data: createDeviceDto,
    });
  }

  async findAll() {
    return await this.prisma.device.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.device.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return await this.prisma.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.device.delete({
      where: { id },
    });
  }
}