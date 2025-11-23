import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { prisma } from '../prisma/prisma';

import { AppModule } from './app.module';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService?.get<number>('PORT') || DEFAULT_PORT;

  await app.listen(port);
}

bootstrap();

async function main() {
  const user = await prisma.user.create({
    data: {
      login: 'Alice' + Date.now().toString(),
      password: 'alice@prisma.io',
      version: 1,
      createdAt: Date.now().toString(),
      updatedAt: '0',
    },
  });
  console.log('Created user:', user);

  const allUsers = await prisma.user.findMany();
  console.log('All users:', JSON.stringify(allUsers, null, 2));
}

main().then(() => {
  console.log('main is Ok!');
});
