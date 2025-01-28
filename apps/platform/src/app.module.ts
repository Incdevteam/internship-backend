import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../../libs/core/db/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'FILES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.FILES_SERVICE_HOST || '0.0.0.0',
          port: Number(process.env.FILES_SERVICE_PORT || '3726'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
