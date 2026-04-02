import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DevicesModule } from './devices/devices.module';
import { EventsModule } from './events/events.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, DevicesModule, EventsModule, DashboardModule, UsersModule, TenantsModule, AuthModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
