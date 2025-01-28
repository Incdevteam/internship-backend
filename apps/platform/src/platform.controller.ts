import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class PlatformController {
  constructor(
    private readonly appService: PlatformService,
    @Inject('FILES_SERVICE') private readonly filesService: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-file-service')
  async checkFileService() {
    try {
      return this.filesService.send('check', {});
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
