import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/constant';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/time=out.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const PORT_SERVER = +config.get<string>(PORT) || 3000;

  app.setGlobalPrefix('api/v1');
  app.enableCors();

 // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  await app.listen(PORT_SERVER);
  logger.log(`Server is runnig in url ${ await app.getUrl() }`)
}
bootstrap();
