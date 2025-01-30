import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../../libs/core/db/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'FILES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'platform-files-service-service',
          port: Number('3726'),
        },
      },
    ]),
  ],
  controllers: [PlatformController],
  providers: [PlatformService, PrismaService],
})
export class PlatformModule {}
