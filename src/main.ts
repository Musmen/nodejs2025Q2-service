import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

// import { prisma } from '../prisma/prisma';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService?.get<number>('PORT') || process.env.APP_PORT;

  await app.listen(port);
}

bootstrap();

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       login: 'Alice',
//       password: 'Alice@mail.ru',
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     },
//   });
//   console.log('Created user:', user);

//   const allUsers = await prisma.user.findMany();
//   console.log('All users:', allUsers);
// }

// main().then(() => {
//   console.log('main is Ok!');
// });
