import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { databaseConfig } from './config/db.config';
import { PhraseModule } from './phrases/phrases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ...databaseConfig,
      autoLoadEntities: true,
    }),

    PhraseModule,
  ],
})
export class AppModule {}
