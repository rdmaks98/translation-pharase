import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: 'http://localhost:3000' });
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    // Add global prefix
    app.setGlobalPrefix('api/v1');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Server listening on http://localhost:${port}/api/v1`);
}


bootstrap();