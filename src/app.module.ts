import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DevicesModule } from './devices/devices.module';
import { EventsModule } from './events/events.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, DevicesModule, EventsModule, DashboardModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
