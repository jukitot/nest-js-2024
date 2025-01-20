import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true,
      // disableErrorMessages: true
    }),
  );
  // app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Nest module')
    .setDescription('The may-2024 API description')
    .setVersion('1.0')
    .addTag('OKTEN')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
