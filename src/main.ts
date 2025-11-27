import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService?.get<number>('PORT') || process.env.APP_PORT;

  await app.listen(port);
}

bootstrap();
