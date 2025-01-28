import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @MessagePattern('check')
  checkService() {
    return this.filesService.checkService();
  }
}
