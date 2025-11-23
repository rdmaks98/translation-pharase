import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phrase } from './entities/pharse.entity';
import { Translation } from './entities/translation.entity';
import { PhraseService } from './phrases.service';
import { PhraseController } from './phrases.controller';


@Module({
imports: [TypeOrmModule.forFeature([Phrase, Translation])],
providers: [PhraseService],
controllers: [PhraseController],
})
export class PhraseModule {}