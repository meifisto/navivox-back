import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // Exclut 'debug' et 'verbose'
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Vérifie et crée le dossier s'il n'existe pas
  const uploadDir = './files/store';
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
    console.log(`📂 Dossier créé : ${uploadDir}`);
  }
  // ---------------------------------------------

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentation de l’API')
    .setVersion('1.0')
    .addBearerAuth() // Ajoute l'authentification JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Route Swagger: /api
  // ---------------------------------------------

  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();
