import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestiaSwaggerComposer } from '@nestia/sdk';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = await NestiaSwaggerComposer.document(app, {
    openapi: '3.1',
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Localhost',
      },
    ],
  });
  SwaggerModule.setup('api', app, document as OpenAPIObject);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start the application:', error);
  process.exit(1);
});
