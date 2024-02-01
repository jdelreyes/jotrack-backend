import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

(async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('JoTrack')
    .setDescription('consists of a list of APIs')
    .setVersion('1.0')
    .addTag('jotrack-backend')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  await app.listen(8000);
})();
