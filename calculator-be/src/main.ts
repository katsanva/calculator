import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerValidatorPipe } from './common/swagger-validator.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Calculator service')
    .setDescription('The calculator API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new SwaggerValidatorPipe(document));

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
