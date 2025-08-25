import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestiaSwaggerComposer } from '@nestia/sdk';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { getConfig } from './common/config';

async function bootstrap() {
  const { env, port, frontendUrl } = getConfig();

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [frontendUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  if (env === 'production') {
    const document = await NestiaSwaggerComposer.document(app, {
      openapi: '3.1',
      servers: [
        {
          url: `http://localhost:${port}`,
          description: 'Localhost',
        },
      ],
    });

    SwaggerModule.setup('api', app, document as OpenAPIObject);
  }

  await app.listen(port);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start the application:', error);
  process.exit(1);
});
