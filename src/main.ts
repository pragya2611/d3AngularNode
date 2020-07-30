import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { getDbConnectionOptions } from './shared/util';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot( {
    "name": "development",
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "Paymentus2020",
      "database": "showtimedb",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true,
      
    }));
  await app.listen(port);
  Logger.log(`server running on http://localhost:${port}`,'Bootstrap');
}
bootstrap();
