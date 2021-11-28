import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BookConsumerModule } from './bookConsumer/bookConsumer.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Codefinity microservice-template')
    .setDescription('Codefinity microservice-template')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      skipNullProperties: true,
    }),
  );

  const configService = app.get(ConfigService);

  const user = configService.get('RABBITMQ_USER');
  const password = configService.get('RABBITMQ_PASSWORD');
  const host = configService.get('RABBITMQ_HOST');
  const queueName = 'book';

  const bookConsumer = await NestFactory.createMicroservice(BookConsumerModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      noAck: false,
      prefetchCount: 1,
      queueOptions: {
        durable: true,
      },
    },
  });

  await Promise.all([app.listen(3000), bookConsumer.listen()]);
}
bootstrap();
