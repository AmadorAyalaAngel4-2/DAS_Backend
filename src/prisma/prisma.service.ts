import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool, defaults } from 'pg'; // Importamos defaults
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    
    const pool = new Pool({ 
      connectionString,
      ssl: true, // Forzamos SSL aquí también por si acaso
      max: 10,    // Límite de conexiones simultáneas
    });
    
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    // Añadimos un try-catch para ver exactamente qué falla si no conecta
    try {
      await this.$connect();
      console.log('Successfully connected to Neon Database 🚀');
    } catch (error) {
      console.error('Failed to connect to Neon:', error);
    }
  }
}