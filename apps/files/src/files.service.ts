import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  checkService(): string {
    return 'OK!';
  }
}
