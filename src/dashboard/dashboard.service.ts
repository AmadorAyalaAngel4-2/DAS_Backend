import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getTenantStats(tenantId: string) {
    // Total de eventos históricos de esta empresa
    const totalEvents = await this.prisma.eventLog.count({
      where: { tenantId },
    });

    // Contar cuántas veces se activó cada color
    const colorStats = await this.prisma.eventLog.groupBy({
      by: ['color'],
      where: { tenantId },
      _count: {
        color: true,
      },
    });

    // Los últimos 5 eventos recientes
    const recentEvents = await this.prisma.eventLog.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        device: {
          select: { name: true, location: true },
        },
      },
    });

    // Devolvemos todo empaquetado y listo para tus gráficas
    return {
      totalEvents,
      colorStats: colorStats.map(stat => ({
        color: stat.color,
        count: stat._count.color,
      })),
      recentEvents,
    };
  }
}