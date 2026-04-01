import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const device = await this.prisma.device.findFirst({
      where: { hardwareId: createEventDto.hardwareId },
    });

    if (!device) {
      throw new NotFoundException(`Dispositivo con hardwareId ${createEventDto.hardwareId} no registrado.`);
    }

    return await this.prisma.eventLog.create({
      data: {
        action: createEventDto.action,
        color: createEventDto.color,
        deviceId: device.id,
        tenantId: device.tenantId,
      },
    });
  }

  async findAll() {
    return await this.prisma.eventLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
