import {
  ClientProxy,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ClientProxyFactory } from '@nestjs/microservices/client/client-proxy-factory';
import { FilesModule } from '../../src/files.module';
import { NestFactory } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';

describe('FilesController (e2e)', () => {
  let client: ClientProxy;

  beforeEach(async () => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      FilesModule,
      {
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3726,
        },
      },
    );
    await app.listen();

    client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3726,
      },
    });
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  it('/check-file-service (GET) should return OK and 200', async () => {
    const response = await firstValueFrom(client.send('check', {}));
    expect(response).toEqual('OK!');
  });
});
