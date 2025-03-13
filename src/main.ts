import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { Logger } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const uploadDir = './files/store';
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
    console.log(`📂 Dossier créé : ${uploadDir}`);
  }

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentation de l’API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT, '0.0.0.0');
  console.log(`🚀 Server is running on port ${process.env.PORT || 9999}`);

  const server = app.getHttpAdapter().getInstance();
  const router = server.router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
  console.log('🧭 Available Routes :');
  console.log(availableRoutes);
}

bootstrap();
